@echo off
chcp 65001 >nul
color 0B
cls

echo ========================================
echo   TEST API - ĐĂNG KÝ VÀ ĐĂNG NHẬP
echo ========================================
echo.

REM Kiểm tra application đang chạy
netstat -ano | findstr :8080 | findstr LISTENING >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Application chưa khởi động!
    echo [INFO] Hãy chạy start.bat trước
    pause
    exit /b 1
)

echo [OK] Application đang chạy
echo.

echo [TEST 1] Đăng ký user mới...
curl -X POST http://localhost:8080/api/auth/dang-ky ^
  -H "Content-Type: application/json" ^
  -d "{\"tenDangNhap\":\"quicktest\",\"matKhau\":\"Test123!\",\"email\":\"quicktest@example.com\"}" ^
  -w "\nStatus: %%{http_code}\n" ^
  -s

echo.
echo ========================================
echo.

echo [TEST 2] Đăng nhập...
curl -X POST http://localhost:8080/api/auth/dang-nhap ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"quicktest@example.com\",\"matKhau\":\"Test123!\"}" ^
  -w "\nStatus: %%{http_code}\n" ^
  -s

echo.
echo ========================================
echo   TEST HOÀN THÀNH
echo   Nếu thấy status 200 = Thành công!
echo ========================================
echo.
pause
