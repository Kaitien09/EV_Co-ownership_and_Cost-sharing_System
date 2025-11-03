# ⚡ QUICK REFERENCE CARD - DATABASE

## 🚀 SETUP (One-time)

```bash
# Run main SQL file
mysql -u root -p < complete_database_schema.sql

# Test database
mysql -u root -p < test_database.sql
```

## 🔑 DEFAULT LOGIN

| Role | Username | Email | Password |
|------|----------|-------|----------|
| Admin | admin | admin@evco.vn | Admin123! |
| CoOwner | owner1 | owner1@gmail.com | Password123! |

## 📊 TABLES (9 core)

1. **nguoi_dung** - Users (Admin, CoOwner, Staff)
2. **chu_xe** - Vehicle owner profiles
3. **xe** - Electric vehicles
4. **giay_to_chu_xe** - Documents (CCCD, GPLX, HoKhau)
5. **hop_dong_dong_so_huu** - Co-ownership contracts
6. **hop_dong_phap_ly_dien_tu** - Legal contracts
7. **lich_su_su_dung_xe** - Usage history (optional)
8. **thanh_toan** - Payments (optional)

## 🔍 USEFUL QUERIES

### Check all users
```sql
SELECT nguoi_dung_id, email, loai_nguoi_dung, trang_thai FROM nguoi_dung;
```

### Pending contracts
```sql
SELECT * FROM v_hop_dong_cho_duyet;
```

### Pending documents
```sql
SELECT * FROM v_giay_to_cho_duyet;
```

### All contracts for a user
```sql
SELECT * FROM v_hop_dong_full WHERE email_chu_xe = 'owner1@gmail.com';
```

### Vehicle availability
```sql
SELECT xe_id, ten_xe, hang_xe, bien_so, trang_thai 
FROM xe 
WHERE trang_thai = 'SanSang';
```

## 🛠️ STORED PROCEDURES

### Approve contract
```sql
CALL sp_duyet_hop_dong(hop_dong_id, nguoi_duyet_id, TRUE/FALSE, 'ly_do');
```

### Approve document
```sql
CALL sp_duyet_giay_to(giay_to_id, nguoi_duyet_id, TRUE/FALSE, 'ly_do');
```

### Activate contract
```sql
CALL sp_kich_hoat_hop_dong(hop_dong_id);
```

## 💾 BACKUP

### Full backup
```bash
mysqldump -u root -p --databases ev_coownership > backup.sql
```

### Restore
```bash
mysql -u root -p < backup.sql
```

## 🔄 STATUS VALUES

### nguoi_dung.trang_thai
- HoatDong
- Ngung

### nguoi_dung.loai_nguoi_dung
- Admin
- CoOwner
- Staff

### xe.trang_thai
- SanSang
- DangSuDung
- BaoTri
- NgungHoatDong

### giay_to_chu_xe.trang_thai_xac_thuc
- ChuaXacThuc
- DangChoDuyet
- DaXacThuc
- TuChoi

### hop_dong_dong_so_huu.trang_thai
- ChoDuyet
- DaDuyet
- TuChoi
- DangHieuLuc
- HetHan
- DaHuy

### hop_dong_phap_ly_dien_tu.trang_thai
- ChuaKy
- DaKy
- BiHuy

## 🎯 COMMON TASKS

### Add new user
```sql
INSERT INTO nguoi_dung (ten_dang_nhap, email, mat_khau, loai_nguoi_dung)
VALUES ('username', 'email@example.com', '$2a$10$...', 'CoOwner');
```

### Add new vehicle
```sql
INSERT INTO xe (ten_xe, hang_xe, model, bien_so, gia_tri, trang_thai)
VALUES ('VinFast VF8', 'VinFast', 'VF8', '30A-12345', 1200000000, 'SanSang');
```

### Update contract status
```sql
UPDATE hop_dong_dong_so_huu 
SET trang_thai = 'DangHieuLuc' 
WHERE hop_dong_id = 1;
```

### Find expired contracts
```sql
SELECT * FROM hop_dong_dong_so_huu 
WHERE trang_thai = 'DangHieuLuc' 
  AND ngay_ket_thuc < NOW();
```

## 📈 PERFORMANCE

### Analyze tables
```sql
ANALYZE TABLE nguoi_dung, chu_xe, xe, hop_dong_dong_so_huu;
```

### Optimize tables
```sql
OPTIMIZE TABLE nguoi_dung, chu_xe, xe, hop_dong_dong_so_huu;
```

### Check indexes
```sql
SHOW INDEXES FROM hop_dong_dong_so_huu;
```

## 🚨 TROUBLESHOOTING

### Reset database
```sql
DROP DATABASE ev_coownership;
-- Run complete_database_schema.sql again
```

### Check foreign keys
```sql
SELECT * FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
WHERE TABLE_SCHEMA = 'ev_coownership' 
  AND REFERENCED_TABLE_NAME IS NOT NULL;
```

### View errors
```sql
SHOW ERRORS;
SHOW WARNINGS;
```

## 📞 SUPPORT FILES

| File | Purpose |
|------|---------|
| complete_database_schema.sql | Main setup file |
| test_database.sql | Verify setup |
| backup_restore_scripts.sh | Backup/restore |
| DATABASE_README.md | Full documentation |
| ERD_DATABASE.md | Schema diagram |

## 🔗 SPRING BOOT CONFIG

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ev_coownership
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=none
```

## ✅ CHECKLIST

- [ ] Run complete_database_schema.sql
- [ ] Run test_database.sql
- [ ] Change default passwords
- [ ] Configure backup schedule
- [ ] Test restore procedure
- [ ] Update Spring Boot application.properties
- [ ] Start application
- [ ] Test APIs with test-api.http

---

**Keep this card handy for quick reference! 🎯**
