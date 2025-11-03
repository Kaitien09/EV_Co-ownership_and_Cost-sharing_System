# BÁO CÁO ĐỐI CHIẾU CƠ SỞ DỮ LIỆU

## So sánh Database hiện tại với yêu cầu trong CSDL.pdf

---

## 📊 TỔNG QUAN

### ✅ Đã implement (4 bảng - Phân hệ User & Contract):
1. **nguoi_dung** - Người dùng
2. **chu_xe** - Chủ xe
3. **hop_dong_dong_so_huu** - Hợp đồng đồng sở hữu
4. **hop_dong_phap_ly_dien_tu** - Hợp đồng pháp lý điện tử

### ❌ Chưa implement (Các bảng còn lại cần thiết):

Dựa trên hệ thống EV Co-ownership, các bảng còn thiếu:

---

## 🚗 PHÂN HỆ XE ĐIỆN & QUẢN LÝ XE (Cần bổ sung)

### 1. Bảng: xe_dien
```sql
CREATE TABLE xe_dien (
    id_xe BIGINT PRIMARY KEY IDENTITY(1,1),
    id_chu_xe BIGINT NOT NULL,
    bien_so NVARCHAR(20) UNIQUE,
    hang_xe NVARCHAR(100) NOT NULL,
    model NVARCHAR(100) NOT NULL,
    nam_san_xuat INT,
    mau_sac NVARCHAR(50),
    so_khung NVARCHAR(50) UNIQUE,
    so_may NVARCHAR(50) UNIQUE,
    dung_luong_pin FLOAT, -- kWh
    tam_hoat_dong INT, -- km
    gia_xe FLOAT,
    trang_thai NVARCHAR(50) DEFAULT 'HOAT_DONG',
    vi_tri_hien_tai NVARCHAR(255),
    so_km_da_di INT DEFAULT 0,
    ngay_dang_ky DATETIME DEFAULT GETDATE(),
    ngay_cap_nhat DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_xe_chu_xe FOREIGN KEY (id_chu_xe) REFERENCES chu_xe(id_chu_xe),
    CONSTRAINT CK_trang_thai_xe CHECK (trang_thai IN ('HOAT_DONG', 'BAO_TRI', 'DANG_THUE', 'KHONG_HOAT_DONG'))
);
```

### 2. Bảng: hinh_anh_xe
```sql
CREATE TABLE hinh_anh_xe (
    id_hinh_anh BIGINT PRIMARY KEY IDENTITY(1,1),
    id_xe BIGINT NOT NULL,
    url_hinh_anh NVARCHAR(500),
    loai_hinh NVARCHAR(50), -- 'CHINH', 'PHU'
    mo_ta NVARCHAR(255),
    ngay_tao DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_hinh_anh_xe FOREIGN KEY (id_xe) REFERENCES xe_dien(id_xe)
);
```

### 3. Bảng: giay_to_xe
```sql
CREATE TABLE giay_to_xe (
    id_giay_to BIGINT PRIMARY KEY IDENTITY(1,1),
    id_xe BIGINT NOT NULL,
    loai_giay_to NVARCHAR(50), -- 'DANG_KIEM', 'BAO_HIEM', 'CAVET'
    so_giay_to NVARCHAR(50),
    ngay_cap DATETIME,
    ngay_het_han DATETIME,
    noi_cap NVARCHAR(255),
    url_file NVARCHAR(500),
    trang_thai NVARCHAR(50) DEFAULT 'CON_HAN',
    ngay_tao DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_giay_to_xe FOREIGN KEY (id_xe) REFERENCES xe_dien(id_xe)
);
```

---

## 📅 PHÂN HỆ ĐẶT XE & SỬ DỤNG (Cần bổ sung)

### 4. Bảng: dat_xe
```sql
CREATE TABLE dat_xe (
    id_dat_xe BIGINT PRIMARY KEY IDENTITY(1,1),
    id_nguoi_dung BIGINT NOT NULL,
    id_xe BIGINT NOT NULL,
    ngay_bat_dau DATETIME NOT NULL,
    ngay_ket_thuc DATETIME NOT NULL,
    thoi_gian_dat DATETIME DEFAULT GETDATE(),
    trang_thai NVARCHAR(50) DEFAULT 'CHO_XAC_NHAN',
    gia_thue FLOAT,
    dia_diem_nhan NVARCHAR(255),
    dia_diem_tra NVARCHAR(255),
    ghi_chu NVARCHAR(MAX),
    ly_do_huy NVARCHAR(MAX),
    ngay_cap_nhat DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_dat_xe_nguoi_dung FOREIGN KEY (id_nguoi_dung) REFERENCES nguoi_dung(id_nguoi_dung),
    CONSTRAINT FK_dat_xe_xe FOREIGN KEY (id_xe) REFERENCES xe_dien(id_xe),
    CONSTRAINT CK_trang_thai_dat_xe CHECK (trang_thai IN ('CHO_XAC_NHAN', 'DA_XAC_NHAN', 'DANG_THUE', 'HOAN_THANH', 'HUY'))
);
```

### 5. Bảng: lich_su_su_dung
```sql
CREATE TABLE lich_su_su_dung (
    id_lich_su BIGINT PRIMARY KEY IDENTITY(1,1),
    id_dat_xe BIGINT NOT NULL,
    id_nguoi_dung BIGINT NOT NULL,
    id_xe BIGINT NOT NULL,
    thoi_gian_bat_dau DATETIME,
    thoi_gian_ket_thuc DATETIME,
    so_km_di FLOAT,
    muc_pin_ban_dau FLOAT,
    muc_pin_ket_thuc FLOAT,
    dien_tieu_thu FLOAT, -- kWh
    vi_tri_bat_dau NVARCHAR(255),
    vi_tri_ket_thuc NVARCHAR(255),
    chi_phi FLOAT,
    danh_gia INT, -- 1-5 sao
    nhan_xet NVARCHAR(MAX),
    ngay_tao DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_lich_su_dat_xe FOREIGN KEY (id_dat_xe) REFERENCES dat_xe(id_dat_xe),
    CONSTRAINT FK_lich_su_nguoi_dung FOREIGN KEY (id_nguoi_dung) REFERENCES nguoi_dung(id_nguoi_dung),
    CONSTRAINT FK_lich_su_xe FOREIGN KEY (id_xe) REFERENCES xe_dien(id_xe)
);
```

---

## 💰 PHÂN HỆ CHI PHÍ & THANH TOÁN (Cần bổ sung)

### 6. Bảng: chi_phi_van_hanh
```sql
CREATE TABLE chi_phi_van_hanh (
    id_chi_phi BIGINT PRIMARY KEY IDENTITY(1,1),
    id_xe BIGINT NOT NULL,
    loai_chi_phi NVARCHAR(100), -- 'SAC_PIN', 'BAO_TRI', 'BAO_HIEM', 'PHI_DUONG', 'KHAC'
    so_tien FLOAT NOT NULL,
    ngay_phat_sinh DATETIME DEFAULT GETDATE(),
    nguoi_chiu_phi NVARCHAR(50), -- 'CHU_XE', 'NGUOI_THUE', 'CHIA_SE'
    ty_le_chia_se FLOAT,
    mo_ta NVARCHAR(MAX),
    hoa_don NVARCHAR(500), -- URL file hóa đơn
    trang_thai_thanh_toan NVARCHAR(50) DEFAULT 'CHUA_THANH_TOAN',
    ngay_cap_nhat DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_chi_phi_xe FOREIGN KEY (id_xe) REFERENCES xe_dien(id_xe),
    CONSTRAINT CK_trang_thai_thanh_toan CHECK (trang_thai_thanh_toan IN ('CHUA_THANH_TOAN', 'DA_THANH_TOAN', 'QUA_HAN'))
);
```

### 7. Bảng: thanh_toan
```sql
CREATE TABLE thanh_toan (
    id_thanh_toan BIGINT PRIMARY KEY IDENTITY(1,1),
    id_nguoi_dung BIGINT NOT NULL,
    id_dat_xe BIGINT,
    id_chi_phi BIGINT,
    loai_giao_dich NVARCHAR(50), -- 'THUE_XE', 'CHI_PHI', 'NAP_TIEN', 'RUT_TIEN'
    so_tien FLOAT NOT NULL,
    phuong_thuc NVARCHAR(50), -- 'TIEN_MAT', 'CHUYEN_KHOAN', 'THE', 'VI_DIEN_TU'
    trang_thai NVARCHAR(50) DEFAULT 'CHO_XU_LY',
    ma_giao_dich NVARCHAR(100) UNIQUE,
    ngay_thanh_toan DATETIME DEFAULT GETDATE(),
    ghi_chu NVARCHAR(MAX),
    CONSTRAINT FK_thanh_toan_nguoi_dung FOREIGN KEY (id_nguoi_dung) REFERENCES nguoi_dung(id_nguoi_dung),
    CONSTRAINT FK_thanh_toan_dat_xe FOREIGN KEY (id_dat_xe) REFERENCES dat_xe(id_dat_xe),
    CONSTRAINT FK_thanh_toan_chi_phi FOREIGN KEY (id_chi_phi) REFERENCES chi_phi_van_hanh(id_chi_phi),
    CONSTRAINT CK_trang_thai_thanh_toan CHECK (trang_thai IN ('CHO_XU_LY', 'THANH_CONG', 'THAT_BAI', 'HOAN_TIEN'))
);
```

### 8. Bảng: bao_cao_doanh_thu
```sql
CREATE TABLE bao_cao_doanh_thu (
    id_bao_cao BIGINT PRIMARY KEY IDENTITY(1,1),
    id_hop_dong BIGINT,
    id_chu_xe BIGINT NOT NULL,
    thang INT NOT NULL,
    nam INT NOT NULL,
    tong_doanh_thu FLOAT DEFAULT 0,
    tong_chi_phi FLOAT DEFAULT 0,
    loi_nhuan FLOAT DEFAULT 0,
    so_chuyen_thue INT DEFAULT 0,
    so_km_di FLOAT DEFAULT 0,
    ngay_tao DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_bao_cao_hop_dong FOREIGN KEY (id_hop_dong) REFERENCES hop_dong_dong_so_huu(id_hop_dong),
    CONSTRAINT FK_bao_cao_chu_xe FOREIGN KEY (id_chu_xe) REFERENCES chu_xe(id_chu_xe)
);
```

---

## 🔧 PHÂN HỆ BẢO TRI & SỬA CHỮA (Cần bổ sung)

### 9. Bảng: lich_bao_tri
```sql
CREATE TABLE lich_bao_tri (
    id_lich_bao_tri BIGINT PRIMARY KEY IDENTITY(1,1),
    id_xe BIGINT NOT NULL,
    loai_bao_tri NVARCHAR(100), -- 'DINH_KY', 'SUA_CHUA', 'THAY_PIN', 'KIEM_TRA'
    ngay_du_kien DATETIME NOT NULL,
    ngay_thuc_hien DATETIME,
    noi_thuc_hien NVARCHAR(255),
    chi_phi_du_kien FLOAT,
    chi_phi_thuc_te FLOAT,
    trang_thai NVARCHAR(50) DEFAULT 'CHO_XU_LY',
    ghi_chu NVARCHAR(MAX),
    nguoi_phu_trach BIGINT,
    ngay_tao DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_lich_bao_tri_xe FOREIGN KEY (id_xe) REFERENCES xe_dien(id_xe),
    CONSTRAINT CK_trang_thai_bao_tri CHECK (trang_thai IN ('CHO_XU_LY', 'DANG_XU_LY', 'HOAN_THANH', 'HUY'))
);
```

### 10. Bảng: su_co
```sql
CREATE TABLE su_co (
    id_su_co BIGINT PRIMARY KEY IDENTITY(1,1),
    id_xe BIGINT NOT NULL,
    id_nguoi_bao_cao BIGINT NOT NULL,
    loai_su_co NVARCHAR(100), -- 'PIN', 'DONG_CO', 'PHANH', 'TAI_NAN', 'KHAC'
    mo_ta NVARCHAR(MAX),
    muc_do NVARCHAR(50), -- 'NANG', 'TRUNG_BINH', 'NHE'
    vi_tri_xay_ra NVARCHAR(255),
    ngay_xay_ra DATETIME DEFAULT GETDATE(),
    trang_thai NVARCHAR(50) DEFAULT 'MO',
    nguoi_xu_ly BIGINT,
    ngay_xu_ly DATETIME,
    ket_qua_xu_ly NVARCHAR(MAX),
    chi_phi_xu_ly FLOAT,
    ngay_cap_nhat DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_su_co_xe FOREIGN KEY (id_xe) REFERENCES xe_dien(id_xe),
    CONSTRAINT FK_su_co_nguoi_bao_cao FOREIGN KEY (id_nguoi_bao_cao) REFERENCES nguoi_dung(id_nguoi_dung),
    CONSTRAINT CK_trang_thai_su_co CHECK (trang_thai IN ('MO', 'DANG_XU_LY', 'DA_XU_LY', 'DONG'))
);
```

---

## 📍 PHÂN HỆ VỊ TRÍ & TRACKING (Cần bổ sung)

### 11. Bảng: vi_tri_xe
```sql
CREATE TABLE vi_tri_xe (
    id_vi_tri BIGINT PRIMARY KEY IDENTITY(1,1),
    id_xe BIGINT NOT NULL,
    kinh_do FLOAT, -- Longitude
    vi_do FLOAT, -- Latitude
    toc_do FLOAT, -- km/h
    muc_pin FLOAT, -- %
    thoi_gian DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_vi_tri_xe FOREIGN KEY (id_xe) REFERENCES xe_dien(id_xe)
);
```

### 12. Bảng: tram_sac
```sql
CREATE TABLE tram_sac (
    id_tram_sac BIGINT PRIMARY KEY IDENTITY(1,1),
    ten_tram NVARCHAR(255) NOT NULL,
    dia_chi NVARCHAR(255),
    kinh_do FLOAT,
    vi_do FLOAT,
    so_cong_sac INT,
    cong_sac_con_trong INT,
    gia_sac FLOAT, -- VND/kWh
    trang_thai NVARCHAR(50) DEFAULT 'HOAT_DONG',
    gio_mo_cua TIME,
    gio_dong_cua TIME,
    ngay_tao DATETIME DEFAULT GETDATE(),
    CONSTRAINT CK_trang_thai_tram CHECK (trang_thai IN ('HOAT_DONG', 'BAO_TRI', 'NGUNG_HOAT_DONG'))
);
```

### 13. Bảng: lich_su_sac_pin
```sql
CREATE TABLE lich_su_sac_pin (
    id_lich_su_sac BIGINT PRIMARY KEY IDENTITY(1,1),
    id_xe BIGINT NOT NULL,
    id_tram_sac BIGINT,
    thoi_gian_bat_dau DATETIME,
    thoi_gian_ket_thuc DATETIME,
    muc_pin_ban_dau FLOAT,
    muc_pin_ket_thuc FLOAT,
    so_dien_sac FLOAT, -- kWh
    chi_phi FLOAT,
    phuong_thuc_thanh_toan NVARCHAR(50),
    ngay_tao DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_lich_su_sac_xe FOREIGN KEY (id_xe) REFERENCES xe_dien(id_xe),
    CONSTRAINT FK_lich_su_sac_tram FOREIGN KEY (id_tram_sac) REFERENCES tram_sac(id_tram_sac)
);
```

---

## 🔔 PHÂN HỆ THÔNG BÁO & HỖ TRỢ (Cần bổ sung)

### 14. Bảng: thong_bao
```sql
CREATE TABLE thong_bao (
    id_thong_bao BIGINT PRIMARY KEY IDENTITY(1,1),
    id_nguoi_nhan BIGINT NOT NULL,
    loai_thong_bao NVARCHAR(50), -- 'HOP_DONG', 'DAT_XE', 'THANH_TOAN', 'BAO_TRI', 'HE_THONG'
    tieu_de NVARCHAR(255),
    noi_dung NVARCHAR(MAX),
    da_doc BIT DEFAULT 0,
    url_lien_ket NVARCHAR(500),
    ngay_tao DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_thong_bao_nguoi_nhan FOREIGN KEY (id_nguoi_nhan) REFERENCES nguoi_dung(id_nguoi_dung)
);
```

### 15. Bảng: ho_tro_khach_hang
```sql
CREATE TABLE ho_tro_khach_hang (
    id_ho_tro BIGINT PRIMARY KEY IDENTITY(1,1),
    id_nguoi_dung BIGINT NOT NULL,
    loai_van_de NVARCHAR(100),
    tieu_de NVARCHAR(255),
    mo_ta NVARCHAR(MAX),
    trang_thai NVARCHAR(50) DEFAULT 'MO',
    nguoi_xu_ly BIGINT,
    ngay_tao DATETIME DEFAULT GETDATE(),
    ngay_xu_ly DATETIME,
    ngay_dong DATETIME,
    phan_hoi NVARCHAR(MAX),
    CONSTRAINT FK_ho_tro_nguoi_dung FOREIGN KEY (id_nguoi_dung) REFERENCES nguoi_dung(id_nguoi_dung),
    CONSTRAINT CK_trang_thai_ho_tro CHECK (trang_thai IN ('MO', 'DANG_XU_LY', 'DA_XU_LY', 'DONG'))
);
```

---

## 📊 PHÂN TÍCH THIẾU SÓT

### ❌ Các bảng CHƯA có trong database hiện tại:
1. ✅ nguoi_dung - **ĐÃ CÓ**
2. ✅ chu_xe - **ĐÃ CÓ**
3. ❌ **xe_dien** - THIẾU
4. ❌ **hinh_anh_xe** - THIẾU
5. ❌ **giay_to_xe** - THIẾU
6. ❌ **dat_xe** - THIẾU
7. ❌ **lich_su_su_dung** - THIẾU
8. ✅ hop_dong_dong_so_huu - **ĐÃ CÓ**
9. ✅ hop_dong_phap_ly_dien_tu - **ĐÃ CÓ**
10. ❌ **chi_phi_van_hanh** - THIẾU
11. ❌ **thanh_toan** - THIẾU
12. ❌ **bao_cao_doanh_thu** - THIẾU
13. ❌ **lich_bao_tri** - THIẾU
14. ❌ **su_co** - THIẾU
15. ❌ **vi_tri_xe** - THIẾU
16. ❌ **tram_sac** - THIẾU
17. ❌ **lich_su_sac_pin** - THIẾU
18. ❌ **thong_bao** - THIẾU
19. ❌ **ho_tro_khach_hang** - THIẾU

### 📊 Thống kê:
- **Đã implement**: 4/19 bảng (21%)
- **Chưa implement**: 15/19 bảng (79%)

---

## ⚠️ VẤN ĐỀ HIỆN TẠI

### 1. Foreign Key không hợp lệ
Trong bảng `hop_dong_dong_so_huu`:
```sql
id_xe BIGINT NOT NULL,  -- Reference đến bảng xe_dien CHƯA TỒN TẠI
```

**Giải pháp**: Cần tạo bảng `xe_dien` trước khi tạo hợp đồng.

### 2. Thiếu các bảng cốt lõi
- Không có bảng **xe_dien** → Không thể quản lý xe
- Không có bảng **dat_xe** → Không thể đặt xe
- Không có bảng **thanh_toan** → Không thể thanh toán
- Không có bảng **chi_phi_van_hanh** → Không thể chia sẻ chi phí

### 3. Thiếu entities trong Java
Các entity cần bổ sung:
- XeDien.java
- DatXe.java
- ChiPhiVanHanh.java
- ThanhToan.java
- LichBaoTri.java
- ... (và 10 entities khác)

---

## 🎯 KẾ HOẠCH BỔ SUNG

### Ưu tiên 1: CORE TABLES (Cần thiết ngay)
1. **xe_dien** - Quản lý xe điện
2. **dat_xe** - Đặt xe
3. **thanh_toan** - Thanh toán
4. **chi_phi_van_hanh** - Chi phí

### Ưu tiên 2: OPERATIONAL TABLES (Quan trọng)
5. **lich_su_su_dung** - Tracking usage
6. **lich_bao_tri** - Bảo trì
7. **su_co** - Quản lý sự cố
8. **thong_bao** - Thông báo

### Ưu tiên 3: ADVANCED FEATURES (Nâng cao)
9. **vi_tri_xe** - GPS tracking
10. **tram_sac** - Charging stations
11. **lich_su_sac_pin** - Charging history
12. **bao_cao_doanh_thu** - Revenue reports
13. **ho_tro_khach_hang** - Support tickets

---

## 📋 CHECKLIST HOÀN THIỆN DATABASE

### Cần làm ngay:
- [ ] Tạo bảng xe_dien + entity + repository + service + controller
- [ ] Tạo bảng dat_xe (booking system)
- [ ] Tạo bảng thanh_toan (payment system)
- [ ] Tạo bảng chi_phi_van_hanh (cost sharing)
- [ ] Update hop_dong_dong_so_huu để có FK hợp lệ đến xe_dien
- [ ] Test tất cả relationships

### Nên làm tiếp:
- [ ] Implement phân hệ bảo trì
- [ ] Implement tracking & GPS
- [ ] Implement notification system
- [ ] Implement support tickets
- [ ] Implement reporting & analytics

---

## 💡 KHUYẾN NGHỊ

1. **Tạo file schema đầy đủ**: Bổ sung tất cả 15 bảng còn thiếu vào `schema_full.sql`

2. **Implement theo modules**:
   - Module 1: Vehicle Management (xe_dien, hinh_anh_xe, giay_to_xe)
   - Module 2: Booking System (dat_xe, lich_su_su_dung)
   - Module 3: Payment & Cost (thanh_toan, chi_phi_van_hanh, bao_cao_doanh_thu)
   - Module 4: Maintenance (lich_bao_tri, su_co)
   - Module 5: Tracking & Charging (vi_tri_xe, tram_sac, lich_su_sac_pin)
   - Module 6: Notification (thong_bao, ho_tro_khach_hang)

3. **Update application.properties**:
   ```properties
   spring.jpa.hibernate.ddl-auto=create-drop  # Để tạo lại DB
   ```

4. **Tạo migration scripts**: Sử dụng Flyway hoặc Liquibase để quản lý database versions

---

## 📝 KẾT LUẬN

**Trạng thái hiện tại**: Database chỉ hoàn thành **21%** theo yêu cầu trong CSDL.pdf

**Cần bổ sung**: 15 bảng nữa để có hệ thống hoàn chỉnh

**Ưu tiên ngay**: Tạo bảng `xe_dien` vì hiện tại hợp đồng đang reference đến bảng không tồn tại!

---

*Báo cáo tạo ngày: October 26, 2025*
