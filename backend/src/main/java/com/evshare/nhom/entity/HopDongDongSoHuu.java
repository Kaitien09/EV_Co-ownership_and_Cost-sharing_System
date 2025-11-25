package com.evshare.nhom.entity;

import com.evshare.xedien.entity.XeDien;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "HopDongDongSoHuu")
@Data
public class HopDongDongSoHuu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer hopDongId;

    @ManyToOne
    @JoinColumn(name = "nhomId", nullable = false)
    private NhomDongSoHuu nhom;

    @ManyToOne
    @JoinColumn(name = "xeId", nullable = false)
    private XeDien xe;

    private LocalDateTime ngayBatDau;
    private LocalDateTime ngayKetThuc;

    @Enumerated(EnumType.STRING)
    private TrangThaiHopDong trangThai = TrangThaiHopDong.HIEU_LUC;

    private String fileHopDong;
    private String ghiChu;
}