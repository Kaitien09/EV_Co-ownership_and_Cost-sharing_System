package com.evshare.nguoidung.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "nguoi_dung")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NguoiDung {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nguoi_dung_id")
    private Integer nguoiDungId;
    
    @Column(name = "ten_dang_nhap", nullable = false, unique = true, length = 50)
    private String tenDangNhap;
    
    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;
    
    @Column(name = "mat_khau", nullable = false, length = 255)
    private String matKhau;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "loai_nguoi_dung", nullable = false)
    @Builder.Default
    private LoaiNguoiDung loaiNguoiDung = LoaiNguoiDung.CoOwner;
    
    @Column(name = "ngay_tao", nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime ngayTao = LocalDateTime.now();
    
    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai", nullable = false)
    @Builder.Default
    private TrangThai trangThai = TrangThai.HoatDong;
    
    @PrePersist
    protected void onCreate() {
        if (ngayTao == null) {
            ngayTao = LocalDateTime.now();
        }
        if (trangThai == null) {
            trangThai = TrangThai.HoatDong;
        }
        if (loaiNguoiDung == null) {
            loaiNguoiDung = LoaiNguoiDung.CoOwner;
        }
    }
    
    public enum LoaiNguoiDung {
        Admin,
        CoOwner,
        Staff
    }
    
    public enum TrangThai {
        HoatDong,
        Ngung
    }
}
