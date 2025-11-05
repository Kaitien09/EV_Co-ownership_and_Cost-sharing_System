-- 16. Bảng trung tâm dịch vụ
CREATE TABLE TrungTamDichVu (
    trungTamId INT PRIMARY KEY AUTO_INCREMENT,
    tenTrungTam NVARCHAR(100) NOT NULL,
    diaChi NVARCHAR(255),
    soDienThoai VARCHAR(15)
);

-- 17. Bảng kỹ thuật viên
CREATE TABLE KyThuatVien (
    kyThuatVienId INT PRIMARY KEY AUTO_INCREMENT,
    trungTamId INT NOT NULL,
    hoTen NVARCHAR(100) NOT NULL,
    chungChi VARCHAR(50),
    chuyenMon VARCHAR(50),
    FOREIGN KEY (trungTamId) REFERENCES TrungTamDichVu(trungTamId)
);

-- 18. Bảng lịch hẹn dịch vụ
CREATE TABLE LichHenDichVu (
    lichHenId INT PRIMARY KEY AUTO_INCREMENT,
    xeId INT NOT NULL,
    chuXeId INT NOT NULL,
    trungTamId INT NOT NULL,
    ngayHen DATETIME NOT NULL,
    loaiDichVu ENUM('BaoDuong','SuaChua') NOT NULL,
    trangThai ENUM('ChoXacNhan','DaXacNhan','DangThucHien','HoanTat','DaHuy') DEFAULT 'ChoXacNhan',
    FOREIGN KEY (xeId) REFERENCES XeDien(xeId),
    FOREIGN KEY (chuXeId) REFERENCES ChuXe(chuXeId),
    FOREIGN KEY (trungTamId) REFERENCES TrungTamDichVu(trungTamId)
);

-- 19. Bảng phiếu dịch vụ
CREATE TABLE PhieuDichVu (
    phieuId INT PRIMARY KEY AUTO_INCREMENT,
    lichHenId INT UNIQUE NOT NULL,
    kyThuatVienId INT,
    danhSachKiemTra JSON,
    ketQua TEXT,
    ngayTiepNhan DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lichHenId) REFERENCES LichHenDichVu(lichHenId),
    FOREIGN KEY (kyThuatVienId) REFERENCES KyThuatVien(kyThuatVienId)
);

-- 20. Bảng phụ tùng
CREATE TABLE PhuTung (
    phuTungId INT PRIMARY KEY AUTO_INCREMENT,
    tenPhuTung NVARCHAR(100) NOT NULL,
    soLuongTon INT DEFAULT 0,
    soLuongToiThieu INT DEFAULT 0
);

-- 21. Bảng chi tiết sử dụng phụ tùng
CREATE TABLE ChiTietSuDungPhuTung (
    chiTietId INT PRIMARY KEY AUTO_INCREMENT,
    phieuId INT NOT NULL,
    phuTungId INT NOT NULL,
    soLuong INT NOT NULL,
    donGia DECIMAL(12,2) NOT NULL,
    FOREIGN KEY (phieuId) REFERENCES PhieuDichVu(phieuId),
    FOREIGN KEY (phuTungId) REFERENCES PhuTung(phuTungId)
);