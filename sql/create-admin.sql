-- Tạo tài khoản Admin trực tiếp trong database
-- Password: Admin123! (đã được encode bằng BCrypt)

INSERT INTO nguoi_dung (ten_dang_nhap, email, mat_khau, loai_nguoi_dung, trang_thai, ngay_tao)
VALUES (
    'admin1',
    'admin@example.com',
    '$2a$10$XQhb3fFZ5PYzN9JxN3fZ5OYzN9JxN3fZ5OYzN9JxN3fZ5OYzN9JxN',  -- Thay bằng mật khẩu đã encode
    'Admin',
    'HoatDong',
    CURRENT_TIMESTAMP
);

-- Hoặc nếu bạn đã có user ID 5, update role:
UPDATE nguoi_dung 
SET loai_nguoi_dung = 'Admin' 
WHERE email = 'admin@example.com';
