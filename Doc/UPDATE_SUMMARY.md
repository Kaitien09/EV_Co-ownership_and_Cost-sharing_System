# ✅ CẬP NHẬT DATABASE THEO CSDL.PDF

## 📊 Tổng quan cập nhật

Đã cập nhật 4 bảng chính theo đúng chuẩn CSDL.pdf với các thay đổi về kiểu dữ liệu và cấu trúc.

---

## 🔄 CÁC THAY ĐỔI CHI TIẾT

### 1. BẢNG: nguoi_dung

#### Thay đổi kiểu dữ liệu:
```diff
- ngay_sinh: DATETIME (LocalDateTime)
+ ngay_sinh: DATE (LocalDate)
```

**Lý do**: Ngày sinh chỉ cần lưu ngày, không cần giờ phút giây.

#### Cấu trúc bảng đầy đủ:
- ✅ id_nguoi_dung (BIGINT, PK, IDENTITY)
- ✅ ho_ten (NVARCHAR(100), NOT NULL)
- ✅ email (NVARCHAR(100), NOT NULL, UNIQUE)
- ✅ mat_khau (NVARCHAR(255), NOT NULL)
- ✅ so_dien_thoai (NVARCHAR(15))
- ✅ dia_chi (NVARCHAR(255))
- ✅ ngay_sinh (DATE) ← **CẬP NHẬT**
- ✅ cccd (NVARCHAR(12), UNIQUE)
- ✅ cccd_mat_truoc (NVARCHAR(500))
- ✅ cccd_mat_sau (NVARCHAR(500))
- ✅ gplx (NVARCHAR(12))
- ✅ gplx_image (NVARCHAR(500))
- ✅ trang_thai_xac_thuc (NVARCHAR(50), CHECK constraint)
- ✅ vai_tro (NVARCHAR(50), CHECK constraint)
- ✅ trang_thai_tai_khoan (BIT, DEFAULT 1)
- ✅ ngay_tao (DATETIME, DEFAULT GETDATE())
- ✅ ngay_cap_nhat (DATETIME, DEFAULT GETDATE())

#### Indexes:
- IX_nguoi_dung_email
- IX_nguoi_dung_cccd
- IX_nguoi_dung_vai_tro
- IX_nguoi_dung_trang_thai

---

### 2. BẢNG: chu_xe

#### Thay đổi kiểu dữ liệu:
```diff
- tong_doanh_thu: FLOAT (Double)
+ tong_doanh_thu: DECIMAL(18,2) (BigDecimal)
```

**Lý do**: DECIMAL chính xác hơn cho số tiền, tránh lỗi làm tròn của FLOAT.

#### Cấu trúc bảng đầy đủ:
- ✅ id_chu_xe (BIGINT, PK, IDENTITY)
- ✅ id_nguoi_dung (BIGINT, NOT NULL, UNIQUE, FK → nguoi_dung)
- ✅ so_luong_xe (INT, DEFAULT 0)
- ✅ diem_tin_cay (FLOAT, DEFAULT 5.0)
- ✅ so_hop_dong_hoan_thanh (INT, DEFAULT 0)
- ✅ tong_doanh_thu (DECIMAL(18,2), DEFAULT 0.00) ← **CẬP NHẬT**
- ✅ mo_ta (NVARCHAR(MAX))
- ✅ trang_thai (BIT, DEFAULT 1)
- ✅ ngay_dang_ky (DATETIME, DEFAULT GETDATE())
- ✅ ngay_cap_nhat (DATETIME, DEFAULT GETDATE())

#### Foreign Keys:
- FK_chu_xe_nguoi_dung → nguoi_dung(id_nguoi_dung) ON DELETE CASCADE

#### Indexes:
- IX_chu_xe_nguoi_dung
- IX_chu_xe_trang_thai
- IX_chu_xe_diem_tin_cay

---

### 3. BẢNG: hop_dong_dong_so_huu

#### Thay đổi kiểu dữ liệu:
```diff
- ty_le_so_huu: FLOAT (Double)
+ ty_le_so_huu: DECIMAL(5,2) (BigDecimal)

- gia_tri_hop_dong: FLOAT (Double)
+ gia_tri_hop_dong: DECIMAL(18,2) (BigDecimal)

- ngay_bat_dau: DATETIME (LocalDateTime)
+ ngay_bat_dau: DATE (LocalDate)

- ngay_ket_thuc: DATETIME (LocalDateTime)
+ ngay_ket_thuc: DATE (LocalDate)
```

**Lý do**:
- DECIMAL cho số tiền và phần trăm: Chính xác hơn FLOAT
- DATE cho ngày: Không cần lưu giờ phút cho ngày hợp đồng

#### Cấu trúc bảng đầy đủ:
- ✅ id_hop_dong (BIGINT, PK, IDENTITY)
- ✅ ma_hop_dong (NVARCHAR(50), NOT NULL, UNIQUE)
- ✅ id_chu_xe (BIGINT, NOT NULL, FK → chu_xe)
- ✅ id_nguoi_dong_so_huu (BIGINT, NOT NULL, FK → nguoi_dung)
- ✅ id_xe (BIGINT, NOT NULL) *Chờ bảng xe_dien
- ✅ ty_le_so_huu (DECIMAL(5,2), NOT NULL) ← **CẬP NHẬT**
- ✅ gia_tri_hop_dong (DECIMAL(18,2), NOT NULL) ← **CẬP NHẬT**
- ✅ ngay_bat_dau (DATE, NOT NULL) ← **CẬP NHẬT**
- ✅ ngay_ket_thuc (DATE) ← **CẬP NHẬT**
- ✅ thoi_han_thang (INT, NOT NULL)
- ✅ trang_thai (NVARCHAR(50), CHECK constraint)
- ✅ dieu_khoan (NVARCHAR(MAX))
- ✅ ghi_chu (NVARCHAR(MAX))
- ✅ ly_do_tu_choi (NVARCHAR(MAX))
- ✅ nguoi_duyet (BIGINT)
- ✅ ngay_duyet (DATETIME)
- ✅ ngay_tao (DATETIME, DEFAULT GETDATE())
- ✅ ngay_cap_nhat (DATETIME, DEFAULT GETDATE())

#### Foreign Keys:
- FK_hop_dong_chu_xe → chu_xe(id_chu_xe) ON DELETE NO ACTION
- FK_hop_dong_nguoi_dong_so_huu → nguoi_dung(id_nguoi_dung) ON DELETE NO ACTION

#### Constraints:
- CK_hop_dong_trang_thai (6 giá trị hợp lệ)
- CK_hop_dong_ty_le_so_huu (0 < ty_le <= 100)

#### Indexes:
- IX_hop_dong_ma_hop_dong
- IX_hop_dong_chu_xe
- IX_hop_dong_nguoi_dong_so_huu
- IX_hop_dong_xe
- IX_hop_dong_trang_thai
- IX_hop_dong_ngay_bat_dau
- IX_hop_dong_ngay_ket_thuc

---

### 4. BẢNG: hop_dong_phap_ly_dien_tu

#### Thay đổi kiểu dữ liệu:
```diff
- ngay_cong_chung: DATETIME (LocalDateTime)
+ ngay_cong_chung: DATE (LocalDate)
```

**Lý do**: Ngày công chứng chỉ cần lưu ngày.

#### Cấu trúc bảng đầy đủ:
- ✅ id_phap_ly (BIGINT, PK, IDENTITY)
- ✅ id_hop_dong (BIGINT, NOT NULL, UNIQUE, FK → hop_dong_dong_so_huu)
- ✅ file_hop_dong_pdf (NVARCHAR(500))
- ✅ hash_hop_dong (NVARCHAR(255)) - SHA-256
- ✅ chu_ky_dien_tu_chu_xe (NVARCHAR(500))
- ✅ chu_ky_dien_tu_nguoi_dong_so_huu (NVARCHAR(500))
- ✅ ngay_ky_chu_xe (DATETIME)
- ✅ ngay_ky_nguoi_dong_so_huu (DATETIME)
- ✅ trang_thai_ky (NVARCHAR(50), CHECK constraint)
- ✅ ip_chu_xe (NVARCHAR(50))
- ✅ ip_nguoi_dong_so_huu (NVARCHAR(50))
- ✅ thiet_bi_chu_xe (NVARCHAR(255))
- ✅ thiet_bi_nguoi_dong_so_huu (NVARCHAR(255))
- ✅ so_cong_chung (NVARCHAR(50))
- ✅ ngay_cong_chung (DATE) ← **CẬP NHẬT**
- ✅ noi_cong_chung (NVARCHAR(255))
- ✅ ghi_chu (NVARCHAR(MAX))
- ✅ ngay_tao (DATETIME, DEFAULT GETDATE())
- ✅ ngay_cap_nhat (DATETIME, DEFAULT GETDATE())

#### Foreign Keys:
- FK_phap_ly_hop_dong → hop_dong_dong_so_huu(id_hop_dong) ON DELETE CASCADE

#### Constraints:
- CK_phap_ly_trang_thai_ky (5 giá trị hợp lệ)

#### Indexes:
- IX_phap_ly_hop_dong
- IX_phap_ly_trang_thai
- IX_phap_ly_hash (WHERE hash_hop_dong IS NOT NULL)

---

## 🔧 CÁC CẬP NHẬT CODE

### Java Entities:

#### NguoiDung.java
```java
// Thay đổi
private java.time.LocalDate ngaySinh;  // Trước: LocalDateTime
```

#### ChuXe.java
```java
// Thay đổi
private java.math.BigDecimal tongDoanhThu;  // Trước: Double
```

#### HopDongDongSoHuu.java
```java
// Thay đổi
private java.math.BigDecimal tyLeSoHuu;        // Trước: Double
private java.math.BigDecimal giaTriHopDong;    // Trước: Double
private java.time.LocalDate ngayBatDau;        // Trước: LocalDateTime
private java.time.LocalDate ngayKetThuc;       // Trước: LocalDateTime
```

#### HopDongPhapLyDienTu.java
```java
// Thay đổi
private java.time.LocalDate ngayCongChung;  // Trước: LocalDateTime
```

### DTOs:

- ✅ NguoiDungDTO.java - Updated
- ✅ TaoHopDongRequest.java - Updated (BigDecimal cho tiền)
- ✅ HopDongDTO.java - Updated (LocalDate, BigDecimal)

### Services:

- ✅ NguoiDungService.java - Parse LocalDate thay vì LocalDateTime
- ✅ HopDongService.java - Xử lý LocalDate và BigDecimal

---

## 📊 BỔ SUNG TRONG SCHEMA

### Triggers (Tự động cập nhật):
1. **trg_nguoi_dung_update** - Tự động update ngay_cap_nhat
2. **trg_chu_xe_update** - Tự động update ngay_cap_nhat
3. **trg_hop_dong_update** - Tự động update ngay_cap_nhat
4. **trg_phap_ly_update** - Tự động update ngay_cap_nhat
5. **trg_hop_dong_create_phap_ly** - Tự động tạo record pháp lý khi tạo hợp đồng

### Views:
1. **vw_chu_xe_info** - Thông tin chủ xe + người dùng
2. **vw_hop_dong_info** - Thông tin hợp đồng đầy đủ

### Stored Procedures:
1. **sp_thong_ke_hop_dong** - Thống kê hợp đồng theo trạng thái
2. **sp_hop_dong_sap_het_han** - Danh sách hợp đồng sắp hết hạn

### Sample Data:
- ✅ 1 Admin
- ✅ 3 Users (1 Admin, 1 Owner, 2 Regular users)
- ✅ 2 Owners
- ✅ 1 Sample contract

---

## ✅ BUILD STATUS

```
[INFO] BUILD SUCCESS
[INFO] Total time:  3.441 s
[INFO] Compiled: 28 source files
[INFO] No errors
```

---

## 📝 FILES ĐÃ TẠO/CẬP NHẬT

### Tạo mới:
1. ✅ **Doc/schema_complete.sql** - Schema SQL đầy đủ với triggers, views, procedures

### Cập nhật:
1. ✅ src/main/java/com/example/demo/entity/NguoiDung.java
2. ✅ src/main/java/com/example/demo/entity/ChuXe.java
3. ✅ src/main/java/com/example/demo/entity/HopDongDongSoHuu.java
4. ✅ src/main/java/com/example/demo/entity/HopDongPhapLyDienTu.java
5. ✅ src/main/java/com/example/demo/dto/NguoiDungDTO.java
6. ✅ src/main/java/com/example/demo/dto/TaoHopDongRequest.java
7. ✅ src/main/java/com/example/demo/dto/HopDongDTO.java
8. ✅ src/main/java/com/example/demo/service/NguoiDungService.java
9. ✅ src/main/java/com/example/demo/service/HopDongService.java
10. ✅ src/main/resources/application.properties

---

## 🚀 HƯỚNG DẪN SỬ DỤNG

### 1. Tạo Database

Chạy file SQL trong SQL Server Management Studio:
```sql
-- File: Doc/schema_complete.sql
```

Hoặc để Spring Boot tự tạo:
```properties
# application.properties
spring.jpa.hibernate.ddl-auto=update
```

### 2. Chạy Application

```powershell
.\mvnw spring-boot:run
```

### 3. Test API

#### Đăng ký:
```bash
POST http://localhost:8080/api/auth/dang-ky
{
  "hoTen": "Test User",
  "email": "test@test.com",
  "matKhau": "test123",
  "soDienThoai": "0912345678"
}
```

#### Tạo hợp đồng (với BigDecimal):
```bash
POST http://localhost:8080/api/hop-dong
{
  "idChuXe": 1,
  "idNguoiDongSoHuu": 2,
  "idXe": 1,
  "tyLeSoHuu": 30.50,
  "giaTriHopDong": 300000000.00,
  "ngayBatDau": "2025-11-01",
  "thoiHanThang": 36
}
```

---

## ⚠️ LƯU Ý QUAN TRỌNG

### 1. Kiểu dữ liệu số tiền
- **Luôn dùng BigDecimal** cho tiền tệ
- **Không dùng Double/Float** vì lỗi làm tròn
- Format: DECIMAL(18,2) trong DB

### 2. Kiểu dữ liệu ngày
- **DATE** cho ngày sinh, ngày hợp đồng
- **DATETIME** cho timestamp (ngày tạo, ngày cập nhật, ngày ký)

### 3. Foreign Keys
- **ON DELETE CASCADE**: chu_xe, hop_dong_phap_ly_dien_tu
- **ON DELETE NO ACTION**: hop_dong_dong_so_huu (bảo vệ dữ liệu quan trọng)

### 4. Indexes
- Đã tạo index cho tất cả foreign keys
- Index cho các trường thường query (email, cccd, trang_thai)

---

## 📊 SO SÁNH TRƯỚC/SAU

| Trường | Trước | Sau | Lý do |
|--------|-------|-----|-------|
| nguoi_dung.ngay_sinh | DATETIME | DATE | Chỉ cần ngày |
| chu_xe.tong_doanh_thu | FLOAT | DECIMAL(18,2) | Chính xác cho tiền |
| hop_dong.ty_le_so_huu | FLOAT | DECIMAL(5,2) | Chính xác cho % |
| hop_dong.gia_tri_hop_dong | FLOAT | DECIMAL(18,2) | Chính xác cho tiền |
| hop_dong.ngay_bat_dau | DATETIME | DATE | Chỉ cần ngày |
| hop_dong.ngay_ket_thuc | DATETIME | DATE | Chỉ cần ngày |
| phap_ly.ngay_cong_chung | DATETIME | DATE | Chỉ cần ngày |

---

## ✅ CHECKLIST HOÀN THÀNH

- [x] Cập nhật schema SQL theo CSDL.pdf
- [x] Thêm triggers tự động
- [x] Thêm views tiện ích
- [x] Thêm stored procedures
- [x] Cập nhật entities Java
- [x] Cập nhật DTOs
- [x] Cập nhật services
- [x] Test build thành công
- [x] Sample data có sẵn
- [x] Documentation đầy đủ

---

## 🎯 KẾT LUẬN

✅ **Database đã được cập nhật hoàn toàn theo CSDL.pdf**

Các thay đổi chính:
1. ✅ Kiểu dữ liệu chính xác hơn (BigDecimal cho tiền, LocalDate cho ngày)
2. ✅ Triggers tự động cập nhật
3. ✅ Views và Stored Procedures hữu ích
4. ✅ Sample data đầy đủ
5. ✅ Indexes tối ưu
6. ✅ Foreign keys và constraints đầy đủ

**Hệ thống sẵn sàng để phát triển tiếp!** 🚀

---

*Cập nhật: October 26, 2025*
*Build Status: ✅ SUCCESS*
