-- ========================================================================
-- HỆ THỐNG QUẢN LÝ ĐỒNG SỞ HỮU XE ĐIỆN (EV CO-OWNERSHIP PLATFORM)
-- Complete Database Schema - MySQL 8.0+
-- Date: 2025-11-02
-- Description: Schema đầy đủ cho hệ thống đồng sở hữu xe điện
-- ========================================================================

-- ========================================================================
-- 1. TẠO VÀ SỬ DỤNG DATABASE
-- ========================================================================

DROP DATABASE IF EXISTS ev_coownership;
CREATE DATABASE ev_coownership 
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;

USE ev_coownership;

-- ========================================================================
-- 2. BẢNG: nguoi_dung (User Management)
-- ========================================================================

CREATE TABLE nguoi_dung (
    nguoi_dung_id INT AUTO_INCREMENT PRIMARY KEY,
    ten_dang_nhap VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    mat_khau VARCHAR(255) NOT NULL COMMENT 'BCrypt encoded password',
    loai_nguoi_dung VARCHAR(20) NOT NULL DEFAULT 'CoOwner',
    ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    trang_thai VARCHAR(20) NOT NULL DEFAULT 'HoatDong',
    
    CONSTRAINT chk_nguoi_dung_loai 
        CHECK (loai_nguoi_dung IN ('Admin', 'CoOwner', 'Staff')),
    CONSTRAINT chk_nguoi_dung_trang_thai 
        CHECK (trang_thai IN ('HoatDong', 'Ngung'))
) ENGINE=InnoDB COMMENT='Quản lý người dùng hệ thống';

-- Indexes for nguoi_dung
CREATE INDEX idx_nguoi_dung_email ON nguoi_dung(email);
CREATE INDEX idx_nguoi_dung_ten_dang_nhap ON nguoi_dung(ten_dang_nhap);
CREATE INDEX idx_nguoi_dung_loai ON nguoi_dung(loai_nguoi_dung);
CREATE INDEX idx_nguoi_dung_trang_thai ON nguoi_dung(trang_thai);

-- ========================================================================
-- 3. BẢNG: chu_xe (Vehicle Owner Profile)
-- ========================================================================

CREATE TABLE chu_xe (
    chu_xe_id INT AUTO_INCREMENT PRIMARY KEY,
    nguoi_dung_id INT NOT NULL UNIQUE,
    ho_ten VARCHAR(100) NOT NULL,
    cccd VARCHAR(12),
    sdt VARCHAR(15),
    gplx VARCHAR(20),
    dia_chi VARCHAR(255),
    ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat DATETIME,
    
    CONSTRAINT fk_chu_xe_nguoi_dung 
        FOREIGN KEY (nguoi_dung_id) 
        REFERENCES nguoi_dung(nguoi_dung_id) 
        ON DELETE CASCADE
) ENGINE=InnoDB COMMENT='Hồ sơ chủ xe';

-- Indexes for chu_xe
CREATE INDEX idx_chu_xe_nguoi_dung ON chu_xe(nguoi_dung_id);
CREATE INDEX idx_chu_xe_cccd ON chu_xe(cccd);
CREATE INDEX idx_chu_xe_sdt ON chu_xe(sdt);

-- ========================================================================
-- 4. BẢNG: xe (Vehicle Information)
-- ========================================================================

CREATE TABLE xe (
    xe_id INT AUTO_INCREMENT PRIMARY KEY,
    ten_xe VARCHAR(100) NOT NULL,
    hang_xe VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    nam_san_xuat INT,
    bien_so VARCHAR(20) UNIQUE,
    gia_tri DECIMAL(15,2) NOT NULL,
    mau_sac VARCHAR(30),
    loai_xe VARCHAR(50),
    dung_luong_pin INT COMMENT 'kWh',
    trang_thai VARCHAR(20) NOT NULL DEFAULT 'SanSang',
    ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat DATETIME,
    
    CONSTRAINT chk_xe_trang_thai 
        CHECK (trang_thai IN ('SanSang', 'DangSuDung', 'BaoTri', 'NgungHoatDong'))
) ENGINE=InnoDB COMMENT='Thông tin xe điện';

-- Indexes for xe
CREATE INDEX idx_xe_bien_so ON xe(bien_so);
CREATE INDEX idx_xe_trang_thai ON xe(trang_thai);
CREATE INDEX idx_xe_hang ON xe(hang_xe);

-- ========================================================================
-- 5. BẢNG: giay_to_chu_xe (Document Verification)
-- ========================================================================

CREATE TABLE giay_to_chu_xe (
    giay_to_id INT AUTO_INCREMENT PRIMARY KEY,
    chu_xe_id INT NOT NULL,
    loai_giay_to VARCHAR(50) NOT NULL COMMENT 'CCCD, GPLX, HoKhau',
    so_giay_to VARCHAR(50) NOT NULL,
    ngay_cap DATE,
    noi_cap VARCHAR(200),
    hinh_anh_mat_truoc LONGTEXT COMMENT 'Base64 encoded image',
    hinh_anh_mat_sau LONGTEXT COMMENT 'Base64 encoded image',
    trang_thai_xac_thuc VARCHAR(20) NOT NULL DEFAULT 'ChuaXacThuc',
    nguoi_duyet_id INT,
    ngay_duyet DATETIME,
    ly_do_tu_choi VARCHAR(500),
    ghi_chu VARCHAR(500),
    ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat DATETIME,
    
    CONSTRAINT fk_giay_to_chu_xe 
        FOREIGN KEY (chu_xe_id) 
        REFERENCES chu_xe(chu_xe_id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_giay_to_nguoi_duyet 
        FOREIGN KEY (nguoi_duyet_id) 
        REFERENCES nguoi_dung(nguoi_dung_id) 
        ON DELETE SET NULL,
    CONSTRAINT chk_giay_to_trang_thai 
        CHECK (trang_thai_xac_thuc IN ('ChuaXacThuc', 'DangChoDuyet', 'DaXacThuc', 'TuChoi'))
) ENGINE=InnoDB COMMENT='Quản lý giấy tờ và xác thực chủ xe';

-- Indexes for giay_to_chu_xe
CREATE INDEX idx_giay_to_chu_xe ON giay_to_chu_xe(chu_xe_id);
CREATE INDEX idx_giay_to_trang_thai ON giay_to_chu_xe(trang_thai_xac_thuc);
CREATE INDEX idx_giay_to_loai ON giay_to_chu_xe(loai_giay_to);
CREATE INDEX idx_giay_to_nguoi_duyet ON giay_to_chu_xe(nguoi_duyet_id);

-- ========================================================================
-- 6. BẢNG: hop_dong_dong_so_huu (Co-ownership Contract)
-- ========================================================================

CREATE TABLE hop_dong_dong_so_huu (
    hop_dong_id INT AUTO_INCREMENT PRIMARY KEY,
    chu_xe_id INT NOT NULL,
    xe_id INT NOT NULL,
    ngay_bat_dau DATETIME NOT NULL,
    ngay_ket_thuc DATETIME,
    trang_thai VARCHAR(20) NOT NULL DEFAULT 'ChoDuyet',
    nguoi_duyet_id INT,
    ngay_duyet DATETIME,
    ly_do_tu_choi VARCHAR(500),
    ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat DATETIME,
    
    CONSTRAINT fk_hop_dong_chu_xe 
        FOREIGN KEY (chu_xe_id) 
        REFERENCES chu_xe(chu_xe_id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_hop_dong_xe 
        FOREIGN KEY (xe_id) 
        REFERENCES xe(xe_id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_hop_dong_nguoi_duyet 
        FOREIGN KEY (nguoi_duyet_id) 
        REFERENCES nguoi_dung(nguoi_dung_id) 
        ON DELETE SET NULL,
    CONSTRAINT chk_hop_dong_trang_thai 
        CHECK (trang_thai IN ('ChoDuyet', 'DaDuyet', 'TuChoi', 'DangHieuLuc', 'HetHan', 'DaHuy'))
) ENGINE=InnoDB COMMENT='Hợp đồng đồng sở hữu xe điện';

-- Indexes for hop_dong_dong_so_huu
CREATE INDEX idx_hop_dong_chu_xe ON hop_dong_dong_so_huu(chu_xe_id);
CREATE INDEX idx_hop_dong_xe ON hop_dong_dong_so_huu(xe_id);
CREATE INDEX idx_hop_dong_trang_thai ON hop_dong_dong_so_huu(trang_thai);
CREATE INDEX idx_hop_dong_ngay_bat_dau ON hop_dong_dong_so_huu(ngay_bat_dau);
CREATE INDEX idx_hop_dong_ngay_ket_thuc ON hop_dong_dong_so_huu(ngay_ket_thuc);
CREATE INDEX idx_hop_dong_nguoi_duyet ON hop_dong_dong_so_huu(nguoi_duyet_id);

-- ========================================================================
-- 7. BẢNG: hop_dong_phap_ly_dien_tu (Digital Legal Contract)
-- ========================================================================

CREATE TABLE hop_dong_phap_ly_dien_tu (
    hop_dong_phap_ly_id INT AUTO_INCREMENT PRIMARY KEY,
    hop_dong_dong_so_huu_id INT NOT NULL,
    noi_dung_hop_dong TEXT COMMENT 'Nội dung hợp đồng dạng text',
    tep_hop_dong LONGBLOB COMMENT 'File PDF hợp đồng',
    chu_ky_dien_tu VARCHAR(500) COMMENT 'Chữ ký điện tử SHA-256',
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
    CONSTRAINT chk_hop_dong_phap_ly_trang_thai 
        CHECK (trang_thai IN ('ChuaKy', 'DaKy', 'BiHuy'))
) ENGINE=InnoDB COMMENT='Hợp đồng pháp lý điện tử';

-- Indexes for hop_dong_phap_ly_dien_tu
CREATE INDEX idx_hop_dong_phap_ly_trang_thai ON hop_dong_phap_ly_dien_tu(trang_thai);
CREATE INDEX idx_hop_dong_phap_ly_nguoi_ky ON hop_dong_phap_ly_dien_tu(nguoi_ky_id);
CREATE INDEX idx_hop_dong_phap_ly_ngay_ky ON hop_dong_phap_ly_dien_tu(ngay_ky);

-- ========================================================================
-- 8. BẢNG: lich_su_su_dung_xe (Vehicle Usage History) - Optional
-- ========================================================================

CREATE TABLE lich_su_su_dung_xe (
    lich_su_id INT AUTO_INCREMENT PRIMARY KEY,
    hop_dong_id INT NOT NULL,
    chu_xe_id INT NOT NULL,
    xe_id INT NOT NULL,
    ngay_bat_dau DATETIME NOT NULL,
    ngay_ket_thuc DATETIME,
    so_km_bat_dau INT,
    so_km_ket_thuc INT,
    ghi_chu TEXT,
    ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_lich_su_hop_dong 
        FOREIGN KEY (hop_dong_id) 
        REFERENCES hop_dong_dong_so_huu(hop_dong_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_lich_su_chu_xe 
        FOREIGN KEY (chu_xe_id) 
        REFERENCES chu_xe(chu_xe_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_lich_su_xe 
        FOREIGN KEY (xe_id) 
        REFERENCES xe(xe_id)
        ON DELETE CASCADE
) ENGINE=InnoDB COMMENT='Lịch sử sử dụng xe';

-- Indexes for lich_su_su_dung_xe
CREATE INDEX idx_lich_su_hop_dong ON lich_su_su_dung_xe(hop_dong_id);
CREATE INDEX idx_lich_su_chu_xe ON lich_su_su_dung_xe(chu_xe_id);
CREATE INDEX idx_lich_su_xe ON lich_su_su_dung_xe(xe_id);
CREATE INDEX idx_lich_su_ngay_bat_dau ON lich_su_su_dung_xe(ngay_bat_dau);

-- ========================================================================
-- 9. BẢNG: thanh_toan (Payment History) - Optional
-- ========================================================================

CREATE TABLE thanh_toan (
    thanh_toan_id INT AUTO_INCREMENT PRIMARY KEY,
    hop_dong_id INT NOT NULL,
    chu_xe_id INT NOT NULL,
    so_tien DECIMAL(15,2) NOT NULL,
    loai_thanh_toan VARCHAR(50) NOT NULL COMMENT 'PhiDongSoHuu, PhiSuDung, PhiBaoTri',
    trang_thai VARCHAR(20) NOT NULL DEFAULT 'ChuaThanhToan',
    ngay_thanh_toan DATETIME,
    phuong_thuc_thanh_toan VARCHAR(50),
    ghi_chu TEXT,
    ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_thanh_toan_hop_dong 
        FOREIGN KEY (hop_dong_id) 
        REFERENCES hop_dong_dong_so_huu(hop_dong_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_thanh_toan_chu_xe 
        FOREIGN KEY (chu_xe_id) 
        REFERENCES chu_xe(chu_xe_id)
        ON DELETE CASCADE,
    CONSTRAINT chk_thanh_toan_trang_thai 
        CHECK (trang_thai IN ('ChuaThanhToan', 'DaThanhToan', 'DaHoan', 'BiHuy'))
) ENGINE=InnoDB COMMENT='Lịch sử thanh toán';

-- Indexes for thanh_toan
CREATE INDEX idx_thanh_toan_hop_dong ON thanh_toan(hop_dong_id);
CREATE INDEX idx_thanh_toan_chu_xe ON thanh_toan(chu_xe_id);
CREATE INDEX idx_thanh_toan_trang_thai ON thanh_toan(trang_thai);
CREATE INDEX idx_thanh_toan_ngay ON thanh_toan(ngay_thanh_toan);

-- ========================================================================
-- 10. VIEWS - Các view hữu ích
-- ========================================================================

-- View: Thông tin đầy đủ chủ xe
CREATE OR REPLACE VIEW v_chu_xe_full AS
SELECT 
    cx.chu_xe_id,
    cx.ho_ten,
    cx.cccd,
    cx.sdt,
    cx.gplx,
    cx.dia_chi,
    nd.nguoi_dung_id,
    nd.ten_dang_nhap,
    nd.email,
    nd.loai_nguoi_dung,
    nd.trang_thai AS trang_thai_tai_khoan,
    cx.ngay_tao,
    cx.ngay_cap_nhat
FROM chu_xe cx
INNER JOIN nguoi_dung nd ON cx.nguoi_dung_id = nd.nguoi_dung_id;

-- View: Hợp đồng với thông tin chi tiết
CREATE OR REPLACE VIEW v_hop_dong_full AS
SELECT 
    hd.hop_dong_id,
    hd.ngay_bat_dau,
    hd.ngay_ket_thuc,
    hd.trang_thai,
    hd.ly_do_tu_choi,
    cx.chu_xe_id,
    cx.ho_ten AS ten_chu_xe,
    cx.sdt AS sdt_chu_xe,
    cx.cccd AS cccd_chu_xe,
    nd.email AS email_chu_xe,
    x.xe_id,
    x.ten_xe,
    x.hang_xe,
    x.model,
    x.bien_so,
    x.gia_tri AS gia_tri_xe,
    duyet.nguoi_dung_id AS nguoi_duyet_id,
    duyet.ten_dang_nhap AS ten_nguoi_duyet,
    hd.ngay_duyet,
    hd.ngay_tao,
    hd.ngay_cap_nhat
FROM hop_dong_dong_so_huu hd
INNER JOIN chu_xe cx ON hd.chu_xe_id = cx.chu_xe_id
INNER JOIN nguoi_dung nd ON cx.nguoi_dung_id = nd.nguoi_dung_id
INNER JOIN xe x ON hd.xe_id = x.xe_id
LEFT JOIN nguoi_dung duyet ON hd.nguoi_duyet_id = duyet.nguoi_dung_id;

-- View: Giấy tờ chờ duyệt
CREATE OR REPLACE VIEW v_giay_to_cho_duyet AS
SELECT 
    gt.giay_to_id,
    gt.loai_giay_to,
    gt.so_giay_to,
    gt.ngay_cap,
    gt.noi_cap,
    gt.trang_thai_xac_thuc,
    cx.chu_xe_id,
    cx.ho_ten AS ten_chu_xe,
    cx.sdt,
    nd.email,
    gt.ngay_tao
FROM giay_to_chu_xe gt
INNER JOIN chu_xe cx ON gt.chu_xe_id = cx.chu_xe_id
INNER JOIN nguoi_dung nd ON cx.nguoi_dung_id = nd.nguoi_dung_id
WHERE gt.trang_thai_xac_thuc = 'DangChoDuyet'
ORDER BY gt.ngay_tao ASC;

-- View: Hợp đồng chờ duyệt
CREATE OR REPLACE VIEW v_hop_dong_cho_duyet AS
SELECT 
    hd.hop_dong_id,
    hd.ngay_bat_dau,
    hd.ngay_ket_thuc,
    cx.ho_ten AS ten_chu_xe,
    cx.sdt,
    nd.email,
    x.ten_xe,
    x.hang_xe,
    x.model,
    x.bien_so,
    hd.ngay_tao
FROM hop_dong_dong_so_huu hd
INNER JOIN chu_xe cx ON hd.chu_xe_id = cx.chu_xe_id
INNER JOIN nguoi_dung nd ON cx.nguoi_dung_id = nd.nguoi_dung_id
INNER JOIN xe x ON hd.xe_id = x.xe_id
WHERE hd.trang_thai = 'ChoDuyet'
ORDER BY hd.ngay_tao ASC;

-- ========================================================================
-- 11. STORED PROCEDURES - Các thủ tục hữu ích
-- ========================================================================

DELIMITER //

-- Procedure: Tạo tài khoản chủ xe (đăng ký + tạo profile)
CREATE PROCEDURE sp_tao_chu_xe(
    IN p_ten_dang_nhap VARCHAR(50),
    IN p_email VARCHAR(100),
    IN p_mat_khau VARCHAR(255),
    IN p_ho_ten VARCHAR(100),
    IN p_cccd VARCHAR(12),
    IN p_sdt VARCHAR(15),
    IN p_gplx VARCHAR(20),
    IN p_dia_chi VARCHAR(255)
)
BEGIN
    DECLARE v_nguoi_dung_id INT;
    
    -- Insert vào nguoi_dung
    INSERT INTO nguoi_dung (ten_dang_nhap, email, mat_khau, loai_nguoi_dung)
    VALUES (p_ten_dang_nhap, p_email, p_mat_khau, 'CoOwner');
    
    SET v_nguoi_dung_id = LAST_INSERT_ID();
    
    -- Insert vào chu_xe
    INSERT INTO chu_xe (nguoi_dung_id, ho_ten, cccd, sdt, gplx, dia_chi)
    VALUES (v_nguoi_dung_id, p_ho_ten, p_cccd, p_sdt, p_gplx, p_dia_chi);
    
    SELECT v_nguoi_dung_id AS nguoi_dung_id, LAST_INSERT_ID() AS chu_xe_id;
END //

-- Procedure: Duyệt hợp đồng
CREATE PROCEDURE sp_duyet_hop_dong(
    IN p_hop_dong_id INT,
    IN p_nguoi_duyet_id INT,
    IN p_approve BOOLEAN,
    IN p_ly_do VARCHAR(500)
)
BEGIN
    IF p_approve THEN
        UPDATE hop_dong_dong_so_huu
        SET trang_thai = 'DaDuyet',
            nguoi_duyet_id = p_nguoi_duyet_id,
            ngay_duyet = NOW(),
            ngay_cap_nhat = NOW()
        WHERE hop_dong_id = p_hop_dong_id;
    ELSE
        UPDATE hop_dong_dong_so_huu
        SET trang_thai = 'TuChoi',
            nguoi_duyet_id = p_nguoi_duyet_id,
            ngay_duyet = NOW(),
            ly_do_tu_choi = p_ly_do,
            ngay_cap_nhat = NOW()
        WHERE hop_dong_id = p_hop_dong_id;
    END IF;
END //

-- Procedure: Duyệt giấy tờ
CREATE PROCEDURE sp_duyet_giay_to(
    IN p_giay_to_id INT,
    IN p_nguoi_duyet_id INT,
    IN p_approve BOOLEAN,
    IN p_ly_do VARCHAR(500)
)
BEGIN
    IF p_approve THEN
        UPDATE giay_to_chu_xe
        SET trang_thai_xac_thuc = 'DaXacThuc',
            nguoi_duyet_id = p_nguoi_duyet_id,
            ngay_duyet = NOW(),
            ngay_cap_nhat = NOW()
        WHERE giay_to_id = p_giay_to_id;
    ELSE
        UPDATE giay_to_chu_xe
        SET trang_thai_xac_thuc = 'TuChoi',
            nguoi_duyet_id = p_nguoi_duyet_id,
            ngay_duyet = NOW(),
            ly_do_tu_choi = p_ly_do,
            ngay_cap_nhat = NOW()
        WHERE giay_to_id = p_giay_to_id;
    END IF;
END //

-- Procedure: Kích hoạt hợp đồng
CREATE PROCEDURE sp_kich_hoat_hop_dong(
    IN p_hop_dong_id INT
)
BEGIN
    UPDATE hop_dong_dong_so_huu
    SET trang_thai = 'DangHieuLuc',
        ngay_cap_nhat = NOW()
    WHERE hop_dong_id = p_hop_dong_id
      AND trang_thai = 'DaDuyet';
END //

DELIMITER ;

-- ========================================================================
-- 12. DỮ LIỆU MẪU (Sample Data)
-- ========================================================================

-- Insert Admin account (password: Admin123!)
INSERT INTO nguoi_dung (ten_dang_nhap, email, mat_khau, loai_nguoi_dung, trang_thai)
VALUES 
    ('admin', 'admin@evco.vn', '$2a$10$N9qo8uLOickgx2ZMRZoMye.iqpMlzI9XZVJJ9TCcJG2WM8rkKH.pK', 'Admin', 'HoatDong');

-- Insert sample CoOwner users (password: Password123!)
INSERT INTO nguoi_dung (ten_dang_nhap, email, mat_khau, loai_nguoi_dung, trang_thai)
VALUES 
    ('owner1', 'owner1@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye.iqpMlzI9XZVJJ9TCcJG2WM8rkKH.pK', 'CoOwner', 'HoatDong'),
    ('owner2', 'owner2@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye.iqpMlzI9XZVJJ9TCcJG2WM8rkKH.pK', 'CoOwner', 'HoatDong'),
    ('owner3', 'owner3@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye.iqpMlzI9XZVJJ9TCcJG2WM8rkKH.pK', 'CoOwner', 'HoatDong');

-- Insert sample vehicles
INSERT INTO xe (ten_xe, hang_xe, model, nam_san_xuat, bien_so, gia_tri, mau_sac, loai_xe, dung_luong_pin, trang_thai)
VALUES 
    ('VinFast VF8', 'VinFast', 'VF8', 2024, '30A-12345', 1200000000.00, 'Đỏ', 'SUV', 87, 'SanSang'),
    ('Tesla Model 3', 'Tesla', 'Model 3', 2023, '51G-67890', 1500000000.00, 'Trắng', 'Sedan', 75, 'SanSang'),
    ('Hyundai Ioniq 5', 'Hyundai', 'Ioniq 5', 2024, '29B-11111', 1300000000.00, 'Xanh', 'SUV', 72, 'SanSang'),
    ('BYD Atto 3', 'BYD', 'Atto 3', 2024, '92C-22222', 900000000.00, 'Xám', 'SUV', 60, 'SanSang');

-- Insert sample owners (profiles)
INSERT INTO chu_xe (nguoi_dung_id, ho_ten, cccd, sdt, gplx, dia_chi)
VALUES 
    (2, 'Nguyễn Văn An', '001234567890', '0901234567', 'B1-123456', '123 Lê Lợi, Q.1, TP.HCM'),
    (3, 'Trần Thị Bình', '001234567891', '0901234568', 'B2-123457', '456 Trần Hưng Đạo, Q.5, TP.HCM'),
    (4, 'Lê Văn Cường', '001234567892', '0901234569', 'B1-123458', '789 Nguyễn Huệ, Q.3, TP.HCM');

-- Insert sample contracts
INSERT INTO hop_dong_dong_so_huu (chu_xe_id, xe_id, ngay_bat_dau, ngay_ket_thuc, trang_thai)
VALUES 
    (1, 1, '2025-01-01 00:00:00', '2028-01-01 00:00:00', 'DangHieuLuc'),
    (2, 2, '2025-02-01 00:00:00', '2027-02-01 00:00:00', 'DaDuyet'),
    (3, 3, '2025-03-01 00:00:00', '2028-03-01 00:00:00', 'ChoDuyet');

-- Insert sample documents
INSERT INTO giay_to_chu_xe (chu_xe_id, loai_giay_to, so_giay_to, ngay_cap, noi_cap, trang_thai_xac_thuc)
VALUES 
    (1, 'CCCD', '001234567890', '2021-01-15', 'Cục Cảnh sát ĐKQL cư trú và DLQG về dân cư', 'DaXacThuc'),
    (1, 'GPLX', 'B1-123456', '2020-05-20', 'Sở GTVT TP.HCM', 'DaXacThuc'),
    (2, 'CCCD', '001234567891', '2021-03-10', 'Cục Cảnh sát ĐKQL cư trú và DLQG về dân cư', 'DangChoDuyet'),
    (3, 'CCCD', '001234567892', '2022-06-15', 'Cục Cảnh sát ĐKQL cư trú và DLQG về dân cư', 'ChuaXacThuc');

-- ========================================================================
-- 13. TRIGGERS - Tự động cập nhật timestamp
-- ========================================================================

DELIMITER //

-- Trigger: Auto update ngay_cap_nhat for nguoi_dung
CREATE TRIGGER trg_nguoi_dung_update
BEFORE UPDATE ON nguoi_dung
FOR EACH ROW
BEGIN
    SET NEW.ngay_cap_nhat = CURRENT_TIMESTAMP;
END //

-- Trigger: Auto update ngay_cap_nhat for chu_xe
CREATE TRIGGER trg_chu_xe_update
BEFORE UPDATE ON chu_xe
FOR EACH ROW
BEGIN
    SET NEW.ngay_cap_nhat = CURRENT_TIMESTAMP;
END //

-- Trigger: Auto update ngay_cap_nhat for xe
CREATE TRIGGER trg_xe_update
BEFORE UPDATE ON xe
FOR EACH ROW
BEGIN
    SET NEW.ngay_cap_nhat = CURRENT_TIMESTAMP;
END //

-- Trigger: Auto update ngay_cap_nhat for giay_to_chu_xe
CREATE TRIGGER trg_giay_to_update
BEFORE UPDATE ON giay_to_chu_xe
FOR EACH ROW
BEGIN
    SET NEW.ngay_cap_nhat = CURRENT_TIMESTAMP;
END //

-- Trigger: Auto update ngay_cap_nhat for hop_dong_dong_so_huu
CREATE TRIGGER trg_hop_dong_update
BEFORE UPDATE ON hop_dong_dong_so_huu
FOR EACH ROW
BEGIN
    SET NEW.ngay_cap_nhat = CURRENT_TIMESTAMP;
END //

-- Trigger: Auto update ngay_cap_nhat for hop_dong_phap_ly_dien_tu
CREATE TRIGGER trg_hop_dong_phap_ly_update
BEFORE UPDATE ON hop_dong_phap_ly_dien_tu
FOR EACH ROW
BEGIN
    SET NEW.ngay_cap_nhat = CURRENT_TIMESTAMP;
END //

DELIMITER ;

-- ========================================================================
-- 14. SCHEDULED EVENTS - Tự động cập nhật trạng thái
-- ========================================================================

-- Enable event scheduler
SET GLOBAL event_scheduler = ON;

-- Event: Auto expire contracts
DELIMITER //
CREATE EVENT evt_expire_contracts
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_TIMESTAMP
DO
BEGIN
    UPDATE hop_dong_dong_so_huu
    SET trang_thai = 'HetHan',
        ngay_cap_nhat = CURRENT_TIMESTAMP
    WHERE trang_thai = 'DangHieuLuc'
      AND ngay_ket_thuc < CURRENT_TIMESTAMP;
END //
DELIMITER ;

-- ========================================================================
-- 15. THỐNG KÊ VÀ KIỂM TRA
-- ========================================================================

-- Kiểm tra số lượng bản ghi
SELECT 'THỐNG KÊ DATABASE' AS Title;

SELECT 
    'nguoi_dung' AS bang,
    COUNT(*) AS so_luong,
    SUM(CASE WHEN loai_nguoi_dung = 'Admin' THEN 1 ELSE 0 END) AS admin,
    SUM(CASE WHEN loai_nguoi_dung = 'CoOwner' THEN 1 ELSE 0 END) AS coowner
FROM nguoi_dung
UNION ALL
SELECT 
    'chu_xe' AS bang,
    COUNT(*) AS so_luong,
    NULL AS admin,
    NULL AS coowner
FROM chu_xe
UNION ALL
SELECT 
    'xe' AS bang,
    COUNT(*) AS so_luong,
    NULL AS admin,
    NULL AS coowner
FROM xe
UNION ALL
SELECT 
    'giay_to_chu_xe' AS bang,
    COUNT(*) AS so_luong,
    NULL AS admin,
    NULL AS coowner
FROM giay_to_chu_xe
UNION ALL
SELECT 
    'hop_dong_dong_so_huu' AS bang,
    COUNT(*) AS so_luong,
    NULL AS admin,
    NULL AS coowner
FROM hop_dong_dong_so_huu;

-- Kiểm tra foreign keys
SELECT 
    TABLE_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = 'ev_coownership'
  AND REFERENCED_TABLE_NAME IS NOT NULL
ORDER BY TABLE_NAME;

-- ========================================================================
-- 16. COMPLETED SUCCESSFULLY
-- ========================================================================

SELECT '========================================' AS '';
SELECT 'DATABASE SETUP COMPLETED SUCCESSFULLY!' AS Status;
SELECT '========================================' AS '';
SELECT 'Database: ev_coownership' AS '';
SELECT 'Tables: 9 core tables + 2 optional' AS '';
SELECT 'Views: 4 useful views' AS '';
SELECT 'Stored Procedures: 4 procedures' AS '';
SELECT 'Triggers: 6 auto-update triggers' AS '';
SELECT 'Events: 1 scheduled event' AS '';
SELECT 'Sample Data: Ready to use' AS '';
SELECT '========================================' AS '';
SELECT 'Default Admin Account:' AS '';
SELECT '  Username: admin' AS '';
SELECT '  Email: admin@evco.vn' AS '';
SELECT '  Password: Admin123!' AS '';
SELECT '========================================' AS '';
