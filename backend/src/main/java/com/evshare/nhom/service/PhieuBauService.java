package com.evshare.nhom.service;

import com.evshare.nhom.entity.PhieuBau;
import com.evshare.nhom.entity.TrangThaiBoPhieu;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import com.evshare.nhom.repository.PhieuBauRepository;
import com.evshare.nhom.repository.BoPhieuNhomRepository;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PhieuBauService {

    private final PhieuBauRepository phieuBauRepository;
    private final BoPhieuNhomRepository boPhieuRepository;

    public PhieuBau bauPhieu(PhieuBau phieuBau) {
        // Kiểm tra bỏ phiếu còn hiệu lực không
        var boPhieu = phieuBau.getBoPhieu();
        if (boPhieu.getTrangThai() != TrangThaiBoPhieu.DANG_THUC_HIEN) {
            throw new RuntimeException("Bỏ phiếu đã kết thúc");
        }

        // Kiểm tra đã bầu chưa
        boolean daBau = phieuBauRepository.existsByBoPhieuAndChuXe(
                boPhieu, phieuBau.getChuXe());
        if (daBau) {
            throw new RuntimeException("Bạn đã bầu cho bỏ phiếu này");
        }

        return phieuBauRepository.save(phieuBau);
    }

    public List<PhieuBau> getPhieuBauByBoPhieu(Integer boPhieuId) {
        return phieuBauRepository.findByBoPhieu_BoPhieuId(boPhieuId);
    }

    public void deletePhieuBau(Integer phieuBauId) {
        PhieuBau phieuBau = phieuBauRepository.findById(phieuBauId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phiếu bầu"));
        phieuBauRepository.delete(phieuBau);
    }
}