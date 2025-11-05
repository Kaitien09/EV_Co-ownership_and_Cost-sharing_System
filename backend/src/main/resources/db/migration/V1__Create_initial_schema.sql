-- 1. Bảng người dùng
CREATE TABLE NguoiDung (
    nguoiDungId INT PRIMARY KEY AUTO_INCREMENT,
    tenDangNhap VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    matKhau VARCHAR(255) NOT NULL,
    loaiNguoiDung ENUM('Admin','CoOwner','Staff') NOT NULL,
    ngayTao DATETIME DEFAULT CURRENT_TIMESTAMP,
    trangThai ENUM('HoatDong','Ngung') DEFAULT 'HoatDong'
);

-- 2. Bảng chủ xe
CREATE TABLE ChuXe (
    chuXeId INT PRIMARY KEY AUTO_INCREMENT,
    nguoiDungId INT UNIQUE NOT NULL,
    hoTen NVARCHAR(100) NOT NULL,
    cccd VARCHAR(12) UNIQUE,
    sdt VARCHAR(15),
    gplx VARCHAR(20),
    diaChi NVARCHAR(255),
    FOREIGN KEY (nguoiDungId) REFERENCES NguoiDung(nguoiDungId)
);

-- 3. Bảng xe điện
CREATE TABLE XeDien (
    xeId INT PRIMARY KEY AUTO_INCREMENT,
    vin VARCHAR(17) UNIQUE NOT NULL,
    model VARCHAR(50) NOT NULL,
    bienSo VARCHAR(20) UNIQUE NOT NULL,
    trangThai ENUM('DangTrong','DangHoatDong','DangBaoTri') DEFAULT 'DangTrong'
);