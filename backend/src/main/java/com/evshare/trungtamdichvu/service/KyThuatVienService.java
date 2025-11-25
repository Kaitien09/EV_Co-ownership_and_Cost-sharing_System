package com.evshare.trungtamdichvu.service;

import com.evshare.trungtamdichvu.entity.KyThuatVien;
import com.evshare.trungtamdichvu.repository.KyThuatVienRepository;
import com.evshare.trungtamdichvu.repository.TrungTamDichVuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class KyThuatVienService {

    private final KyThuatVienRepository kyThuatVienRepository;
    private final TrungTamDichVuRepository trungTamRepository;

    public List<KyThuatVien> getAllKyThuatVien() {
        return kyThuatVienRepository.findAll();
    }

    public Optional<KyThuatVien> getKyThuatVienById(Integer id) {
        return kyThuatVienRepository.findById(id);
    }

    public List<KyThuatVien> getKyThuatVienByTrungTam(Integer trungTamId) {
        return kyThuatVienRepository.findByTrungTam_TrungTamId(trungTamId);
    }

    public List<KyThuatVien> searchKyThuatVienByTen(String hoTen) {
        return kyThuatVienRepository.findByHoTenContainingIgnoreCase(hoTen);
    }

    public List<KyThuatVien> getKyThuatVienByChuyenMon(String chuyenMon) {
        return kyThuatVienRepository.findByChuyenMon(chuyenMon);
    }

    public List<KyThuatVien> getKyThuatVienDangLamViec() {
        return kyThuatVienRepository.findByDangLamViec(true);
    }

    public KyThuatVien createKyThuatVien(KyThuatVien kyThuatVien) {
        // Kiểm tra trung tâm tồn tại
        if (!trungTamRepository.existsById(kyThuatVien.getTrungTam().getTrungTamId())) {
            throw new RuntimeException("Không tìm thấy trung tâm");
        }

        // Kiểm tra email đã tồn tại
        if (kyThuatVien.getEmail() != null &&
                kyThuatVienRepository.findByEmail(kyThuatVien.getEmail()).isPresent()) {
            throw new RuntimeException("Email đã tồn tại");
        }

        return kyThuatVienRepository.save(kyThuatVien);
    }

    public KyThuatVien updateKyThuatVien(Integer id, KyThuatVien kyThuatVienDetails) {
        KyThuatVien kyThuatVien = kyThuatVienRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy kỹ thuật viên với ID: " + id));

        // Kiểm tra email mới không trùng với kỹ thuật viên khác
        if (kyThuatVienDetails.getEmail() != null &&
                !kyThuatVien.getEmail().equals(kyThuatVienDetails.getEmail()) &&
                kyThuatVienRepository.findByEmail(kyThuatVienDetails.getEmail()).isPresent()) {
            throw new RuntimeException("Email đã tồn tại");
        }

        kyThuatVien.setHoTen(kyThuatVienDetails.getHoTen());
        kyThuatVien.setChungChi(kyThuatVienDetails.getChungChi());
        kyThuatVien.setChuyenMon(kyThuatVienDetails.getChuyenMon());
        kyThuatVien.setSoDienThoai(kyThuatVienDetails.getSoDienThoai());
        kyThuatVien.setEmail(kyThuatVienDetails.getEmail());
        kyThuatVien.setKinhNghiem(kyThuatVienDetails.getKinhNghiem());
        kyThuatVien.setDangLamViec(kyThuatVienDetails.getDangLamViec());

        return kyThuatVienRepository.save(kyThuatVien);
    }

    public void deleteKyThuatVien(Integer id) {
        KyThuatVien kyThuatVien = kyThuatVienRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy kỹ thuật viên với ID: " + id));
        kyThuatVienRepository.delete(kyThuatVien);
    }

    public List<KyThuatVien> getKyThuatVienDangLamViecByTrungTam(Integer trungTamId) {
        return kyThuatVienRepository.findKyThuatVienDangLamViecByTrungTam(trungTamId);
    }

    public List<Object[]> getThongKeKyThuatVienTheoChuyenMon() {
        return kyThuatVienRepository.thongKeKyThuatVienTheoChuyenMon();
    }
}