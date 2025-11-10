package com.evshare.trungtamdichvu.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "ky_thuat_vien")
@Data
public class KyThuatVien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String maKyThuatVien;

    private String hoTen;
    private String chuyenMon;
    private String soDienThoai;
    private String email;
    private Integer kinhNghiem; // Số năm kinh nghiệm

    @Enumerated(EnumType.STRING)
    private TrangThaiKyThuatVien trangThai;

    @ManyToOne
    @JoinColumn(name = "trung_tam_id")
    private TrungTamDichVu trungTam;

    public KyThuatVien() {}

    public KyThuatVien(String maKyThuatVien, String hoTen, String chuyenMon, String soDienThoai) {
        this.maKyThuatVien = maKyThuatVien;
        this.hoTen = hoTen;
        this.chuyenMon = chuyenMon;
        this.soDienThoai = soDienThoai;
        this.trangThai = TrangThaiKyThuatVien.SAN_SANG;
    }
}

enum TrangThaiKyThuatVien {
    SAN_SANG, DANG_BAN, NGHI_PHEP
}