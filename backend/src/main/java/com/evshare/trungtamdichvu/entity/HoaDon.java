package com.evshare.trungtamdichvu.entity;

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
        // Tự động tính tổng tiền
        if (tienDichVu == null) tienDichVu = 0.0;
        if (tienPhuTung == null) tienPhuTung = 0.0;
        if (thueVAT == null) thueVAT = 0.0;

        tongTien = tienDichVu + tienPhuTung + thueVAT;

        // Tạo mã hóa đơn nếu chưa có
        if (maHoaDon == null) {
            maHoaDon = "HD" + System.currentTimeMillis();
        }
    }
}