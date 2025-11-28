package com.evshare.taichinh.entity;

import com.evshare.nguoidung.entity.ChuXe;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "ThanhToan")
@Data
public class ThanhToan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer thanhToanId;

    @ManyToOne
    @JoinColumn(name = "chuXeId", nullable = false)
    @JsonIgnoreProperties({"thanhVienNhoms", "datLichs", "lichHenDichVus", "chiaChiPhis", "thanhToans", "phieuBaus"})
    private ChuXe chuXe;

    @ManyToOne
    @JoinColumn(name = "chiaChiPhiId", nullable = false)
    @JsonIgnoreProperties({"thanhToans", "chiPhi", "chuXe"}) // QUAN TRỌNG
    private ChiaChiPhi chiaChiPhi;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PhuongThucThanhToan phuongThuc;

    @Column(nullable = false)
    private Double soTienThanhToan;

    private LocalDateTime ngayThanhToan;

    @Enumerated(EnumType.STRING)
    private TrangThaiThanhToan trangThai = TrangThaiThanhToan.CHO_THANH_TOAN;

    private String maGiaoDich;
    private String ghiChu;

    @PrePersist
    public void prePersist() {
        if (ngayThanhToan == null && trangThai == TrangThaiThanhToan.DA_THANH_TOAN) {
            ngayThanhToan = LocalDateTime.now();
        }
    }
}