-- 12. Bảng quỹ chung
CREATE TABLE QuyChung (
    quyId INT PRIMARY KEY AUTO_INCREMENT,
    nhomId INT NOT NULL,
    soDu DECIMAL(12,2) DEFAULT 0.00,
    FOREIGN KEY (nhomId) REFERENCES NhomDongSoHuu(nhomId)
);

-- 13. Bảng lịch sử quỹ
CREATE TABLE LichSuQuy (
    lichSuQuyId INT PRIMARY KEY AUTO_INCREMENT,
    quyId INT NOT NULL,
    soTien DECIMAL(12,2) NOT NULL,
    loaiGiaoDich ENUM('Thu','Chi') NOT NULL,
    ngayGiaoDich DATETIME DEFAULT CURRENT_TIMESTAMP,
    moTa TEXT,
    FOREIGN KEY (quyId) REFERENCES QuyChung(quyId)
);

-- 14. Bảng bỏ phiếu nhóm
CREATE TABLE BoPhieuNhom (
    boPhieuId INT PRIMARY KEY AUTO_INCREMENT,
    nhomId INT NOT NULL,
    tieuDe VARCHAR(255) NOT NULL,
    ngayTao DATETIME DEFAULT CURRENT_TIMESTAMP,
    trangThai ENUM('DangBau','DaKetThuc') DEFAULT 'DangBau',
    FOREIGN KEY (nhomId) REFERENCES NhomDongSoHuu(nhomId)
);

-- 15. Bảng phiếu bầu
CREATE TABLE PhieuBau (
    phieuBauId INT PRIMARY KEY AUTO_INCREMENT,
    boPhieuId INT NOT NULL,
    chuXeId INT NOT NULL,
    luaChon ENUM('DongY','KhongDongY') NOT NULL,
    thoiGianBau DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_bo_phieu (boPhieuId, chuXeId),
    FOREIGN KEY (boPhieuId) REFERENCES BoPhieuNhom(boPhieuId),
    FOREIGN KEY (chuXeId) REFERENCES ChuXe(chuXeId)
);