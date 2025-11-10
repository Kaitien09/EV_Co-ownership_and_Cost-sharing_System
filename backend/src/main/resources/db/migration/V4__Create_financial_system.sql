-- 9. Bảng chi phí
CREATE TABLE ChiPhi (
    chiPhiId INT PRIMARY KEY AUTO_INCREMENT,
    nhomId INT NOT NULL,
    loaiChiPhi ENUM('PhiSacDien','BaoDuong','BaoHiem','DangKiem','VeSinh','Khac') NOT NULL,
    soTien DECIMAL(12,2) NOT NULL,
    ngayPhatSinh DATE NOT NULL,
    ghiChu TEXT,
    FOREIGN KEY (nhomId) REFERENCES NhomDongSoHuu(nhomId)
);

-- 10. Bảng chia chi phí
CREATE TABLE ChiaChiPhi (
    chiaChiPhiId INT PRIMARY KEY AUTO_INCREMENT,
    chiPhiId INT NOT NULL,
    chuXeId INT NOT NULL,
    soTienPhaiTra DECIMAL(12,2) NOT NULL,
    ghiChu VARCHAR(255),
    FOREIGN KEY (chiPhiId) REFERENCES ChiPhi(chiPhiId),
    FOREIGN KEY (chuXeId) REFERENCES ChuXe(chuXeId)
);

-- 11. Bảng thanh toán
CREATE TABLE ThanhToan (
    thanhToanId INT PRIMARY KEY AUTO_INCREMENT,
    chuXeId INT NOT NULL,
    chiaChiPhiId INT UNIQUE NOT NULL,
    phuongThuc ENUM('ViDienTu','ChuyenKhoan') NOT NULL,
    soTienThanhToan DECIMAL(12,2) NOT NULL,
    ngayThanhToan DATETIME DEFAULT CURRENT_TIMESTAMP,
    trangThai ENUM('ChuaThanhToan','DaThanhToan') DEFAULT 'ChuaThanhToan',
    FOREIGN KEY (chuXeId) REFERENCES ChuXe(chuXeId),
    FOREIGN KEY (chiaChiPhiId) REFERENCES ChiaChiPhi(chiaChiPhiId)
);