-- ========================================================================
-- MIGRATION V1: Initial Database Setup
-- Hệ thống Đồng Sở Hữu Xe Điện (EV Co-Ownership Platform)
-- Date: 2025-11-02
-- Description: Tạo các bảng chính cho hệ thống (SQL Server)
-- ========================================================================

-- ========================================================================
-- 1. BẢNG: nguoi_dung
-- ========================================================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[nguoi_dung]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[nguoi_dung] (
        nguoi_dung_id INT IDENTITY(1,1) PRIMARY KEY,
        ten_dang_nhap NVARCHAR(50) NOT NULL UNIQUE,
        email NVARCHAR(100) NOT NULL UNIQUE,
        mat_khau NVARCHAR(255) NOT NULL, -- BCrypt encoded password
        loai_nguoi_dung NVARCHAR(20) NOT NULL DEFAULT 'CoOwner',
        ngay_tao DATETIME2 NOT NULL DEFAULT GETDATE(),
        trang_thai NVARCHAR(20) NOT NULL DEFAULT 'HoatDong',
        
        CONSTRAINT chk_nguoi_dung_loai 
            CHECK (loai_nguoi_dung IN ('Admin', 'CoOwner', 'Staff')),
        CONSTRAINT chk_nguoi_dung_trang_thai 
            CHECK (trang_thai IN ('HoatDong', 'Ngung'))
    );
    
    -- Indexes
    CREATE INDEX idx_nguoi_dung_email ON nguoi_dung(email);
    CREATE INDEX idx_nguoi_dung_ten_dang_nhap ON nguoi_dung(ten_dang_nhap);
    CREATE INDEX idx_nguoi_dung_loai ON nguoi_dung(loai_nguoi_dung);
END;
GO

-- ========================================================================
-- 2. BẢNG: chu_xe
-- ========================================================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[chu_xe]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[chu_xe] (
        chu_xe_id INT IDENTITY(1,1) PRIMARY KEY,
        nguoi_dung_id INT NOT NULL UNIQUE,
        ho_ten NVARCHAR(100) NOT NULL,
        cccd NVARCHAR(12),
        sdt NVARCHAR(15),
        gplx NVARCHAR(20),
        dia_chi NVARCHAR(255),
        ngay_tao DATETIME2 NOT NULL DEFAULT GETDATE(),
        ngay_cap_nhat DATETIME2,
        
        CONSTRAINT fk_chu_xe_nguoi_dung 
            FOREIGN KEY (nguoi_dung_id) 
            REFERENCES nguoi_dung(nguoi_dung_id) 
            ON DELETE CASCADE
    );
    
    -- Indexes
    CREATE INDEX idx_chu_xe_nguoi_dung ON chu_xe(nguoi_dung_id);
    CREATE INDEX idx_chu_xe_cccd ON chu_xe(cccd);
END;
GO

-- ========================================================================
-- 3. BẢNG: xe
-- ========================================================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[xe]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[xe] (
        xe_id INT IDENTITY(1,1) PRIMARY KEY,
        ten_xe NVARCHAR(100) NOT NULL,
        hang_xe NVARCHAR(50) NOT NULL,
        model NVARCHAR(50) NOT NULL,
        nam_san_xuat INT,
        bien_so NVARCHAR(20) UNIQUE,
        gia_tri DECIMAL(15,2) NOT NULL,
        mau_sac NVARCHAR(30),
        loai_xe NVARCHAR(50),
        dung_luong_pin INT, -- kWh
        trang_thai NVARCHAR(20) NOT NULL DEFAULT 'SanSang',
        ngay_tao DATETIME2 NOT NULL DEFAULT GETDATE(),
        ngay_cap_nhat DATETIME2,
        
        CONSTRAINT chk_xe_trang_thai 
            CHECK (trang_thai IN ('SanSang', 'DangSuDung', 'BaoTri', 'NgungHoatDong'))
    );
    
    -- Indexes
    CREATE INDEX idx_xe_bien_so ON xe(bien_so);
    CREATE INDEX idx_xe_trang_thai ON xe(trang_thai);
END;
GO

-- ========================================================================
-- 4. BẢNG: giay_to_chu_xe
-- ========================================================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[giay_to_chu_xe]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[giay_to_chu_xe] (
        giay_to_id INT IDENTITY(1,1) PRIMARY KEY,
        chu_xe_id INT NOT NULL,
        loai_giay_to NVARCHAR(50) NOT NULL, -- CCCD, GPLX, HoKhau
        so_giay_to NVARCHAR(50) NOT NULL,
        ngay_cap DATE,
        noi_cap NVARCHAR(200),
        hinh_anh_mat_truoc NVARCHAR(MAX), -- Base64 encoded image
        hinh_anh_mat_sau NVARCHAR(MAX), -- Base64 encoded image
        trang_thai_xac_thuc NVARCHAR(20) NOT NULL DEFAULT 'ChuaXacThuc',
        nguoi_duyet_id INT,
        ngay_duyet DATETIME2,
        ly_do_tu_choi NVARCHAR(500),
        ghi_chu NVARCHAR(500),
        ngay_tao DATETIME2 NOT NULL DEFAULT GETDATE(),
        ngay_cap_nhat DATETIME2,
        
        CONSTRAINT fk_giay_to_chu_xe 
            FOREIGN KEY (chu_xe_id) 
            REFERENCES chu_xe(chu_xe_id) 
            ON DELETE CASCADE,
        CONSTRAINT fk_giay_to_nguoi_duyet 
            FOREIGN KEY (nguoi_duyet_id) 
            REFERENCES nguoi_dung(nguoi_dung_id) 
            ON DELETE NO ACTION,
        CONSTRAINT chk_giay_to_trang_thai 
            CHECK (trang_thai_xac_thuc IN ('ChuaXacThuc', 'DangChoDuyet', 'DaXacThuc', 'TuChoi'))
    );
    
    -- Indexes
    CREATE INDEX idx_giay_to_chu_xe ON giay_to_chu_xe(chu_xe_id);
    CREATE INDEX idx_giay_to_trang_thai ON giay_to_chu_xe(trang_thai_xac_thuc);
    CREATE INDEX idx_giay_to_loai ON giay_to_chu_xe(loai_giay_to);
END;
GO

-- ========================================================================
-- 5. BẢNG: hop_dong_dong_so_huu
-- ========================================================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[hop_dong_dong_so_huu]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[hop_dong_dong_so_huu] (
        hop_dong_id INT IDENTITY(1,1) PRIMARY KEY,
        chu_xe_id INT NOT NULL,
        xe_id INT NOT NULL,
        ngay_bat_dau DATETIME2 NOT NULL,
        ngay_ket_thuc DATETIME2,
        trang_thai NVARCHAR(20) NOT NULL DEFAULT 'ChoDuyet',
        nguoi_duyet_id INT,
        ngay_duyet DATETIME2,
        ly_do_tu_choi NVARCHAR(500),
        ngay_tao DATETIME2 NOT NULL DEFAULT GETDATE(),
        ngay_cap_nhat DATETIME2,
        
        CONSTRAINT fk_hop_dong_chu_xe 
            FOREIGN KEY (chu_xe_id) 
            REFERENCES chu_xe(chu_xe_id) 
            ON DELETE CASCADE,
        CONSTRAINT fk_hop_dong_xe 
            FOREIGN KEY (xe_id) 
            REFERENCES xe(xe_id) 
            ON DELETE NO ACTION,
        CONSTRAINT fk_hop_dong_nguoi_duyet 
            FOREIGN KEY (nguoi_duyet_id) 
            REFERENCES nguoi_dung(nguoi_dung_id) 
            ON DELETE NO ACTION,
        CONSTRAINT chk_hop_dong_trang_thai 
            CHECK (trang_thai IN ('ChoDuyet', 'DaDuyet', 'TuChoi', 'DangHieuLuc', 'HetHan', 'DaHuy'))
    );
    
    -- Indexes
    CREATE INDEX idx_hop_dong_chu_xe ON hop_dong_dong_so_huu(chu_xe_id);
    CREATE INDEX idx_hop_dong_xe ON hop_dong_dong_so_huu(xe_id);
    CREATE INDEX idx_hop_dong_trang_thai ON hop_dong_dong_so_huu(trang_thai);
    CREATE INDEX idx_hop_dong_ngay_ket_thuc ON hop_dong_dong_so_huu(ngay_ket_thuc);
END;
GO

-- ========================================================================
-- 6. BẢNG: hop_dong_phap_ly_dien_tu
-- ========================================================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[hop_dong_phap_ly_dien_tu]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[hop_dong_phap_ly_dien_tu] (
        hop_dong_phap_ly_id INT IDENTITY(1,1) PRIMARY KEY,
        hop_dong_dong_so_huu_id INT NOT NULL,
        noi_dung_hop_dong NVARCHAR(MAX), -- Nội dung hợp đồng dạng text
        tep_hop_dong VARBINARY(MAX), -- File PDF hợp đồng
        chu_ky_dien_tu NVARCHAR(500), -- Chữ ký điện tử SHA-256
        nguoi_ky_id INT,
        ngay_ky DATETIME2,
        trang_thai NVARCHAR(20) NOT NULL DEFAULT 'ChuaKy',
        ngay_tao DATETIME2 NOT NULL DEFAULT GETDATE(),
        ngay_cap_nhat DATETIME2,
        
        CONSTRAINT fk_hop_dong_phap_ly_hop_dong 
            FOREIGN KEY (hop_dong_dong_so_huu_id) 
            REFERENCES hop_dong_dong_so_huu(hop_dong_id)
            ON DELETE NO ACTION,
        CONSTRAINT fk_hop_dong_phap_ly_nguoi_ky 
            FOREIGN KEY (nguoi_ky_id) 
            REFERENCES nguoi_dung(nguoi_dung_id)
            ON DELETE NO ACTION,
        CONSTRAINT uk_hop_dong_phap_ly_unique 
            UNIQUE (hop_dong_dong_so_huu_id),
        CONSTRAINT chk_hop_dong_phap_ly_trang_thai 
            CHECK (trang_thai IN ('ChuaKy', 'DaKy', 'BiHuy'))
    );
    
    -- Indexes
    CREATE INDEX idx_hop_dong_phap_ly_trang_thai ON hop_dong_phap_ly_dien_tu(trang_thai);
    CREATE INDEX idx_hop_dong_phap_ly_nguoi_ky ON hop_dong_phap_ly_dien_tu(nguoi_ky_id);
    CREATE INDEX idx_hop_dong_phap_ly_ngay_ky ON hop_dong_phap_ly_dien_tu(ngay_ky);
END;
GO

-- ========================================================================
-- 7. DỮ LIỆU MẪU
-- ========================================================================

-- Admin account (password: Admin123!)
IF NOT EXISTS (SELECT 1 FROM nguoi_dung WHERE email = 'admin@evco.vn')
BEGIN
    INSERT INTO nguoi_dung (ten_dang_nhap, email, mat_khau, loai_nguoi_dung, trang_thai)
    VALUES (N'admin', N'admin@evco.vn', N'$2a$10$N9qo8uLOickgx2ZMRZoMye.iqpMlzI9XZVJJ9TCcJG2WM8rkKH.pK', N'Admin', N'HoatDong');
END;
GO

-- Sample vehicles
IF NOT EXISTS (SELECT 1 FROM xe WHERE bien_so = '30A-12345')
BEGIN
    INSERT INTO xe (ten_xe, hang_xe, model, nam_san_xuat, bien_so, gia_tri, mau_sac, loai_xe, dung_luong_pin, trang_thai)
    VALUES 
        (N'VinFast VF8', N'VinFast', N'VF8', 2024, N'30A-12345', 1200000000.00, N'Đỏ', N'SUV', 87, N'SanSang'),
        (N'Tesla Model 3', N'Tesla', N'Model 3', 2023, N'51G-67890', 1500000000.00, N'Trắng', N'Sedan', 75, N'SanSang'),
        (N'Hyundai Ioniq 5', N'Hyundai', N'Ioniq 5', 2024, N'29B-11111', 1300000000.00, N'Xanh', N'SUV', 72, N'SanSang');
END;
GO
