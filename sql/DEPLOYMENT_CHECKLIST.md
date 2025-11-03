# 📋 PRODUCTION DEPLOYMENT CHECKLIST

## Pre-Deployment (1 week before)

### 1. Database Preparation
- [ ] Review `complete_database_schema.sql` for production suitability
- [ ] Test full schema on staging environment
- [ ] Verify all indexes are optimized
- [ ] Check for unnecessary sample data
- [ ] Document any custom modifications needed

### 2. Security Review
- [ ] Change default admin password
- [ ] Create dedicated MySQL users (not root)
- [ ] Configure MySQL user privileges properly
- [ ] Enable SSL/TLS for database connections
- [ ] Review password encryption (BCrypt strength)
- [ ] Set up firewall rules for MySQL port

### 3. Backup Strategy
- [ ] Test backup script: `backup_restore_scripts.sh`
- [ ] Test restore from backup
- [ ] Set up automated daily backups
- [ ] Configure backup retention policy (30 days minimum)
- [ ] Set up off-site backup storage
- [ ] Document backup/restore procedures

### 4. Performance Tuning
- [ ] Review MySQL configuration (my.cnf/my.ini)
- [ ] Set appropriate buffer pool size (innodb_buffer_pool_size)
- [ ] Configure connection limits (max_connections)
- [ ] Enable slow query log
- [ ] Set up monitoring (CPU, RAM, Disk I/O)

---

## Deployment Day

### Phase 1: Pre-Migration (30 minutes before)

- [ ] **Announce maintenance window to users**
- [ ] **Put application in maintenance mode**
- [ ] **Backup current database (if migrating from old version)**
  ```bash
  mysqldump -u root -p current_database > pre_migration_backup_$(date +%Y%m%d_%H%M%S).sql
  ```
- [ ] **Verify backup file is not corrupted**
  ```bash
  mysql -u root -p test_restore_db < backup_file.sql
  ```
- [ ] **Document current database state**
  ```sql
  SELECT TABLE_NAME, TABLE_ROWS FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'current_database';
  ```

### Phase 2: Database Setup (15 minutes)

- [ ] **Connect to production MySQL server**
  ```bash
  mysql -u root -p -h production-server
  ```

- [ ] **Run main schema script**
  ```bash
  mysql -u root -p < complete_database_schema.sql
  ```

- [ ] **Verify tables created**
  ```sql
  USE ev_coownership;
  SHOW TABLES;
  ```

- [ ] **Run test script**
  ```bash
  mysql -u root -p < test_database.sql
  ```

- [ ] **Check for errors**
  ```sql
  SHOW ERRORS;
  SHOW WARNINGS;
  ```

### Phase 3: Data Migration (if applicable) (30 minutes)

- [ ] **Export data from old system**
- [ ] **Transform data to new schema format**
- [ ] **Import data into new database**
- [ ] **Verify data integrity**
  ```sql
  SELECT COUNT(*) FROM nguoi_dung;
  SELECT COUNT(*) FROM chu_xe;
  SELECT COUNT(*) FROM hop_dong_dong_so_huu;
  ```

### Phase 4: Application Configuration (10 minutes)

- [ ] **Update application.properties**
  ```properties
  spring.datasource.url=jdbc:mysql://production-server:3306/ev_coownership?useSSL=true
  spring.datasource.username=app_user
  spring.datasource.password=SECURE_PASSWORD_HERE
  spring.jpa.hibernate.ddl-auto=none
  ```

- [ ] **Deploy updated application**
- [ ] **Start Spring Boot application**
- [ ] **Check application logs for errors**

### Phase 5: Smoke Testing (15 minutes)

- [ ] **Test admin login**
  - Username: admin
  - Email: admin@evco.vn
  - Password: [CHANGED_PASSWORD]

- [ ] **Test key API endpoints**
  - [ ] POST /api/auth/dang-nhap
  - [ ] GET /api/nguoi-dung/profile
  - [ ] POST /api/chu-xe
  - [ ] GET /api/xe
  - [ ] POST /api/hop-dong
  - [ ] GET /api/hop-dong/cho-duyet

- [ ] **Test database views**
  ```sql
  SELECT * FROM v_chu_xe_full LIMIT 5;
  SELECT * FROM v_hop_dong_full LIMIT 5;
  ```

- [ ] **Test stored procedures**
  ```sql
  -- Create test contract and approve it
  CALL sp_duyet_hop_dong(1, 1, TRUE, NULL);
  ```

### Phase 6: Go Live (5 minutes)

- [ ] **Remove maintenance mode**
- [ ] **Announce system is back online**
- [ ] **Monitor application logs**
- [ ] **Monitor database connections**
- [ ] **Monitor server resources (CPU, RAM, Disk)**

---

## Post-Deployment (24 hours)

### Immediate (First hour)

- [ ] **Monitor error logs continuously**
  ```bash
  tail -f /var/log/mysql/error.log
  tail -f application.log
  ```

- [ ] **Check database performance**
  ```sql
  SHOW PROCESSLIST;
  SHOW ENGINE INNODB STATUS;
  ```

- [ ] **Verify all scheduled events are running**
  ```sql
  SELECT * FROM INFORMATION_SCHEMA.EVENTS WHERE EVENT_SCHEMA = 'ev_coownership';
  ```

- [ ] **Test user workflows end-to-end**

### First Day

- [ ] **Review slow query log**
  ```sql
  SELECT * FROM mysql.slow_log ORDER BY query_time DESC LIMIT 20;
  ```

- [ ] **Check backup was successful**
  ```bash
  ls -lh /var/backups/ev_coownership/
  ```

- [ ] **Monitor user feedback/complaints**

- [ ] **Check database size growth**
  ```sql
  SELECT 
    TABLE_SCHEMA,
    ROUND(SUM(DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024, 2) AS 'Size (MB)'
  FROM information_schema.TABLES
  WHERE TABLE_SCHEMA = 'ev_coownership'
  GROUP BY TABLE_SCHEMA;
  ```

### First Week

- [ ] **Run performance analysis**
  ```sql
  ANALYZE TABLE nguoi_dung, chu_xe, xe, hop_dong_dong_so_huu;
  ```

- [ ] **Review and optimize queries if needed**

- [ ] **Check all foreign key constraints working**

- [ ] **Verify automated events executed**
  ```sql
  SELECT EVENT_NAME, LAST_EXECUTED, STATUS 
  FROM INFORMATION_SCHEMA.EVENTS 
  WHERE EVENT_SCHEMA = 'ev_coownership';
  ```

- [ ] **Test restore from production backup**

- [ ] **Document any issues encountered**

---

## Rollback Plan (If something goes wrong)

### Immediate Rollback (Within 1 hour)

1. **Put application in maintenance mode**
2. **Stop Spring Boot application**
3. **Restore old database**
   ```bash
   mysql -u root -p -e "DROP DATABASE ev_coownership;"
   mysql -u root -p < pre_migration_backup.sql
   ```
4. **Revert application configuration**
5. **Restart old application version**
6. **Verify system is working**
7. **Announce system is back online**

### Partial Rollback (If only some features broken)

1. **Identify broken features**
2. **Disable broken features in application**
3. **Fix issues**
4. **Test fixes on staging**
5. **Deploy fixes to production**

---

## Success Criteria

✅ **All checks must pass:**

- [ ] No errors in MySQL error log
- [ ] All tables created successfully
- [ ] All indexes created
- [ ] All foreign keys working
- [ ] All stored procedures working
- [ ] All triggers working
- [ ] All events scheduled
- [ ] Sample data loaded (if applicable)
- [ ] Spring Boot application starts without errors
- [ ] All API endpoints responding
- [ ] Admin can login
- [ ] Users can perform key workflows
- [ ] Backup script works
- [ ] Restore from backup works
- [ ] Performance acceptable (response time < 2s)
- [ ] No security vulnerabilities

---

## Emergency Contacts

### Technical Team
- **Database Admin:** [Name] - [Phone] - [Email]
- **Backend Developer:** [Name] - [Phone] - [Email]
- **DevOps Engineer:** [Name] - [Phone] - [Email]

### Escalation
- **Tech Lead:** [Name] - [Phone] - [Email]
- **CTO:** [Name] - [Phone] - [Email]

---

## Sign-off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Database Admin | __________ | __________ | ______ |
| Backend Developer | __________ | __________ | ______ |
| QA Lead | __________ | __________ | ______ |
| Project Manager | __________ | __________ | ______ |

---

## Notes & Issues

```
[Document any issues, workarounds, or deviations from the plan]




```

---

**Prepared by:** GitHub Copilot  
**Date:** 2025-11-02  
**Version:** 1.0  
**Project:** EV Co-Ownership Platform
