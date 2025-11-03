# 📦 SQL FILES PACKAGE - EV CO-OWNERSHIP PLATFORM

## 📁 Danh sách các file SQL đã tạo

### ✅ **1. complete_database_schema.sql** ⭐ MAIN FILE
**Mục đích:** File SQL hoàn chỉnh và đầy đủ nhất cho toàn bộ dự án  
**Nội dung:**
- 9 bảng chính (nguoi_dung, chu_xe, xe, giay_to_chu_xe, hop_dong_dong_so_huu, hop_dong_phap_ly_dien_tu, lich_su_su_dung_xe, thanh_toan)
- 4 views hữu ích
- 4 stored procedures
- 6 triggers tự động
- 1 scheduled event
- Dữ liệu mẫu đầy đủ
- Indexes tối ưu
- Foreign keys và constraints

**Khi nào dùng:** Dùng file này khi bắt đầu dự án mới hoặc reset database

---

### ✅ **2. create_hop_dong_phap_ly_table.sql**
**Mục đích:** Tạo riêng bảng hợp đồng pháp lý điện tử  
**Nội dung:**
- Bảng hop_dong_phap_ly_dien_tu với đầy đủ fields
- Foreign keys
- Indexes
- Constraints

**Khi nào dùng:** Khi chỉ cần thêm bảng hợp đồng pháp lý vào database hiện có

---

### ✅ **3. V3__create_hop_dong_phap_ly_dien_tu.sql**
**Mục đích:** Migration script cho Flyway/Liquibase  
**Nội dung:** Giống file #2 nhưng format cho migration tools

**Khi nào dùng:** Khi dùng Flyway/Liquibase để quản lý database version

---

### ✅ **4. test_database.sql**
**Mục đích:** Kiểm tra database sau khi setup  
**Nội dung:**
- 15 tests tự động
- Kiểm tra cấu trúc
- Kiểm tra dữ liệu
- Kiểm tra performance
- Kiểm tra foreign keys, indexes, views, procedures, triggers, events

**Khi nào dùng:** Sau khi chạy complete_database_schema.sql để verify

---

### ✅ **5. backup_restore_scripts.sh**
**Mục đích:** Scripts backup và restore database  
**Nội dung:**
- Backup scripts (Windows PowerShell & Linux Bash)
- Restore scripts
- Automated backup (daily)
- Compressed backup
- Export to CSV
- Clone database

**Khi nào dùng:** 
- Backup hàng ngày
- Trước khi update database
- Khi cần clone database cho testing

---

### 📋 **6. create-admin.sql**
**Mục đích:** Tạo tài khoản Admin nhanh  
**Khi nào dùng:** Khi cần thêm admin mới

---

### 📋 **7. schema_simple.sql**
**Mục đích:** Schema đơn giản cho SQL Server (cũ)  
**Note:** File này cho SQL Server, không dùng cho MySQL

---

### 📋 **8. migration_001_contract_workflow.sql**
**Mục đích:** Migration thêm workflow cho hợp đồng (SQL Server)  
**Note:** Cho SQL Server, không dùng cho MySQL

---

### 📋 **9. migration_002_document_verification.sql**
**Mục đích:** Migration thêm bảng giấy tờ (SQL Server)  
**Note:** Cho SQL Server, không dùng cho MySQL

---

### 📖 **10. DATABASE_README.md**
**Mục đích:** Hướng dẫn sử dụng database đầy đủ  
**Nội dung:**
- Cách chạy scripts
- Tài khoản mặc định
- Troubleshooting
- Performance tips
- Migration workflow

---

## 🚀 QUICK START GUIDE

### **Bước 1: Setup Database (Lần đầu)**

```bash
# Windows PowerShell
mysql -u root -p < "d:\Code java\Final\final\sql\complete_database_schema.sql"

# Linux/Mac
mysql -u root -p < /path/to/complete_database_schema.sql
```

### **Bước 2: Test Database**

```bash
mysql -u root -p < "d:\Code java\Final\final\sql\test_database.sql"
```

### **Bước 3: Configure Spring Boot**

Cập nhật `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ev_coownership
spring.datasource.username=root
spring.datasource.password=your_password
```

### **Bước 4: Start Application**

```bash
cd "d:\Code java\Final\final"
.\mvnw spring-boot:run
```

### **Bước 5: Test API**

Mở `test-api.http` và test endpoints

---

## 📊 DATABASE STRUCTURE OVERVIEW

```
ev_coownership
│
├── Core Tables (8 bảng chính)
│   ├── nguoi_dung (Users)
│   ├── chu_xe (Vehicle Owners)
│   ├── xe (Vehicles)
│   ├── giay_to_chu_xe (Documents)
│   ├── hop_dong_dong_so_huu (Co-ownership Contracts)
│   ├── hop_dong_phap_ly_dien_tu (Legal Contracts)
│   ├── lich_su_su_dung_xe (Usage History) [Optional]
│   └── thanh_toan (Payments) [Optional]
│
├── Views (4 views)
│   ├── v_chu_xe_full
│   ├── v_hop_dong_full
│   ├── v_giay_to_cho_duyet
│   └── v_hop_dong_cho_duyet
│
├── Stored Procedures (4 procedures)
│   ├── sp_tao_chu_xe()
│   ├── sp_duyet_hop_dong()
│   ├── sp_duyet_giay_to()
│   └── sp_kich_hoat_hop_dong()
│
├── Triggers (6 triggers)
│   └── Auto-update ngay_cap_nhat
│
└── Events (1 event)
    └── evt_expire_contracts (daily)
```

---

## 🔑 DEFAULT CREDENTIALS

### Admin Account
- **Username:** admin
- **Email:** admin@evco.vn
- **Password:** Admin123!

### Sample Users
| Username | Email | Password | Role |
|----------|-------|----------|------|
| owner1 | owner1@gmail.com | Password123! | CoOwner |
| owner2 | owner2@gmail.com | Password123! | CoOwner |
| owner3 | owner3@gmail.com | Password123! | CoOwner |

---

## 📈 WHAT'S INCLUDED

### ✅ Complete Features
- [x] User management (Admin, CoOwner, Staff)
- [x] Vehicle owner profiles
- [x] Vehicle information
- [x] Document verification workflow
- [x] Co-ownership contract management
- [x] Digital legal contracts with e-signature
- [x] Usage history tracking (optional)
- [x] Payment management (optional)
- [x] Auto-update timestamps
- [x] Auto-expire contracts
- [x] Comprehensive views
- [x] Business logic procedures
- [x] Performance optimization (indexes)
- [x] Data integrity (foreign keys, constraints)

### ✅ Sample Data
- 1 Admin account
- 3 CoOwner accounts
- 4 vehicles (VinFast, Tesla, Hyundai, BYD)
- 3 owner profiles
- 3 contracts (different statuses)
- 4 documents (different statuses)

---

## 🛠️ MAINTENANCE

### Daily Tasks
```bash
# Backup database
.\backup_restore_scripts.sh  # Run section 1
```

### Weekly Tasks
```sql
-- Check database health
ANALYZE TABLE nguoi_dung, chu_xe, xe, hop_dong_dong_so_huu;
OPTIMIZE TABLE nguoi_dung, chu_xe, xe, hop_dong_dong_so_huu;
```

### Monthly Tasks
```bash
# Test restore from backup
mysql -u root -p ev_coownership_test < latest_backup.sql
```

---

## 📞 SUPPORT

### Common Issues

**Q: "Unknown database 'ev_coownership'"**  
A: Chạy `complete_database_schema.sql` từ đầu

**Q: "Table already exists"**  
A: Drop database và tạo lại:
```sql
DROP DATABASE ev_coownership;
-- Chạy lại complete_database_schema.sql
```

**Q: "Cannot add foreign key constraint"**  
A: Chạy script từ đầu (thứ tự tạo bảng quan trọng)

**Q: "Access denied for user"**  
A: Kiểm tra user privileges:
```sql
GRANT ALL PRIVILEGES ON ev_coownership.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

---

## 🎯 RECOMMENDED WORKFLOW

### For Development
1. Run `complete_database_schema.sql`
2. Run `test_database.sql`
3. Start Spring Boot
4. Test APIs with `test-api.http`

### For Production
1. Backup current database
2. Run `complete_database_schema.sql` on staging
3. Test thoroughly
4. Run on production during maintenance window
5. Verify with `test_database.sql`
6. Monitor logs

### For Testing
1. Clone database: `sp_clone_database()`
2. Run tests on cloned database
3. Drop test database when done

---

## 📚 DOCUMENTATION

- **Database Schema:** See `complete_database_schema.sql`
- **API Documentation:** See `Doc/HOP_DONG_PHAP_LY_README.md`
- **Testing:** See `test-api.http`
- **Backup Guide:** See `backup_restore_scripts.sh`

---

## ✅ CHECKLIST

Before deploying to production:

- [ ] Run `complete_database_schema.sql`
- [ ] Run `test_database.sql` - All tests pass
- [ ] Backup strategy configured
- [ ] Change default passwords
- [ ] Configure proper MySQL users (don't use root in production)
- [ ] Enable SSL for MySQL connections
- [ ] Set up monitoring (slow query log)
- [ ] Test restore procedure
- [ ] Document custom changes
- [ ] Train team on backup/restore

---

## 🎉 YOU'RE ALL SET!

Database is ready to power your EV Co-Ownership Platform!

**Next Steps:**
1. ✅ Database: Complete
2. ⏭️ Start Spring Boot application
3. ⏭️ Test APIs
4. ⏭️ Deploy to production

---

**Created:** 2025-11-02  
**Version:** 1.0  
**Author:** GitHub Copilot  
**Project:** EV Co-Ownership Platform
