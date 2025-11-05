-- 4. Bảng nhóm đồng sở hữu
CREATE TABLE NhomDongSoHuu (
    nhomId INT PRIMARY KEY AUTO_INCREMENT,
    tenNhom NVARCHAR(100) NOT NULL,
    ngayTao DATETIME DEFAULT CURRENT_TIMESTAMP,
    trangThai ENUM('HoatDong','Ngung') DEFAULT 'HoatDong'
);

-- 5. Bảng thành viên nhóm
CREATE TABLE ThanhVienNhom (
    thanhVienNhomId INT PRIMARY KEY AUTO_INCREMENT,
    chuXeId INT NOT NULL,
    nhomId INT NOT NULL,
    xeId INT NOT NULL,
    tyLeSoHuu DECIMAL(5,2) NOT NULL CHECK (tyLeSoHuu > 0 AND tyLeSoHuu <= 100),
    vaiTro ENUM('TruongNhom','ThanhVien') DEFAULT 'ThanhVien',
    ngayThamGia DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_thanh_vien_xe (chuXeId, nhomId, xeId),
    FOREIGN KEY (chuXeId) REFERENCES ChuXe(chuXeId),
    FOREIGN KEY (nhomId) REFERENCES NhomDongSoHuu(nhomId),
    FOREIGN KEY (xeId) REFERENCES XeDien(xeId)
);

-- 6. Bảng hợp đồng đồng sở hữu
CREATE TABLE HopDongDongSoHuu (
    hopDongId INT PRIMARY KEY AUTO_INCREMENT,
    nhomId INT NOT NULL,
    xeId INT UNIQUE NOT NULL,
    ngayBatDau DATETIME NOT NULL,
    ngayKetThuc DATETIME,
    trangThai ENUM('DangHieuLuc','DaKetThuc') DEFAULT 'DangHieuLuc',
    FOREIGN KEY (nhomId) REFERENCES NhomDongSoHuu(nhomId),
    FOREIGN KEY (xeId) REFERENCES XeDien(xeId)
);