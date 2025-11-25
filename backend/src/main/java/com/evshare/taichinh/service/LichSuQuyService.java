package com.evshare.taichinh.service;

import com.evshare.taichinh.entity.LichSuQuy;
import com.evshare.taichinh.entity.LoaiGiaoDich;
import com.evshare.taichinh.repository.LichSuQuyRepository;
import com.evshare.taichinh.repository.QuyChungRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LichSuQuyService {

    private final LichSuQuyRepository lichSuQuyRepository;
    private final QuyChungRepository quyChungRepository;

    public List<LichSuQuy> getAllLichSuQuy() {
        return lichSuQuyRepository.findAll();
    }

    public Optional<LichSuQuy> getLichSuQuyById(Integer id) {
        return lichSuQuyRepository.findById(id);
    }

    public List<LichSuQuy> getLichSuQuyByQuy(Integer quyId) {
        return lichSuQuyRepository.findByQuy_QuyId(quyId);
    }

    public List<LichSuQuy> getLichSuQuyByLoaiGiaoDich(LoaiGiaoDich loaiGiaoDich) {
        return lichSuQuyRepository.findByLoaiGiaoDich(loaiGiaoDich);
    }

    public LichSuQuy createLichSuQuy(LichSuQuy lichSuQuy) {
        // Kiểm tra quỹ tồn tại
        if (!quyChungRepository.existsById(lichSuQuy.getQuy().getQuyId())) {
            throw new RuntimeException("Không tìm thấy quỹ");
        }

        return lichSuQuyRepository.save(lichSuQuy);
    }

    public void deleteLichSuQuy(Integer id) {
        LichSuQuy lichSuQuy = lichSuQuyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy lịch sử quỹ với ID: " + id));
        lichSuQuyRepository.delete(lichSuQuy);
    }

    public Double getTongThuByQuy(Integer quyId) {
        return lichSuQuyRepository.findTongThuByQuy(quyId);
    }

    public Double getTongChiByQuy(Integer quyId) {
        return lichSuQuyRepository.findTongChiByQuy(quyId);
    }

    public List<LichSuQuy> getLichSuQuyByQuyAndKhoangThoiGian(Integer quyId, LocalDateTime startDate, LocalDateTime endDate) {
        return lichSuQuyRepository.findByQuy_QuyIdAndNgayGiaoDichBetween(quyId, startDate, endDate);
    }

    public List<Object[]> getThongKeThuChiTheoThang(Integer quyId, LocalDateTime startDate, LocalDateTime endDate) {
        return lichSuQuyRepository.thongKeThuChiTheoThang(quyId, startDate, endDate);
    }
}