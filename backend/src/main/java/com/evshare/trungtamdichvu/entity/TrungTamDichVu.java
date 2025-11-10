package com.evshare.trungtamdichvu.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "trung_tam_dich_vu")
@Data
public class TrungTamDichVu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String maTrungTam;

    private String tenTrungTam;
    private String diaChi;
    private String soDienThoai;
    private String email;
    private String gioLamViec;

    @Enumerated(EnumType.STRING)
    private TrangThaiTrungTam trangThai;

    @OneToMany(mappedBy = "trungTam", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<KyThuatVien> danhSachKyThuatVien = new ArrayList<>();

    // Constructor
    public TrungTamDichVu() {}

    public TrungTamDichVu(String maTrungTam, String tenTrungTam, String diaChi, String soDienThoai, String email) {
        this.maTrungTam = maTrungTam;
        this.tenTrungTam = tenTrungTam;
        this.diaChi = diaChi;
        this.soDienThoai = soDienThoai;
        this.email = email;
        this.trangThai = TrangThaiTrungTam.HOAT_DONG;
    }
}

enum TrangThaiTrungTam {
    HOAT_DONG,    // Đang hoạt động
    BAO_TRI,      // Đang bảo trì
    NGUNG_HOAT_DONG // Ngừng hoạt động
}