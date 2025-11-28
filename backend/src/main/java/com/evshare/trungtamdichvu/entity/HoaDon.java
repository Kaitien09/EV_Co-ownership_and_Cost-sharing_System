package com.evshare.trungtamdichvu.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "HoaDon")
@Data
public class HoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer hoaDonId;

    @OneToOne
    @JoinColumn(name = "phieuId", nullable = false, unique = true)
    @JsonIgnoreProperties({"hoaDon", "lichHen", "kyThuatVien", "chiTietSuDungPhuTung"}) // QUAN TRỌNG
    private PhieuDichVu phieuDichVu;

    private String maHoaDon;
    private LocalDateTime ngayLap = LocalDateTime.now();

    private Double tienDichVu;
    private Double tienPhuTung;
    private Double thueVAT;
    private Double tongTien;

    private String phuongThucThanhToan;
    private String trangThaiThanhToan = "ChuaThanhToan";
    private String ghiChu;

    @PrePersist
    public void prePersist() {
        if (tienDichVu == null) tienDichVu = 0.0;
        if (tienPhuTung == null) tienPhuTung = 0.0;
        if (thueVAT == null) thueVAT = 0.0;

        tongTien = tienDichVu + tienPhuTung + thueVAT;

        if (maHoaDon == null) {
            maHoaDon = "HD" + System.currentTimeMillis();
        }
    }
}