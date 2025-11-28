package com.evshare.nhom.entity;

import com.evshare.nguoidung.entity.ChuXe;
import com.evshare.xedien.entity.XeDien;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "ThanhVienNhom")
@Data
public class ThanhVienNhom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer thanhVienNhomId;

    @ManyToOne
    @JoinColumn(name = "chuXeId", nullable = false)
    @JsonIgnoreProperties({"thanhVienNhoms", "datLichs", "lichHenDichVus", "chiaChiPhis", "thanhToans", "phieuBaus"})
    private ChuXe chuXe;

    @ManyToOne
    @JoinColumn(name = "nhomId", nullable = false)
    @JsonBackReference
    private NhomDongSoHuu nhom;

    @ManyToOne
    @JoinColumn(name = "xeId", nullable = false)
    @JsonIgnoreProperties({"thanhVienSoHuu", "danhSachDatLich", "lichSuSuDung"})
    private XeDien xe;

    @Column(nullable = false)
    private Double tyLeSoHuu;

    @Enumerated(EnumType.STRING)
    private VaiTro vaiTro = VaiTro.THANH_VIEN;

    private LocalDateTime ngayThamGia = LocalDateTime.now();
}