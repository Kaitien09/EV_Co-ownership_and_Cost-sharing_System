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
}