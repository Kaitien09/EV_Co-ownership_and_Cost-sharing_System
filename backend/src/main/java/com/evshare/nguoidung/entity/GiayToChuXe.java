package com.evshare.nguoidung.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "giay_to_chu_xe")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GiayToChuXe {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "chu_xe_id", nullable = false)
    private Integer chuXeId;
    
    @Column(name = "loai_giay_to", nullable = false, length = 50)
    private String loaiGiayTo; // CCCD, GPLX, HoKhau, etc.
    
    @Column(name = "so_giay_to", nullable = false, length = 50)
    private String soGiayTo;
    
    @Lob
    @Column(name = "hinh_anh_mat_truoc", columnDefinition = "NVARCHAR(MAX)")
    private String hinhAnhMatTruoc; // Base64 encoded
    
    @Lob
    @Column(name = "hinh_anh_mat_sau", columnDefinition = "NVARCHAR(MAX)")
    private String hinhAnhMatSau; // Base64 encoded
    
    @Column(name = "ngay_cap")
    private LocalDate ngayCap;
    
    @Column(name = "noi_cap", length = 200)
    private String noiCap;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai_xac_thuc", length = 20)
    @Builder.Default
    private TrangThaiXacThuc trangThaiXacThuc = TrangThaiXacThuc.ChuaXacThuc;
    
    @Column(name = "nguoi_duyet")
    private Integer nguoiDuyet;
    
    @Column(name = "ngay_duyet")
    private LocalDateTime ngayDuyet;
    
    @Column(name = "ly_do_tu_choi", length = 500)
    private String lyDoTuChoi;
    
    @Column(name = "ghi_chu", length = 500)
    private String ghiChu;
    
    @Column(name = "ngay_tao")
    private LocalDateTime ngayTao;
    
    @Column(name = "ngay_cap_nhat")
    private LocalDateTime ngayCapNhat;
    
    @PrePersist
    protected void onCreate() {
        ngayTao = LocalDateTime.now();
        ngayCapNhat = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        ngayCapNhat = LocalDateTime.now();
    }
    
    public enum TrangThaiXacThuc {
        ChuaXacThuc,    // Chưa gửi xác thực
        DangChoDuyet,   // Đã gửi, chờ admin duyệt
        DaXacThuc,      // Admin đã xác thực
        TuChoi          // Admin từ chối
    }
}
