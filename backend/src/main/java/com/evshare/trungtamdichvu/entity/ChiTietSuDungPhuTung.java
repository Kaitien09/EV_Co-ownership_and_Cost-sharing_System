package com.evshare.trungtamdichvu.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    @JsonIgnoreProperties({"chiTietSuDungPhuTung", "hoaDon", "lichHen", "kyThuatVien"}) // QUAN TRỌNG
    private PhieuDichVu phieuDichVu;

    @ManyToOne
    @JoinColumn(name = "phuTungId", nullable = false)
    @JsonIgnoreProperties({"chiTietSuDung"}) // QUAN TRỌNG
    private PhuTung phuTung;

    @Column(nullable = false)
    private Integer soLuong;

    @Column(nullable = false)
    private Double donGia;

    private String ghiChu;

    public Double getThanhTien() {
        return soLuong * donGia;
    }
}