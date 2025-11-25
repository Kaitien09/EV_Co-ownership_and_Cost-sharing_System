package com.evshare.nhom.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "BoPhieuNhom")
@Data
public class BoPhieuNhom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer boPhieuId;

    @ManyToOne
    @JoinColumn(name = "nhomId", nullable = false)
    private NhomDongSoHuu nhom;

    @Column(nullable = false)
    private String tieuDe;

    private String moTa;

    @Enumerated(EnumType.STRING)
    private TrangThaiBoPhieu trangThai = TrangThaiBoPhieu.DANG_THUC_HIEN;

    private LocalDateTime ngayTao = LocalDateTime.now();
    private LocalDateTime ngayKetThuc;

    @OneToMany(mappedBy = "boPhieu", cascade = CascadeType.ALL)
    private List<PhieuBau> phieuBaus = new ArrayList<>();
}