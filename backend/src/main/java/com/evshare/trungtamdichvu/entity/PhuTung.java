package com.evshare.trungtamdichvu.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "PhuTung")
@Data
public class PhuTung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer phuTungId;

    @Column(nullable = false, length = 100)
    private String tenPhuTung;

    private String maPhuTung;
    private String loaiPhuTung;
    private String nhaSanXuat;
    private String moTa;

    @Column(nullable = false)
    private Integer soLuongTon = 0;

    @Column(nullable = false)
    private Integer soLuongToiThieu = 5;

    private Double giaNhap;
    private Double giaBan;

    @OneToMany(mappedBy = "phuTung")
    @JsonIgnore // QUAN TRỌNG
    private List<ChiTietSuDungPhuTung> chiTietSuDung = new ArrayList<>();
}