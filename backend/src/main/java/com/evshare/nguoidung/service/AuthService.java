package com.evshare.nguoidung.service;

import com.evshare.nguoidung.entity.NguoiDung;
import com.evshare.nguoidung.entity.ChuXe;
import com.evshare.nguoidung.entity.TrangThaiNguoiDung;
import com.evshare.nguoidung.repository.NguoiDungRepository;
import com.evshare.nguoidung.repository.ChuXeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final NguoiDungRepository nguoiDungRepository;
    private final ChuXeRepository chuXeRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public Map<String, Object> dangKy(NguoiDung nguoiDung, ChuXe chuXe) {
        // Kiểm tra trùng tên đăng nhập và email
        if (nguoiDungRepository.existsByTenDangNhap(nguoiDung.getTenDangNhap())) {
            throw new RuntimeException("Tên đăng nhập đã tồn tại");
        }
        if (nguoiDungRepository.existsByEmail(nguoiDung.getEmail())) {
            throw new RuntimeException("Email đã tồn tại");
        }

        // Set trạng thái HOAT_DONG để có thể login ngay
        nguoiDung.setTrangThai(TrangThaiNguoiDung.HOAT_DONG);

        // Mã hóa mật khẩu và set ngày tạo
        nguoiDung.setMatKhau(passwordEncoder.encode(nguoiDung.getMatKhau()));
        nguoiDung.setNgayTao(LocalDateTime.now());

        // Lưu người dùng
        NguoiDung savedNguoiDung = nguoiDungRepository.save(nguoiDung);

        // Tạo chủ xe
        chuXe.setNguoiDung(savedNguoiDung);
        ChuXe savedChuXe = chuXeRepository.save(chuXe);

        return Map.of(
                "message", "Đăng ký thành công",
                "nguoiDungId", savedNguoiDung.getNguoiDungId(),
                "chuXeId", savedChuXe.getChuXeId()
        );
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

        // Lấy thông tin chủ xe
        ChuXe chuXe = chuXeRepository.findByNguoiDungId(nguoiDung.getNguoiDungId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thông tin chủ xe"));

        return Map.of(
                "message", "Đăng nhập thành công",
                "nguoiDungId", nguoiDung.getNguoiDungId(),
                "chuXeId", chuXe.getChuXeId(),
                "loaiNguoiDung", nguoiDung.getLoaiNguoiDung(),
                "tenDangNhap", nguoiDung.getTenDangNhap(),
                "hoTen", chuXe.getHoTen(),
                "email", nguoiDung.getEmail()
        );
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
