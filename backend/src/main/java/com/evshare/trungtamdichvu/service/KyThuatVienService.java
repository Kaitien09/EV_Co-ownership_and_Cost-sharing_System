package com.evshare.trungtamdichvu.service;

import com.evshare.trungtamdichvu.entity.KyThuatVien;
import com.evshare.trungtamdichvu.entity.TrangThaiKyThuatVien;
import com.evshare.trungtamdichvu.repository.KyThuatVienRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class KyThuatVienService {

    private final KyThuatVienRepository kyThuatVienRepository;

    public List<KyThuatVien> getAllKyThuatVien() {
        return kyThuatVienRepository.findAll();
    }

    public KyThuatVien getKyThuatVienById(Long id) {
        return kyThuatVienRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy kỹ thuật viên với ID: " + id));
    }

    public KyThuatVien createKyThuatVien(KyThuatVien kyThuatVien) {
        if (kyThuatVienRepository.existsByMaKyThuatVien(kyThuatVien.getMaKyThuatVien())) {
            throw new RuntimeException("Mã kỹ thuật viên đã tồn tại: " + kyThuatVien.getMaKyThuatVien());
        }
        return kyThuatVienRepository.save(kyThuatVien);
    }

    public KyThuatVien updateKyThuatVien(Long id, KyThuatVien kyThuatVienDetails) {
        KyThuatVien kyThuatVien = getKyThuatVienById(id);
        kyThuatVien.setHoTen(kyThuatVienDetails.getHoTen());
        kyThuatVien.setChuyenMon(kyThuatVienDetails.getChuyenMon());
        kyThuatVien.setSoDienThoai(kyThuatVienDetails.getSoDienThoai());
        kyThuatVien.setEmail(kyThuatVienDetails.getEmail());
        kyThuatVien.setKinhNghiem(kyThuatVienDetails.getKinhNghiem());
        kyThuatVien.setTrangThai(kyThuatVienDetails.getTrangThai());
        kyThuatVien.setTrungTam(kyThuatVienDetails.getTrungTam());
        return kyThuatVienRepository.save(kyThuatVien);
    }

    public void deleteKyThuatVien(Long id) {
        KyThuatVien kyThuatVien = getKyThuatVienById(id);
        kyThuatVienRepository.delete(kyThuatVien);
    }

    public List<KyThuatVien> getKyThuatVienTheoTrangThai(TrangThaiKyThuatVien trangThai) {
        return kyThuatVienRepository.findByTrangThai(trangThai);
    }

    public List<KyThuatVien> getKyThuatVienTheoTrungTam(Long trungTamId) {
        return kyThuatVienRepository.findByTrungTamId(trungTamId);
    }

    public KyThuatVien capNhatTrangThai(Long id, TrangThaiKyThuatVien trangThai) {
        KyThuatVien kyThuatVien = getKyThuatVienById(id);
        kyThuatVien.setTrangThai(trangThai);
        return kyThuatVienRepository.save(kyThuatVien);
    }
}