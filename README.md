# EV Co-ownership & Cost-sharing System

## Giới thiệu

**EV Co-ownership & Cost-sharing System** là hệ thống phần mềm toàn diện cho việc quản lý đồng sở hữu và chia sẻ chi phí xe điện. Hệ thống kết nối Chủ xe, Nhà vận hành, Khách hàng và Trung tâm dịch vụ trong một nền tảng thống nhất.

## Tính năng

### Cho Chủ xe (Co-owner)
- **Quản lý tài khoản & quyền sở hữu**: Đăng ký, xác thực, quản lý tỷ lệ sở hữu, hợp đồng điện tử
- **Đặt lịch & sử dụng xe**: Lịch chung, đặt lịch trước, hệ thống ưu tiên công bằng
- **Chi phí & thanh toán**: Tự động chia chi phí, thanh toán trực tuyến, báo cáo tài chính
- **Quản lý nhóm**: Thành viên, bỏ phiếu, quỹ chung, phân tích AI

### Cho Khách hàng
- Nhắc nhở bảo dưỡng định kỳ
- Đặt lịch dịch vụ trực tuyến
- Quản lý hồ sơ & chi phí bảo dưỡng
- Thanh toán trực tuyến

### Cho Nhà vận hành (Admin)
- Quản lý nhóm xe đồng sở hữu
- Quản lý hợp đồng pháp lý điện tử
- Check-in/Check-out xe (QR code, ký số)
- Giám sát tranh chấp và báo cáo tài chính

### Cho Trung tâm dịch vụ
- Quản lý khách hàng & xe điện
- Lịch hẹn & phân công kỹ thuật viên
- Quy trình bảo dưỡng & quản lý phụ tùng
- Quản lý nhân sự & báo cáo tài chính
- AI gợi ý nhu cầu phụ tùng


## Công nghệ sử dụng

### Backend
- **Java Spring Boot** - Framework chính
- **Spring Security** - Xác thực và phân quyền
- **JPA/Hibernate** - ORM và quản lý database
- **Maven** - Quản lý dependencies

### Frontend
- **React** - UI framework chính
- **Vite** - Build tool và dev server
- **Modern CSS** - Styling và responsive design

### Database
- **MySQL** - Database hệ thống chính
- **Flyway** - Quản lý database migration

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Triển khai đa container

## Bắt đầu

### Yêu cầu hệ thống
- Java 17+
- Node.js 18+
- MySQL 8.0+
- Maven 3.6+

### Cài đặt & Chạy

**1. Clone repository:**
```bash
git clone https://github.com/Kaitien09/EV_Co-ownership_and_Cost-sharing_System.git
cd EV_Sharing
```
**2. Khởi động MySQL container:**
```bash
docker-compose up -d mysql
```
- MySQL container tạo database EV_db tự động
- Flyway migration áp dụng các bảng và dữ liệu ban đầu

**3. Chạy backend:**
```bash
cd backend
.\mvnw clean install
.\mvnw spring-boot:run
```
- Backend sẽ kết nối tới MySQL container (hoặc thông tin trong application.yml)

# Contributing
- Fork repository
- Tạo branch riêng
- Commit và push lên branch của bạn
- Tạo Pull Request