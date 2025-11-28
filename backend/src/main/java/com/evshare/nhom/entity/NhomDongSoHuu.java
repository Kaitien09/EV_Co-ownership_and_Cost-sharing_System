package com.evshare.nhom.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    // Quan hệ 1-n với ThanhVienNhom
    @OneToMany(mappedBy = "nhom", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<ThanhVienNhom> thanhVien = new ArrayList<>();

    // QUAN TRỌNG: Thêm @JsonIgnore cho các quan hệ khác
    @OneToMany(mappedBy = "nhom")
    @JsonIgnore
    private List<HopDongDongSoHuu> hopDongs = new ArrayList<>();

    @OneToMany(mappedBy = "nhom")
    @JsonIgnore
    private List<BoPhieuNhom> boPhieus = new ArrayList<>();
}