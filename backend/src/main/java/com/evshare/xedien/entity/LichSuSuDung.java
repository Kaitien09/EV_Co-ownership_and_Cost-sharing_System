package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "LichSuSuDung")
public class LichSuSuDung {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer lichSuSuDungId;

    @OneToOne
    @JoinColumn(name = "datLichId", unique = true, nullable = false)
    private DatLich datLich;

    private LocalDateTime thoiGianNhanXe;
    private LocalDateTime thoiGianTraXe;
    private Integer quangDuong = 0;

    // Getters & Setters
    public Integer getLichSuSuDungId() { return lichSuSuDungId; }
    public void setLichSuSuDungId(Integer lichSuSuDungId) { this.lichSuSuDungId = lichSuSuDungId; }
    public DatLich getDatLich() { return datLich; }
    public void setDatLich(DatLich datLich) { this.datLich = datLich; }
    public LocalDateTime getThoiGianNhanXe() { return thoiGianNhanXe; }
    public void setThoiGianNhanXe(LocalDateTime thoiGianNhanXe) { this.thoiGianNhanXe = thoiGianNhanXe; }
    public LocalDateTime getThoiGianTraXe() { return thoiGianTraXe; }
    public void setThoiGianTraXe(LocalDateTime thoiGianTraXe) { this.thoiGianTraXe = thoiGianTraXe; }
    public Integer getQuangDuong() { return quangDuong; }
    public void setQuangDuong(Integer quangDuong) { this.quangDuong = quangDuong; }
}
