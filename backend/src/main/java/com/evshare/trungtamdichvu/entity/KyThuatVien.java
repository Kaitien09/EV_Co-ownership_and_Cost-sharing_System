package com.evshare.trungtamdichvu.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "KyThuatVien")
@Data
public class KyThuatVien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer kyThuatVienId;

    @ManyToOne
    @JoinColumn(name = "trungTamId", nullable = false)
    private TrungTamDichVu trungTam;

    @Column(nullable = false, length = 100)
    private String hoTen;

    private String chungChi;
    private String chuyenMon;
    private String soDienThoai;
    private String email;
    private Integer kinhNghiem; // số năm kinh nghiệm
    private Boolean dangLamViec = true;

    @OneToMany(mappedBy = "kyThuatVien")
    private java.util.List<PhieuDichVu> phieuDichVus;
}