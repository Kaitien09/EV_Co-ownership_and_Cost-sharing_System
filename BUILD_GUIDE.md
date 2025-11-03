# HƯỚNG DẪN BUILD VÀ CHẠY PROJECT

## Tổng quan dự án đã tạo

Đã hoàn thành phân hệ **Người dùng & Hợp đồng** cho hệ thống EV Co-ownership bao gồm:

### 📁 Cấu trúc thư mục đã tạo:

```
src/main/java/com/example/demo/
├── entity/                         # Entities (Models)
│   ├── NguoiDung.java             # Người dùng
│   ├── ChuXe.java                 # Chủ xe
│   ├── HopDongDongSoHuu.java      # Hợp đồng đồng sở hữu
│   └── HopDongPhapLyDienTu.java   # Hợp đồng pháp lý điện tử
│
├── repository/                     # Data Access Layer
│   ├── NguoiDungRepository.java
│   ├── ChuXeRepository.java
│   ├── HopDongDongSoHuuRepository.java
│   └── HopDongPhapLyDienTuRepository.java
│
├── dto/                           # Data Transfer Objects
│   ├── DangKyRequest.java
│   ├── DangNhapRequest.java
│   ├── AuthResponse.java
│   ├── NguoiDungDTO.java
│   ├── CapNhatHoSoRequest.java
│   ├── XacThucGiayToRequest.java
│   ├── TaoHopDongRequest.java
│   ├── HopDongDTO.java
│   └── DuyetHopDongRequest.java
│
├── service/                       # Business Logic Layer
│   ├── AuthService.java           # Xác thực & Đăng ký/Đăng nhập
│   ├── JwtService.java            # JWT Token handling
│   ├── NguoiDungService.java      # Quản lý người dùng & hồ sơ
│   └── HopDongService.java        # Quản lý hợp đồng
│
├── controller/                    # REST API Controllers
│   ├── AuthController.java        # Auth endpoints
│   ├── NguoiDungController.java   # User profile endpoints
│   └── HopDongController.java     # Contract endpoints
│
├── security/                      # Security Configuration
│   ├── JwtAuthenticationFilter.java    # JWT filter
│   └── CustomUserDetailsService.java   # User details service
│
└── config/                        # Application Configuration
    └── SecurityConfig.java        # Spring Security config

src/main/resources/
├── application.properties         # Application configuration
└── static/
    └── index.html                # Demo frontend

Doc/
├── schema.sql                    # Database schema
└── DFD_EV_Coownership.drawio    # System design diagram

README_USER_CONTRACT.md           # API Documentation
```

## 🚀 Bước 1: Build Project

Mở PowerShell tại thư mục gốc của project và chạy:

```powershell
# Clean và build project
.\mvnw clean install

# Hoặc nếu muốn skip tests
.\mvnw clean install -DskipTests
```

**Lưu ý**: Nếu gặp lỗi classpath, cần đảm bảo Maven đã tải xong tất cả dependencies.

## 🗄️ Bước 2: Chuẩn bị Database

### 2.1. Cài đặt SQL Server
- Tải và cài SQL Server 2019 hoặc mới hơn
- Cài SQL Server Management Studio (SSMS) để quản lý

### 2.2. Tạo Database
```sql
CREATE DATABASE ev_coownership;
GO

USE ev_coownership;
GO
```

### 2.3. Chạy Schema
Mở file `Doc/schema.sql` trong SSMS và execute để tạo các bảng.

**Hoặc** để Spring Boot tự động tạo bảng, đảm bảo trong `application.properties`:
```properties
spring.jpa.hibernate.ddl-auto=update
```

### 2.4. Cấu hình Connection String

Cập nhật file `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=ev_coownership;encrypt=true;trustServerCertificate=true
spring.datasource.username=sa
spring.datasource.password=YOUR_SQL_SERVER_PASSWORD
```

## ▶️ Bước 3: Chạy Application

```powershell
# Chạy Spring Boot application
.\mvnw spring-boot:run
```

Server sẽ khởi động tại: **http://localhost:8080**

## 🌐 Bước 4: Test Frontend

Mở trình duyệt và truy cập:
```
http://localhost:8080
```

Bạn sẽ thấy giao diện đăng nhập/đăng ký.

## 🧪 Bước 5: Test APIs với Postman

### 5.1. Import Collection

Tạo một Postman collection với các requests sau:

#### 1. Đăng ký người dùng
```
POST http://localhost:8080/api/auth/dang-ky
Content-Type: application/json

{
  "hoTen": "Nguyen Van A",
  "email": "nguyenvana@example.com",
  "matKhau": "password123",
  "soDienThoai": "0912345678"
}
```

#### 2. Đăng nhập
```
POST http://localhost:8080/api/auth/dang-nhap
Content-Type: application/json

{
  "email": "nguyenvana@example.com",
  "matKhau": "password123"
}
```

**Response** sẽ trả về JWT token:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "idNguoiDung": 1,
  "hoTen": "Nguyen Van A",
  "email": "nguyenvana@example.com",
  "vaiTro": "NGUOI_DUNG",
  "message": "Đăng nhập thành công"
}
```

#### 3. Xem hồ sơ (cần token)
```
GET http://localhost:8080/api/nguoi-dung/1/ho-so
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 4. Cập nhật hồ sơ
```
PUT http://localhost:8080/api/nguoi-dung/1/ho-so
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "hoTen": "Nguyen Van A Updated",
  "soDienThoai": "0912345679",
  "diaChi": "123 Nguyen Hue, Q1, TP.HCM",
  "ngaySinh": "1990-01-01"
}
```

#### 5. Xác thực giấy tờ
```
POST http://localhost:8080/api/nguoi-dung/1/xac-thuc-giay-to
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "cccd": "001234567890",
  "cccdMatTruoc": "https://example.com/cccd-front.jpg",
  "cccdMatSau": "https://example.com/cccd-back.jpg",
  "gplx": "001234567891",
  "gplxImage": "https://example.com/gplx.jpg"
}
```

### 5.2. Test Contract APIs

Trước tiên cần tạo chủ xe (có thể tạo trực tiếp trong database):

```sql
-- Tạo user với role CHU_XE
INSERT INTO nguoi_dung (ho_ten, email, mat_khau, vai_tro, trang_thai_xac_thuc)
VALUES (N'Tran Van B', 'tranvanb@example.com', '$2a$10$...', 'CHU_XE', 'DA_XAC_THUC');

-- Lấy ID vừa tạo (giả sử là 2)
INSERT INTO chu_xe (id_nguoi_dung, so_luong_xe)
VALUES (2, 0);
```

#### 6. Tạo hợp đồng
```
POST http://localhost:8080/api/hop-dong
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "idChuXe": 1,
  "idNguoiDongSoHuu": 1,
  "idXe": 1,
  "tyLeSoHuu": 30.0,
  "giaTriHopDong": 300000000.0,
  "ngayBatDau": "2025-11-01",
  "thoiHanThang": 36,
  "dieuKhoan": "Điều khoản hợp đồng...",
  "ghiChu": "Ghi chú..."
}
```

#### 7. Xem danh sách hợp đồng
```
GET http://localhost:8080/api/hop-dong/nguoi-dung/1
Authorization: Bearer YOUR_TOKEN_HERE
```

## 🔧 Troubleshooting

### Lỗi: "Missing mandatory Classpath entries"
```powershell
# Reload Maven dependencies
.\mvnw dependency:resolve
.\mvnw clean compile
```

### Lỗi: Cannot connect to database
- Kiểm tra SQL Server đang chạy
- Kiểm tra username/password trong application.properties
- Kiểm tra firewall cho phép kết nối port 1433

### Lỗi: Port 8080 already in use
Thay đổi port trong `application.properties`:
```properties
server.port=8081
```

### Lỗi JWT: "Illegal base64 character"
Secret key trong application.properties phải là Base64 valid string.

## 📝 Các tính năng đã implement

✅ **Authentication & Authorization**
- Đăng ký người dùng
- Đăng nhập với JWT
- Role-based access control (NGUOI_DUNG, CHU_XE, ADMIN)

✅ **User Profile Management**
- Xem hồ sơ cá nhân
- Cập nhật thông tin
- Xác thực giấy tờ (CCCD, GPLX)
- Admin duyệt xác thực

✅ **Contract Management**
- Tạo hợp đồng đồng sở hữu
- Xem danh sách hợp đồng
- Admin duyệt hợp đồng
- Kích hoạt & kết thúc hợp đồng
- Quản lý pháp lý điện tử

✅ **Security**
- JWT authentication
- Password encryption (BCrypt)
- CORS configuration
- Method-level security

✅ **Frontend Demo**
- Responsive UI
- Login/Register forms
- Profile display
- Contract list

## 🎯 Next Steps - Tính năng nên phát triển tiếp

1. **File Upload**: Upload ảnh CCCD, GPLX
2. **Email Service**: Gửi email xác thực, thông báo
3. **Exception Handling**: Global exception handler
4. **Validation**: Chi tiết hơn cho các trường
5. **Audit Log**: Lưu vết các thao tác quan trọng
6. **PDF Generation**: Tạo file PDF hợp đồng
7. **Digital Signature**: Chữ ký điện tử thực sự
8. **Payment Integration**: Tích hợp cổng thanh toán
9. **Notification**: Real-time notifications với WebSocket
10. **Advanced Frontend**: React/Angular/Vue application

## 📚 Documentation

Chi tiết API documentation xem tại: `README_USER_CONTRACT.md`

## ⚠️ Lưu ý quan trọng

1. **Secret Key**: Thay đổi JWT secret trong production
2. **Password**: Thay đổi database password
3. **CORS**: Cấu hình CORS phù hợp với frontend domain
4. **HTTPS**: Sử dụng HTTPS trong production
5. **Validation**: Thêm validation rules phù hợp với business
6. **Error Messages**: Không expose sensitive information trong error messages

## 📧 Support

Nếu gặp vấn đề, kiểm tra:
1. Logs trong console
2. Database connection
3. Dependencies đã tải đầy đủ
4. Java version (cần Java 17+)

---

**Chúc bạn code thành công! 🚀**
