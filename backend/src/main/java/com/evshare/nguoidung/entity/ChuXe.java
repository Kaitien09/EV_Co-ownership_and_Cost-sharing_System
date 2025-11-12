package com.evshare.nguoidung.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "chu_xe")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChuXe {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chu_xe_id")
    private Integer chuXeId;
    
    @Column(name = "nguoi_dung_id", nullable = false, unique = true)
    private Integer nguoiDungId;
    
    @Column(name = "ho_ten", nullable = false, length = 100)
    private String hoTen;
    
    @Column(name = "cccd", length = 12)
    private String cccd;
    
    @Column(name = "sdt", length = 15)
    private String sdt;
    
    @Column(name = "gplx", length = 20)
    private String gplx;
    
    @Column(name = "dia_chi", length = 255)
    private String diaChi;
}
