-- =====================================================
-- Migration 002: Document Verification System
-- Purpose: Add giay_to_chu_xe table for vehicle owner document verification
-- Date: 2025-10-26
-- =====================================================

-- Create giay_to_chu_xe table
CREATE TABLE giay_to_chu_xe (
    id INT PRIMARY KEY IDENTITY(1,1),
    chu_xe_id INT NOT NULL,
    loai_giay_to NVARCHAR(50) NOT NULL, -- CCCD, GPLX, HoKhau, etc.
    so_giay_to NVARCHAR(50) NOT NULL,
    hinh_anh_mat_truoc NVARCHAR(MAX), -- Base64 encoded image
    hinh_anh_mat_sau NVARCHAR(MAX), -- Base64 encoded image
    ngay_cap DATE,
    noi_cap NVARCHAR(200),
    trang_thai_xac_thuc VARCHAR(20) DEFAULT 'ChuaXacThuc', -- ChuaXacThuc, DangChoDuyet, DaXacThuc, TuChoi
    nguoi_duyet INT NULL,
    ngay_duyet DATETIME NULL,
    ly_do_tu_choi NVARCHAR(500),
    ghi_chu NVARCHAR(500),
    ngay_tao DATETIME DEFAULT GETDATE(),
    ngay_cap_nhat DATETIME DEFAULT GETDATE(),
    
    -- Foreign Keys
    CONSTRAINT FK_GiayTo_ChuXe FOREIGN KEY (chu_xe_id) REFERENCES chu_xe(chu_xe_id) ON DELETE CASCADE,
    CONSTRAINT FK_GiayTo_NguoiDuyet FOREIGN KEY (nguoi_duyet) REFERENCES nguoi_dung(nguoi_dung_id),
    
    -- Constraints
    CONSTRAINT CHK_TrangThaiXacThuc CHECK (trang_thai_xac_thuc IN ('ChuaXacThuc', 'DangChoDuyet', 'DaXacThuc', 'TuChoi'))
);

-- Create indexes for better query performance
CREATE INDEX IDX_GiayTo_ChuXeId ON giay_to_chu_xe(chu_xe_id);
CREATE INDEX IDX_GiayTo_TrangThai ON giay_to_chu_xe(trang_thai_xac_thuc);
CREATE INDEX IDX_GiayTo_LoaiGiayTo ON giay_to_chu_xe(loai_giay_to);

-- Comments
EXEC sp_addextendedproperty 
    @name = N'MS_Description', @value = 'Quản lý giấy tờ và xác thực chủ xe',
    @level0type = N'SCHEMA', @level0name = 'dbo',
    @level1type = N'TABLE', @level1name = 'giay_to_chu_xe';

EXEC sp_addextendedproperty 
    @name = N'MS_Description', @value = 'Hình ảnh mặt trước được mã hóa Base64',
    @level0type = N'SCHEMA', @level0name = 'dbo',
    @level1type = N'TABLE', @level1name = 'giay_to_chu_xe',
    @level2type = N'COLUMN', @level2name = 'hinh_anh_mat_truoc';

EXEC sp_addextendedproperty 
    @name = N'MS_Description', @value = 'Hình ảnh mặt sau được mã hóa Base64',
    @level0type = N'SCHEMA', @level0name = 'dbo',
    @level1type = N'TABLE', @level1name = 'giay_to_chu_xe',
    @level2type = N'COLUMN', @level2name = 'hinh_anh_mat_sau';
