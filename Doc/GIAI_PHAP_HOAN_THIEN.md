# 🔧 GIẢI PHÁP HOÀN THIỆN - 3 CHỨC NĂNG CÒN THIẾU

**Ngày:** 26/10/2025  
**Mục tiêu:** Bổ sung 3 chức năng thiếu KHÔNG phá vỡ schema đơn giản

---

## 📋 TÓM TẮT 3 CHỨC NĂNG THIẾU

| # | Chức năng | Trạng thái hiện tại | Giải pháp |
|---|-----------|---------------------|-----------|
| 1 | **Duyệt hợp đồng** | ❌ Thiếu field `trangThai` | ✅ Thêm field vào Entity + DB |
| 2 | **Kết thúc hợp đồng** | ❌ Thiếu workflow lifecycle | ✅ Thêm field + logic kết thúc |
| 3 | **Xác thực giấy tờ** | ❌ Thiếu upload ảnh + workflow | ✅ Thêm bảng riêng cho documents |

---

## 🎯 GIẢI PHÁP CHI TIẾT

### **GIẢI PHÁP 1: Workflow Hợp Đồng (Duyệt + Kết thúc)**

#### **A. Thêm fields vào `HopDongDongSoHuu`**

**Schema cũ (5 fields):**
```
hop_dong_id, xe_id, chu_xe_id, ngay_bat_dau, ngay_ket_thuc
```

**Schema mới (9 fields) - Thêm 4 fields:**
```sql
-- Thêm vào bảng hop_dong_dong_so_huu:
ALTER TABLE hop_dong_dong_so_huu 
ADD trang_thai VARCHAR(20) DEFAULT 'ChoDuyet' CHECK (trang_thai IN 
    ('ChoDuyet', 'DaDuyet', 'TuChoi', 'DangHieuLuc', 'HetHan')),
ADD nguoi_duyet INT NULL,
ADD ngay_duyet DATETIME NULL,
ADD ly_do_tu_choi NVARCHAR(500) NULL;
```

**Trạng thái workflow:**
```
ChoDuyet → DaDuyet → DangHieuLuc → HetHan
         ↓
       TuChoi
```

#### **B. Cập nhật Entity `HopDongDongSoHuu.java`**

```java
@Entity
@Table(name = "hop_dong_dong_so_huu")
public class HopDongDongSoHuu {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hop_dong_id")
    private Integer hopDongId;
    
    @Column(name = "xe_id", nullable = false)
    private Integer xeId;
    
    @Column(name = "chu_xe_id", nullable = false)
    private Integer chuXeId;
    
    @Column(name = "ngay_bat_dau", nullable = false)
    private LocalDateTime ngayBatDau;
    
    @Column(name = "ngay_ket_thuc")
    private LocalDateTime ngayKetThuc;
    
    // ===== THÊM MỚI =====
    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai", nullable = false)
    @Builder.Default
    private TrangThaiHopDong trangThai = TrangThaiHopDong.ChoDuyet;
    
    @Column(name = "nguoi_duyet")
    private Integer nguoiDuyet;
    
    @Column(name = "ngay_duyet")
    private LocalDateTime ngayDuyet;
    
    @Column(name = "ly_do_tu_choi", length = 500)
    private String lyDoTuChoi;
    
    public enum TrangThaiHopDong {
        ChoDuyet,      // Chờ admin duyệt
        DaDuyet,       // Admin đã duyệt
        TuChoi,        // Admin từ chối
        DangHieuLuc,   // Đang hoạt động
        HetHan         // Đã hết hạn
    }
}
```

#### **C. Thêm Repository methods**

```java
public interface HopDongDongSoHuuRepository extends JpaRepository<HopDongDongSoHuu, Integer> {
    
    List<HopDongDongSoHuu> findByChuXeId(Integer chuXeId);
    
    List<HopDongDongSoHuu> findByXeId(Integer xeId);
    
    // ===== THÊM MỚI =====
    List<HopDongDongSoHuu> findByTrangThai(HopDongDongSoHuu.TrangThaiHopDong trangThai);
    
    @Query("SELECT h FROM HopDongDongSoHuu h WHERE h.trangThai = 'DangHieuLuc' " +
           "AND h.ngayKetThuc < :now")
    List<HopDongDongSoHuu> findExpiredContracts(@Param("now") LocalDateTime now);
}
```

#### **D. Thêm Service methods**

```java
@Service
public class HopDongService {
    
    // ===== THÊM MỚI: Duyệt hợp đồng =====
    @Transactional
    public HopDongDTO duyetHopDong(Integer hopDongId, Integer nguoiDuyetId, 
                                    boolean approve, String lyDo) {
        HopDongDongSoHuu hopDong = hopDongRepository.findById(hopDongId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hợp đồng"));
        
        if (hopDong.getTrangThai() != TrangThaiHopDong.ChoDuyet) {
            throw new RuntimeException("Hợp đồng không ở trạng thái chờ duyệt");
        }
        
        hopDong.setNguoiDuyet(nguoiDuyetId);
        hopDong.setNgayDuyet(LocalDateTime.now());
        
        if (approve) {
            hopDong.setTrangThai(TrangThaiHopDong.DaDuyet);
        } else {
            hopDong.setTrangThai(TrangThaiHopDong.TuChoi);
            hopDong.setLyDoTuChoi(lyDo);
        }
        
        hopDong = hopDongRepository.save(hopDong);
        return convertToDTO(hopDong);
    }
    
    // ===== THÊM MỚI: Kích hoạt hợp đồng =====
    @Transactional
    public HopDongDTO kichHoatHopDong(Integer hopDongId) {
        HopDongDongSoHuu hopDong = hopDongRepository.findById(hopDongId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hợp đồng"));
        
        if (hopDong.getTrangThai() != TrangThaiHopDong.DaDuyet) {
            throw new RuntimeException("Hợp đồng chưa được duyệt");
        }
        
        hopDong.setTrangThai(TrangThaiHopDong.DangHieuLuc);
        hopDong = hopDongRepository.save(hopDong);
        return convertToDTO(hopDong);
    }
    
    // ===== THÊM MỚI: Kết thúc hợp đồng =====
    @Transactional
    public HopDongDTO ketThucHopDong(Integer hopDongId) {
        HopDongDongSoHuu hopDong = hopDongRepository.findById(hopDongId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hợp đồng"));
        
        if (hopDong.getTrangThai() != TrangThaiHopDong.DangHieuLuc) {
            throw new RuntimeException("Hợp đồng không đang hiệu lực");
        }
        
        hopDong.setTrangThai(TrangThaiHopDong.HetHan);
        hopDong = hopDongRepository.save(hopDong);
        return convertToDTO(hopDong);
    }
    
    // ===== THÊM MỚI: Danh sách chờ duyệt =====
    @Transactional(readOnly = true)
    public List<HopDongDTO> getDanhSachChoDuyet() {
        return hopDongRepository.findByTrangThai(TrangThaiHopDong.ChoDuyet)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    // ===== THÊM MỚI: Auto-expire contracts (scheduled task) =====
    @Scheduled(cron = "0 0 0 * * ?") // Chạy mỗi ngày lúc 00:00
    public void autoExpireContracts() {
        List<HopDongDongSoHuu> expiredContracts = 
            hopDongRepository.findExpiredContracts(LocalDateTime.now());
        
        expiredContracts.forEach(hd -> {
            hd.setTrangThai(TrangThaiHopDong.HetHan);
            hopDongRepository.save(hd);
        });
    }
}
```

#### **E. Thêm Controller endpoints**

```java
@RestController
@RequestMapping("/api/hop-dong")
public class HopDongController {
    
    // ===== THÊM MỚI: Danh sách chờ duyệt =====
    @GetMapping("/cho-duyet")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<List<HopDongDTO>> getDanhSachChoDuyet() {
        try {
            List<HopDongDTO> dtos = hopDongService.getDanhSachChoDuyet();
            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // ===== THÊM MỚI: Duyệt hợp đồng =====
    @PostMapping("/{id}/duyet")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<HopDongDTO> duyetHopDong(
            @PathVariable Integer id,
            @RequestParam Integer nguoiDuyetId,
            @RequestParam boolean approve,
            @RequestParam(required = false) String lyDo) {
        try {
            HopDongDTO dto = hopDongService.duyetHopDong(id, nguoiDuyetId, approve, lyDo);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // ===== THÊM MỚI: Kích hoạt =====
    @PostMapping("/{id}/kich-hoat")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<HopDongDTO> kichHoatHopDong(@PathVariable Integer id) {
        try {
            HopDongDTO dto = hopDongService.kichHoatHopDong(id);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // ===== THÊM MỚI: Kết thúc =====
    @PostMapping("/{id}/ket-thuc")
    @PreAuthorize("hasAnyRole('Admin', 'CoOwner')")
    public ResponseEntity<HopDongDTO> ketThucHopDong(@PathVariable Integer id) {
        try {
            HopDongDTO dto = hopDongService.ketThucHopDong(id);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
```

#### **F. Cập nhật DTO**

```java
@Data
@Builder
public class HopDongDTO {
    private Integer hopDongId;
    private Integer xeId;
    private Integer chuXeId;
    private LocalDateTime ngayBatDau;
    private LocalDateTime ngayKetThuc;
    
    // ===== THÊM MỚI =====
    private String trangThai;        // ChoDuyet, DaDuyet, TuChoi, DangHieuLuc, HetHan
    private Integer nguoiDuyet;      // ID admin duyệt
    private LocalDateTime ngayDuyet; // Ngày duyệt
    private String lyDoTuChoi;       // Lý do nếu từ chối
}
```

---

### **GIẢI PHÁP 2: Xác Thực Giấy Tờ (Upload ảnh + Workflow)**

#### **A. Tạo bảng mới `giay_to_chu_xe`**

**Lý do tách bảng riêng:**
- Không làm phình to bảng `ChuXe`
- Có thể lưu nhiều phiên bản (upload lại nếu bị từ chối)
- Tách biệt dữ liệu nhạy cảm

```sql
CREATE TABLE giay_to_chu_xe (
    giay_to_id INT PRIMARY KEY IDENTITY(1,1),
    chu_xe_id INT NOT NULL,
    
    -- Hình ảnh (lưu đường dẫn hoặc Base64)
    cccd_mat_truoc NVARCHAR(MAX),  -- URL hoặc Base64
    cccd_mat_sau NVARCHAR(MAX),
    gplx_image NVARCHAR(MAX),
    
    -- Workflow
    trang_thai VARCHAR(20) DEFAULT 'ChuaXacThuc' CHECK (trang_thai IN 
        ('ChuaXacThuc', 'DangChoDuyet', 'DaXacThuc', 'TuChoi')),
    
    -- Audit
    nguoi_duyet INT NULL,
    ngay_duyet DATETIME NULL,
    ly_do_tu_choi NVARCHAR(500),
    ngay_upload DATETIME DEFAULT GETDATE(),
    
    CONSTRAINT FK_giay_to_chu_xe FOREIGN KEY (chu_xe_id) 
        REFERENCES chu_xe(chu_xe_id) ON DELETE CASCADE
);

CREATE INDEX IX_giay_to_chu_xe_id ON giay_to_chu_xe(chu_xe_id);
CREATE INDEX IX_giay_to_trang_thai ON giay_to_chu_xe(trang_thai);
```

#### **B. Tạo Entity `GiayToChuXe.java`**

```java
@Entity
@Table(name = "giay_to_chu_xe")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GiayToChuXe {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "giay_to_id")
    private Integer giayToId;
    
    @Column(name = "chu_xe_id", nullable = false)
    private Integer chuXeId;
    
    // Hình ảnh (Base64 hoặc URL)
    @Lob
    @Column(name = "cccd_mat_truoc", columnDefinition = "NVARCHAR(MAX)")
    private String cccdMatTruoc;
    
    @Lob
    @Column(name = "cccd_mat_sau", columnDefinition = "NVARCHAR(MAX)")
    private String cccdMatSau;
    
    @Lob
    @Column(name = "gplx_image", columnDefinition = "NVARCHAR(MAX)")
    private String gplxImage;
    
    // Workflow
    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai", nullable = false)
    @Builder.Default
    private TrangThaiXacThuc trangThai = TrangThaiXacThuc.ChuaXacThuc;
    
    @Column(name = "nguoi_duyet")
    private Integer nguoiDuyet;
    
    @Column(name = "ngay_duyet")
    private LocalDateTime ngayDuyet;
    
    @Column(name = "ly_do_tu_choi", length = 500)
    private String lyDoTuChoi;
    
    @Column(name = "ngay_upload", nullable = false)
    @Builder.Default
    private LocalDateTime ngayUpload = LocalDateTime.now();
    
    public enum TrangThaiXacThuc {
        ChuaXacThuc,    // Chưa upload
        DangChoDuyet,   // Đã upload, chờ admin duyệt
        DaXacThuc,      // Admin đã xác thực
        TuChoi          // Admin từ chối
    }
}
```

#### **C. Repository + Service**

```java
public interface GiayToChuXeRepository extends JpaRepository<GiayToChuXe, Integer> {
    
    Optional<GiayToChuXe> findByChuXeId(Integer chuXeId);
    
    List<GiayToChuXe> findByTrangThai(GiayToChuXe.TrangThaiXacThuc trangThai);
}

@Service
public class GiayToService {
    
    // Upload giấy tờ
    @Transactional
    public GiayToDTO uploadGiayTo(Integer chuXeId, UploadGiayToRequest request) {
        // Kiểm tra chủ xe tồn tại
        chuXeRepository.findById(chuXeId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy chủ xe"));
        
        // Xóa bản cũ nếu có
        giayToRepository.findByChuXeId(chuXeId)
                .ifPresent(giayToRepository::delete);
        
        // Tạo mới
        GiayToChuXe giayTo = GiayToChuXe.builder()
                .chuXeId(chuXeId)
                .cccdMatTruoc(request.getCccdMatTruoc())
                .cccdMatSau(request.getCccdMatSau())
                .gplxImage(request.getGplxImage())
                .trangThai(TrangThaiXacThuc.DangChoDuyet)
                .build();
        
        giayTo = giayToRepository.save(giayTo);
        return convertToDTO(giayTo);
    }
    
    // Duyệt giấy tờ
    @Transactional
    public GiayToDTO duyetGiayTo(Integer giayToId, Integer nguoiDuyetId, 
                                   boolean approve, String lyDo) {
        GiayToChuXe giayTo = giayToRepository.findById(giayToId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giấy tờ"));
        
        if (giayTo.getTrangThai() != TrangThaiXacThuc.DangChoDuyet) {
            throw new RuntimeException("Giấy tờ không ở trạng thái chờ duyệt");
        }
        
        giayTo.setNguoiDuyet(nguoiDuyetId);
        giayTo.setNgayDuyet(LocalDateTime.now());
        
        if (approve) {
            giayTo.setTrangThai(TrangThaiXacThuc.DaXacThuc);
        } else {
            giayTo.setTrangThai(TrangThaiXacThuc.TuChoi);
            giayTo.setLyDoTuChoi(lyDo);
        }
        
        giayTo = giayToRepository.save(giayTo);
        return convertToDTO(giayTo);
    }
    
    // Danh sách chờ duyệt
    public List<GiayToDTO> getDanhSachChoDuyet() {
        return giayToRepository.findByTrangThai(TrangThaiXacThuc.DangChoDuyet)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
}
```

#### **D. Controller**

```java
@RestController
@RequestMapping("/api/giay-to")
public class GiayToController {
    
    @PostMapping("/chu-xe/{chuXeId}")
    @PreAuthorize("hasAnyRole('CoOwner', 'Admin')")
    public ResponseEntity<GiayToDTO> uploadGiayTo(
            @PathVariable Integer chuXeId,
            @Valid @RequestBody UploadGiayToRequest request) {
        try {
            GiayToDTO dto = giayToService.uploadGiayTo(chuXeId, request);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/chu-xe/{chuXeId}")
    @PreAuthorize("hasAnyRole('CoOwner', 'Admin')")
    public ResponseEntity<GiayToDTO> getGiayTo(@PathVariable Integer chuXeId) {
        try {
            GiayToDTO dto = giayToService.getGiayToByChuXe(chuXeId);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/cho-duyet")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<List<GiayToDTO>> getDanhSachChoDuyet() {
        try {
            List<GiayToDTO> dtos = giayToService.getDanhSachChoDuyet();
            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/{id}/duyet")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<GiayToDTO> duyetGiayTo(
            @PathVariable Integer id,
            @RequestParam Integer nguoiDuyetId,
            @RequestParam boolean approve,
            @RequestParam(required = false) String lyDo) {
        try {
            GiayToDTO dto = giayToService.duyetGiayTo(id, nguoiDuyetId, approve, lyDo);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
```

#### **E. DTOs**

```java
@Data
public class UploadGiayToRequest {
    @NotBlank(message = "Ảnh CCCD mặt trước không được trống")
    private String cccdMatTruoc;  // Base64 image
    
    @NotBlank(message = "Ảnh CCCD mặt sau không được trống")
    private String cccdMatSau;    // Base64 image
    
    private String gplxImage;     // Base64 image (optional)
}

@Data
@Builder
public class GiayToDTO {
    private Integer giayToId;
    private Integer chuXeId;
    private String cccdMatTruoc;
    private String cccdMatSau;
    private String gplxImage;
    private String trangThai;
    private Integer nguoiDuyet;
    private LocalDateTime ngayDuyet;
    private String lyDoTuChoi;
    private LocalDateTime ngayUpload;
}
```

---

## 📊 SO SÁNH TRƯỚC/SAU

### **Trước khi thêm (Schema đơn giản):**

| Bảng | Fields | Chức năng |
|------|--------|-----------|
| hop_dong_dong_so_huu | 5 | Chỉ lưu thông tin cơ bản |
| N/A | 0 | Không có quản lý giấy tờ |

**Endpoints:** 10 endpoints  
**Chức năng thiếu:** Duyệt HĐ, Kết thúc HĐ, Xác thực giấy tờ

---

### **Sau khi thêm (Schema hoàn thiện):**

| Bảng | Fields | Chức năng |
|------|--------|-----------|
| hop_dong_dong_so_huu | **9** (+4) | Workflow đầy đủ |
| giay_to_chu_xe | **10** (MỚI) | Quản lý giấy tờ + workflow |

**Endpoints:** **17 endpoints** (+7)  
**Chức năng đầy đủ:** ✅ Tất cả yêu cầu

---

## 🎯 ROADMAP IMPLEMENT

### **PHASE 1: Contract Workflow (2-3 giờ)**

**Bước 1:** Cập nhật Database
```sql
-- File: Doc/migration_001_contract_workflow.sql
ALTER TABLE hop_dong_dong_so_huu 
ADD trang_thai VARCHAR(20) DEFAULT 'ChoDuyet',
ADD nguoi_duyet INT NULL,
ADD ngay_duyet DATETIME NULL,
ADD ly_do_tu_choi NVARCHAR(500) NULL;
```

**Bước 2:** Update Entity `HopDongDongSoHuu.java`
- Thêm 4 fields + enum

**Bước 3:** Update Repository
- Thêm `findByTrangThai()`, `findExpiredContracts()`

**Bước 4:** Update Service
- Thêm 4 methods: duyệt, kích hoạt, kết thúc, danh sách chờ

**Bước 5:** Update Controller
- Thêm 4 endpoints

**Bước 6:** Update DTOs
- Thêm fields vào `HopDongDTO`

**Bước 7:** Test
```bash
mvnw clean compile
mvnw test
```

---

### **PHASE 2: Document Verification (3-4 giờ)**

**Bước 1:** Tạo Database Table
```sql
-- File: Doc/migration_002_document_verification.sql
CREATE TABLE giay_to_chu_xe (...);
```

**Bước 2:** Create Entity
- File: `GiayToChuXe.java`

**Bước 3:** Create Repository
- File: `GiayToChuXeRepository.java`

**Bước 4:** Create Service
- File: `GiayToService.java`

**Bước 5:** Create Controller
- File: `GiayToController.java`

**Bước 6:** Create DTOs
- Files: `UploadGiayToRequest.java`, `GiayToDTO.java`

**Bước 7:** Test
```bash
mvnw clean compile
mvnw test
```

---

## ✅ KẾT QUẢ SAU KHI HOÀN THÀNH

### **Database:**
- 5 bảng (thay vì 4)
- 44 fields (thay vì 25)
- Vẫn giữ tính đơn giản, nhưng đầy đủ chức năng

### **API Endpoints:**
- **17 endpoints** (tăng từ 10)
- ✅ Authentication: 3 endpoints
- ✅ User: 2 endpoints
- ✅ ChuXe: 5 endpoints
- ✅ HopDong: **7 endpoints** (+3)
- ✅ GiayTo: **4 endpoints** (MỚI)

### **Chức năng:**
- ✅ **100% yêu cầu đáp ứng**
- ✅ Duyệt hợp đồng (workflow đầy đủ)
- ✅ Kết thúc hợp đồng (manual + auto)
- ✅ Xác thực giấy tờ (upload + duyệt)

---

## 💡 LƯU Ý KỸ THUẬT

### **1. Lưu trữ ảnh:**

**Option A: Base64 trong DB** (Đơn giản - recommend cho MVP)
```
Ưu: Không cần file server, dễ implement
Nhược: DB size lớn, hiệu năng thấp nếu ảnh nhiều
```

**Option B: File System + URL trong DB** (Production)
```
Ưu: Hiệu năng cao, DB nhẹ
Nhược: Cần config file storage, phức tạp hơn
```

**Option C: Cloud Storage (S3, Azure Blob)** (Scalable)
```
Ưu: Scalable, CDN, backup tự động
Nhược: Phí dịch vụ, phụ thuộc cloud
```

**Recommend:** Base64 cho MVP, sau chuyển sang Cloud Storage

---

### **2. Auto-expire contracts:**

Thêm vào `FinalApplication.java`:
```java
@EnableScheduling
public class FinalApplication {
    // ...
}
```

Scheduled task sẽ tự động chạy mỗi ngày để cập nhật trạng thái hợp đồng hết hạn.

---

### **3. Validation ảnh:**

```java
// Trong Service:
private void validateImage(String base64Image) {
    if (base64Image == null || base64Image.isEmpty()) {
        throw new RuntimeException("Ảnh không được trống");
    }
    
    // Kiểm tra size (max 5MB)
    int size = (base64Image.length() * 3) / 4; // Estimate byte size
    if (size > 5 * 1024 * 1024) {
        throw new RuntimeException("Ảnh không được vượt quá 5MB");
    }
    
    // Kiểm tra format (JPG, PNG)
    if (!base64Image.startsWith("data:image/")) {
        throw new RuntimeException("Định dạng ảnh không hợp lệ");
    }
}
```

---

## 📝 SUMMARY

**Giải pháp này:**
- ✅ Bổ sung đầy đủ 3 chức năng thiếu
- ✅ Không phá vỡ code hiện tại
- ✅ Giữ nguyên tính đơn giản của schema
- ✅ Tách biệt concerns (documents riêng bảng)
- ✅ Workflow rõ ràng, dễ maintain
- ✅ Có thể implement từng phase

**Thời gian implement:** 5-7 giờ  
**Complexity:** Medium  
**Risk:** Low (backward compatible)

---

**Prepared by:** GitHub Copilot  
**Date:** 26/10/2025  
**Status:** Ready to implement
