-- ========================================================================
-- SCRIPT KIỂM TRA DỮ LIỆU TRONG DATABASE
-- ========================================================================

-- 1. Kiểm tra bảng nguoi_dung
SELECT * FROM nguoi_dung;

-- 2. Kiểm tra bảng chu_xe
SELECT * FROM chu_xe;

-- 3. Kiểm tra bảng xe (QUAN TRỌNG!)
SELECT * FROM xe;

-- 4. Kiểm tra hợp đồng hiện tại
SELECT * FROM hop_dong_dong_so_huu;

-- 5. Kiểm tra foreign key constraints
SELECT 
    fk.name AS ForeignKey,
    tp.name AS ParentTable,
    cp.name AS ParentColumn,
    tr.name AS ReferencedTable,
    cr.name AS ReferencedColumn
FROM sys.foreign_keys AS fk
INNER JOIN sys.tables AS tp ON fk.parent_object_id = tp.object_id
INNER JOIN sys.foreign_key_columns AS fkc ON fk.object_id = fkc.constraint_object_id
INNER JOIN sys.columns AS cp ON fkc.parent_column_id = cp.column_id AND fkc.parent_object_id = cp.object_id
INNER JOIN sys.tables AS tr ON fk.referenced_object_id = tr.object_id
INNER JOIN sys.columns AS cr ON fkc.referenced_column_id = cr.column_id AND fkc.referenced_object_id = cr.object_id
WHERE tp.name IN ('chu_xe', 'hop_dong_dong_so_huu', 'giay_to_chu_xe', 'hop_dong_phap_ly_dien_tu');

-- 6. Nếu không có dữ liệu xe, chạy lệnh này:
-- INSERT INTO xe (ten_xe, hang_xe, model, nam_san_xuat, bien_so, gia_tri, mau_sac, loai_xe, dung_luong_pin, trang_thai)
-- VALUES 
--     (N'VinFast VF8', N'VinFast', N'VF8', 2024, N'30A-12345', 1200000000.00, N'Đỏ', N'SUV', 87, N'SanSang'),
--     (N'Tesla Model 3', N'Tesla', N'Model 3', 2023, N'51G-67890', 1500000000.00, N'Trắng', N'Sedan', 75, N'SanSang'),
--     (N'Hyundai Ioniq 5', N'Hyundai', N'Ioniq 5', 2024, N'29B-11111', 1300000000.00, N'Xanh', N'SUV', 72, N'SanSang');
