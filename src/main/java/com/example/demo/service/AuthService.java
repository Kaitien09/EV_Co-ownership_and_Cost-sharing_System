package com.example.demo.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.AuthResponse;
import com.example.demo.dto.DangKyRequest;
import com.example.demo.dto.DangNhapRequest;
import com.example.demo.entity.NguoiDung;
import com.example.demo.repository.NguoiDungRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final NguoiDungRepository nguoiDungRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    
    @Transactional
    public AuthResponse dangKy(DangKyRequest request) {
        // Kiểm tra email đã tồn tại
        if (nguoiDungRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email đã được sử dụng");
        }
        
        // Kiểm tra tên đăng nhập đã tồn tại
        if (nguoiDungRepository.existsByTenDangNhap(request.getTenDangNhap())) {
            throw new RuntimeException("Tên đăng nhập đã được sử dụng");
        }
        
        // Xác định loại người dùng (mặc định là CoOwner nếu không truyền)
        NguoiDung.LoaiNguoiDung loaiNguoiDung = NguoiDung.LoaiNguoiDung.CoOwner;
        if (request.getLoaiNguoiDung() != null && !request.getLoaiNguoiDung().isEmpty()) {
            try {
                loaiNguoiDung = NguoiDung.LoaiNguoiDung.valueOf(request.getLoaiNguoiDung());
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Loại người dùng không hợp lệ");
            }
        }
        
        // Tạo người dùng mới
        NguoiDung nguoiDung = NguoiDung.builder()
                .tenDangNhap(request.getTenDangNhap())
                .email(request.getEmail())
                .matKhau(passwordEncoder.encode(request.getMatKhau()))
                .loaiNguoiDung(loaiNguoiDung)
                .trangThai(NguoiDung.TrangThai.HoatDong)
                .build();
        
        nguoiDung = nguoiDungRepository.save(nguoiDung);
        
        // Tạo JWT token
        String token = jwtService.generateToken(nguoiDung);
        
        return AuthResponse.builder()
                .token(token)
                .nguoiDungId(nguoiDung.getNguoiDungId())
                .tenDangNhap(nguoiDung.getTenDangNhap())
                .email(nguoiDung.getEmail())
                .loaiNguoiDung(nguoiDung.getLoaiNguoiDung().name())
                .message("Đăng ký thành công")
                .build();
    }
    
    @Transactional(readOnly = true)
    public AuthResponse dangNhap(DangNhapRequest request) {
        // Tìm người dùng theo email hoặc tên đăng nhập
        NguoiDung nguoiDung = nguoiDungRepository.findByEmail(request.getEmail())
                .or(() -> nguoiDungRepository.findByTenDangNhap(request.getEmail()))
                .orElseThrow(() -> new RuntimeException("Email/Tên đăng nhập hoặc mật khẩu không đúng"));
        
        // Kiểm tra mật khẩu
        if (!passwordEncoder.matches(request.getMatKhau(), nguoiDung.getMatKhau())) {
            throw new RuntimeException("Email/Tên đăng nhập hoặc mật khẩu không đúng");
        }
        
        // Kiểm tra trạng thái tài khoản
        if (nguoiDung.getTrangThai() == NguoiDung.TrangThai.Ngung) {
            throw new RuntimeException("Tài khoản đã bị khóa");
        }
        
        // Tạo JWT token
        String token = jwtService.generateToken(nguoiDung);
        
        return AuthResponse.builder()
                .token(token)
                .nguoiDungId(nguoiDung.getNguoiDungId())
                .tenDangNhap(nguoiDung.getTenDangNhap())
                .email(nguoiDung.getEmail())
                .loaiNguoiDung(nguoiDung.getLoaiNguoiDung().name())
                .message("Đăng nhập thành công")
                .build();
    }
}
