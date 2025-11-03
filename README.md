# 🚗 EV Co-ownership System - Backend API

**Hệ thống quản lý đồng sở hữu xe điện - Schema đơn giản hóa**

---

## 📋 TỔNG QUAN

Backend API cho hệ thống quản lý người dùng và hợp đồng đồng sở hữu xe điện, được xây dựng với Spring Boot 3.5.7 và SQL Server.

**Điểm nổi bật:**
- ✅ 10 API endpoints (Authentication, User, ChuXe, HopDong)
- ✅ JWT Authentication & Authorization
- ✅ Password encryption (BCrypt)
- ✅ Input validation (Jakarta Validation)
- ✅ 4 bảng database với quan hệ rõ ràng
- ✅ Schema đơn giản hóa (25 fields, giảm 60% so với schema phức tạp)

---

## 🛠️ CÔNG NGHỆ SỬ DỤNG

| Công nghệ | Phiên bản | Mục đích |
|-----------|-----------|----------|
| **Java** | 17 | Backend core |
| **Spring Boot** | 3.5.7 | Framework |
| **Spring Security** | 6.x | Authentication & Authorization |
| **JWT** | 0.12.x | Token-based auth |
| **JPA/Hibernate** | 6.x | ORM |
| **SQL Server** | 2019+ | Database |
| **Lombok** | 1.18.x | Reduce boilerplate |
| **Maven** | 3.x | Build tool |

---

## 📁 CẤU TRÚC PROJECT

```
src/main/java/com/example/demo/
├── 📂 entity/           # 4 entities (NguoiDung, ChuXe, HopDong...)
├── 📂 repository/       # 4 JPA repositories
├── 📂 service/          # 5 services (Auth, User, ChuXe, HopDong, JWT)
├── 📂 controller/       # 4 REST controllers
├── 📂 dto/              # 9 Data Transfer Objects
├── 📂 security/         # JWT Filter, UserDetailsService, SecurityConfig
└── 📂 config/           # Application configurations

Doc/
├── schema_simple.sql         # SQL schema với sample data
└── DANH_GIA_YEU_CAU.md       # Báo cáo đánh giá chi tiết
```

---

## 🗄️ DATABASE SCHEMA

### **4 Bảng Chính:**

```
nguoi_dung (7 columns)
├── nguoi_dung_id: INT PK
├── ten_dang_nhap: VARCHAR(50) UNIQUE
├── email: VARCHAR(100) UNIQUE
├── mat_khau: VARCHAR(255) [BCrypt]
├── loai_nguoi_dung: VARCHAR(20) [Admin/CoOwner/Staff]
├── ngay_tao: DATETIME
└── trang_thai: VARCHAR(20) [HoatDong/Ngung]

chu_xe (7 columns)
├── chu_xe_id: INT PK
├── nguoi_dung_id: INT FK → nguoi_dung
├── ho_ten: NVARCHAR(100)
├── cccd: VARCHAR(12)
├── sdt: VARCHAR(15)
├── gplx: VARCHAR(20)
└── dia_chi: NVARCHAR(255)

hop_dong_dong_so_huu (5 columns)
├── hop_dong_id: INT PK
├── xe_id: INT
├── chu_xe_id: INT FK → chu_xe
├── ngay_bat_dau: DATETIME
└── ngay_ket_thuc: DATETIME

hop_dong_phap_ly_dien_tu (6 columns)
├── hop_dong_id: INT PK
├── nhom_id: INT
├── xe_id: INT
├── ngay_bat_dau: DATE
├── ngay_ket_thuc: DATE
└── trang_thai: VARCHAR(20) [HoatDong/Ngung]
```

---

## 🚀 HƯỚNG DẪN CÀI ĐẶT

### **1. Yêu cầu hệ thống:**
- Java 17+
- SQL Server 2019+
- Maven 3.8+

### **2. Clone & Setup:**

```bash
# Clone project
cd "d:\Code java\Final\final"

# Tạo database
# Chạy file Doc/schema_simple.sql trong SQL Server Management Studio
```

### **3. Cấu hình Database:**

Mở `src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=ev_coownership;encrypt=true;trustServerCertificate=true
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.microsoft.sqlserver.jdbc.SQLServerDriver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=none
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# JWT Configuration
jwt.secret=404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
jwt.expiration=86400000

# Server Configuration
server.port=8080
```

### **4. Build & Run:**

```bash
# Build project
.\mvnw clean compile

# Run application
.\mvnw spring-boot:run

# Hoặc chạy file JAR
.\mvnw clean package
java -jar target/final-0.0.1-SNAPSHOT.jar
```

Ứng dụng sẽ chạy tại: `http://localhost:8080`

---

## 📡 API ENDPOINTS

### **🔐 Authentication (3 endpoints)**

#### 1. Đăng ký
```http
POST /api/auth/dang-ky
Content-Type: application/json

{
  "tenDangNhap": "user01",
  "email": "user01@test.com",
  "matKhau": "123456"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "tokenType": "Bearer",
  "nguoiDungId": 1,
  "tenDangNhap": "user01",
  "email": "user01@test.com",
  "loaiNguoiDung": "CoOwner",
  "message": "Đăng ký thành công"
}
```

#### 2. Đăng nhập
```http
POST /api/auth/dang-nhap
Content-Type: application/json

{
  "email": "user01@test.com",  # Hoặc tenDangNhap
  "matKhau": "123456"
}

Response: [Giống đăng ký]
```

#### 3. Đăng xuất
```http
POST /api/auth/dang-xuat

Response:
{
  "message": "Đăng xuất thành công"
}
```

---

### **👤 User Management (2 endpoints)**

#### 1. Lấy hồ sơ
```http
GET /api/nguoi-dung/{id}/ho-so
Authorization: Bearer {token}

Response:
{
  "nguoiDungId": 1,
  "tenDangNhap": "user01",
  "email": "user01@test.com",
  "loaiNguoiDung": "CoOwner",
  "ngayTao": "2025-10-26T01:00:00",
  "trangThai": "HoatDong"
}
```

#### 2. Cập nhật trạng thái (Admin only)
```http
PUT /api/nguoi-dung/{id}/trang-thai?trangThai=Ngung
Authorization: Bearer {admin_token}

Response: [Giống GET hồ sơ]
```

---

### **🚗 Chủ Xe Management (5 endpoints)**

#### 1. Đăng ký chủ xe
```http
POST /api/chu-xe
Authorization: Bearer {token}
Content-Type: application/json

{
  "nguoiDungId": 1,
  "hoTen": "Nguyễn Văn A",
  "cccd": "001234567890",
  "sdt": "0901234567",
  "gplx": "B1-123456",
  "diaChi": "123 Lê Lợi, Q.1, TP.HCM"
}

Response:
{
  "chuXeId": 1,
  "nguoiDungId": 1,
  "hoTen": "Nguyễn Văn A",
  "cccd": "001234567890",
  "sdt": "0901234567",
  "gplx": "B1-123456",
  "diaChi": "123 Lê Lợi, Q.1, TP.HCM"
}
```

#### 2. Lấy thông tin chủ xe
```http
GET /api/chu-xe/{id}
Authorization: Bearer {token}

Response: [Giống POST]
```

#### 3. Lấy chủ xe theo user ID
```http
GET /api/chu-xe/nguoi-dung/{nguoiDungId}
Authorization: Bearer {token}

Response: [Giống POST]
```

#### 4. Danh sách tất cả (Admin)
```http
GET /api/chu-xe
Authorization: Bearer {admin_token}

Response:
[
  { "chuXeId": 1, ... },
  { "chuXeId": 2, ... }
]
```

#### 5. Cập nhật thông tin
```http
PUT /api/chu-xe/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "hoTen": "Nguyễn Văn A Updated",
  "sdt": "0987654321",
  "diaChi": "456 Trần Hưng Đạo, Q.5, TP.HCM"
}

Response: [Giống POST với data mới]
```

---

### **📄 Hợp Đồng Management (4 endpoints)**

#### 1. Tạo hợp đồng
```http
POST /api/hop-dong
Authorization: Bearer {token}
Content-Type: application/json

{
  "chuXeId": 1,
  "xeId": 1,
  "ngayBatDau": "2025-10-26T00:00:00",
  "ngayKetThuc": "2028-10-26T00:00:00"
}

Response:
{
  "hopDongId": 1,
  "xeId": 1,
  "chuXeId": 1,
  "ngayBatDau": "2025-10-26T00:00:00",
  "ngayKetThuc": "2028-10-26T00:00:00"
}
```

#### 2. Danh sách hợp đồng theo chủ xe
```http
GET /api/hop-dong/chu-xe/{chuXeId}
Authorization: Bearer {token}

Response:
[
  { "hopDongId": 1, ... },
  { "hopDongId": 2, ... }
]
```

#### 3. Danh sách hợp đồng theo xe
```http
GET /api/hop-dong/xe/{xeId}
Authorization: Bearer {token}

Response: [Array of contracts]
```

#### 4. Chi tiết hợp đồng
```http
GET /api/hop-dong/{id}
Authorization: Bearer {token}

Response:
{
  "hopDongId": 1,
  "xeId": 1,
  "chuXeId": 1,
  "ngayBatDau": "2025-10-26T00:00:00",
  "ngayKetThuc": "2028-10-26T00:00:00"
}
```

---

## 🔒 AUTHORIZATION

### **Phân quyền theo role:**

| Endpoint | Admin | CoOwner | Staff |
|----------|-------|---------|-------|
| Auth (đăng ký/đăng nhập) | ✅ | ✅ | ✅ |
| Xem hồ sơ | ✅ | ✅ | ✅ |
| Cập nhật trạng thái user | ✅ | ❌ | ❌ |
| Đăng ký chủ xe | ✅ | ✅ | ❌ |
| Xem chủ xe | ✅ | ✅ | ❌ |
| Danh sách tất cả chủ xe | ✅ | ❌ | ❌ |
| Tạo hợp đồng | ✅ | ✅ | ❌ |
| Xem hợp đồng | ✅ | ✅ | ❌ |

### **Header Format:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMDFAdGVz...
```

---

## 🧪 TESTING

### **1. Sử dụng Postman/Insomnia:**

Import collection với các endpoint trên.

### **2. Sample Test Flow:**

```bash
# 1. Đăng ký user
POST /api/auth/dang-ky
→ Nhận token

# 2. Đăng ký chủ xe
POST /api/chu-xe (với token)
→ Nhận chuXeId

# 3. Tạo hợp đồng
POST /api/hop-dong (với chuXeId)
→ Nhận hopDongId

# 4. Xem danh sách hợp đồng
GET /api/hop-dong/chu-xe/{chuXeId}
→ List contracts

# 5. Xem chi tiết
GET /api/hop-dong/{hopDongId}
→ Contract details
```

### **3. Sample Data từ SQL:**

Database đã có sẵn sample data:
- User: `admin@evco.vn`, `owner1@gmail.com`, `owner2@gmail.com`
- Password (tất cả): `password` (BCrypt: `$2a$10$N9qo8uLOickgx2ZMRZoMy...`)

---

## ⚠️ LƯU Ý QUAN TRỌNG

### **Schema đã được đơn giản hóa:**

❌ **Không có các tính năng sau:**
- Xác thực giấy tờ với ảnh (CCCD mặt trước/sau, GPLX image)
- Workflow duyệt hợp đồng (Chờ duyệt → Đã duyệt → Đang hiệu lực)
- Trạng thái hợp đồng
- Tỷ lệ sở hữu, giá trị hợp đồng
- Điều khoản, ghi chú hợp đồng
- Chữ ký điện tử
- Thông tin người duyệt
- Công chứng

✅ **Chỉ có các chức năng cơ bản:**
- Đăng ký/đăng nhập với JWT
- Quản lý user (basic profile)
- Quản lý chủ xe (CRUD với CCCD, GPLX số)
- Tạo và xem hợp đồng (basic info)

**Phù hợp cho:** MVP, prototype, demo  
**Không phù hợp cho:** Production system với business logic phức tạp

---

## 🐛 TROUBLESHOOTING

### **1. Database connection failed:**
```
Kiểm tra:
- SQL Server đã chạy chưa?
- Username/password đúng chưa?
- Database 'ev_coownership' đã tạo chưa?
- Chạy file schema_simple.sql
```

### **2. JWT token expired:**
```
Token hết hạn sau 24h (86400000ms).
Đăng nhập lại để lấy token mới.
```

### **3. 403 Forbidden:**
```
Kiểm tra:
- Token có trong header chưa?
- Role có quyền truy cập endpoint không?
- Token có bị sửa đổi không?
```

### **4. Validation errors:**
```
Kiểm tra:
- Email format đúng chưa?
- CCCD: 9-12 chữ số
- SĐT: 10-11 chữ số
- Required fields có đủ chưa?
```

---

## 📊 DATABASE VIEWS & STORED PROCEDURES

### **View 1: vw_chu_xe_info**
```sql
SELECT 
    cx.chu_xe_id, cx.ho_ten, cx.cccd, cx.sdt,
    nd.ten_dang_nhap, nd.email, nd.loai_nguoi_dung
FROM chu_xe cx
INNER JOIN nguoi_dung nd ON cx.nguoi_dung_id = nd.nguoi_dung_id;
```

### **View 2: vw_hop_dong_info**
```sql
SELECT 
    hd.hop_dong_id, hd.xe_id, hd.ngay_bat_dau, hd.ngay_ket_thuc,
    cx.ho_ten, cx.sdt, nd.email
FROM hop_dong_dong_so_huu hd
INNER JOIN chu_xe cx ON hd.chu_xe_id = cx.chu_xe_id
INNER JOIN nguoi_dung nd ON cx.nguoi_dung_id = nd.nguoi_dung_id;
```

### **Stored Procedure: sp_get_hop_dong_by_chu_xe**
```sql
EXEC sp_get_hop_dong_by_chu_xe @chu_xe_id = 1
```

---

## 📚 TÀI LIỆU THAM KHẢO

- [Báo cáo đánh giá yêu cầu chi tiết](Doc/DANH_GIA_YEU_CAU.md)
- [Schema SQL](Doc/schema_simple.sql)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [JWT.io](https://jwt.io/)

---

## 👨‍💻 CONTACT

**Project:** EV Co-ownership System  
**Generated:** 26/10/2025  
**Version:** 0.0.1-SNAPSHOT  
**Build Status:** ✅ SUCCESS

---

## 📝 CHANGELOG

### **v0.0.1-SNAPSHOT (26/10/2025)**
- ✅ Initial release với schema đơn giản
- ✅ 4 entities: NguoiDung, ChuXe, HopDong, PhapLy
- ✅ 10 API endpoints
- ✅ JWT Authentication
- ✅ 60% giảm fields so với schema phức tạp
- ✅ Build success, no errors
