# =====================================================
# DATABASE BACKUP & RESTORE SCRIPTS
# For EV Co-Ownership Platform
# =====================================================

# =====================================================
# WINDOWS POWERSHELL SCRIPTS
# =====================================================

# -------------------------------------------------
# 1. BACKUP DATABASE (Full backup with data)
# -------------------------------------------------

# Backup toàn bộ database
$date = Get-Date -Format "yyyyMMdd_HHmmss"
$backupFile = "ev_coownership_backup_$date.sql"
mysqldump -u root -p --databases ev_coownership --add-drop-database --routines --triggers --events > $backupFile
Write-Host "✅ Backup completed: $backupFile"

# -------------------------------------------------
# 2. BACKUP SCHEMA ONLY (No data)
# -------------------------------------------------

# Backup chỉ cấu trúc, không có dữ liệu
$date = Get-Date -Format "yyyyMMdd_HHmmss"
$schemaFile = "ev_coownership_schema_$date.sql"
mysqldump -u root -p --no-data --databases ev_coownership --add-drop-database --routines --triggers --events > $schemaFile
Write-Host "✅ Schema backup completed: $schemaFile"

# -------------------------------------------------
# 3. BACKUP DATA ONLY (No structure)
# -------------------------------------------------

# Backup chỉ dữ liệu
$date = Get-Date -Format "yyyyMMdd_HHmmss"
$dataFile = "ev_coownership_data_$date.sql"
mysqldump -u root -p --no-create-info --databases ev_coownership > $dataFile
Write-Host "✅ Data backup completed: $dataFile"

# -------------------------------------------------
# 4. BACKUP SPECIFIC TABLES
# -------------------------------------------------

# Backup chỉ một số bảng quan trọng
$date = Get-Date -Format "yyyyMMdd_HHmmss"
$tablesFile = "ev_coownership_important_tables_$date.sql"
mysqldump -u root -p ev_coownership nguoi_dung chu_xe hop_dong_dong_so_huu > $tablesFile
Write-Host "✅ Selected tables backup completed: $tablesFile"

# -------------------------------------------------
# 5. COMPRESSED BACKUP (Save disk space)
# -------------------------------------------------

# Backup và nén bằng gzip (yêu cầu 7-Zip hoặc WinRAR)
$date = Get-Date -Format "yyyyMMdd_HHmmss"
$compressedFile = "ev_coownership_backup_$date.sql.gz"
mysqldump -u root -p --databases ev_coownership --add-drop-database --routines --triggers --events | gzip > $compressedFile
Write-Host "✅ Compressed backup completed: $compressedFile"

# -------------------------------------------------
# 6. RESTORE FROM BACKUP
# -------------------------------------------------

# Restore từ file backup
$backupFile = "ev_coownership_backup_20251102_103000.sql"
mysql -u root -p < $backupFile
Write-Host "✅ Restore completed from: $backupFile"

# -------------------------------------------------
# 7. RESTORE FROM COMPRESSED BACKUP
# -------------------------------------------------

# Restore từ file nén
$compressedFile = "ev_coownership_backup_20251102_103000.sql.gz"
gunzip < $compressedFile | mysql -u root -p
Write-Host "✅ Restore completed from compressed file: $compressedFile"

# -------------------------------------------------
# 8. AUTOMATED BACKUP SCRIPT (Daily)
# -------------------------------------------------

# Script tự động backup hàng ngày
$date = Get-Date -Format "yyyyMMdd"
$backupDir = "D:\Backups\ev_coownership"
$backupFile = "$backupDir\ev_coownership_$date.sql"

# Tạo thư mục backup nếu chưa có
if (!(Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir
}

# Backup
mysqldump -u root -p --databases ev_coownership --add-drop-database --routines --triggers --events > $backupFile

# Xóa backup cũ hơn 30 ngày
Get-ChildItem $backupDir -Filter "*.sql" | Where-Object {$_.LastWriteTime -lt (Get-Date).AddDays(-30)} | Remove-Item

Write-Host "✅ Automated backup completed: $backupFile"

# -------------------------------------------------
# 9. EXPORT TO CSV (For data analysis)
# -------------------------------------------------

# Export specific table to CSV
$outputDir = "D:\Exports"
$date = Get-Date -Format "yyyyMMdd"

# Export nguoi_dung
mysql -u root -p -e "SELECT * FROM ev_coownership.nguoi_dung INTO OUTFILE '$outputDir/nguoi_dung_$date.csv' FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\n';"

Write-Host "✅ CSV export completed"

# -------------------------------------------------
# 10. CLONE DATABASE (For testing)
# -------------------------------------------------

# Clone database để test
$sourceDB = "ev_coownership"
$targetDB = "ev_coownership_test"

# Tạo database mới
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS $targetDB;"

# Copy cấu trúc và dữ liệu
mysqldump -u root -p --databases $sourceDB | mysql -u root -p $targetDB

Write-Host "✅ Database cloned: $targetDB"


# =====================================================
# LINUX/MAC BASH SCRIPTS
# =====================================================

#!/bin/bash

# -------------------------------------------------
# 1. BACKUP DATABASE (Full backup)
# -------------------------------------------------

date=$(date +"%Y%m%d_%H%M%S")
backupFile="ev_coownership_backup_$date.sql"
mysqldump -u root -p --databases ev_coownership --add-drop-database --routines --triggers --events > $backupFile
echo "✅ Backup completed: $backupFile"

# -------------------------------------------------
# 2. RESTORE DATABASE
# -------------------------------------------------

backupFile="ev_coownership_backup_20251102_103000.sql"
mysql -u root -p < $backupFile
echo "✅ Restore completed from: $backupFile"

# -------------------------------------------------
# 3. AUTOMATED DAILY BACKUP (Add to crontab)
# -------------------------------------------------

# Tạo script: /usr/local/bin/backup_ev_coownership.sh
cat << 'EOF' > /usr/local/bin/backup_ev_coownership.sh
#!/bin/bash
date=$(date +"%Y%m%d")
backupDir="/var/backups/ev_coownership"
backupFile="$backupDir/ev_coownership_$date.sql"

mkdir -p $backupDir
mysqldump -u root -p[PASSWORD] --databases ev_coownership --add-drop-database --routines --triggers --events > $backupFile

# Xóa backup cũ hơn 30 ngày
find $backupDir -name "*.sql" -mtime +30 -delete

echo "✅ Backup completed: $backupFile"
EOF

# Cấp quyền thực thi
chmod +x /usr/local/bin/backup_ev_coownership.sh

# Thêm vào crontab (chạy lúc 2AM hàng ngày)
# crontab -e
# 0 2 * * * /usr/local/bin/backup_ev_coownership.sh >> /var/log/ev_coownership_backup.log 2>&1


# =====================================================
# MYSQL COMMANDS (Direct in MySQL console)
# =====================================================

-- Backup từ MySQL console
SELECT * INTO OUTFILE '/tmp/nguoi_dung_backup.csv'
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
FROM nguoi_dung;

-- Restore từ CSV
LOAD DATA INFILE '/tmp/nguoi_dung_backup.csv'
INTO TABLE nguoi_dung
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n';


# =====================================================
# NOTES
# =====================================================

# Đối với Windows:
# - Cài đặt MySQL cho PATH environment: C:\Program Files\MySQL\MySQL Server 8.0\bin
# - Hoặc dùng đường dẫn đầy đủ: "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump.exe"

# Đối với Linux/Mac:
# - Thay [PASSWORD] bằng mật khẩu thực (hoặc dùng -p để nhập interactive)
# - Kiểm tra quyền write của thư mục backup

# Recommended backup schedule:
# - Full backup: Daily at 2AM
# - Incremental backup: Every 6 hours (if using binary logs)
# - Keep backups for 30 days minimum
# - Test restore quarterly

# =====================================================
# END OF BACKUP SCRIPTS
# =====================================================
