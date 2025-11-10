package com.evshare.trungtamdichvu.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "phieu_dich_vu")
@Data
public class PhieuDichVu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String maPhieu;

    private LocalDateTime ngayTao;
    private LocalDateTime ngayCapNhat;

    @Enumerated(EnumType.STRING)
    private TrangThaiPhieuDichVu trangThai;

    private String checklistKiemTra;
    private String ketQuaKiemTra;
    private String ghiChuKyThuat;
    private Double tongChiPhi;

    @OneToOne
    @JoinColumn(name = "lich_hen_id")
    private LichHenDichVu lichHen;

    @OneToMany(mappedBy = "phieuDichVu", cascade = CascadeType.ALL)
    private List<ChiTietSuDungPhuTung> danhSachPhuTung = new ArrayList<>();

    public PhieuDichVu() {
        this.ngayTao = LocalDateTime.now();
        this.trangThai = TrangThaiPhieuDichVu.KHOI_TAO;
        this.tongChiPhi = 0.0;
    }

    public PhieuDichVu(LichHenDichVu lichHen) {
        this.maPhieu = "PDV" + System.currentTimeMillis();
        this.lichHen = lichHen;
        this.ngayTao = LocalDateTime.now();
        this.trangThai = TrangThaiPhieuDichVu.KHOI_TAO;
        this.tongChiPhi = 0.0;
    }
}

enum TrangThaiPhieuDichVu {
    KHOI_TAO, DANG_THUC_HIEN, HOAN_THANH, HUY
}