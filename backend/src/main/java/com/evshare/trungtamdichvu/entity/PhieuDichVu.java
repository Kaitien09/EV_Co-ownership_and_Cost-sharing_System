package com.evshare.trungtamdichvu.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "PhieuDichVu")
@Data
public class PhieuDichVu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer phieuId;

    @OneToOne
    @JoinColumn(name = "lichHenId", nullable = false, unique = true)
    private LichHenDichVu lichHen;

    @ManyToOne
    @JoinColumn(name = "kyThuatVienId")
    private KyThuatVien kyThuatVien;

    @Enumerated(EnumType.STRING)
    private TrangThaiPhieuDichVu trangThai = TrangThaiPhieuDichVu.MOI_TAO;

    @Column(columnDefinition = "JSON")
    private String danhSachKiemTra; // JSON checklist

    private String ketQuaKiemTra;
    private String khacPhuc;
    private String ghiChuKyThuat;
    private LocalDateTime ngayTiepNhan;
    private LocalDateTime ngayBatDau;
    private LocalDateTime ngayHoanThanh;

    @OneToMany(mappedBy = "phieuDichVu", cascade = CascadeType.ALL)
    private List<ChiTietSuDungPhuTung> chiTietSuDungPhuTung = new ArrayList<>();

    @OneToOne(mappedBy = "phieuDichVu", cascade = CascadeType.ALL)
    private HoaDon hoaDon;

    @PrePersist
    public void prePersist() {
        if (ngayTiepNhan == null) {
            ngayTiepNhan = LocalDateTime.now();
        }
    }
}