package com.evshare.trungtamdichvu.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "TrungTamDichVu")
@Data
public class TrungTamDichVu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer trungTamId;

    @Column(nullable = false, length = 100)
    private String tenTrungTam;

    private String diaChi;
    private String soDienThoai;
    private String email;
    private String gioLamViec;
    private String moTa;

    @OneToMany(mappedBy = "trungTam", cascade = CascadeType.ALL)
    @JsonIgnore // QUAN TRỌNG
    private List<KyThuatVien> kyThuatViens = new ArrayList<>();

    @OneToMany(mappedBy = "trungTam")
    @JsonIgnore // QUAN TRỌNG
    private List<LichHenDichVu> lichHenDichVus = new ArrayList<>();
}