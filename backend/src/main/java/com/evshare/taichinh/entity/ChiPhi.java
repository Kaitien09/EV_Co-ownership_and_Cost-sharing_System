package com.evshare.taichinh.entity;

import com.evshare.nhom.entity.NhomDongSoHuu;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ChiPhi")
@Data
public class ChiPhi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer chiPhiId;

    @ManyToOne
    @JoinColumn(name = "nhomId", nullable = false)
    private NhomDongSoHuu nhom;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LoaiChiPhi loaiChiPhi;

    @Column(nullable = false)
    private Double soTien;

    @Column(nullable = false)
    private LocalDate ngayPhatSinh;

    private String ghiChu;

    private LocalDateTime ngayTao = LocalDateTime.now();

    @OneToMany(mappedBy = "chiPhi", cascade = CascadeType.ALL)
    private List<ChiaChiPhi> danhSachChia = new ArrayList<>();
}