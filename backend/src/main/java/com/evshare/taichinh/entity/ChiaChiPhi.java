package com.evshare.taichinh.entity;

import com.evshare.nguoidung.entity.ChuXe;
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
    private ChiPhi chiPhi;

    @ManyToOne
    @JoinColumn(name = "chuXeId", nullable = false)
    private ChuXe chuXe;

    @Column(nullable = false)
    private Double soTienPhaiTra;

    private String ghiChu;

    private LocalDateTime ngayTao = LocalDateTime.now();

    @OneToMany(mappedBy = "chiaChiPhi", cascade = CascadeType.ALL)
    private List<ThanhToan> thanhToans = new ArrayList<>();
}