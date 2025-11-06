package com.evshare.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "thanh_toan")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThanhToan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer thanhToanId;

    @Column(nullable = false)
    private Integer chuXeId;

    @Column(nullable = false, unique = true)
    private Integer chiaChiPhiId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PhuongThuc phuongThuc;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal soTienThanhToan;

    @Column(nullable = false)
    private LocalDateTime ngayThanhToan;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TrangThai trangThai;

    public enum PhuongThuc {
        ViDienTu,
        ChuyenKhoan
    }

    public enum TrangThai {
        ChuaThanhToan,
        DaThanhToan
    }

    @PrePersist
    protected void onCreate() {
        ngayThanhToan = LocalDateTime.now();
        if (trangThai == null) {
            trangThai = TrangThai.ChuaThanhToan;
        }
    }
}