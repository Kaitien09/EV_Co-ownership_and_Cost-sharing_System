-- Chạy script này để tạo bảng hop_dong_phap_ly_dien_tu

USE ev_coownership;

-- Kiểm tra và xóa bảng cũ nếu cần (chỉ dùng trong development)
-- DROP TABLE IF EXISTS hop_dong_phap_ly_dien_tu;

-- Tạo bảng mới
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
    
    CONSTRAINT fk_hop_dong_phap_ly_hop_dong 
        FOREIGN KEY (hop_dong_dong_so_huu_id) 
        REFERENCES hop_dong_dong_so_huu(hop_dong_id)
        ON DELETE CASCADE,
    
    CONSTRAINT fk_hop_dong_phap_ly_nguoi_ky 
        FOREIGN KEY (nguoi_ky_id) 
        REFERENCES nguoi_dung(nguoi_dung_id)
        ON DELETE SET NULL,
    
    CONSTRAINT uk_hop_dong_phap_ly_unique 
        UNIQUE (hop_dong_dong_so_huu_id),
    
    CONSTRAINT chk_trang_thai 
        CHECK (trang_thai IN ('ChuaKy', 'DaKy', 'BiHuy'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tạo indexes
CREATE INDEX idx_hop_dong_phap_ly_trang_thai 
    ON hop_dong_phap_ly_dien_tu(trang_thai);

CREATE INDEX idx_hop_dong_phap_ly_nguoi_ky 
    ON hop_dong_phap_ly_dien_tu(nguoi_ky_id);

CREATE INDEX idx_hop_dong_phap_ly_ngay_ky 
    ON hop_dong_phap_ly_dien_tu(ngay_ky);

-- Kiểm tra kết quả
SELECT 'Bảng hop_dong_phap_ly_dien_tu đã được tạo thành công!' AS Status;

-- Xem cấu trúc bảng
DESCRIBE hop_dong_phap_ly_dien_tu;
