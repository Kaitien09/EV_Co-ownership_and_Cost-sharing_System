package com.evshare.nhom.entity;

import com.evshare.nguoidung.entity.ChuXe;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    @JsonIgnoreProperties({"phieuBaus", "nhom"}) // Ngăn vòng lặp
    private BoPhieuNhom boPhieu;

    @ManyToOne
    @JoinColumn(name = "chuXeId", nullable = false)
    @JsonIgnoreProperties({"thanhVienNhoms", "datLichs", "lichHenDichVus", "chiaChiPhis", "thanhToans", "phieuBaus"})
    private ChuXe chuXe;

    @Enumerated(EnumType.STRING)
    private LuaChon luaChon;

    private LocalDateTime thoiGianBau = LocalDateTime.now();
    private String ghiChu;
}