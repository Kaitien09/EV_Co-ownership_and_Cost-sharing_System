package com.evshare.taichinh.entity;

import com.evshare.nguoidung.entity.ChuXe;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ChiaChiPhi")
@Data
public class ChiaChiPhi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer chiaChiPhiId;

    @ManyToOne
    @JoinColumn(name = "chiPhiId", nullable = false)
    @JsonIgnoreProperties({"danhSachChia", "nhom"}) // QUAN TRỌNG
    private ChiPhi chiPhi;

    @ManyToOne
    @JoinColumn(name = "chuXeId", nullable = false)
    @JsonIgnoreProperties({"thanhVienNhoms", "datLichs", "lichHenDichVus", "chiaChiPhis", "thanhToans", "phieuBaus"})
    private ChuXe chuXe;

    @Column(nullable = false)
    private Double soTienPhaiTra;

    private String ghiChu;

    private LocalDateTime ngayTao = LocalDateTime.now();

    @OneToMany(mappedBy = "chiaChiPhi", cascade = CascadeType.ALL)
    @JsonIgnore // QUAN TRỌNG
    private List<ThanhToan> thanhToans = new ArrayList<>();
}