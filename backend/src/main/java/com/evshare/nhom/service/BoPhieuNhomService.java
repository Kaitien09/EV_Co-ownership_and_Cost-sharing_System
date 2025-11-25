package com.evshare.nhom.service;

import com.evshare.nhom.entity.BoPhieuNhom;
import com.evshare.nhom.entity.TrangThaiBoPhieu;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import com.evshare.nhom.repository.BoPhieuNhomRepository;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoPhieuNhomService {

    private final BoPhieuNhomRepository boPhieuRepository;

    public List<BoPhieuNhom> getBoPhieuByNhom(Integer nhomId) {
        return boPhieuRepository.findByNhom_NhomId(nhomId);
    }

    public BoPhieuNhom createBoPhieu(BoPhieuNhom boPhieu) {
        boPhieu.setTrangThai(TrangThaiBoPhieu.DANG_THUC_HIEN);
        return boPhieuRepository.save(boPhieu);
    }

    public BoPhieuNhom ketThucBoPhieu(Integer boPhieuId) {
        BoPhieuNhom boPhieu = boPhieuRepository.findById(boPhieuId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bỏ phiếu"));

        boPhieu.setTrangThai(TrangThaiBoPhieu.HOAN_THANH);
        boPhieu.setNgayKetThuc(LocalDateTime.now());

        return boPhieuRepository.save(boPhieu);
    }

    public void deleteBoPhieu(Integer boPhieuId) {
        BoPhieuNhom boPhieu = boPhieuRepository.findById(boPhieuId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bỏ phiếu"));
        boPhieuRepository.delete(boPhieu);
    }
}