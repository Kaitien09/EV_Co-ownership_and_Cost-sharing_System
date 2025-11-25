package com.evshare.xedien.entity;

import com.evshare.nhom.entity.ThanhVienNhom;
import jakarta.persistence.*;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "XeDien")
@Data
public class XeDien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer xeId;

    @Column(unique = true, nullable = false, length = 17)
    private String vin;

    @Column(nullable = false, length = 50)
    private String model;

    @Column(unique = true, nullable = false, length = 20)
    private String bienSo;

    @Enumerated(EnumType.STRING)
    private TrangThaiXe trangThai = TrangThaiXe.SAN_SANG;

    private String mauXe;
    private Integer namSanXuat;
    private Integer dungLuongPin; // kWh
    private Integer quangDuongToiDa; // km
    private String hinhAnh;
    private String moTa;

    // Quan hệ với thành viên nhóm (đồng sở hữu)
    @OneToMany(mappedBy = "xe")
    private List<ThanhVienNhom> thanhVienSoHuu = new ArrayList<>();

    // Quan hệ với đặt lịch
    @OneToMany(mappedBy = "xe")
    private List<DatLich> danhSachDatLich = new ArrayList<>();

    // Quan hệ với lịch sử sử dụng
    @OneToMany(mappedBy = "xe")
    private List<LichSuSuDung> lichSuSuDung = new ArrayList<>();
}