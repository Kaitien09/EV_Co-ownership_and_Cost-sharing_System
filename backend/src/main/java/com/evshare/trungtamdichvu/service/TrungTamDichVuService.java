package com.evshare.trungtamdichvu.service;

import com.evshare.trungtamdichvu.entity.TrungTamDichVu;
import com.evshare.trungtamdichvu.entity.TrangThaiTrungTam;
import com.evshare.trungtamdichvu.repository.TrungTamDichVuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TrungTamDichVuService {

    private final TrungTamDichVuRepository trungTamDichVuRepository;

    public List<TrungTamDichVu> getAllTrungTam() {
        return trungTamDichVuRepository.findAll();
    }

    public TrungTamDichVu getTrungTamById(Long id) {
        return trungTamDichVuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy trung tâm với ID: " + id));
    }

    public TrungTamDichVu getTrungTamByMa(String maTrungTam) {
        return trungTamDichVuRepository.findByMaTrungTam(maTrungTam)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy trung tâm với mã: " + maTrungTam));
    }

    public TrungTamDichVu createTrungTam(TrungTamDichVu trungTam) {
        if (trungTamDichVuRepository.existsByMaTrungTam(trungTam.getMaTrungTam())) {
            throw new RuntimeException("Mã trung tâm đã tồn tại: " + trungTam.getMaTrungTam());
        }
        return trungTamDichVuRepository.save(trungTam);
    }

    public TrungTamDichVu updateTrungTam(Long id, TrungTamDichVu trungTamDetails) {
        TrungTamDichVu trungTam = getTrungTamById(id);
        trungTam.setTenTrungTam(trungTamDetails.getTenTrungTam());
        trungTam.setDiaChi(trungTamDetails.getDiaChi());
        trungTam.setSoDienThoai(trungTamDetails.getSoDienThoai());
        trungTam.setEmail(trungTamDetails.getEmail());
        trungTam.setGioLamViec(trungTamDetails.getGioLamViec());
        trungTam.setTrangThai(trungTamDetails.getTrangThai());
        return trungTamDichVuRepository.save(trungTam);
    }

    public void deleteTrungTam(Long id) {
        TrungTamDichVu trungTam = getTrungTamById(id);
        trungTamDichVuRepository.delete(trungTam);
    }

    public List<TrungTamDichVu> getTrungTamTheoTrangThai(TrangThaiTrungTam trangThai) {
        return trungTamDichVuRepository.findByTrangThai(trangThai);
    }

    public TrungTamDichVu capNhatTrangThai(Long id, TrangThaiTrungTam trangThai) {
        TrungTamDichVu trungTam = getTrungTamById(id);
        trungTam.setTrangThai(trangThai);
        return trungTamDichVuRepository.save(trungTam);
    }
}