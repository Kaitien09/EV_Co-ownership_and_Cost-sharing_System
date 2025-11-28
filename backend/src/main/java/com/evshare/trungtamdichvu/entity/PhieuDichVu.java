package com.evshare.trungtamdichvu.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    @JsonIgnoreProperties({"phieuDichVu", "xe", "chuXe", "trungTam"}) // QUAN TRỌNG
    private LichHenDichVu lichHen;

    @ManyToOne
    @JoinColumn(name = "kyThuatVienId")
    @JsonIgnoreProperties({"phieuDichVus", "trungTam"})
    private KyThuatVien kyThuatVien;

    @Enumerated(EnumType.STRING)
    private TrangThaiPhieuDichVu trangThai = TrangThaiPhieuDichVu.MOI_TAO;

    @Column(columnDefinition = "JSON")
    private String danhSachKiemTra;

    private String ketQuaKiemTra;
    private String khacPhuc;
    private String ghiChuKyThuat;
    private LocalDateTime ngayTiepNhan;
    private LocalDateTime ngayBatDau;
    private LocalDateTime ngayHoanThanh;

    @OneToMany(mappedBy = "phieuDichVu", cascade = CascadeType.ALL)
    @JsonIgnore // QUAN TRỌNG
    private List<ChiTietSuDungPhuTung> chiTietSuDungPhuTung = new ArrayList<>();

    @OneToOne(mappedBy = "phieuDichVu", cascade = CascadeType.ALL)
    @JsonIgnore // QUAN TRỌNG
    private HoaDon hoaDon;

    @PrePersist
    public void prePersist() {
        if (ngayTiepNhan == null) {
            ngayTiepNhan = LocalDateTime.now();
        }
    }
}