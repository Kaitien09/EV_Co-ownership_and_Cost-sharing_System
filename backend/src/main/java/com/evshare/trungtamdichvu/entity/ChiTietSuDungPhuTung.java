package com.evshare.trungtamdichvu.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "chi_tiet_su_dung_phu_tung")
@Data
public class ChiTietSuDungPhuTung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer soLuong;
    private Double donGia;
    private Double thanhTien;

    @ManyToOne
    @JoinColumn(name = "phieu_dich_vu_id")
    private PhieuDichVu phieuDichVu;

    @ManyToOne
    @JoinColumn(name = "phu_tung_id")
    private PhuTung phuTung;

    public ChiTietSuDungPhuTung() {}

    public ChiTietSuDungPhuTung(PhieuDichVu phieuDichVu, PhuTung phuTung, Integer soLuong) {
        this.phieuDichVu = phieuDichVu;
        this.phuTung = phuTung;
        this.soLuong = soLuong;
        this.donGia = phuTung.getGiaBan();
        this.thanhTien = soLuong * donGia;
    }
}