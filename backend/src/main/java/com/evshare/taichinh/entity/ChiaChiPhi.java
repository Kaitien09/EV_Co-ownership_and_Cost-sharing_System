package com.evshare.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "chia_chi_phi")
public class ChiaChiPhi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer chiaChiPhiId;

    private Integer chiPhiId;
    private Integer chuXeId;
    private String ghiChu;
    private BigDecimal soTienPhaiTra;

    // Getters & Setters
    public Integer getChiaChiPhiId() {
        return chiaChiPhiId;
    }

    public void setChiaChiPhiId(Integer chiaChiPhiId) {
        this.chiaChiPhiId = chiaChiPhiId;
    }

    public Integer getChiPhiId() {
        return chiPhiId;
    }

    public void setChiPhiId(Integer chiPhiId) {
        this.chiPhiId = chiPhiId;
    }

    public Integer getChuXeId() {
        return chuXeId;
    }

    public void setChuXeId(Integer chuXeId) {
        this.chuXeId = chuXeId;
    }

    public String getGhiChu() {
        return ghiChu;
    }

    public void setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
    }

    public BigDecimal getSoTienPhaiTra() {
        return soTienPhaiTra;
    }

    public void setSoTienPhaiTra(BigDecimal soTienPhaiTra) {
        this.soTienPhaiTra = soTienPhaiTra;
    }
}
