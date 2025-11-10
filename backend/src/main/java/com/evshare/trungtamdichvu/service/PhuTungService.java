package com.evshare.trungtamdichvu.service;

import com.evshare.trungtamdichvu.entity.PhuTung;
import com.evshare.trungtamdichvu.repository.PhuTungRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PhuTungService {

    private final PhuTungRepository phuTungRepository;

    public List<PhuTung> getAllPhuTung() {
        return phuTungRepository.findAll();
    }

    public PhuTung getPhuTungById(Long id) {
        return phuTungRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phụ tùng với ID: " + id));
    }

    public PhuTung createPhuTung(PhuTung phuTung) {
        // Kiểm tra mã phụ tùng đã tồn tại chưa
        if (phuTungRepository.existsByMaPhuTung(phuTung.getMaPhuTung())) {
            throw new RuntimeException("Mã phụ tùng đã tồn tại: " + phuTung.getMaPhuTung());
        }
        return phuTungRepository.save(phuTung);
    }

    public PhuTung updatePhuTung(Long id, PhuTung phuTungDetails) {
        PhuTung phuTung = getPhuTungById(id);
        phuTung.setTenPhuTung(phuTungDetails.getTenPhuTung());
        phuTung.setMoTa(phuTungDetails.getMoTa());
        phuTung.setGiaNhap(phuTungDetails.getGiaNhap());
        phuTung.setGiaBan(phuTungDetails.getGiaBan());
        phuTung.setSoLuongTon(phuTungDetails.getSoLuongTon());
        phuTung.setTrangThai(phuTungDetails.getTrangThai());
        return phuTungRepository.save(phuTung);
    }

    public void deletePhuTung(Long id) {
        PhuTung phuTung = getPhuTungById(id);
        phuTungRepository.delete(phuTung);
    }
}