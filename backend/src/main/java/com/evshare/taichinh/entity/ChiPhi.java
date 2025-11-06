package com.evshare.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "chi_phi")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChiPhi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer chiPhiId;

    @Column(nullable = false)
    private Integer nhomId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LoaiChiPhi loaiChiPhi;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal soTien;

    @Column(nullable = false)
    private LocalDate ngayPhatSinh;

    @Column(columnDefinition = "TEXT")
    private String ghiChu;

    public enum LoaiChiPhi {
        PhiSacDien,
        BaoDuong,
        BaoHiem,
        DangKiem,
        VeSinh,
        Khac
    }
}