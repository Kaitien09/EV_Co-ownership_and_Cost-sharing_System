package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "DatLich")
public class DatLich {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer datLichId;

    @Column(nullable = false)
    private Integer chuXeId;

    @ManyToOne
    @JoinColumn(name = "xeId", nullable = false)
    private XeDien xeDien;

    @Column(nullable = false)
    private LocalDateTime thoiGianBatDau;

    @Column(nullable = false)
    private LocalDateTime thoiGianKetThuc;

    @Enumerated(EnumType.STRING)
    private TrangThaiDatLich trangThai = TrangThaiDatLich.ChoDuyet;

    public enum TrangThaiDatLich {
        ChoDuyet, DaDuyet, DaHuy
    }

    // Getters & Setters
    public Integer getDatLichId() { return datLichId; }
    public void setDatLichId(Integer datLichId) { this.datLichId = datLichId; }
    public Integer getChuXeId() { return chuXeId; }
    public void setChuXeId(Integer chuXeId) { this.chuXeId = chuXeId; }
    public XeDien getXeDien() { return xeDien; }
    public void setXeDien(XeDien xeDien) { this.xeDien = xeDien; }
    public LocalDateTime getThoiGianBatDau() { return thoiGianBatDau; }
    public void setThoiGianBatDau(LocalDateTime thoiGianBatDau) { this.thoiGianBatDau = thoiGianBatDau; }
    public LocalDateTime getThoiGianKetThuc() { return thoiGianKetThuc; }
    public void setThoiGianKetThuc(LocalDateTime thoiGianKetThuc) { this.thoiGianKetThuc = thoiGianKetThuc; }
    public TrangThaiDatLich getTrangThai() { return trangThai; }
    public void setTrangThai(TrangThaiDatLich trangThai) { this.trangThai = trangThai; }
}
