-- ================================================
-- MIGRATION 001: Thêm Workflow cho Hợp Đồng
-- Date: 26/10/2025
-- Description: Thêm 4 fields để quản lý workflow duyệt hợp đồng
-- ================================================

USE ev_coownership;
GO

-- Thêm các cột mới vào bảng hop_dong_dong_so_huu
ALTER TABLE hop_dong_dong_so_huu 
ADD trang_thai VARCHAR(20) NOT NULL DEFAULT 'ChoDuyet',
    nguoi_duyet INT NULL,
    ngay_duyet DATETIME NULL,
    ly_do_tu_choi NVARCHAR(500) NULL;
GO

-- Thêm constraint cho trạng thái
ALTER TABLE hop_dong_dong_so_huu
ADD CONSTRAINT CK_hop_dong_trang_thai 
    CHECK (trang_thai IN ('ChoDuyet', 'DaDuyet', 'TuChoi', 'DangHieuLuc', 'HetHan'));
GO

-- Thêm index cho trạng thái (để query nhanh)
CREATE INDEX IX_hop_dong_trang_thai ON hop_dong_dong_so_huu(trang_thai);
GO

-- Thêm index cho ngày kết thúc (để auto-expire)
CREATE INDEX IX_hop_dong_ngay_ket_thuc ON hop_dong_dong_so_huu(ngay_ket_thuc)
WHERE trang_thai = 'DangHieuLuc';
GO

-- Cập nhật dữ liệu cũ (nếu có) sang trạng thái mặc định
UPDATE hop_dong_dong_so_huu 
SET trang_thai = 'ChoDuyet'
WHERE trang_thai IS NULL;
GO

PRINT 'Migration 001 completed successfully!';
PRINT 'Added 4 new fields to hop_dong_dong_so_huu table:';
PRINT '  - trang_thai (VARCHAR 20)';
PRINT '  - nguoi_duyet (INT)';
PRINT '  - ngay_duyet (DATETIME)';
PRINT '  - ly_do_tu_choi (NVARCHAR 500)';
