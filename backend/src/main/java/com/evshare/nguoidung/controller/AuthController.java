package com.evshare.nguoidung.controller;

import com.evshare.nguoidung.entity.NguoiDung;
import com.evshare.nguoidung.entity.ChuXe;
import com.evshare.nguoidung.entity.LoaiNguoiDung;
import com.evshare.nguoidung.entity.TrangThaiNguoiDung;
import com.evshare.nguoidung.service.AuthService;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.Setter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/dang-ky")
    public ResponseEntity<?> dangKy(@Valid @RequestBody DangKyRequest request) {
        try {
            NguoiDung nguoiDung = NguoiDung.builder()
                    .tenDangNhap(request.getTenDangNhap())
                    .email(request.getEmail())
                    .matKhau(request.getMatKhau())
                    .loaiNguoiDung(request.getLoaiNguoiDung())
                    .trangThai(TrangThaiNguoiDung.HOAT_DONG)
                    .build();


            ChuXe chuXe = ChuXe.builder()
                    .nguoiDung(nguoiDung)
                    .hoTen(request.getHoTen())
                    .cccd(request.getCccd())
                    .sdt(request.getSdt())
                    .gplx(request.getGplx())
                    .diaChi(request.getDiaChi())
                    .build();

            Map<String, Object> result = authService.dangKy(nguoiDung, chuXe);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/dang-nhap")
    public ResponseEntity<?> dangNhap(@Valid @RequestBody DangNhapRequest request) {
        try {
            Map<String, Object> result = authService.dangNhap(request.getTenDangNhap(), request.getMatKhau());
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/doi-mat-khau")
    public ResponseEntity<?> doiMatKhau(@Valid @RequestBody DoiMatKhauRequest request) {
        try {
            authService.doiMatKhau(request.getNguoiDungId(), request.getMatKhauCu(), request.getMatKhauMoi());
            return ResponseEntity.ok(Map.of("message", "Đổi mật khẩu thành công"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Inner classes for request bodies
    @Getter
    @Setter
    public static class DangKyRequest {
        private String tenDangNhap;
        private String email;
        private String matKhau;
        private LoaiNguoiDung loaiNguoiDung;
        private String hoTen;
        private String cccd;
        private String sdt;
        private String gplx;
        private String diaChi;
    }

    @Getter
    @Setter
    public static class DangNhapRequest {
        private String tenDangNhap;
        private String matKhau;
    }

    @Getter
    @Setter
    public static class DoiMatKhauRequest {
        private Integer nguoiDungId;
        private String matKhauCu;
        private String matKhauMoi;
    }
}