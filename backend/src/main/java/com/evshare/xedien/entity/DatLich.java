package com.evshare.xedien.entity;

import com.evshare.nguoidung.entity.ChuXe;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "DatLich")
@Data
public class DatLich {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer datLichId;

    @ManyToOne
    @JoinColumn(name = "chuXeId", nullable = false)
    @JsonIgnoreProperties({"thanhVienNhoms", "datLichs", "lichHenDichVus", "chiaChiPhis", "thanhToans", "phieuBaus"})
    private ChuXe chuXe;

    @ManyToOne
    @JoinColumn(name = "xeId", nullable = false)
    @JsonIgnoreProperties({"thanhVienSoHuu", "danhSachDatLich", "lichSuSuDung"})
    private XeDien xe;

    @Column(nullable = false)
    private LocalDateTime thoiGianBatDau;

    @Column(nullable = false)
    private LocalDateTime thoiGianKetThuc;

    @Enumerated(EnumType.STRING)
    private TrangThaiDatLich trangThai = TrangThaiDatLich.CHO_XAC_NHAN;

    private String mucDichSuDung;
    private String ghiChu;
    private LocalDateTime ngayTao = LocalDateTime.now();

    @OneToOne(mappedBy = "datLich", cascade = CascadeType.ALL)
    @JsonIgnore // QUAN TRỌNG
    private LichSuSuDung lichSuSuDung;

    public boolean isValid() {
        return thoiGianBatDau.isBefore(thoiGianKetThuc) &&
                thoiGianBatDau.isAfter(LocalDateTime.now());
    }

    public boolean isInUsageTime() {
        LocalDateTime now = LocalDateTime.now();
        return now.isAfter(thoiGianBatDau) && now.isBefore(thoiGianKetThuc);
    }
}