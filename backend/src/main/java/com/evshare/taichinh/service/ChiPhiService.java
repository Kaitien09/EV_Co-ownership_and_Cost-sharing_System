package com.evshare.taichinh.service;

import com.evshare.taichinh.entity.ChiPhi;
import com.evshare.taichinh.entity.LoaiChiPhi;
import com.evshare.taichinh.repository.ChiPhiRepository;
import com.evshare.nhom.repository.NhomDongSoHuuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChiPhiService {

    private final ChiPhiRepository chiPhiRepository;
    private final NhomDongSoHuuRepository nhomRepository;

    public List<ChiPhi> getAllChiPhi() {
        return chiPhiRepository.findAll();
    }

    public Optional<ChiPhi> getChiPhiById(Integer id) {
        return chiPhiRepository.findById(id);
    }

    public List<ChiPhi> getChiPhiByNhom(Integer nhomId) {
        return chiPhiRepository.findByNhom_NhomId(nhomId);
    }

    public ChiPhi createChiPhi(ChiPhi chiPhi) {
        // Kiểm tra nhóm tồn tại
        if (!nhomRepository.existsById(chiPhi.getNhom().getNhomId())) {
            throw new RuntimeException("Không tìm thấy nhóm");
        }

        return chiPhiRepository.save(chiPhi);
    }

    public ChiPhi updateChiPhi(Integer id, ChiPhi chiPhiDetails) {
        ChiPhi chiPhi = chiPhiRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy chi phí với ID: " + id));

        chiPhi.setLoaiChiPhi(chiPhiDetails.getLoaiChiPhi());
        chiPhi.setSoTien(chiPhiDetails.getSoTien());
        chiPhi.setNgayPhatSinh(chiPhiDetails.getNgayPhatSinh());
        chiPhi.setGhiChu(chiPhiDetails.getGhiChu());

        return chiPhiRepository.save(chiPhi);
    }

    public void deleteChiPhi(Integer id) {
        ChiPhi chiPhi = chiPhiRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy chi phí với ID: " + id));
        chiPhiRepository.delete(chiPhi);
    }

    public List<ChiPhi> getChiPhiByLoai(LoaiChiPhi loaiChiPhi) {
        return chiPhiRepository.findByLoaiChiPhi(loaiChiPhi);
    }

    public List<ChiPhi> getChiPhiByNhomAndLoai(Integer nhomId, LoaiChiPhi loaiChiPhi) {
        return chiPhiRepository.findByNhom_NhomIdAndLoaiChiPhi(nhomId, loaiChiPhi);
    }

    public Double getTongChiPhiByNhom(Integer nhomId) {
        return chiPhiRepository.findTongChiPhiByNhom(nhomId);
    }

    public List<ChiPhi> getChiPhiChuaChia(Integer nhomId) {
        return chiPhiRepository.findChiPhiChuaChia(nhomId);
    }
}