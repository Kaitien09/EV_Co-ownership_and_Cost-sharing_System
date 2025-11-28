package com.evshare.xedien.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    @JsonIgnoreProperties({"lichSuSuDung", "chuXe", "xe"}) // QUAN TRỌNG
    private DatLich datLich;

    @ManyToOne
    @JoinColumn(name = "xeId", nullable = false)
    @JsonIgnoreProperties({"thanhVienSoHuu", "danhSachDatLich", "lichSuSuDung"})
    private XeDien xe;

    @Column(nullable = false)
    private LocalDateTime thoiGianNhanXe;

    private LocalDateTime thoiGianTraXe;

    private Integer quangDuong = 0;
    private Double nangLuongTieuThu = 0.0;
    private String diemXuatPhat;
    private String diemDen;
    private String ghiChu;

    public Long tinhThoiGianSuDung() {
        if (thoiGianTraXe != null && thoiGianNhanXe != null) {
            return java.time.Duration.between(thoiGianNhanXe, thoiGianTraXe).toMinutes();
        }
        return 0L;
    }

    public Double tinhHieuSuatNangLuong() {
        if (nangLuongTieuThu > 0 && quangDuong > 0) {
            return quangDuong / nangLuongTieuThu;
        }
        return 0.0;
    }
}