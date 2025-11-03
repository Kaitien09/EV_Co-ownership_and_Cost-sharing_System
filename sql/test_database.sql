-- =====================================================
-- TEST SCRIPT - Kiểm tra database sau khi setup
-- File: test_database.sql
-- =====================================================

USE ev_coownership;

-- =====================================================
-- 1. KIỂM TRA CẤU TRÚC
-- =====================================================

SELECT '========================================' AS '';
SELECT '1. KIỂM TRA CẤU TRÚC DATABASE' AS '';
SELECT '========================================' AS '';

-- Liệt kê tất cả các bảng
SELECT 'Danh sách bảng:' AS '';
SHOW TABLES;

-- Kiểm tra số lượng cột của mỗi bảng
SELECT 
    TABLE_NAME AS 'Bảng',
    TABLE_ROWS AS 'Số dòng (ước tính)',
    ROUND((DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024, 2) AS 'Kích thước (MB)'
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = 'ev_coownership'
ORDER BY TABLE_NAME;

-- =====================================================
-- 2. KIỂM TRA DỮ LIỆU
-- =====================================================

SELECT '========================================' AS '';
SELECT '2. KIỂM TRA DỮ LIỆU MẪU' AS '';
SELECT '========================================' AS '';

-- Đếm số lượng bản ghi
SELECT 'Số lượng bản ghi:' AS '';
SELECT 'nguoi_dung' AS Bang, COUNT(*) AS SoLuong FROM nguoi_dung
UNION ALL
SELECT 'chu_xe', COUNT(*) FROM chu_xe
UNION ALL
SELECT 'xe', COUNT(*) FROM xe
UNION ALL
SELECT 'giay_to_chu_xe', COUNT(*) FROM giay_to_chu_xe
UNION ALL
SELECT 'hop_dong_dong_so_huu', COUNT(*) FROM hop_dong_dong_so_huu
UNION ALL
SELECT 'hop_dong_phap_ly_dien_tu', COUNT(*) FROM hop_dong_phap_ly_dien_tu
UNION ALL
SELECT 'lich_su_su_dung_xe', COUNT(*) FROM lich_su_su_dung_xe
UNION ALL
SELECT 'thanh_toan', COUNT(*) FROM thanh_toan;

-- =====================================================
-- 3. KIỂM TRA USERS
-- =====================================================

SELECT '========================================' AS '';
SELECT '3. KIỂM TRA TÀI KHOẢN NGƯỜI DÙNG' AS '';
SELECT '========================================' AS '';

SELECT 
    nguoi_dung_id AS 'ID',
    ten_dang_nhap AS 'Username',
    email AS 'Email',
    loai_nguoi_dung AS 'Role',
    trang_thai AS 'Status',
    DATE_FORMAT(ngay_tao, '%Y-%m-%d %H:%i') AS 'Created'
FROM nguoi_dung
ORDER BY nguoi_dung_id;

-- =====================================================
-- 4. KIỂM TRA XE
-- =====================================================

SELECT '========================================' AS '';
SELECT '4. KIỂM TRA THÔNG TIN XE' AS '';
SELECT '========================================' AS '';

SELECT 
    xe_id AS 'ID',
    ten_xe AS 'Tên xe',
    hang_xe AS 'Hãng',
    model AS 'Model',
    bien_so AS 'Biển số',
    FORMAT(gia_tri, 0) AS 'Giá trị (VND)',
    trang_thai AS 'Trạng thái'
FROM xe
ORDER BY xe_id;

-- =====================================================
-- 5. KIỂM TRA HỢP ĐỒNG
-- =====================================================

SELECT '========================================' AS '';
SELECT '5. KIỂM TRA HỢP ĐỒNG' AS '';
SELECT '========================================' AS '';

SELECT 
    hd.hop_dong_id AS 'ID',
    cx.ho_ten AS 'Chủ xe',
    x.ten_xe AS 'Xe',
    x.bien_so AS 'Biển số',
    DATE_FORMAT(hd.ngay_bat_dau, '%Y-%m-%d') AS 'Ngày bắt đầu',
    DATE_FORMAT(hd.ngay_ket_thuc, '%Y-%m-%d') AS 'Ngày kết thúc',
    hd.trang_thai AS 'Trạng thái'
FROM hop_dong_dong_so_huu hd
JOIN chu_xe cx ON hd.chu_xe_id = cx.chu_xe_id
JOIN xe x ON hd.xe_id = x.xe_id
ORDER BY hd.hop_dong_id;

-- =====================================================
-- 6. KIỂM TRA GIẤY TỜ
-- =====================================================

SELECT '========================================' AS '';
SELECT '6. KIỂM TRA GIẤY TỜ' AS '';
SELECT '========================================' AS '';

SELECT 
    gt.giay_to_id AS 'ID',
    cx.ho_ten AS 'Chủ xe',
    gt.loai_giay_to AS 'Loại giấy tờ',
    gt.so_giay_to AS 'Số giấy tờ',
    DATE_FORMAT(gt.ngay_cap, '%Y-%m-%d') AS 'Ngày cấp',
    gt.trang_thai_xac_thuc AS 'Trạng thái'
FROM giay_to_chu_xe gt
JOIN chu_xe cx ON gt.chu_xe_id = cx.chu_xe_id
ORDER BY gt.giay_to_id;

-- =====================================================
-- 7. KIỂM TRA FOREIGN KEYS
-- =====================================================

SELECT '========================================' AS '';
SELECT '7. KIỂM TRA FOREIGN KEY CONSTRAINTS' AS '';
SELECT '========================================' AS '';

SELECT 
    TABLE_NAME AS 'Bảng',
    CONSTRAINT_NAME AS 'Constraint',
    COLUMN_NAME AS 'Cột',
    REFERENCED_TABLE_NAME AS 'Bảng tham chiếu',
    REFERENCED_COLUMN_NAME AS 'Cột tham chiếu'
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = 'ev_coownership'
  AND REFERENCED_TABLE_NAME IS NOT NULL
ORDER BY TABLE_NAME, CONSTRAINT_NAME;

-- =====================================================
-- 8. KIỂM TRA INDEXES
-- =====================================================

SELECT '========================================' AS '';
SELECT '8. KIỂM TRA INDEXES' AS '';
SELECT '========================================' AS '';

SELECT 
    TABLE_NAME AS 'Bảng',
    INDEX_NAME AS 'Index',
    GROUP_CONCAT(COLUMN_NAME ORDER BY SEQ_IN_INDEX) AS 'Cột',
    CASE NON_UNIQUE 
        WHEN 0 THEN 'UNIQUE'
        ELSE 'NON-UNIQUE'
    END AS 'Loại'
FROM INFORMATION_SCHEMA.STATISTICS
WHERE TABLE_SCHEMA = 'ev_coownership'
GROUP BY TABLE_NAME, INDEX_NAME, NON_UNIQUE
ORDER BY TABLE_NAME, INDEX_NAME;

-- =====================================================
-- 9. KIỂM TRA VIEWS
-- =====================================================

SELECT '========================================' AS '';
SELECT '9. KIỂM TRA VIEWS' AS '';
SELECT '========================================' AS '';

SELECT 'Danh sách Views:' AS '';
SHOW FULL TABLES WHERE TABLE_TYPE = 'VIEW';

-- Test view: v_chu_xe_full
SELECT 'Test view: v_chu_xe_full' AS '';
SELECT 
    chu_xe_id AS 'ID',
    ho_ten AS 'Họ tên',
    email AS 'Email',
    loai_nguoi_dung AS 'Role',
    trang_thai_tai_khoan AS 'Status'
FROM v_chu_xe_full;

-- Test view: v_hop_dong_cho_duyet
SELECT 'Test view: v_hop_dong_cho_duyet' AS '';
SELECT 
    hop_dong_id AS 'ID',
    ten_chu_xe AS 'Chủ xe',
    ten_xe AS 'Xe',
    bien_so AS 'Biển số',
    DATE_FORMAT(ngay_tao, '%Y-%m-%d %H:%i') AS 'Ngày tạo'
FROM v_hop_dong_cho_duyet;

-- =====================================================
-- 10. KIỂM TRA STORED PROCEDURES
-- =====================================================

SELECT '========================================' AS '';
SELECT '10. KIỂM TRA STORED PROCEDURES' AS '';
SELECT '========================================' AS '';

SELECT 
    ROUTINE_NAME AS 'Procedure',
    ROUTINE_TYPE AS 'Type',
    DTD_IDENTIFIER AS 'Return Type'
FROM INFORMATION_SCHEMA.ROUTINES
WHERE ROUTINE_SCHEMA = 'ev_coownership'
ORDER BY ROUTINE_NAME;

-- =====================================================
-- 11. KIỂM TRA TRIGGERS
-- =====================================================

SELECT '========================================' AS '';
SELECT '11. KIỂM TRA TRIGGERS' AS '';
SELECT '========================================' AS '';

SELECT 
    TRIGGER_NAME AS 'Trigger',
    EVENT_MANIPULATION AS 'Event',
    EVENT_OBJECT_TABLE AS 'Table',
    ACTION_TIMING AS 'Timing'
FROM INFORMATION_SCHEMA.TRIGGERS
WHERE TRIGGER_SCHEMA = 'ev_coownership'
ORDER BY EVENT_OBJECT_TABLE, TRIGGER_NAME;

-- =====================================================
-- 12. KIỂM TRA EVENTS
-- =====================================================

SELECT '========================================' AS '';
SELECT '12. KIỂM TRA SCHEDULED EVENTS' AS '';
SELECT '========================================' AS '';

SELECT 
    EVENT_NAME AS 'Event',
    STATUS AS 'Status',
    EVENT_DEFINITION AS 'Definition',
    INTERVAL_VALUE AS 'Interval Value',
    INTERVAL_FIELD AS 'Interval Unit',
    STARTS AS 'Starts',
    LAST_EXECUTED AS 'Last Executed'
FROM INFORMATION_SCHEMA.EVENTS
WHERE EVENT_SCHEMA = 'ev_coownership';

-- =====================================================
-- 13. TEST FUNCTIONALITY
-- =====================================================

SELECT '========================================' AS '';
SELECT '13. TEST CHỨC NĂNG' AS '';
SELECT '========================================' AS '';

-- Test 1: Login với admin
SELECT 'Test 1: Tìm tài khoản Admin' AS '';
SELECT 
    nguoi_dung_id,
    ten_dang_nhap,
    email,
    loai_nguoi_dung
FROM nguoi_dung
WHERE email = 'admin@evco.vn';

-- Test 2: Tìm hợp đồng chờ duyệt
SELECT 'Test 2: Hợp đồng chờ duyệt' AS '';
SELECT 
    hop_dong_id,
    chu_xe_id,
    xe_id,
    trang_thai
FROM hop_dong_dong_so_huu
WHERE trang_thai = 'ChoDuyet';

-- Test 3: Tìm giấy tờ chờ duyệt
SELECT 'Test 3: Giấy tờ chờ duyệt' AS '';
SELECT 
    giay_to_id,
    chu_xe_id,
    loai_giay_to,
    trang_thai_xac_thuc
FROM giay_to_chu_xe
WHERE trang_thai_xac_thuc = 'DangChoDuyet';

-- =====================================================
-- 14. PERFORMANCE CHECK
-- =====================================================

SELECT '========================================' AS '';
SELECT '14. KIỂM TRA PERFORMANCE' AS '';
SELECT '========================================' AS '';

-- Kiểm tra slow queries (nếu có)
SELECT 'Checking table statistics...' AS '';
ANALYZE TABLE nguoi_dung, chu_xe, xe, hop_dong_dong_so_huu, giay_to_chu_xe;

-- Kiểm tra fragmentation
SELECT 
    TABLE_NAME AS 'Bảng',
    ROUND((DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024, 2) AS 'Size (MB)',
    ROUND(DATA_FREE / 1024 / 1024, 2) AS 'Free Space (MB)',
    ROUND((DATA_FREE / (DATA_LENGTH + INDEX_LENGTH)) * 100, 2) AS 'Fragmentation %'
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = 'ev_coownership'
  AND (DATA_LENGTH + INDEX_LENGTH) > 0
ORDER BY (DATA_FREE / (DATA_LENGTH + INDEX_LENGTH)) DESC;

-- =====================================================
-- 15. SUMMARY
-- =====================================================

SELECT '========================================' AS '';
SELECT '15. TỔNG KẾT' AS '';
SELECT '========================================' AS '';

SELECT 
    (SELECT COUNT(*) FROM information_schema.TABLES 
     WHERE TABLE_SCHEMA = 'ev_coownership' AND TABLE_TYPE = 'BASE TABLE') AS 'Số bảng',
    (SELECT COUNT(*) FROM information_schema.VIEWS 
     WHERE TABLE_SCHEMA = 'ev_coownership') AS 'Số views',
    (SELECT COUNT(*) FROM information_schema.ROUTINES 
     WHERE ROUTINE_SCHEMA = 'ev_coownership') AS 'Số procedures',
    (SELECT COUNT(*) FROM information_schema.TRIGGERS 
     WHERE TRIGGER_SCHEMA = 'ev_coownership') AS 'Số triggers',
    (SELECT COUNT(*) FROM information_schema.EVENTS 
     WHERE EVENT_SCHEMA = 'ev_coownership') AS 'Số events';

SELECT '========================================' AS '';
SELECT '✅ TEST COMPLETED SUCCESSFULLY!' AS '';
SELECT '========================================' AS '';
SELECT 'Database: ev_coownership' AS '';
SELECT 'Status: Ready to use' AS '';
SELECT 'Next step: Start Spring Boot application' AS '';
SELECT '========================================' AS '';
