package com.evshare.trungtamdichvu.service;

import com.evshare.trungtamdichvu.entity.PhieuDichVu;
import com.evshare.trungtamdichvu.entity.TrangThaiPhieuDichVu;
import com.evshare.trungtamdichvu.entity.LichHenDichVu;
import com.evshare.trungtamdichvu.repository.PhieuDichVuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PhieuDichVuService {

    private final PhieuDichVuRepository phieuDichVuRepository;
    private final LichHenDichVuService lichHenDichVuService;

    public List<PhieuDichVu> getAllPhieuDichVu() {
        return phieuDichVuRepository.findAll();
    }

    public PhieuDichVu getPhieuDichVuById(Long id) {
        return phieuDichVuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phiếu dịch vụ với ID: " + id));
    }

    public PhieuDichVu createPhieuDichVu(Long lichHenId) {
        LichHenDichVu lichHen = lichHenDichVuService.getLichHenById(lichHenId);

        Optional<PhieuDichVu> existingPhieu = phieuDichVuRepository.findByLichHenId(lichHenId);
        if (existingPhieu.isPresent()) {
            throw new RuntimeException("Đã tồn tại phiếu dịch vụ cho lịch hẹn này");
        }

        PhieuDichVu phieuDichVu = new PhieuDichVu(lichHen);
        return phieuDichVuRepository.save(phieuDichVu);
    }

    public PhieuDichVu updatePhieuDichVu(Long id, PhieuDichVu phieuDichVuDetails) {
        PhieuDichVu phieuDichVu = getPhieuDichVuById(id);
        phieuDichVu.setChecklistKiemTra(phieuDichVuDetails.getChecklistKiemTra());
        phieuDichVu.setKetQuaKiemTra(phieuDichVuDetails.getKetQuaKiemTra());
        phieuDichVu.setGhiChuKyThuat(phieuDichVuDetails.getGhiChuKyThuat());
        phieuDichVu.setTongChiPhi(phieuDichVuDetails.getTongChiPhi());
        phieuDichVu.setNgayCapNhat(java.time.LocalDateTime.now());
        return phieuDichVuRepository.save(phieuDichVu);
    }

    public void deletePhieuDichVu(Long id) {
        PhieuDichVu phieuDichVu = getPhieuDichVuById(id);
        phieuDichVuRepository.delete(phieuDichVu);
    }

    public PhieuDichVu capNhatTrangThai(Long id, TrangThaiPhieuDichVu trangThai) {
        PhieuDichVu phieuDichVu = getPhieuDichVuById(id);
        phieuDichVu.setTrangThai(trangThai);
        phieuDichVu.setNgayCapNhat(java.time.LocalDateTime.now());
        return phieuDichVuRepository.save(phieuDichVu);
    }

    public List<PhieuDichVu> getPhieuDichVuTheoTrangThai(TrangThaiPhieuDichVu trangThai) {
        return phieuDichVuRepository.findByTrangThai(trangThai);
    }

    public Optional<PhieuDichVu> getPhieuDichVuByLichHenId(Long lichHenId) {
        return phieuDichVuRepository.findByLichHenId(lichHenId);
    }
}