package com.evshare.nhom.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "NhomDongSoHuu")
@Data
public class NhomDongSoHuu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer nhomId;

    @Column(nullable = false)
    private String tenNhom;

    @Enumerated(EnumType.STRING)
    private TrangThaiNhom trangThai = TrangThaiNhom.HOAT_DONG;

    private LocalDateTime ngayTao = LocalDateTime.now();

    // Quan hệ
    @OneToMany(mappedBy = "nhom", cascade = CascadeType.ALL)
    private List<ThanhVienNhom> thanhVien = new ArrayList<>();

    @OneToMany(mappedBy = "nhom")
    private List<HopDongDongSoHuu> hopDongs = new ArrayList<>();

    @OneToMany(mappedBy = "nhom")
    private List<BoPhieuNhom> boPhieus = new ArrayList<>();
}