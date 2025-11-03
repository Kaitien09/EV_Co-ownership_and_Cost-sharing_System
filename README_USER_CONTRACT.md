# EV Co-ownership System - User & Contract Module

## Mô tả Phân hệ Người dùng & Hợp đồng

Phân hệ này quản lý:
- Đăng ký, đăng nhập, đăng xuất người dùng
- Quản lý hồ sơ cá nhân
- Xác thực giấy tờ (CCCD, GPLX)
- Quản lý hợp đồng đồng sở hữu xe điện
- Hợp đồng pháp lý điện tử

## Cấu trúc Database

### Bảng: nguoi_dung
Lưu trữ thông tin người dùng trong hệ thống.

### Bảng: chu_xe
Lưu trữ thông tin chủ xe (một người dùng có thể trở thành chủ xe).

### Bảng: hop_dong_dong_so_huu
Lưu trữ thông tin hợp đồng đồng sở hữu giữa chủ xe và người dùng.

### Bảng: hop_dong_phap_ly_dien_tu
Lưu trữ thông tin pháp lý điện tử của hợp đồng (chữ ký, PDF, hash).

## API Endpoints

### Authentication APIs

#### 1. Đăng ký
```
POST /api/auth/dang-ky
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
POST /api/auth/dang-nhap
Content-Type: application/json

{
  "email": "nguyenvana@example.com",
  "matKhau": "password123"
}
```

**Response:**
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

### User Profile APIs

#### 3. Xem hồ sơ cá nhân
```
GET /api/nguoi-dung/{id}/ho-so
Authorization: Bearer <token>
```

#### 4. Cập nhật hồ sơ
```
PUT /api/nguoi-dung/{id}/ho-so
Authorization: Bearer <token>
Content-Type: application/json

{
  "hoTen": "Nguyen Van A",
  "soDienThoai": "0912345678",
  "diaChi": "123 Nguyen Hue, Q1, TP.HCM",
  "ngaySinh": "1990-01-01"
}
```

#### 5. Xác thực giấy tờ
```
POST /api/nguoi-dung/{id}/xac-thuc-giay-to
Authorization: Bearer <token>
Content-Type: application/json

{
  "cccd": "001234567890",
  "cccdMatTruoc": "https://example.com/cccd-front.jpg",
  "cccdMatSau": "https://example.com/cccd-back.jpg",
  "gplx": "001234567891",
  "gplxImage": "https://example.com/gplx.jpg"
}
```

#### 6. Duyệt xác thực (Admin only)
```
POST /api/nguoi-dung/{id}/duyet-xac-thuc?daDuyet=true&lyDo=OK
Authorization: Bearer <token>
```

### Contract APIs

#### 7. Tạo hợp đồng
```
POST /api/hop-dong
Authorization: Bearer <token>
Content-Type: application/json

{
  "idChuXe": 1,
  "idNguoiDongSoHuu": 2,
  "idXe": 1,
  "tyLeSoHuu": 30.0,
  "giaTriHopDong": 300000000.0,
  "ngayBatDau": "2025-11-01",
  "thoiHanThang": 36,
  "dieuKhoan": "Điều khoản hợp đồng...",
  "ghiChu": "Ghi chú..."
}
```

#### 8. Danh sách hợp đồng của chủ xe
```
GET /api/hop-dong/chu-xe/{idChuXe}
Authorization: Bearer <token>
```

#### 9. Danh sách hợp đồng của người dùng
```
GET /api/hop-dong/nguoi-dung/{idNguoiDung}
Authorization: Bearer <token>
```

#### 10. Danh sách hợp đồng chờ duyệt (Admin only)
```
GET /api/hop-dong/cho-duyet
Authorization: Bearer <token>
```

#### 11. Chi tiết hợp đồng
```
GET /api/hop-dong/{id}
Authorization: Bearer <token>
```

#### 12. Duyệt hợp đồng (Admin only)
```
POST /api/hop-dong/duyet?nguoiDuyetId=1
Authorization: Bearer <token>
Content-Type: application/json

{
  "idHopDong": 1,
  "trangThai": "DA_DUYET",
  "lyDoTuChoi": null
}
```

#### 13. Kích hoạt hợp đồng (Admin only)
```
POST /api/hop-dong/{id}/kich-hoat
Authorization: Bearer <token>
```

#### 14. Kết thúc hợp đồng
```
POST /api/hop-dong/{id}/ket-thuc
Authorization: Bearer <token>
```

## Vai trò (Roles)

- **NGUOI_DUNG**: Người dùng thông thường
- **CHU_XE**: Chủ xe (có thể tạo hợp đồng đồng sở hữu)
- **NHAN_VIEN**: Nhân viên
- **ADMIN**: Quản trị viên

## Trạng thái Hợp đồng

- **CHO_DUYET**: Chờ duyệt
- **DA_DUYET**: Đã duyệt
- **TU_CHOI**: Từ chối
- **DANG_HIEU_LUC**: Đang hiệu lực
- **HET_HAN**: Hết hạn
- **HUY**: Hủy

## Trạng thái Xác thực Giấy tờ

- **CHUA_XAC_THUC**: Chưa xác thực
- **DANG_CHO_DUYET**: Đang chờ duyệt
- **DA_XAC_THUC**: Đã xác thực
- **TU_CHOI**: Từ chối

## Cấu hình

### Database
Cấu hình trong `application.properties`:
```properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=ev_coownership
spring.datasource.username=sa
spring.datasource.password=YourPassword123
```

### JWT
- Secret key: Đã cấu hình trong `application.properties`
- Expiration: 24 giờ (86400000 ms)

## Chạy ứng dụng

### Yêu cầu
- Java 17+
- Maven 3.6+
- SQL Server 2019+

### Khởi động
```bash
mvnw spring-boot:run
```

Hoặc:
```bash
mvnw clean package
java -jar target/final-0.0.1-SNAPSHOT.jar
```

## Testing

Sử dụng Postman hoặc curl để test APIs.

### Ví dụ với curl:

```bash
# Đăng ký
curl -X POST http://localhost:8080/api/auth/dang-ky \
  -H "Content-Type: application/json" \
  -d '{
    "hoTen": "Nguyen Van A",
    "email": "nguyenvana@example.com",
    "matKhau": "password123",
    "soDienThoai": "0912345678"
  }'

# Đăng nhập
curl -X POST http://localhost:8080/api/auth/dang-nhap \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nguyenvana@example.com",
    "matKhau": "password123"
  }'

# Xem hồ sơ (cần token)
curl -X GET http://localhost:8080/api/nguoi-dung/1/ho-so \
  -H "Authorization: Bearer <your_token>"
```

## Lưu ý

1. **Security**: Tất cả endpoints ngoại trừ `/api/auth/**` đều cần authentication.
2. **Authorization**: Một số endpoints yêu cầu vai trò cụ thể (ADMIN, CHU_XE).
3. **Validation**: Tất cả request DTOs đều có validation, kiểm tra format email, số điện thoại, CCCD, v.v.
4. **Error Handling**: Hiện tại chỉ trả về lỗi đơn giản, cần bổ sung GlobalExceptionHandler.

## Tính năng cần phát triển tiếp

1. **Frontend**: Tạo giao diện React/Angular/Vue
2. **Upload file**: Xử lý upload ảnh CCCD, GPLX
3. **Email**: Gửi email xác thực, thông báo
4. **Notification**: Hệ thống thông báo real-time
5. **Payment**: Tích hợp cổng thanh toán
6. **PDF**: Tạo PDF hợp đồng tự động
7. **Digital Signature**: Chữ ký điện tử
8. **Audit Log**: Lưu vết các thao tác quan trọng
