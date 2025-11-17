package com.evshare.nguoidung.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "hop_dong_dong_so_huu")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HopDongDongSoHuu {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hop_dong_id")
    private Integer hopDongId;
    
    @Column(name = "xe_id", nullable = false)
    private Integer xeId;
    
    @Column(name = "chu_xe_id", nullable = false)
    private Integer chuXeId;
    
    @Column(name = "ngay_bat_dau", nullable = false)
    private LocalDateTime ngayBatDau;
    
    @Column(name = "ngay_ket_thuc")
    private LocalDateTime ngayKetThuc;
    
    // Workflow fields
    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai", nullable = false)
    @Builder.Default
    private TrangThaiHopDong trangThai = TrangThaiHopDong.ChoDuyet;
    
    @Column(name = "nguoi_duyet_id")
    private Integer nguoiDuyet;
    
    @Column(name = "ngay_duyet")
    private LocalDateTime ngayDuyet;
    
    @Column(name = "ly_do_tu_choi", length = 500)
    private String lyDoTuChoi;
    
    public enum TrangThaiHopDong {
        ChoDuyet,      // Chờ admin duyệt
        DaDuyet,       // Admin đã duyệt
        TuChoi,        // Admin từ chối
        DangHieuLuc,   // Đang hoạt động
        HetHan         // Đã hết hạn
    }
}

