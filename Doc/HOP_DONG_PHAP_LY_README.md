# 📄 HỢP ĐỒNG PHÁP LÝ ĐIỆN TỬ - HƯỚNG DẪN SỬ DỤNG

## 🎯 Tổng quan

Module **Hợp Đồng Pháp Lý Điện Tử** cho phép:
- ✅ Tạo hợp đồng pháp lý từ hợp đồng đồng sở hữu
- ✅ Lưu trữ nội dung hợp đồng (text + PDF)
- ✅ Ký điện tử với chữ ký số (SHA-256)
- ✅ Xác minh tính hợp lệ của hợp đồng
- ✅ Tải xuống file PDF hợp đồng
- ✅ Quản lý trạng thái: Chưa ký → Đã ký → Bị hủy

---

## 📊 Database Schema

```sql
hop_dong_phap_ly_dien_tu
├── hop_dong_phap_ly_id (PK)
├── hop_dong_dong_so_huu_id (FK) → hop_dong_dong_so_huu.hop_dong_id
├── noi_dung_hop_dong (TEXT)
├── tep_hop_dong (LONGBLOB) - File PDF
├── chu_ky_dien_tu (VARCHAR 500) - SHA-256 hash
├── nguoi_ky_id (FK) → nguoi_dung.nguoi_dung_id
├── ngay_ky (DATETIME)
├── trang_thai (ENUM: ChuaKy, DaKy, BiHuy)
├── ngay_tao (DATETIME)
└── ngay_cap_nhat (DATETIME)
```

---

## 🔄 Workflow

### **1. Tạo hợp đồng pháp lý**

```http
POST /api/hop-dong-phap-ly
Authorization: Bearer {token}
Content-Type: application/json

{
  "hopDongDongSoHuuId": 3,
  "noiDungHopDong": "HỢP ĐỒNG ĐỒNG SỞ HỮU XE ĐIỆN...",
  "tepHopDong": "JVBERi0xLjQK..." // Base64 encoded PDF
}
```

**Response:**
```json
{
  "hopDongPhapLyId": 1,
  "hopDongDongSoHuuId": 3,
  "noiDungHopDong": "HỢP ĐỒNG...",
  "trangThai": "ChuaKy",
  "daKy": false,
  "ngayTao": "2025-11-02T10:30:00"
}
```

---

### **2. Lấy danh sách hợp đồng**

```http
GET /api/hop-dong-phap-ly
Authorization: Bearer {token}
```

---

### **3. Ký hợp đồng điện tử**

```http
POST /api/hop-dong-phap-ly/1/ky
Authorization: Bearer {token}
Content-Type: application/json

{
  "chuKyDienTu": "SHA256:a3f5c892b7e4d1f6e8c9a0b2d3e4f5g6..."
}
```

**Response:**
```json
{
  "hopDongPhapLyId": 1,
  "trangThai": "DaKy",
  "daKy": true,
  "nguoiKyId": 8,
  "ngayKy": "2025-11-02T11:15:00",
  "chuKyDienTu": "SHA256:a3f5c892..."
}
```

---

### **4. Xác minh hợp đồng**

```http
GET /api/hop-dong-phap-ly/1/xac-minh
Authorization: Bearer {token}
```

Kiểm tra:
- ✅ Chữ ký có hợp lệ không
- ✅ Hợp đồng có bị sửa đổi không
- ✅ Người ký có quyền ký không

---

### **5. Tải xuống file PDF**

```http
GET /api/hop-dong-phap-ly/1/tai-xuong
Authorization: Bearer {token}
```

Trả về file PDF với header:
```
Content-Type: application/pdf
Content-Disposition: attachment; filename="hop-dong-1.pdf"
```

---

### **6. Hủy hợp đồng (Admin only)**

```http
DELETE /api/hop-dong-phap-ly/1
Authorization: Bearer {admin_token}
```

---

## 🔐 Security & Permissions

| Endpoint | CoOwner | Admin |
|----------|---------|-------|
| POST /api/hop-dong-phap-ly | ✅ | ✅ |
| GET /api/hop-dong-phap-ly | ✅ | ✅ |
| POST /{id}/ky | ✅ | ✅ |
| GET /{id}/xac-minh | ✅ | ✅ |
| GET /{id}/tai-xuong | ✅ | ✅ |
| DELETE /{id} | ❌ | ✅ |

---

## 🧪 Testing

### **Test Flow 1: Tạo và ký hợp đồng**

1. Đăng nhập CHU_XE (1.3.1)
2. Tạo hợp đồng pháp lý (6.1)
3. Lấy danh sách (6.2)
4. Ký hợp đồng (6.4)
5. Xác minh (6.5)
6. Tải xuống PDF (6.6)

### **Test Flow 2: Admin hủy hợp đồng**

1. Đăng nhập ADMIN (1.4)
2. Xem danh sách (6.2)
3. Hủy hợp đồng (6.7)

---

## 📝 Notes

### **Base64 PDF Encoding**

Để convert PDF sang Base64:

**Bash/Linux:**
```bash
base64 -w 0 hop-dong.pdf
```

**PowerShell:**
```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("hop-dong.pdf"))
```

**JavaScript:**
```javascript
const fs = require('fs');
const pdfBase64 = fs.readFileSync('hop-dong.pdf').toString('base64');
```

### **SHA-256 Signature**

Để tạo chữ ký SHA-256:

**JavaScript:**
```javascript
const crypto = require('crypto');
const hash = crypto.createHash('sha256')
  .update(contractContent)
  .digest('hex');
```

**Java:**
```java
MessageDigest digest = MessageDigest.getInstance("SHA-256");
byte[] hash = digest.digest(contractContent.getBytes());
String signature = DatatypeConverter.printHexBinary(hash);
```

---

## 🐛 Troubleshooting

### **Lỗi: "Hợp đồng pháp lý đã tồn tại"**
- Mỗi `hopDongDongSoHuuId` chỉ có 1 hợp đồng pháp lý
- Kiểm tra xem đã tạo hợp đồng cho ID này chưa

### **Lỗi: "File PDF không hợp lệ"**
- Đảm bảo `tepHopDong` là Base64 string hợp lệ
- Kiểm tra file PDF không bị corrupt

### **Lỗi: "Hợp đồng đã được ký trước đó"**
- Không thể ký lại hợp đồng đã ký
- Phải tạo hợp đồng mới nếu cần sửa đổi

---

## 🚀 Future Enhancements

- [ ] Hỗ trợ ký nhiều lần (multi-signature)
- [ ] Tích hợp với hệ thống chữ ký số quốc gia
- [ ] Timestamp authority (TSA) để chứng thực thời gian ký
- [ ] Blockchain integration để lưu trữ hash bất biến
- [ ] Email notification khi hợp đồng được ký
- [ ] QR code để xác minh nhanh

---

## 📞 Support

Nếu có vấn đề, liên hệ:
- 📧 Email: support@ev-coownership.com
- 📱 Hotline: 1900-xxxx
