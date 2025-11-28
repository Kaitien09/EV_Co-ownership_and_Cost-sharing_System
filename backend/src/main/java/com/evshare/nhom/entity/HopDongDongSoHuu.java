package com.evshare.nhom.entity;

import com.evshare.xedien.entity.XeDien;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "HopDongDongSoHuu")
@Data
public class HopDongDongSoHuu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer hopDongId;

    @ManyToOne
    @JoinColumn(name = "nhomId", nullable = false)
    @JsonIgnoreProperties({"thanhVien", "hopDongs", "boPhieus"}) // Ngăn vòng lặp
    private NhomDongSoHuu nhom;

    @ManyToOne
    @JoinColumn(name = "xeId", nullable = false)
    @JsonIgnoreProperties({"thanhVienSoHuu", "danhSachDatLich", "lichSuSuDung"}) // Ngăn vòng lặp
    private XeDien xe;

    private LocalDateTime ngayBatDau;
    private LocalDateTime ngayKetThuc;

    @Enumerated(EnumType.STRING)
    private TrangThaiHopDong trangThai = TrangThaiHopDong.HIEU_LUC;

    private String fileHopDong;
    private String ghiChu;
}