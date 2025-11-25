package com.evshare.trungtamdichvu.service;

import com.evshare.trungtamdichvu.entity.TrungTamDichVu;
import com.evshare.trungtamdichvu.repository.TrungTamDichVuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TrungTamDichVuService {

    private final TrungTamDichVuRepository trungTamRepository;

    public List<TrungTamDichVu> getAllTrungTam() {
        return trungTamRepository.findAll();
    }

    public Optional<TrungTamDichVu> getTrungTamById(Integer id) {
        return trungTamRepository.findById(id);
    }

    public List<TrungTamDichVu> searchTrungTamByTen(String tenTrungTam) {
        return trungTamRepository.findByTenTrungTamContainingIgnoreCase(tenTrungTam);
    }

    public List<TrungTamDichVu> searchTrungTamByDiaChi(String diaChi) {
        return trungTamRepository.findByDiaChiContainingIgnoreCase(diaChi);
    }

    public TrungTamDichVu createTrungTam(TrungTamDichVu trungTam) {
        // Kiểm tra tên trung tâm đã tồn tại
        if (trungTamRepository.existsByTenTrungTam(trungTam.getTenTrungTam())) {
            throw new RuntimeException("Tên trung tâm đã tồn tại");
        }

        return trungTamRepository.save(trungTam);
    }

    public TrungTamDichVu updateTrungTam(Integer id, TrungTamDichVu trungTamDetails) {
        TrungTamDichVu trungTam = trungTamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy trung tâm với ID: " + id));

        // Kiểm tra tên mới không trùng với trung tâm khác
        if (!trungTam.getTenTrungTam().equals(trungTamDetails.getTenTrungTam()) &&
                trungTamRepository.existsByTenTrungTam(trungTamDetails.getTenTrungTam())) {
            throw new RuntimeException("Tên trung tâm đã tồn tại");
        }

        trungTam.setTenTrungTam(trungTamDetails.getTenTrungTam());
        trungTam.setDiaChi(trungTamDetails.getDiaChi());
        trungTam.setSoDienThoai(trungTamDetails.getSoDienThoai());
        trungTam.setEmail(trungTamDetails.getEmail());
        trungTam.setGioLamViec(trungTamDetails.getGioLamViec());
        trungTam.setMoTa(trungTamDetails.getMoTa());

        return trungTamRepository.save(trungTam);
    }

    public void deleteTrungTam(Integer id) {
        TrungTamDichVu trungTam = trungTamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy trung tâm với ID: " + id));
        trungTamRepository.delete(trungTam);
    }

    public List<TrungTamDichVu> getTrungTamCoKyThuatVien() {
        return trungTamRepository.findTrungTamCoKyThuatVien();
    }
}