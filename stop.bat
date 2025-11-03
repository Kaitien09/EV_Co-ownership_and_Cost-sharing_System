@echo off
chcp 65001 >nul
color 0C
cls

echo ========================================
echo   DỪNG APPLICATION
echo ========================================
echo.

echo [INFO] Tìm process đang chạy trên port 8080...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080 ^| findstr LISTENING') do (
    echo [FOUND] Process ID: %%a
    echo [ACTION] Dừng process...
    taskkill /F /PID %%a
    echo [SUCCESS] Đã dừng application
    goto :done
)

echo [INFO] Không tìm thấy application đang chạy

:done
echo.
pause
