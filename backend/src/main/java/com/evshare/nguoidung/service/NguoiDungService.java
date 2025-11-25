package com.evshare.nguoidung.service;

import com.evshare.nguoidung.entity.NguoiDung;
import com.evshare.nguoidung.entity.LoaiNguoiDung;
import com.evshare.nguoidung.entity.TrangThaiNguoiDung;
import com.evshare.nguoidung.repository.NguoiDungRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NguoiDungService {
    private final NguoiDungRepository nguoiDungRepository;

    public List<NguoiDung> getAllNguoiDung() {
        return nguoiDungRepository.findAll();
    }

    public Optional<NguoiDung> getNguoiDungById(Integer id) {
        return nguoiDungRepository.findById(id);
    }

    public NguoiDung updateNguoiDung(Integer id, NguoiDung nguoiDung) {
        NguoiDung existing = nguoiDungRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));

        // Chỉ cho phép cập nhật các trường không phải là thông tin đăng nhập
        existing.setEmail(nguoiDung.getEmail());
        existing.setLoaiNguoiDung(nguoiDung.getLoaiNguoiDung());
        existing.setTrangThai(nguoiDung.getTrangThai());

        return nguoiDungRepository.save(existing);
    }

    public void deleteNguoiDung(Integer id) {
        if (!nguoiDungRepository.existsById(id)) {
            throw new RuntimeException("Người dùng không tồn tại");
        }
        nguoiDungRepository.deleteById(id);
    }

    public List<NguoiDung> getNguoiDungByLoai(LoaiNguoiDung loaiNguoiDung) {
        return nguoiDungRepository.findByLoaiNguoiDung(loaiNguoiDung);
    }

    public List<NguoiDung> getNguoiDungByTrangThai(TrangThaiNguoiDung trangThai) {
        return nguoiDungRepository.findByTrangThai(trangThai);
    }

    public NguoiDung changeStatus(Integer id, TrangThaiNguoiDung trangThai) {
        NguoiDung nguoiDung = nguoiDungRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));
        nguoiDung.setTrangThai(trangThai);
        return nguoiDungRepository.save(nguoiDung);
    }

    public List<NguoiDung> searchNguoiDung(String keyword) {
        return nguoiDungRepository.searchByKeyword(keyword);
    }

    public Optional<NguoiDung> getNguoiDungByTenDangNhap(String tenDangNhap) {
        return nguoiDungRepository.findByTenDangNhap(tenDangNhap);
    }

    public Optional<NguoiDung> getNguoiDungByEmail(String email) {
        return nguoiDungRepository.findByEmail(email);
    }
}