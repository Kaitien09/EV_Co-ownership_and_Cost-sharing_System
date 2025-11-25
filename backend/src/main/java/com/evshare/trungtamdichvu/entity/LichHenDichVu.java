package com.evshare.trungtamdichvu.entity;

import com.evshare.xedien.entity.XeDien;
import com.evshare.nguoidung.entity.ChuXe;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "LichHenDichVu")
@Data
public class LichHenDichVu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer lichHenId;

    @ManyToOne
    @JoinColumn(name = "xeId", nullable = false)
    private XeDien xe;

    @ManyToOne
    @JoinColumn(name = "chuXeId", nullable = false)
    private ChuXe chuXe;

    @ManyToOne
    @JoinColumn(name = "trungTamId", nullable = false)
    private TrungTamDichVu trungTam;

    @Column(nullable = false)
    private LocalDateTime ngayHen;

    @Enumerated(EnumType.STRING)
    private LoaiDichVu loaiDichVu;

    @Enumerated(EnumType.STRING)
    private TrangThaiLichHen trangThai = TrangThaiLichHen.CHO_XAC_NHAN;

    private String moTaVanDe;
    private String ghiChu;
    private LocalDateTime ngayTao = LocalDateTime.now();

    @OneToOne(mappedBy = "lichHen", cascade = CascadeType.ALL)
    private PhieuDichVu phieuDichVu;
}