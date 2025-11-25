package com.evshare.trungtamdichvu.service;

import com.evshare.trungtamdichvu.entity.ChiTietSuDungPhuTung;
import com.evshare.trungtamdichvu.entity.PhuTung;
import com.evshare.trungtamdichvu.repository.ChiTietSuDungPhuTungRepository;
import com.evshare.trungtamdichvu.repository.PhieuDichVuRepository;
import com.evshare.trungtamdichvu.repository.PhuTungRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChiTietSuDungPhuTungService {

    private final ChiTietSuDungPhuTungRepository chiTietRepository;
    private final PhieuDichVuRepository phieuDichVuRepository;
    private final PhuTungRepository phuTungRepository;

    public List<ChiTietSuDungPhuTung> getAllChiTiet() {
        return chiTietRepository.findAll();
    }

    public ChiTietSuDungPhuTung getChiTietById(Integer id) {
        return chiTietRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy chi tiết sử dụng phụ tùng với ID: " + id));
    }

    public List<ChiTietSuDungPhuTung> getChiTietByPhieuDichVu(Integer phieuId) {
        return chiTietRepository.findByPhieuDichVu_PhieuId(phieuId);
    }

    public List<ChiTietSuDungPhuTung> getChiTietByPhuTung(Integer phuTungId) {
        return chiTietRepository.findByPhuTung_PhuTungId(phuTungId);
    }

    public List<ChiTietSuDungPhuTung> getChiTietByXe(Integer xeId) {
        return chiTietRepository.findByXeId(xeId);
    }

    public ChiTietSuDungPhuTung createChiTiet(ChiTietSuDungPhuTung chiTiet) {
        validateChiTiet(chiTiet);

        // Kiểm tra và cập nhật số lượng tồn kho
        PhuTung phuTung = getAndValidatePhuTung(chiTiet.getPhuTung().getPhuTungId(), chiTiet.getSoLuong());

        // Giảm số lượng tồn kho
        updateSoLuongTon(phuTung, -chiTiet.getSoLuong());

        return chiTietRepository.save(chiTiet);
    }

    public ChiTietSuDungPhuTung updateChiTiet(Integer id, ChiTietSuDungPhuTung chiTietDetails) {
        ChiTietSuDungPhuTung chiTiet = chiTietRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy chi tiết sử dụng phụ tùng với ID: " + id));

        // Hoàn trả số lượng cũ
        updateSoLuongTon(chiTiet.getPhuTung(), chiTiet.getSoLuong());

        // Kiểm tra và trừ số lượng mới
        PhuTung phuTungMoi = getAndValidatePhuTung(chiTietDetails.getPhuTung().getPhuTungId(), chiTietDetails.getSoLuong());
        updateSoLuongTon(phuTungMoi, -chiTietDetails.getSoLuong());

        // Cập nhật thông tin chi tiết
        updateChiTietInfo(chiTiet, chiTietDetails);

        return chiTietRepository.save(chiTiet);
    }

    public void deleteChiTiet(Integer id) {
        ChiTietSuDungPhuTung chiTiet = chiTietRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy chi tiết sử dụng phụ tùng với ID: " + id));

        // Hoàn trả số lượng tồn kho
        updateSoLuongTon(chiTiet.getPhuTung(), chiTiet.getSoLuong());

        chiTietRepository.delete(chiTiet);
    }

    public List<Object[]> getThongKeSuDungPhuTungTheoLoai(java.time.LocalDateTime start, java.time.LocalDateTime end) {
        return chiTietRepository.thongKeSuDungPhuTungTheoLoai(start, end);
    }

    // ========== CÁC PHƯƠNG THỨC TRUNG GIAN ==========

    /**
     * Kiểm tra tính hợp lệ của chi tiết sử dụng phụ tùng
     */
    private void validateChiTiet(ChiTietSuDungPhuTung chiTiet) {
        // Kiểm tra phiếu dịch vụ tồn tại
        if (!phieuDichVuRepository.existsById(chiTiet.getPhieuDichVu().getPhieuId())) {
            throw new RuntimeException("Không tìm thấy phiếu dịch vụ");
        }

        // Kiểm tra phụ tùng tồn tại
        if (!phuTungRepository.existsById(chiTiet.getPhuTung().getPhuTungId())) {
            throw new RuntimeException("Không tìm thấy phụ tùng");
        }
    }

    /**
     * Lấy và kiểm tra phụ tùng với số lượng yêu cầu
     */
    private PhuTung getAndValidatePhuTung(Integer phuTungId, Integer soLuongYeuCau) {
        PhuTung phuTung = phuTungRepository.findById(phuTungId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phụ tùng"));

        if (phuTung.getSoLuongTon() < soLuongYeuCau) {
            throw new RuntimeException("Số lượng tồn kho không đủ");
        }

        return phuTung;
    }

    /**
     * Cập nhật số lượng tồn kho của phụ tùng
     */
    private void updateSoLuongTon(PhuTung phuTung, Integer soLuongThayDoi) {
        phuTung.setSoLuongTon(phuTung.getSoLuongTon() + soLuongThayDoi);
        phuTungRepository.save(phuTung);
    }

    /**
     * Cập nhật thông tin chi tiết từ chi tiết mới
     */
    private void updateChiTietInfo(ChiTietSuDungPhuTung chiTiet, ChiTietSuDungPhuTung chiTietDetails) {
        chiTiet.setPhuTung(chiTietDetails.getPhuTung());
        chiTiet.setSoLuong(chiTietDetails.getSoLuong());
        chiTiet.setDonGia(chiTietDetails.getDonGia());
        chiTiet.setGhiChu(chiTietDetails.getGhiChu());
    }
}