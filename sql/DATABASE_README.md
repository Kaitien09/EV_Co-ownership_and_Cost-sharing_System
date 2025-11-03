# 📘 HƯỚNG DẪN SỬ DỤNG DATABASE

## 🎯 File: `complete_database_schema.sql`

File SQL hoàn chỉnh cho dự án **Hệ Thống Đồng Sở Hữu Xe Điện**

---

## 📦 NỘI DUNG FILE

### **1. Core Tables (9 bảng chính)**
- ✅ `nguoi_dung` - Quản lý người dùng (Admin, CoOwner, Staff)
- ✅ `chu_xe` - Hồ sơ chủ xe
- ✅ `xe` - Thông tin xe điện
- ✅ `giay_to_chu_xe` - Quản lý giấy tờ và xác thực
- ✅ `hop_dong_dong_so_huu` - Hợp đồng đồng sở hữu
- ✅ `hop_dong_phap_ly_dien_tu` - Hợp đồng pháp lý điện tử
- ✅ `lich_su_su_dung_xe` - Lịch sử sử dụng (optional)
- ✅ `thanh_toan` - Lịch sử thanh toán (optional)

### **2. Views (4 views)**
- `v_chu_xe_full` - Thông tin đầy đủ chủ xe
- `v_hop_dong_full` - Hợp đồng với chi tiết
- `v_giay_to_cho_duyet` - Giấy tờ chờ duyệt
- `v_hop_dong_cho_duyet` - Hợp đồng chờ duyệt

### **3. Stored Procedures (4 procedures)**
- `sp_tao_chu_xe()` - Tạo tài khoản + profile chủ xe
- `sp_duyet_hop_dong()` - Duyệt/từ chối hợp đồng
- `sp_duyet_giay_to()` - Duyệt/từ chối giấy tờ
- `sp_kich_hoat_hop_dong()` - Kích hoạt hợp đồng

### **4. Triggers (6 triggers)**
- Auto update `ngay_cap_nhat` cho tất cả bảng khi UPDATE

### **5. Scheduled Events (1 event)**
- `evt_expire_contracts` - Tự động hết hạn hợp đồng (chạy hàng ngày)

### **6. Sample Data**
- 1 Admin account
- 3 CoOwner accounts
- 4 vehicles (VinFast, Tesla, Hyundai, BYD)
- 3 owner profiles
- 3 contracts
- 4 documents

---

## 🚀 CÁCH SỬ DỤNG

### **Phương pháp 1: MySQL Command Line**

```bash
# Windows PowerShell
mysql -u root -p < "d:\Code java\Final\final\sql\complete_database_schema.sql"

# Linux/Mac
mysql -u root -p < /path/to/complete_database_schema.sql
```

### **Phương pháp 2: MySQL Workbench**

1. Mở MySQL Workbench
2. Kết nối đến MySQL Server
3. File → Open SQL Script
4. Chọn file `complete_database_schema.sql`
5. Click Execute (⚡ icon hoặc Ctrl+Shift+Enter)
6. Đợi script chạy xong (~30 giây)

### **Phương pháp 3: Trực tiếp trong MySQL**

```sql
SOURCE d:/Code java/Final/final/sql/complete_database_schema.sql;
```

---

## ✅ KIỂM TRA SAU KHI CHẠY

### **1. Kiểm tra database đã tạo**

```sql
SHOW DATABASES;
USE ev_coownership;
```

### **2. Kiểm tra các bảng**

```sql
SHOW TABLES;

-- Kết quả mong đợi:
-- chu_xe
-- giay_to_chu_xe
-- hop_dong_dong_so_huu
-- hop_dong_phap_ly_dien_tu
-- lich_su_su_dung_xe
-- nguoi_dung
-- thanh_toan
-- xe
```

### **3. Kiểm tra dữ liệu mẫu**

```sql
-- Kiểm tra users
SELECT nguoi_dung_id, ten_dang_nhap, email, loai_nguoi_dung 
FROM nguoi_dung;

-- Kiểm tra xe
SELECT xe_id, ten_xe, hang_xe, model, bien_so, trang_thai 
FROM xe;

-- Kiểm tra hợp đồng
SELECT hop_dong_id, chu_xe_id, xe_id, trang_thai 
FROM hop_dong_dong_so_huu;
```

### **4. Kiểm tra views**

```sql
-- Xem view hợp đồng đầy đủ
SELECT * FROM v_hop_dong_full;

-- Xem giấy tờ chờ duyệt
SELECT * FROM v_giay_to_cho_duyet;
```

### **5. Test stored procedures**

```sql
-- Test duyệt hợp đồng
CALL sp_duyet_hop_dong(3, 1, TRUE, NULL);

-- Kiểm tra kết quả
SELECT hop_dong_id, trang_thai, nguoi_duyet_id, ngay_duyet 
FROM hop_dong_dong_so_huu 
WHERE hop_dong_id = 3;
```

---

## 🔐 TÀI KHOẢN MẶC ĐỊNH

### **Admin Account**
- Username: `admin`
- Email: `admin@evco.vn`
- Password: `Admin123!`
- Role: `Admin`

### **Sample CoOwner Accounts**
| Username | Email | Password | Role |
|----------|-------|----------|------|
| owner1 | owner1@gmail.com | Password123! | CoOwner |
| owner2 | owner2@gmail.com | Password123! | CoOwner |
| owner3 | owner3@gmail.com | Password123! | CoOwner |

**Note:** Mật khẩu đã được mã hóa bằng BCrypt với strength 10.

---

## 📊 CẤU TRÚC DATABASE

```
ev_coownership
│
├── nguoi_dung (Users)
│   └── chu_xe (Owner Profiles)
│       ├── giay_to_chu_xe (Documents)
│       └── hop_dong_dong_so_huu (Contracts)
│           ├── hop_dong_phap_ly_dien_tu (Legal Contracts)
│           ├── lich_su_su_dung_xe (Usage History)
│           └── thanh_toan (Payments)
│
└── xe (Vehicles)
    └── hop_dong_dong_so_huu (Contracts)
```

---

## 🔧 CẤU HÌNH SPRING BOOT

### **application.properties**

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/ev_coownership?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=none
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# JWT Configuration
jwt.secret=YourSuperSecretKeyThatIsAtLeast256BitsLongForHS256Algorithm
jwt.expiration=86400000
```

---

## 🛠️ TROUBLESHOOTING

### **Lỗi: "Unknown database 'ev_coownership'"**
**Nguyên nhân:** Database chưa được tạo  
**Giải pháp:** Chạy lại script từ đầu

### **Lỗi: "Table already exists"**
**Nguyên nhân:** Database đã tồn tại  
**Giải pháp:**
```sql
DROP DATABASE ev_coownership;
-- Sau đó chạy lại script
```

### **Lỗi: "Cannot add foreign key constraint"**
**Nguyên nhân:** Thứ tự tạo bảng sai  
**Giải pháp:** Script đã được sắp xếp đúng thứ tự, chạy lại từ đầu

### **Lỗi: "Event scheduler is not enabled"**
**Nguyên nhân:** Event scheduler chưa bật  
**Giải pháp:**
```sql
SET GLOBAL event_scheduler = ON;
```

---

## 📈 PERFORMANCE TIPS

### **1. Indexes đã được tạo tự động**
- Tất cả foreign keys đều có index
- Trường thường query (email, trang_thai) đều có index
- Trường ngày tháng (ngay_tao, ngay_ket_thuc) có index

### **2. Tối ưu query**
```sql
-- BAD: Không dùng index
SELECT * FROM hop_dong_dong_so_huu WHERE YEAR(ngay_bat_dau) = 2025;

-- GOOD: Dùng index
SELECT * FROM hop_dong_dong_so_huu 
WHERE ngay_bat_dau BETWEEN '2025-01-01' AND '2025-12-31';
```

### **3. Sử dụng Views**
```sql
-- Thay vì JOIN phức tạp, dùng view
SELECT * FROM v_hop_dong_full WHERE trang_thai = 'ChoDuyet';
```

---

## 🔄 MIGRATION WORKFLOW

Nếu cần cập nhật schema trong production:

1. **Backup database hiện tại**
```bash
mysqldump -u root -p ev_coownership > backup_$(date +%Y%m%d).sql
```

2. **Chạy migration script riêng biệt**
```sql
-- Thay vì DROP DATABASE, chỉ ALTER TABLE
ALTER TABLE hop_dong_phap_ly_dien_tu ADD COLUMN new_field VARCHAR(50);
```

3. **Test trên staging environment trước**

---

## 📞 SUPPORT

Nếu gặp vấn đề:
1. Kiểm tra MySQL version (yêu cầu 8.0+)
2. Kiểm tra quyền user MySQL
3. Xem log lỗi trong MySQL error log
4. Liên hệ team dev

---

## 📝 CHANGELOG

### Version 1.0 (2025-11-02)
- ✅ Tạo schema đầy đủ cho 9 bảng
- ✅ Thêm 4 views hữu ích
- ✅ Tạo 4 stored procedures
- ✅ Thêm 6 triggers auto-update
- ✅ Thêm 1 scheduled event
- ✅ Insert dữ liệu mẫu
- ✅ Tối ưu indexes cho performance

---

## ⚡ QUICK START

```bash
# 1. Chạy script
mysql -u root -p < complete_database_schema.sql

# 2. Test login
# Username: admin
# Password: Admin123!

# 3. Start Spring Boot
cd "d:\Code java\Final\final"
.\mvnw spring-boot:run

# 4. Test API
# Open: http://localhost:8080
# Use: test-api.http file
```

---

**🎉 READY TO GO!**
