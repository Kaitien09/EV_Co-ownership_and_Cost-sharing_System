package com.evshare.nguoidung.entity;

import com.evshare.nhom.entity.ThanhVienNhom;
import com.evshare.nhom.entity.PhieuBau;
import com.evshare.taichinh.entity.ChiaChiPhi;
import com.evshare.taichinh.entity.ThanhToan;
import com.evshare.xedien.entity.DatLich;
import com.evshare.trungtamdichvu.entity.LichHenDichVu;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "ChuXe")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Builder
public class ChuXe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer chuXeId;

    @OneToOne
    @JoinColumn(name = "nguoiDungId", unique = true, nullable = false)
    @JsonIgnore
    private NguoiDung nguoiDung;

    @Column(nullable = false, length = 100)
    private String hoTen;

    @Column(unique = true, length = 12)
    private String cccd;

    @Column(length = 15)
    private String sdt;

    @Column(length = 20)
    private String gplx;

    @Column(length = 255)
    private String diaChi;

    @Column(name = "gplx_anh", length = 255)
    private String gplxAnh;

    @OneToMany(mappedBy = "chuXe")
    @JsonIgnore
    private List<ThanhVienNhom> thanhVienNhoms;

    @OneToMany(mappedBy = "chuXe")
    @JsonIgnore
    private List<DatLich> datLichs;

    @OneToMany(mappedBy = "chuXe")
    @JsonIgnore
    private List<LichHenDichVu> lichHenDichVus;

    @OneToMany(mappedBy = "chuXe")
    @JsonIgnore
    private List<ChiaChiPhi> chiaChiPhis;

    @OneToMany(mappedBy = "chuXe")
    @JsonIgnore
    private List<ThanhToan> thanhToans;

    @OneToMany(mappedBy = "chuXe")
    @JsonIgnore
    private List<PhieuBau> phieuBaus;
}