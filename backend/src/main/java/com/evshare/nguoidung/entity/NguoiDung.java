package com.evshare.nguoidung.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "NguoiDung")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Builder
public class NguoiDung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer nguoiDungId;

    @Column(unique = true, nullable = false, length = 50)
    private String tenDangNhap;

    @Column(unique = true, nullable = false, length = 100)
    private String email;

    @Column(nullable = false)
    private String matKhau;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LoaiNguoiDung loaiNguoiDung;

    @Column(nullable = false, updatable = false)
    private LocalDateTime ngayTao = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    private TrangThaiNguoiDung trangThai = TrangThaiNguoiDung.HOAT_DONG;

    @OneToOne(mappedBy = "nguoiDung", cascade = CascadeType.ALL)
    private ChuXe chuXe;

}
