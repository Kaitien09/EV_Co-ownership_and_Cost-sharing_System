package com.evshare.trungtamdichvu.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "phu_tung")
@Data
public class PhuTung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String maPhuTung;

    private String tenPhuTung;
    private String moTa;
    private Double giaNhap;
    private Double giaBan;
    private Integer soLuongTon;

    @Enumerated(EnumType.STRING)
    private TrangThaiPhuTung trangThai;

    // Constructor
    public PhuTung() {}

    public PhuTung(String maPhuTung, String tenPhuTung, String moTa, Double giaNhap, Double giaBan, Integer soLuongTon) {
        this.maPhuTung = maPhuTung;
        this.tenPhuTung = tenPhuTung;
        this.moTa = moTa;
        this.giaNhap = giaNhap;
        this.giaBan = giaBan;
        this.soLuongTon = soLuongTon;
        this.trangThai = TrangThaiPhuTung.CON_HANG;
    }
}

enum TrangThaiPhuTung {
    CON_HANG, HET_HANG, NGUNG_KINH_DOANH
}