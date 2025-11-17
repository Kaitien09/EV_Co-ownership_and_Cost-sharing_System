package com.evshare.nguoidung.service;

import com.evshare.nguoidung.dto.NguoiDungDTO;
import com.evshare.nguoidung.entity.NguoiDung;
import com.evshare.nguoidung.repository.NguoiDungRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NguoiDungService {
    
    private final NguoiDungRepository nguoiDungRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Transactional(readOnly = true)
    public NguoiDungDTO getHoSo(Integer nguoiDungId) {
        NguoiDung nguoiDung = nguoiDungRepository.findById(nguoiDungId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
        
        return convertToDTO(nguoiDung);
    }
    
    @Transactional
    public NguoiDungDTO capNhatTrangThai(Integer nguoiDungId, NguoiDung.TrangThai trangThai) {
        NguoiDung nguoiDung = nguoiDungRepository.findById(nguoiDungId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
        
        nguoiDung.setTrangThai(trangThai);
        nguoiDung = nguoiDungRepository.save(nguoiDung);
        
        return convertToDTO(nguoiDung);
    }
    
    @Transactional
    public NguoiDungDTO capNhatProfile(Integer nguoiDungId, NguoiDungDTO updateDTO) {
        NguoiDung nguoiDung = nguoiDungRepository.findById(nguoiDungId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
        
        // Cập nhật thông tin
        if (updateDTO.getTenDangNhap() != null) {
            nguoiDung.setTenDangNhap(updateDTO.getTenDangNhap());
        }
        if (updateDTO.getEmail() != null) {
            nguoiDung.setEmail(updateDTO.getEmail());
        }
        
        nguoiDung = nguoiDungRepository.save(nguoiDung);
        return convertToDTO(nguoiDung);
    }
    
    @Transactional
    public void doiMatKhau(Integer nguoiDungId, String matKhauCu, String matKhauMoi) {
        NguoiDung nguoiDung = nguoiDungRepository.findById(nguoiDungId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
        
        // Kiểm tra mật khẩu cũ
        if (!passwordEncoder.matches(matKhauCu, nguoiDung.getMatKhau())) {
            throw new RuntimeException("Mật khẩu cũ không đúng");
        }
        
        // Cập nhật mật khẩu mới
        nguoiDung.setMatKhau(passwordEncoder.encode(matKhauMoi));
        nguoiDungRepository.save(nguoiDung);
    }
    
    private NguoiDungDTO convertToDTO(NguoiDung nguoiDung) {
        return NguoiDungDTO.builder()
                .nguoiDungId(nguoiDung.getNguoiDungId())
                .tenDangNhap(nguoiDung.getTenDangNhap())
                .email(nguoiDung.getEmail())
                .loaiNguoiDung(nguoiDung.getLoaiNguoiDung().name())
                .ngayTao(nguoiDung.getNgayTao())
                .trangThai(nguoiDung.getTrangThai().name())
                .build();
    }
}
