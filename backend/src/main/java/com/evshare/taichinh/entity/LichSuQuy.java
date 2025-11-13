package com.evshare.taichinh.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "LichSuQuy")
@Data
public class LichSuQuy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer lichSuQuyId;

    @ManyToOne
    @JoinColumn(name = "quyId", nullable = false)
    private QuyChung quy;

    @ManyToOne
    @JoinColumn(name = "chiPhiId")
    private ChiPhi chiPhi;

    @Column(nullable = false)
    private Double soTien;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LoaiGiaoDich loaiGiaoDich;

    private LocalDateTime ngayGiaoDich = LocalDateTime.now();

    private String moTa;

    @PrePersist
    public void prePersist() {
        if (ngayGiaoDich == null) {
            ngayGiaoDich = LocalDateTime.now();
        }

        // Tự động cập nhật số dư quỹ khi thêm lịch sử
        if (quy != null) {
            quy.capNhatSoDu(soTien, loaiGiaoDich);
        }
    }
}