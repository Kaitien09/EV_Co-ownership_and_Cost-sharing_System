package com.evshare.taichinh.service;

import com.evshare.taichinh.entity.ChiaChiPhi;
import com.evshare.taichinh.repository.ChiaChiPhiRepository;
import com.evshare.taichinh.repository.ChiPhiRepository;
import com.evshare.nguoidung.repository.ChuXeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChiaChiPhiService {

    private final ChiaChiPhiRepository chiaChiPhiRepository;
    private final ChiPhiRepository chiPhiRepository;
    private final ChuXeRepository chuXeRepository;

    public List<ChiaChiPhi> getAllChiaChiPhi() {
        return chiaChiPhiRepository.findAll();
    }

    public Optional<ChiaChiPhi> getChiaChiPhiById(Integer id) {
        return chiaChiPhiRepository.findById(id);
    }

    public List<ChiaChiPhi> getChiaChiPhiByChiPhi(Integer chiPhiId) {
        return chiaChiPhiRepository.findByChiPhi_ChiPhiId(chiPhiId);
    }

    public List<ChiaChiPhi> getChiaChiPhiByChuXe(Integer chuXeId) {
        return chiaChiPhiRepository.findByChuXe_ChuXeId(chuXeId);
    }

    public List<ChiaChiPhi> getChiaChiPhiByNhom(Integer nhomId) {
        return chiaChiPhiRepository.findByChiPhi_Nhom_NhomId(nhomId);
    }

    public ChiaChiPhi createChiaChiPhi(ChiaChiPhi chiaChiPhi) {
        // Kiểm tra chi phí tồn tại
        if (!chiPhiRepository.existsById(chiaChiPhi.getChiPhi().getChiPhiId())) {
            throw new RuntimeException("Không tìm thấy chi phí");
        }

        // Kiểm tra chủ xe tồn tại
        if (!chuXeRepository.existsById(chiaChiPhi.getChuXe().getChuXeId())) {
            throw new RuntimeException("Không tìm thấy chủ xe");
        }

        // Kiểm tra đã chia chi phí cho chủ xe này chưa
        boolean daChia = chiaChiPhiRepository.existsByChiPhi_ChiPhiIdAndChuXe_ChuXeId(
                chiaChiPhi.getChiPhi().getChiPhiId(), chiaChiPhi.getChuXe().getChuXeId());
        if (daChia) {
            throw new RuntimeException("Đã chia chi phí cho chủ xe này");
        }

        return chiaChiPhiRepository.save(chiaChiPhi);
    }

    public ChiaChiPhi updateChiaChiPhi(Integer id, ChiaChiPhi chiaChiPhiDetails) {
        ChiaChiPhi chiaChiPhi = chiaChiPhiRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy chia chi phí với ID: " + id));

        chiaChiPhi.setSoTienPhaiTra(chiaChiPhiDetails.getSoTienPhaiTra());
        chiaChiPhi.setGhiChu(chiaChiPhiDetails.getGhiChu());

        return chiaChiPhiRepository.save(chiaChiPhi);
    }

    public void deleteChiaChiPhi(Integer id) {
        ChiaChiPhi chiaChiPhi = chiaChiPhiRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy chia chi phí với ID: " + id));
        chiaChiPhiRepository.delete(chiaChiPhi);
    }

    public Double getTongSoTienPhaiTraByChuXeAndNhom(Integer chuXeId, Integer nhomId) {
        return chiaChiPhiRepository.findTongSoTienPhaiTraByChuXeAndNhom(chuXeId, nhomId);
    }

    public List<ChiaChiPhi> getChiaChiPhiChuaThanhToan(Integer chuXeId) {
        return chiaChiPhiRepository.findChiaChiPhiChuaThanhToan(chuXeId);
    }
}