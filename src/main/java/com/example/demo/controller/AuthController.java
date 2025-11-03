package com.example.demo.controller;

import com.example.demo.dto.AuthResponse;
import com.example.demo.dto.DangKyRequest;
import com.example.demo.dto.DangNhapRequest;
import com.example.demo.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {
    
    private final AuthService authService;
    
    @PostMapping("/dang-ky")
    public ResponseEntity<AuthResponse> dangKy(@Valid @RequestBody DangKyRequest request) {
        try {
            AuthResponse response = authService.dangKy(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(AuthResponse.builder()
                            .message("Đăng ký thất bại: " + e.getMessage())
                            .build());
        }
    }
    
    @PostMapping("/dang-nhap")
    public ResponseEntity<AuthResponse> dangNhap(@Valid @RequestBody DangNhapRequest request) {
        try {
            AuthResponse response = authService.dangNhap(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(AuthResponse.builder()
                            .message("Đăng nhập thất bại: " + e.getMessage())
                            .build());
        }
    }
    
    @PostMapping("/dang-xuat")
    public ResponseEntity<AuthResponse> dangXuat() {
        // JWT stateless - client chỉ cần xóa token
        return ResponseEntity.ok(AuthResponse.builder()
                .message("Đăng xuất thành công")
                .build());
    }
}
