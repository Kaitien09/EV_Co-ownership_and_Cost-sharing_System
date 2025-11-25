package com.evshare.xedien.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "LichSuSuDung")
@Data
public class LichSuSuDung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer lichSuSuDungId;

    @OneToOne
    @JoinColumn(name = "datLichId", nullable = false, unique = true)
    private DatLich datLich;

    @ManyToOne
    @JoinColumn(name = "xeId", nullable = false)
    private XeDien xe;

    @Column(nullable = false)
    private LocalDateTime thoiGianNhanXe;

    private LocalDateTime thoiGianTraXe;

    private Integer quangDuong = 0; // km
    private Double nangLuongTieuThu = 0.0; // kWh
    private String diemXuatPhat;
    private String diemDen;
    private String ghiChu;

    // Phương thức tính thời gian sử dụng (phút)
    public Long tinhThoiGianSuDung() {
        if (thoiGianTraXe != null && thoiGianNhanXe != null) {
            return java.time.Duration.between(thoiGianNhanXe, thoiGianTraXe).toMinutes();
        }
        return 0L;
    }

    // Phương thức tính hiệu suất năng lượng (km/kWh)
    public Double tinhHieuSuatNangLuong() {
        if (nangLuongTieuThu > 0 && quangDuong > 0) {
            return quangDuong / nangLuongTieuThu;
        }
        return 0.0;
    }
}