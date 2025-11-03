@echo off
chcp 65001 >nul
color 0E
cls

echo ========================================
echo   KIỂM TRA TRẠNG THÁI APPLICATION
echo ========================================
echo.

echo [1] Kiểm tra port 8080...
netstat -ano | findstr :8080 | findstr LISTENING >nul 2>&1
if %errorlevel% equ 0 (
    echo [✓] Application ĐANG CHẠY trên port 8080
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080 ^| findstr LISTENING') do (
        echo [INFO] Process ID: %%a
    )
) else (
    echo [✗] Application KHÔNG CHẠY
    goto :end
)

echo.
echo [2] Test kết nối API...
curl -s http://localhost:8080/actuator/health >nul 2>&1
if %errorlevel% equ 0 (
    echo [✓] API đang phản hồi
    echo [INFO] Health check: http://localhost:8080/actuator/health
) else (
    echo [✗] API không phản hồi
)

echo.
echo [3] Kiểm tra SQL Server...
sqlcmd -S localhost -U appuser -P AppUser123! -Q "SELECT @@VERSION" -h -1 >nul 2>&1
if %errorlevel% equ 0 (
    echo [✓] SQL Server đang hoạt động
) else (
    echo [✗] SQL Server không kết nối được
)

echo.
echo ========================================
echo   THÔNG TIN ỨNG DỤNG
echo ========================================
echo   URL Backend: http://localhost:8080
echo   API Endpoint: http://localhost:8080/api
echo   Test File: test-api.http
echo   Database: ev_coownership
echo   User: appuser
echo ========================================

:end
echo.
pause
