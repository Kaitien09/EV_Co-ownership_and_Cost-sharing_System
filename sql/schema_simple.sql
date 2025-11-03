-- ================================================
-- SCHEMA ĐƠNGIẢN CHO HỆ THỐNG ĐỒNG SỞ HỮU XE ĐIỆN
-- 4 Bảng theo ERD mới
-- Database: SQL Server
-- ================================================

USE master;
GO

-- Tạo database nếu chưa có
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'ev_coownership')
BEGIN
    CREATE DATABASE ev_coownership;
END
GO

USE ev_coownership;
GO

-- ================================================
-- DROP TABLES (Nếu đã tồn tại)
-- ================================================

IF OBJECT_ID('hop_dong_phap_ly_dien_tu', 'U') IS NOT NULL
    DROP TABLE hop_dong_phap_ly_dien_tu;

IF OBJECT_ID('hop_dong_dong_so_huu', 'U') IS NOT NULL
    DROP TABLE hop_dong_dong_so_huu;

IF OBJECT_ID('chu_xe', 'U') IS NOT NULL
    DROP TABLE chu_xe;

IF OBJECT_ID('nguoi_dung', 'U') IS NOT NULL
    DROP TABLE nguoi_dung;

GO

-- ================================================
-- 1. BẢNG: nguoi_dung
-- ================================================

CREATE TABLE nguoi_dung (
    nguoi_dung_id INT PRIMARY KEY IDENTITY(1,1),
    ten_dang_nhap VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    mat_khau VARCHAR(255) NOT NULL,
    loai_nguoi_dung VARCHAR(20) NOT NULL DEFAULT 'CoOwner',
    ngay_tao DATETIME NOT NULL DEFAULT GETDATE(),
    trang_thai VARCHAR(20) NOT NULL DEFAULT 'HoatDong',
    
    CONSTRAINT CK_nguoi_dung_loai CHECK (loai_nguoi_dung IN ('Admin', 'CoOwner', 'Staff')),
    CONSTRAINT CK_nguoi_dung_trang_thai CHECK (trang_thai IN ('HoatDong', 'Ngung'))
);

-- Indexes
CREATE INDEX IX_nguoi_dung_email ON nguoi_dung(email);
CREATE INDEX IX_nguoi_dung_ten_dang_nhap ON nguoi_dung(ten_dang_nhap);
CREATE INDEX IX_nguoi_dung_loai ON nguoi_dung(loai_nguoi_dung);

GO

-- ================================================
-- 2. BẢNG: chu_xe
-- ================================================

CREATE TABLE chu_xe (
    chu_xe_id INT PRIMARY KEY IDENTITY(1,1),
    nguoi_dung_id INT NOT NULL UNIQUE,
    ho_ten NVARCHAR(100) NOT NULL,
    cccd VARCHAR(12),
    sdt VARCHAR(15),
    gplx VARCHAR(20),
    dia_chi NVARCHAR(255),
    
    CONSTRAINT FK_chu_xe_nguoi_dung 
        FOREIGN KEY (nguoi_dung_id) 
        REFERENCES nguoi_dung(nguoi_dung_id) 
        ON DELETE CASCADE
);

-- Indexes
CREATE INDEX IX_chu_xe_nguoi_dung ON chu_xe(nguoi_dung_id);
CREATE INDEX IX_chu_xe_cccd ON chu_xe(cccd) WHERE cccd IS NOT NULL;

GO

-- ================================================
-- 3. BẢNG: hop_dong_dong_so_huu
-- ================================================

CREATE TABLE hop_dong_dong_so_huu (
    hop_dong_id INT PRIMARY KEY IDENTITY(1,1),
    xe_id INT NOT NULL,
    chu_xe_id INT NOT NULL,
    ngay_bat_dau DATETIME NOT NULL,
    ngay_ket_thuc DATETIME,
    
    CONSTRAINT FK_hop_dong_chu_xe 
        FOREIGN KEY (chu_xe_id) 
        REFERENCES chu_xe(chu_xe_id) 
        ON DELETE NO ACTION
);

-- Indexes
CREATE INDEX IX_hop_dong_xe ON hop_dong_dong_so_huu(xe_id);
CREATE INDEX IX_hop_dong_chu_xe ON hop_dong_dong_so_huu(chu_xe_id);
CREATE INDEX IX_hop_dong_ngay_bat_dau ON hop_dong_dong_so_huu(ngay_bat_dau);

GO

-- ================================================
-- 4. BẢNG: hop_dong_phap_ly_dien_tu
-- ================================================

CREATE TABLE hop_dong_phap_ly_dien_tu (
    hop_dong_id INT PRIMARY KEY IDENTITY(1,1),
    nhom_id INT NOT NULL,
    xe_id INT NOT NULL,
    ngay_bat_dau DATE NOT NULL,
    ngay_ket_thuc DATE,
    trang_thai VARCHAR(20) NOT NULL DEFAULT 'HoatDong',
    
    CONSTRAINT CK_phap_ly_trang_thai CHECK (trang_thai IN ('HoatDong', 'Ngung'))
);

-- Indexes
CREATE INDEX IX_phap_ly_nhom ON hop_dong_phap_ly_dien_tu(nhom_id);
CREATE INDEX IX_phap_ly_xe ON hop_dong_phap_ly_dien_tu(xe_id);
CREATE INDEX IX_phap_ly_trang_thai ON hop_dong_phap_ly_dien_tu(trang_thai);

GO

-- ================================================
-- SAMPLE DATA (Dữ liệu mẫu)
-- ================================================

-- Insert sample users
INSERT INTO nguoi_dung (ten_dang_nhap, email, mat_khau, loai_nguoi_dung, trang_thai)
VALUES 
    ('admin', 'admin@evco.vn', '$2a$10$N9qo8uLOickgx2ZMRZoMy.WbQZxQz9Jz.JfVYsVj4A5xPxPV9mD8C', 'Admin', 'HoatDong'),
    ('owner1', 'owner1@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy.WbQZxQz9Jz.JfVYsVj4A5xPxPV9mD8C', 'CoOwner', 'HoatDong'),
    ('owner2', 'owner2@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy.WbQZxQz9Jz.JfVYsVj4A5xPxPV9mD8C', 'CoOwner', 'HoatDong');

-- Insert sample owners
INSERT INTO chu_xe (nguoi_dung_id, ho_ten, cccd, sdt, gplx, dia_chi)
VALUES 
    (2, N'Nguyễn Văn A', '001234567890', '0901234567', 'B1-123456', N'123 Lê Lợi, Q.1, TP.HCM'),
    (3, N'Trần Thị B', '001234567891', '0901234568', 'B2-123457', N'456 Trần Hưng Đạo, Q.5, TP.HCM');

-- Insert sample contracts
INSERT INTO hop_dong_dong_so_huu (xe_id, chu_xe_id, ngay_bat_dau, ngay_ket_thuc)
VALUES 
    (1, 1, GETDATE(), DATEADD(YEAR, 3, GETDATE())),
    (2, 2, GETDATE(), DATEADD(YEAR, 2, GETDATE()));

-- Insert sample legal contracts
INSERT INTO hop_dong_phap_ly_dien_tu (nhom_id, xe_id, ngay_bat_dau, ngay_ket_thuc, trang_thai)
VALUES 
    (1, 1, CAST(GETDATE() AS DATE), DATEADD(YEAR, 3, CAST(GETDATE() AS DATE)), 'HoatDong'),
    (1, 2, CAST(GETDATE() AS DATE), DATEADD(YEAR, 2, CAST(GETDATE() AS DATE)), 'HoatDong');

GO

-- ================================================
-- VIEWS (Optional)
-- ================================================

CREATE VIEW vw_chu_xe_info AS
SELECT 
    cx.chu_xe_id,
    cx.ho_ten,
    cx.cccd,
    cx.sdt,
    cx.gplx,
    cx.dia_chi,
    nd.ten_dang_nhap,
    nd.email,
    nd.loai_nguoi_dung,
    nd.trang_thai
FROM chu_xe cx
INNER JOIN nguoi_dung nd ON cx.nguoi_dung_id = nd.nguoi_dung_id;

GO

CREATE VIEW vw_hop_dong_info AS
SELECT 
    hd.hop_dong_id,
    hd.xe_id,
    hd.ngay_bat_dau,
    hd.ngay_ket_thuc,
    cx.ho_ten AS ten_chu_xe,
    cx.sdt AS sdt_chu_xe,
    nd.email AS email_chu_xe
FROM hop_dong_dong_so_huu hd
INNER JOIN chu_xe cx ON hd.chu_xe_id = cx.chu_xe_id
INNER JOIN nguoi_dung nd ON cx.nguoi_dung_id = nd.nguoi_dung_id;

GO

-- ================================================
-- STORED PROCEDURES (Optional)
-- ================================================

CREATE PROCEDURE sp_get_hop_dong_by_chu_xe
    @chu_xe_id INT
AS
BEGIN
    SELECT * FROM vw_hop_dong_info
    WHERE ten_chu_xe IN (
        SELECT ho_ten FROM chu_xe WHERE chu_xe_id = @chu_xe_id
    );
END;

GO

PRINT 'Schema created successfully!';
PRINT 'Tables: nguoi_dung, chu_xe, hop_dong_dong_so_huu, hop_dong_phap_ly_dien_tu';
PRINT 'Sample data inserted.';
