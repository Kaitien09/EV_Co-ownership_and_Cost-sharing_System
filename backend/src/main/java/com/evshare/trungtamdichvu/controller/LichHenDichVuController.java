package com.evshare.trungtamdichvu.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "lich_hen_dich_vu")
@Data
public class LichHenDichVu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String maLichHen;
    private String tenKhachHang;
    private String soDienThoai;
    private String bienSoXe;
    private String loaiXe;

    @Enumerated(EnumType.STRING)
    private LoaiDichVu loaiDichVu;

    @Enumerated(EnumType.STRING)
    private TrangThaiLichHen trangThai;

    private LocalDateTime thoiGianHen;
    private String moTaTinhTrang;
    private String ghiChu;
    private LocalDateTime ngayTao;

    @ManyToOne
    @JoinColumn(name = "ky_thuat_vien_id")
    private KyThuatVien kyThuatVien;

    @ManyToOne
    @JoinColumn(name = "trung_tam_id")
    private TrungTamDichVu trungTam;

    public LichHenDichVu() {
        this.ngayTao = LocalDateTime.now();
    }

    public LichHenDichVu(String tenKhachHang, String soDienThoai, String bienSoXe, LoaiDichVu loaiDichVu) {
        this.maLichHen = "LH" + System.currentTimeMillis();
        this.tenKhachHang = tenKhachHang;
        this.soDienThoai = soDienThoai;
        this.bienSoXe = bienSoXe;
        this.loaiDichVu = loaiDichVu;
        this.trangThai = TrangThaiLichHen.CHO_XAC_NHAN;
        this.ngayTao = LocalDateTime.now();
    }
}

enum LoaiDichVu {
    BAO_DUONG, SUA_CHUA, KIEM_TRA
}

enum TrangThaiLichHen {
    CHO_XAC_NHAN, DA_XAC_NHAN, DANG_THUC_HIEN, HOAN_THANH, HUY
}package com.evshare.trungtamdichvu.controller;

import com.evshare.trungtamdichvu.entity.LichHenDichVu;
import com.evshare.trungtamdichvu.entity.TrangThaiLichHen;
import com.evshare.trungtamdichvu.service.LichHenDichVuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
        import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/trung-tam-dich-vu/lich-hen")
@RequiredArgsConstructor
public class LichHenDichVuController {

    private final LichHenDichVuService lichHenDichVuService;

    @GetMapping
    public ResponseEntity<List<LichHenDichVu>> getAllLichHen() {
        return ResponseEntity.ok(lichHenDichVuService.getAllLichHen());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LichHenDichVu> getLichHenById(@PathVariable Long id) {
        return ResponseEntity.ok(lichHenDichVuService.getLichHenById(id));
    }

    @PostMapping
    public ResponseEntity<LichHenDichVu> createLichHen(@RequestBody LichHenDichVu lichHen) {
        return ResponseEntity.ok(lichHenDichVuService.createLichHen(lichHen));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LichHenDichVu> updateLichHen(@PathVariable Long id, @RequestBody LichHenDichVu lichHen) {
        return ResponseEntity.ok(lichHenDichVuService.updateLichHen(id, lichHen));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLichHen(@PathVariable Long id) {
        lichHenDichVuService.deleteLichHen(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/trang-thai")
    public ResponseEntity<LichHenDichVu> capNhatTrangThai(@PathVariable Long id, @RequestParam TrangThaiLichHen trangThai) {
        return ResponseEntity.ok(lichHenDichVuService.capNhatTrangThai(id, trangThai));
    }

    @GetMapping("/trang-thai/{trangThai}")
    public ResponseEntity<List<LichHenDichVu>> getLichHenTheoTrangThai(@PathVariable TrangThaiLichHen trangThai) {
        return ResponseEntity.ok(lichHenDichVuService.getLichHenTheoTrangThai(trangThai));
    }

    @GetMapping("/thoi-gian")
    public ResponseEntity<List<LichHenDichVu>> getLichHenTheoThoiGian(
            @RequestParam LocalDateTime start,
            @RequestParam LocalDateTime end) {
        return ResponseEntity.ok(lichHenDichVuService.getLichHenTheoThoiGian(start, end));
    }

    @GetMapping("/bien-so/{bienSoXe}")
    public ResponseEntity<List<LichHenDichVu>> getLichHenTheoBienSo(@PathVariable String bienSoXe) {
        return ResponseEntity.ok(lichHenDichVuService.getLichHenTheoBienSo(bienSoXe));
    }

    @GetMapping("/ky-thuat-vien/{kyThuatVienId}")
    public ResponseEntity<List<LichHenDichVu>> getLichHenTheoKyThuatVien(@PathVariable Long kyThuatVienId) {
        return ResponseEntity.ok(lichHenDichVuService.getLichHenTheoKyThuatVien(kyThuatVienId));
    }

    @GetMapping("/trung-tam/{trungTamId}")
    public ResponseEntity<List<LichHenDichVu>> getLichHenTheoTrungTam(@PathVariable Long trungTamId) {
        return ResponseEntity.ok(lichHenDichVuService.getLichHenTheoTrungTam(trungTamId));
    }
}