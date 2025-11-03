@echo off
chcp 65001 >nul
color 0A
cls

echo ========================================
echo   ĐỒ ÁN ĐỒNG SỞ HỮU XE ĐIỆN
echo   Spring Boot Application Starter
echo ========================================
echo.

echo [1/3] Kiểm tra SQL Server...
sqlcmd -S localhost -U appuser -P AppUser123! -Q "SELECT name FROM sys.databases WHERE name = 'ev_coownership'" -h -1 >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Không thể kết nối SQL Server!
    echo        - Kiểm tra SQL Server đã khởi động chưa
    echo        - Kiểm tra user: appuser / AppUser123!
    echo        - Kiểm tra database: ev_coownership
    pause
    exit /b 1
)
echo [OK] SQL Server đã sẵn sàng

echo.
echo [2/3] Dừng application cũ (nếu có)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080 ^| findstr LISTENING') do (
    echo [INFO] Đang dừng process ID: %%a
    taskkill /F /PID %%a >nul 2>&1
)
timeout /t 2 /nobreak >nul

echo.
echo [3/3] Khởi động Spring Boot Application...
echo [INFO] Port: 8080
echo [INFO] Base URL: http://localhost:8080
echo [INFO] API Docs: http://localhost:8080/swagger-ui.html
echo.
echo ========================================
echo   APPLICATION ĐANG KHỞI ĐỘNG...
echo   Vui lòng đợi 10-15 giây
echo ========================================
echo.

REM Chạy Maven Spring Boot
mvnw.cmd spring-boot:run

pause
