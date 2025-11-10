package com.evshare.trungtamdichvu.service;

import com.evshare.trungtamdichvu.entity.ChiTietSuDungPhuTung;
import com.evshare.trungtamdichvu.entity.PhieuDichVu;
import com.evshare.trungtamdichvu.entity.PhuTung;
import com.evshare.trungtamdichvu.repository.ChiTietSuDungPhuTungRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChiTietSuDungPhuTungService {

    private final ChiTietSuDungPhuTungRepository chiTietRepository;
    private final PhieuDichVuService phieuDichVuService;
    private final PhuTungService phuTungService;

    public List<ChiTietSuDungPhuTung> getAllChiTiet() {
        return chiTietRepository.findAll();
    }

    public ChiTietSuDungPhuTung getChiTietById(Long id) {
        return chiTietRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy chi tiết với ID: " + id));
    }

    public ChiTietSuDungPhuTung createChiTiet(Long phieuDichVuId, Long phuTungId, Integer soLuong) {
        PhieuDichVu phieuDichVu = phieuDichVuService.getPhieuDichVuById(phieuDichVuId);
        PhuTung phuTung = phuTungService.getPhuTungById(phuTungId);

        if (phuTung.getSoLuongTon() < soLuong) {
            throw new RuntimeException("Không đủ tồn kho. Số lượng tồn: " + phuTung.getSoLuongTon());
        }

        phuTung.setSoLuongTon(phuTung.getSoLuongTon() - soLuong);
        phuTungService.updatePhuTung(phuTungId, phuTung);

        ChiTietSuDungPhuTung chiTiet = new ChiTietSuDungPhuTung(phieuDichVu, phuTung, soLuong);
        ChiTietSuDungPhuTung savedChiTiet = chiTietRepository.save(chiTiet);

        capNhatTongChiPhi(phieuDichVuId);
        return savedChiTiet;
    }

    public void deleteChiTiet(Long id) {
        ChiTietSuDungPhuTung chiTiet = getChiTietById(id);
        Long phieuDichVuId = chiTiet.getPhieuDichVu().getId();

        PhuTung phuTung = chiTiet.getPhuTung();
        phuTung.setSoLuongTon(phuTung.getSoLuongTon() + chiTiet.getSoLuong());
        phuTungService.updatePhuTung(phuTung.getId(), phuTung);

        chiTietRepository.deleteById(id);
        capNhatTongChiPhi(phieuDichVuId);
    }

    public List<ChiTietSuDungPhuTung> getChiTietTheoPhieuDichVu(Long phieuDichVuId) {
        return chiTietRepository.findByPhieuDichVuId(phieuDichVuId);
    }

    private void capNhatTongChiPhi(Long phieuDichVuId) {
        PhieuDichVu phieuDichVu = phieuDichVuService.getPhieuDichVuById(phieuDichVuId);
        List<ChiTietSuDungPhuTung> chiTiets = getChiTietTheoPhieuDichVu(phieuDichVuId);

        double tongChiPhi = chiTiets.stream()
                .mapToDouble(ChiTietSuDungPhuTung::getThanhTien)
                .sum();

        phieuDichVu.setTongChiPhi(tongChiPhi);
        phieuDichVuService.updatePhieuDichVu(phieuDichVuId, phieuDichVu);
    }
}