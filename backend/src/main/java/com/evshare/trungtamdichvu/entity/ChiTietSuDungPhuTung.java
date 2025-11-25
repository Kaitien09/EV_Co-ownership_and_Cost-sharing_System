package com.evshare.trungtamdichvu.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "ChiTietSuDungPhuTung")
@Data
public class ChiTietSuDungPhuTung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer chiTietId;

    @ManyToOne
    @JoinColumn(name = "phieuId", nullable = false)
    private PhieuDichVu phieuDichVu;

    @ManyToOne
    @JoinColumn(name = "phuTungId", nullable = false)
    private PhuTung phuTung;

    @Column(nullable = false)
    private Integer soLuong;

    @Column(nullable = false)
    private Double donGia;

    private String ghiChu;

    // Tính thành tiền
    public Double getThanhTien() {
        return soLuong * donGia;
    }
}