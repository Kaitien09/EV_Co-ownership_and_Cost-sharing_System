package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "XeDien")
public class XeDien {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer xeId;

    @Column(nullable = false, unique = true, length = 17)
    private String vin;

    @Column(nullable = false, length = 50)
    private String model;

    @Column(nullable = false, unique = true, length = 20)
    private String bienSo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TrangThaiXe trangThai = TrangThaiXe.DangTrong;

    public enum TrangThaiXe {
        DangTrong, DangHoatDong, DangBaoTri
    }

    // Getters và Setters
    public Integer getXeId() { return xeId; }
    public void setXeId(Integer xeId) { this.xeId = xeId; }
    public String getVin() { return vin; }
    public void setVin(String vin) { this.vin = vin; }
    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }
    public String getBienSo() { return bienSo; }
    public void setBienSo(String bienSo) { this.bienSo = bienSo; }
    public TrangThaiXe getTrangThai() { return trangThai; }
    public void setTrangThai(TrangThaiXe trangThai) { this.trangThai = trangThai; }
}
