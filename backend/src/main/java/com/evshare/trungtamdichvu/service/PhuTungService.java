package com.evshare.trungtamdichvu.service;

import com.evshare.trungtamdichvu.entity.PhuTung;
import com.evshare.trungtamdichvu.repository.PhuTungRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PhuTungService {

    private final PhuTungRepository phuTungRepository;

    public List<PhuTung> getAllPhuTung() {
        return phuTungRepository.findAll();
    }

    public Optional<PhuTung> getPhuTungById(Integer id) {
        return phuTungRepository.findById(id);
    }

    public Optional<PhuTung> getPhuTungByMa(String maPhuTung) {
        return phuTungRepository.findByMaPhuTung(maPhuTung);
    }

    public List<PhuTung> searchPhuTungByTen(String tenPhuTung) {
        return phuTungRepository.findByTenPhuTungContainingIgnoreCase(tenPhuTung);
    }

    public List<PhuTung> getPhuTungByLoai(String loaiPhuTung) {
        return phuTungRepository.findByLoaiPhuTung(loaiPhuTung);
    }

    public List<PhuTung> getPhuTungTonIt() {
        return phuTungRepository.findBySoLuongTonLessThan(10);
    }

    public PhuTung createPhuTung(PhuTung phuTung) {
        // Kiểm tra mã phụ tùng đã tồn tại
        if (phuTung.getMaPhuTung() != null &&
                phuTungRepository.findByMaPhuTung(phuTung.getMaPhuTung()).isPresent()) {
            throw new RuntimeException("Mã phụ tùng đã tồn tại");
        }
        return phuTungRepository.save(phuTung);
    }

    public PhuTung updatePhuTung(Integer id, PhuTung phuTungDetails) {
        PhuTung existingPhuTung = phuTungRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Phụ tùng không tồn tại với ID: " + id));

        // Cập nhật các trường (KHÔNG CÓ DON_GIA)
        existingPhuTung.setTenPhuTung(phuTungDetails.getTenPhuTung());
        existingPhuTung.setLoaiPhuTung(phuTungDetails.getLoaiPhuTung());
        existingPhuTung.setSoLuongTon(phuTungDetails.getSoLuongTon());
        existingPhuTung.setMoTa(phuTungDetails.getMoTa());

        return phuTungRepository.save(existingPhuTung);
    }

    public PhuTung nhapPhuTung(Integer id, Integer soLuong) {
        int updated = phuTungRepository.tangSoLuongTon(id, soLuong);
        if (updated == 0) {
            throw new RuntimeException("Không thể nhập phụ tùng");
        }
        return phuTungRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Phụ tùng không tồn tại"));
    }

    public PhuTung xuatPhuTung(Integer id, Integer soLuong) {
        int updated = phuTungRepository.giamSoLuongTon(id, soLuong);
        if (updated == 0) {
            throw new RuntimeException("Số lượng tồn không đủ hoặc phụ tùng không tồn tại");
        }
        return phuTungRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Phụ tùng không tồn tại"));
    }

    public void deletePhuTung(Integer id) {
        PhuTung phuTung = phuTungRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Phụ tùng không tồn tại"));
        phuTungRepository.delete(phuTung);
    }

    public List<PhuTung> getPhuTungCanNhap() {
        return phuTungRepository.findBySoLuongTonLessThan(5); // Dưới 5 cái thì cần nhập
    }

    public List<Object[]> getThongKeTonKhoTheoLoai() {
        return phuTungRepository.thongKeTonKhoTheoLoai();
    }
}