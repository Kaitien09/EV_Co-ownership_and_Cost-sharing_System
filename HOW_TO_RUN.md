# 🚀 Hướng Dẫn Chạy Dự Án - Hệ Thống Đồng Sở Hữu EV

## 📋 Yêu Cầu Hệ Thống

- ✅ Java 17 trở lên
- ✅ SQL Server 2016 trở lên
- ✅ Maven (đã có trong project: mvnw.cmd)
- ✅ VS Code + REST Client extension

---

## 🎯 CÁCH CHẠY DỰ ÁN - CỰC ĐỔN GIẢN

### **Cách 1: Double-click file `start.bat`** ⭐ KHUYẾN NGHỊ

1. Mở thư mục: `d:\Code java\Final\final`
2. Double-click file **`start.bat`**
3. Đợi ~15 giây cho application khởi động
4. Xem log, nếu thấy `Started FinalApplication` → Thành công!

### **Cách 2: Chạy từ Terminal**

```bash
cd "d:\Code java\Final\final"
.\start.bat
```

### **Cách 3: Chạy trực tiếp Maven (không qua batch file)**

```bash
cd "d:\Code java\Final\final"
.\mvnw.cmd spring-boot:run
```

---

## 🛑 DỪNG DỰ ÁN

### **Cách 1: Double-click `stop.bat`**
- Tự động tìm và dừng application trên port 8080

### **Cách 2: Nhấn `Ctrl+C` trong terminal**
- Nếu đang chạy trong terminal, nhấn `Ctrl+C` 2 lần

---

## ✅ KIỂM TRA TRẠNG THÁI

### **Double-click `status.bat`**
- Kiểm tra application có đang chạy không
- Kiểm tra SQL Server có hoạt động không
- Hiển thị thông tin kết nối

---

## 🧪 TEST API

### **Cách 1: Dùng REST Client trong VS Code** ⭐ DỄ NHẤT

1. Mở file: `test-api.http`
2. Click nút **"Send Request"** trên mỗi API endpoint
3. Xem kết quả trong tab bên cạnh

### **Cách 2: Dùng PowerShell**

```powershell
# Test đăng ký
$body = '{"tenDangNhap":"user1","matKhau":"Pass123!","email":"user1@example.com"}'
Invoke-RestMethod -Uri "http://localhost:8080/api/auth/dang-ky" -Method POST -Body $body -ContentType "application/json"

# Test đăng nhập
$body = '{"email":"user1@example.com","matKhau":"Pass123!"}'
Invoke-RestMethod -Uri "http://localhost:8080/api/auth/dang-nhap" -Method POST -Body $body -ContentType "application/json"
```

### **Cách 3: Dùng trình duyệt (chỉ GET requests)**

```
http://localhost:8080/actuator/health
```

---

## 📁 CẤU TRÚC FILE QUAN TRỌNG

```
d:\Code java\Final\final\
│
├── start.bat                    # ⭐ Khởi động dự án
├── stop.bat                     # 🛑 Dừng dự án
├── status.bat                   # ✅ Kiểm tra trạng thái
│
├── test-api.http                # 🧪 File test API (dùng REST Client)
├── API_TESTING_GUIDE.md         # 📖 Hướng dẫn test API chi tiết
│
├── mvnw.cmd                     # Maven wrapper (Windows)
├── pom.xml                      # Maven dependencies
│
└── src/
    └── main/
        ├── java/                # Source code Java
        └── resources/
            └── application.properties  # Cấu hình database
```

---

## 🔧 CẤU HÌNH DATABASE

**File**: `src/main/resources/application.properties`

```properties
# Database Connection
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=ev_coownership;encrypt=true;trustServerCertificate=true
spring.datasource.username=appuser
spring.datasource.password=AppUser123!

# Server Port
server.port=8080

# JWT Secret (đã cấu hình)
jwt.secret=your-secret-key
jwt.expiration=86400000
```

---

## 🚨 XỬ LÝ LỖI THƯỜNG GẶP

### ❌ Lỗi: "Port 8080 đã được sử dụng"

**Giải pháp:**
1. Chạy `stop.bat` để dừng application cũ
2. Hoặc chạy: `netstat -ano | findstr :8080` để tìm PID
3. Dừng process: `taskkill /F /PID <PID>`

### ❌ Lỗi: "Cannot open database 'ev_coownership'"

**Giải pháp:**
1. Kiểm tra SQL Server đã khởi động chưa
2. Kiểm tra database đã tạo chưa:
   ```sql
   CREATE DATABASE ev_coownership;
   ```
3. Kiểm tra user `appuser` có quyền truy cập:
   ```sql
   USE ev_coownership;
   EXEC sp_addrolemember 'db_owner', 'appuser';
   ```

### ❌ Lỗi: "Login failed for user 'appuser'"

**Giải pháp:**
1. Tạo lại user:
   ```sql
   CREATE LOGIN appuser WITH PASSWORD = 'AppUser123!';
   USE ev_coownership;
   CREATE USER appuser FOR LOGIN appuser;
   ALTER ROLE db_owner ADD MEMBER appuser;
   ```

### ❌ Lỗi: REST Client không thấy nút "Send Request"

**Giải pháp:**
1. Cài extension "REST Client" trong VS Code
2. Reload VS Code: `Ctrl+Shift+P` → "Reload Window"
3. Mở lại file `test-api.http`

---

## 📚 API ENDPOINTS

### **Authentication** (Public - không cần token)
- `POST /api/auth/dang-ky` - Đăng ký user mới
- `POST /api/auth/dang-nhap` - Đăng nhập (nhận JWT token)

### **Người Dùng** (Cần JWT token)
- `GET /api/nguoi-dung/profile` - Lấy thông tin profile
- `PUT /api/nguoi-dung/profile` - Cập nhật profile
- `PUT /api/nguoi-dung/doi-mat-khau` - Đổi mật khẩu

### **Chủ Xe** (Cần JWT token)
- `POST /api/chu-xe` - Tạo hồ sơ chủ xe
- `GET /api/chu-xe/ho-so-cua-toi` - Lấy hồ sơ của mình
- `PUT /api/chu-xe/{id}` - Cập nhật hồ sơ

### **Hợp Đồng** (Cần JWT token)
- `POST /api/hop-dong` - Tạo hợp đồng mới
- `GET /api/hop-dong` - Danh sách hợp đồng
- `GET /api/hop-dong/{id}` - Chi tiết hợp đồng
- `PUT /api/hop-dong/{id}/duyet` - Duyệt hợp đồng (Admin)
- `PUT /api/hop-dong/{id}/tu-choi` - Từ chối (Admin)

### **Giấy Tờ** (Cần JWT token)
- `POST /api/giay-to` - Upload giấy tờ
- `GET /api/giay-to/chu-xe/{id}` - Lấy giấy tờ của chủ xe
- `PUT /api/giay-to/{id}/xac-minh` - Xác minh (Admin)

Xem chi tiết tất cả API trong file: **`API_TESTING_GUIDE.md`**

---

## 🎯 WORKFLOW TEST ĐẦY ĐỦ

### **Bước 1: Khởi động dự án**
```bash
.\start.bat
```
Đợi thấy: `Started FinalApplication in X seconds`

### **Bước 2: Mở file test**
```
test-api.http
```

### **Bước 3: Test theo thứ tự**
1. **Đăng ký user** (dòng 9) → Click "Send Request"
2. **Đăng nhập** (dòng 19) → Token tự động lưu
3. **Lấy profile** (dòng 65) → Dùng token đã lưu
4. **Tạo hồ sơ chủ xe** (dòng 99)
5. **Tạo hợp đồng** (dòng 145)

---

## 📞 HỖ TRỢ

### **Logs**
- Xem trong terminal đang chạy `start.bat`
- Log file: `target/spring.log` (nếu có cấu hình)

### **Database**
- Kết nối: `localhost:1433`
- Database: `ev_coownership`
- User: `appuser` / `AppUser123!`

### **Application**
- URL: http://localhost:8080
- Port: 8080
- Profile: default

---

## ✨ TÍNH NĂNG ĐẶC BIỆT

- ✅ JWT Authentication (24h expiry)
- ✅ Role-based Authorization (ADMIN, CHU_XE, DONG_SO_HUU)
- ✅ Auto password expiry scheduling
- ✅ Document verification system
- ✅ Digital signature for contracts
- ✅ CORS enabled
- ✅ RESTful API design

---

## 📝 GHI CHÚ

- Token JWT có hiệu lực **24 giờ**
- Mật khẩu được mã hóa bằng **BCrypt**
- Database schema tự động update khi khởi động (ddl-auto=update)
- Hỗ trợ tiếng Việt có dấu trong database (NVARCHAR)

---

## 🎉 CHÚC THÀNH CÔNG!

Nếu gặp vấn đề, hãy:
1. Chạy `status.bat` để kiểm tra
2. Xem log trong terminal
3. Kiểm tra SQL Server đang chạy
4. Restart lại application bằng `stop.bat` → `start.bat`
