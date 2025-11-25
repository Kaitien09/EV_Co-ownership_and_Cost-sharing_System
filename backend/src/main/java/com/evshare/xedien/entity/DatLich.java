package com.evshare.xedien.entity;

import com.evshare.nguoidung.entity.ChuXe;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "DatLich")
@Data
public class DatLich {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer datLichId;

    @ManyToOne
    @JoinColumn(name = "chuXeId", nullable = false)
    private ChuXe chuXe;

    @ManyToOne
    @JoinColumn(name = "xeId", nullable = false)
    private XeDien xe;

    @Column(nullable = false)
    private LocalDateTime thoiGianBatDau;

    @Column(nullable = false)
    private LocalDateTime thoiGianKetThuc;

    @Enumerated(EnumType.STRING)
    private TrangThaiDatLich trangThai = TrangThaiDatLich.CHO_XAC_NHAN;

    private String mucDichSuDung;
    private String ghiChu;
    private LocalDateTime ngayTao = LocalDateTime.now();

    @OneToOne(mappedBy = "datLich", cascade = CascadeType.ALL)
    private LichSuSuDung lichSuSuDung;

    // Phương thức kiểm tra xem đặt lịch có hợp lệ không
    public boolean isValid() {
        return thoiGianBatDau.isBefore(thoiGianKetThuc) &&
                thoiGianBatDau.isAfter(LocalDateTime.now());
    }

    // Phương thức kiểm tra xem đang trong thời gian sử dụng
    public boolean isInUsageTime() {
        LocalDateTime now = LocalDateTime.now();
        return now.isAfter(thoiGianBatDau) && now.isBefore(thoiGianKetThuc);
    }
}