package com.evshare.nguoidung.service;

import com.evshare.nguoidung.entity.NguoiDung;
import com.evshare.nguoidung.entity.ChuXe;
import com.evshare.nguoidung.entity.LoaiNguoiDung;
import com.evshare.nguoidung.entity.TrangThaiNguoiDung;
import com.evshare.nguoidung.repository.NguoiDungRepository;
import com.evshare.nguoidung.repository.ChuXeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final NguoiDungRepository nguoiDungRepository;
    private final ChuXeRepository chuXeRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public Map<String, Object> dangKy(NguoiDung nguoiDung, ChuXe chuXe) {
        if (nguoiDungRepository.existsByTenDangNhap(nguoiDung.getTenDangNhap())) {
            throw new RuntimeException("Tên đăng nhập đã tồn tại");
        }
        if (nguoiDungRepository.existsByEmail(nguoiDung.getEmail())) {
            throw new RuntimeException("Email đã tồn tại");
        }

        nguoiDung.setTrangThai(TrangThaiNguoiDung.HOAT_DONG);
        nguoiDung.setMatKhau(passwordEncoder.encode(nguoiDung.getMatKhau()));
        nguoiDung.setNgayTao(LocalDateTime.now());

        NguoiDung savedNguoiDung = nguoiDungRepository.save(nguoiDung);

        Map<String, Object> result = new HashMap<>();
        result.put("message", "Đăng ký thành công");
        result.put("nguoiDungId", savedNguoiDung.getNguoiDungId());
        result.put("loaiNguoiDung", savedNguoiDung.getLoaiNguoiDung());
        result.put("tenDangNhap", savedNguoiDung.getTenDangNhap());
        result.put("email", savedNguoiDung.getEmail());

        // Chỉ tạo ChuXe nếu user là KHACH_HANG
        if (nguoiDung.getLoaiNguoiDung() == LoaiNguoiDung.KHACH_HANG) {
            chuXe.setNguoiDung(savedNguoiDung);
            ChuXe savedChuXe = chuXeRepository.save(chuXe);
            result.put("chuXeId", savedChuXe.getChuXeId());
            result.put("hoTen", savedChuXe.getHoTen());
        }

        return result;
    }

    public Map<String, Object> dangNhap(String tenDangNhap, String matKhau) {
        NguoiDung nguoiDung = nguoiDungRepository.findByTenDangNhap(tenDangNhap)
                .orElseThrow(() -> new RuntimeException("Tên đăng nhập không tồn tại"));

        if (!passwordEncoder.matches(matKhau, nguoiDung.getMatKhau())) {
            throw new RuntimeException("Mật khẩu không đúng");
        }

        if (nguoiDung.getTrangThai() != TrangThaiNguoiDung.HOAT_DONG) {
            throw new RuntimeException("Tài khoản đã bị khóa");
        }

        Map<String, Object> result = new HashMap<>();
        result.put("message", "Đăng nhập thành công");
        result.put("nguoiDungId", nguoiDung.getNguoiDungId());
        result.put("loaiNguoiDung", nguoiDung.getLoaiNguoiDung());
        result.put("tenDangNhap", nguoiDung.getTenDangNhap());
        result.put("email", nguoiDung.getEmail());

        // Chỉ lấy ChuXe nếu KHACH_HANG
        if (nguoiDung.getLoaiNguoiDung() == LoaiNguoiDung.KHACH_HANG) {
            ChuXe chuXe = chuXeRepository.findByNguoiDungId(nguoiDung.getNguoiDungId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy thông tin chủ xe"));
            result.put("chuXeId", chuXe.getChuXeId());
            result.put("hoTen", chuXe.getHoTen());
        }

        return result;
    }

    @Transactional
    public void doiMatKhau(Integer nguoiDungId, String matKhauCu, String matKhauMoi) {
        NguoiDung nguoiDung = nguoiDungRepository.findById(nguoiDungId)
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));

        if (!passwordEncoder.matches(matKhauCu, nguoiDung.getMatKhau())) {
            throw new RuntimeException("Mật khẩu cũ không đúng");
        }

        nguoiDung.setMatKhau(passwordEncoder.encode(matKhauMoi));
        nguoiDungRepository.save(nguoiDung);
    }
}
