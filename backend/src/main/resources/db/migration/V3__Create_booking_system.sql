-- 7. Bảng đặt lịch
CREATE TABLE DatLich (
    datLichId INT PRIMARY KEY AUTO_INCREMENT,
    chuXeId INT NOT NULL,
    xeId INT NOT NULL,
    thoiGianBatDau DATETIME NOT NULL,
    thoiGianKetThuc DATETIME NOT NULL,
    trangThai ENUM('ChoDuyet','DaDuyet','DaHuy') DEFAULT 'ChoDuyet',
    FOREIGN KEY (chuXeId) REFERENCES ChuXe(chuXeId),
    FOREIGN KEY (xeId) REFERENCES XeDien(xeId)
);

-- 8. Bảng lịch sử sử dụng
CREATE TABLE LichSuSuDung (
    lichSuSuDungId INT PRIMARY KEY AUTO_INCREMENT,
    datLichId INT UNIQUE NOT NULL,
    thoiGianNhanXe DATETIME NOT NULL,
    thoiGianTraXe DATETIME,
    quangDuong INT DEFAULT 0,
    FOREIGN KEY (datLichId) REFERENCES DatLich(datLichId)
);