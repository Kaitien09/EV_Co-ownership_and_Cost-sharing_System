package com.evshare.trungtamdichvu.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    @JsonIgnoreProperties({"kyThuatViens", "lichHenDichVus"})
    private TrungTamDichVu trungTam;

    @Column(nullable = false, length = 100)
    private String hoTen;

    private String chungChi;
    private String chuyenMon;
    private String soDienThoai;
    private String email;
    private Integer kinhNghiem;
    private Boolean dangLamViec = true;

    @OneToMany(mappedBy = "kyThuatVien")
    @JsonIgnore // QUAN TRỌNG
    private java.util.List<PhieuDichVu> phieuDichVus;
}