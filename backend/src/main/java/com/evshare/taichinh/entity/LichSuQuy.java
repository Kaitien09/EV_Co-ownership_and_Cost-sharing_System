package com.evshare.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "lich_su_quy")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LichSuQuy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer lichSuQuyId;

    @Column(nullable = false)
    private Integer quyId;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal soTien;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LoaiGiaoDich loaiGiaoDich;

    @Column(nullable = false)
    private LocalDateTime ngayGiaoDich;

    @Column(columnDefinition = "TEXT")
    private String moTa;

    public enum LoaiGiaoDich {
        Thu,
        Chi
    }

    @PrePersist
    protected void onCreate() {
        ngayGiaoDich = LocalDateTime.now();
    }
}