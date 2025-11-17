package com.evshare.nguoidung.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "hop_dong_phap_ly_dien_tu")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HopDongPhapLyDienTu {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hop_dong_phap_ly_id")
    private Integer hopDongPhapLyId;
    
    // Liên kết với hợp đồng đồng sở hữu
    @Column(name = "hop_dong_dong_so_huu_id", nullable = false)
    private Integer hopDongDongSoHuuId;
    
    // Nội dung hợp đồng (text)
    @Column(name = "noi_dung_hop_dong", columnDefinition = "TEXT")
    private String noiDungHopDong;
    
    // File hợp đồng PDF (Base64 hoặc binary)
    @Lob
    @Column(name = "tep_hop_dong", columnDefinition = "LONGBLOB")
    private byte[] tepHopDong;
    
    // Chữ ký điện tử (hash SHA-256)
    @Column(name = "chu_ky_dien_tu", length = 500)
    private String chuKyDienTu;
    
    // Thông tin ký
    @Column(name = "nguoi_ky_id")
    private Integer nguoiKyId;
    
    @Column(name = "ngay_ky")
    private LocalDateTime ngayKy;
    
    // Trạng thái
    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai", nullable = false)
    @Builder.Default
    private TrangThai trangThai = TrangThai.ChuaKy;
    
    // Timestamp
    @Column(name = "ngay_tao", nullable = false)
    @Builder.Default
    private LocalDateTime ngayTao = LocalDateTime.now();
    
    @Column(name = "ngay_cap_nhat")
    private LocalDateTime ngayCapNhat;
    
    public enum TrangThai {
        ChuaKy,      // Hợp đồng mới tạo, chưa ký
        DaKy,        // Đã ký, có hiệu lực
        BiHuy        // Bị hủy bỏ
    }
}