-- Migration: Cập nhật bảng hop_dong_phap_ly_dien_tu
-- Ngày: 2025-11-02

-- Xóa bảng cũ nếu tồn tại (chỉ dùng trong development)
-- DROP TABLE IF EXISTS hop_dong_phap_ly_dien_tu;

-- Tạo bảng mới với cấu trúc đầy đủ
CREATE TABLE IF NOT EXISTS hop_dong_phap_ly_dien_tu (
    hop_dong_phap_ly_id INT AUTO_INCREMENT PRIMARY KEY,
    hop_dong_dong_so_huu_id INT NOT NULL,
    noi_dung_hop_dong TEXT,
    tep_hop_dong LONGBLOB,
    chu_ky_dien_tu VARCHAR(500),
    nguoi_ky_id INT,
    ngay_ky DATETIME,
    trang_thai VARCHAR(20) NOT NULL DEFAULT 'ChuaKy',
    ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat DATETIME,
    
    -- Foreign keys
    CONSTRAINT fk_hop_dong_phap_ly_hop_dong 
        FOREIGN KEY (hop_dong_dong_so_huu_id) 
        REFERENCES hop_dong_dong_so_huu(hop_dong_id)
        ON DELETE CASCADE,
    
    CONSTRAINT fk_hop_dong_phap_ly_nguoi_ky 
        FOREIGN KEY (nguoi_ky_id) 
        REFERENCES nguoi_dung(nguoi_dung_id)
        ON DELETE SET NULL,
    
    -- Constraints
    CONSTRAINT uk_hop_dong_phap_ly_unique 
        UNIQUE (hop_dong_dong_so_huu_id),
    
    CONSTRAINT chk_trang_thai 
        CHECK (trang_thai IN ('ChuaKy', 'DaKy', 'BiHuy'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tạo indexes để tối ưu truy vấn
CREATE INDEX idx_hop_dong_phap_ly_trang_thai 
    ON hop_dong_phap_ly_dien_tu(trang_thai);

CREATE INDEX idx_hop_dong_phap_ly_nguoi_ky 
    ON hop_dong_phap_ly_dien_tu(nguoi_ky_id);

CREATE INDEX idx_hop_dong_phap_ly_ngay_ky 
    ON hop_dong_phap_ly_dien_tu(ngay_ky);

-- Thêm comment cho bảng
ALTER TABLE hop_dong_phap_ly_dien_tu 
    COMMENT = 'Bảng lưu trữ hợp đồng pháp lý điện tử cho các hợp đồng đồng sở hữu';
