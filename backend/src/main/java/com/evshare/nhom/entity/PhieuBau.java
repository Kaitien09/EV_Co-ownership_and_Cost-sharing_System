package com.evshare.nhom.entity;

import com.evshare.nguoidung.entity.ChuXe;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "PhieuBau")
@Data
public class PhieuBau {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer phieuBauId;

    @ManyToOne
    @JoinColumn(name = "boPhieuId", nullable = false)
    private BoPhieuNhom boPhieu;

    @ManyToOne
    @JoinColumn(name = "chuXeId", nullable = false)
    private ChuXe chuXe;

    @Enumerated(EnumType.STRING)
    private LuaChon luaChon;

    private LocalDateTime thoiGianBau = LocalDateTime.now();
    private String ghiChu;
}