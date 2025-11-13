package com.evshare.taichinh.entity;

import com.evshare.nhom.entity.NhomDongSoHuu;
import jakarta.persistence.*;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "QuyChung")
@Data
public class QuyChung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer quyId;

    @OneToOne
    @JoinColumn(name = "nhomId", nullable = false, unique = true)
    private NhomDongSoHuu nhom;

    @Column(nullable = false)
    private Double soDu = 0.0;

    @OneToMany(mappedBy = "quy", cascade = CascadeType.ALL)
    private List<LichSuQuy> lichSuQuy = new ArrayList<>();

    // Phương thức cập nhật số dư
    public void capNhatSoDu(Double soTien, LoaiGiaoDich loaiGiaoDich) {
        if (loaiGiaoDich == LoaiGiaoDich.THU) {
            this.soDu += soTien;
        } else if (loaiGiaoDich == LoaiGiaoDich.CHI) {
            this.soDu -= soTien;
        }
    }
}