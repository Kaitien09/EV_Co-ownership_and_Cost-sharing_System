package com.evshare.trungtamdichvu.service;

import com.evshare.trungtamdichvu.entity.PhieuDichVu;
import com.evshare.trungtamdichvu.entity.KyThuatVien; // THÊM IMPORT NÀY
import com.evshare.trungtamdichvu.entity.TrangThaiPhieuDichVu;
import com.evshare.trungtamdichvu.repository.PhieuDichVuRepository;
import com.evshare.trungtamdichvu.repository.LichHenDichVuRepository;
import com.evshare.trungtamdichvu.repository.KyThuatVienRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PhieuDichVuService {

    private final PhieuDichVuRepository phieuDichVuRepository;
    private final LichHenDichVuRepository lichHenRepository;
    private final KyThuatVienRepository kyThuatVienRepository;

    public List<PhieuDichVu> getAllPhieuDichVu() {
        return phieuDichVuRepository.findAll();
    }

    public Optional<PhieuDichVu> getPhieuDichVuById(Integer id) {
        return phieuDichVuRepository.findById(id);
    }

    public Optional<PhieuDichVu> getPhieuDichVuByLichHen(Integer lichHenId) {
        return phieuDichVuRepository.findByLichHen_LichHenId(lichHenId);
    }

    public List<PhieuDichVu> getPhieuDichVuByKyThuatVien(Integer kyThuatVienId) {
        return phieuDichVuRepository.findByKyThuatVien_KyThuatVienId(kyThuatVienId);
    }

    public List<PhieuDichVu> getPhieuDichVuByTrangThai(TrangThaiPhieuDichVu trangThai) {
        return phieuDichVuRepository.findByTrangThai(trangThai);
    }

    public List<PhieuDichVu> getPhieuDichVuByXe(Integer xeId) {
        return phieuDichVuRepository.findByLichHen_Xe_XeId(xeId);
    }

    public List<PhieuDichVu> getPhieuDichVuByChuXe(Integer chuXeId) {
        return phieuDichVuRepository.findByLichHen_ChuXe_ChuXeId(chuXeId);
    }

    public PhieuDichVu createPhieuDichVu(PhieuDichVu phieuDichVu) {
        // Kiểm tra lịch hẹn tồn tại
        if (!lichHenRepository.existsById(phieuDichVu.getLichHen().getLichHenId())) {
            throw new RuntimeException("Không tìm thấy lịch hẹn");
        }

        // Kiểm tra đã có phiếu dịch vụ cho lịch hẹn này chưa
        Optional<PhieuDichVu> existing = phieuDichVuRepository.findByLichHen_LichHenId(
                phieuDichVu.getLichHen().getLichHenId());
        if (existing.isPresent()) {
            throw new RuntimeException("Đã có phiếu dịch vụ cho lịch hẹn này");
        }

        // Kiểm tra kỹ thuật viên tồn tại (nếu có)
        if (phieuDichVu.getKyThuatVien() != null &&
                !kyThuatVienRepository.existsById(phieuDichVu.getKyThuatVien().getKyThuatVienId())) {
            throw new RuntimeException("Không tìm thấy kỹ thuật viên");
        }

        return phieuDichVuRepository.save(phieuDichVu);
    }

    public PhieuDichVu updatePhieuDichVu(Integer id, PhieuDichVu phieuDichVuDetails) {
        PhieuDichVu phieuDichVu = phieuDichVuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phiếu dịch vụ với ID: " + id));

        phieuDichVu.setDanhSachKiemTra(phieuDichVuDetails.getDanhSachKiemTra());
        phieuDichVu.setKetQuaKiemTra(phieuDichVuDetails.getKetQuaKiemTra());
        phieuDichVu.setKhacPhuc(phieuDichVuDetails.getKhacPhuc());
        phieuDichVu.setGhiChuKyThuat(phieuDichVuDetails.getGhiChuKyThuat());

        return phieuDichVuRepository.save(phieuDichVu);
    }

    public PhieuDichVu phanCongKyThuatVien(Integer phieuId, Integer kyThuatVienId) {
        PhieuDichVu phieuDichVu = phieuDichVuRepository.findById(phieuId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phiếu dịch vụ"));

        KyThuatVien kyThuatVien = kyThuatVienRepository.findById(kyThuatVienId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy kỹ thuật viên"));

        // SỬA TÊN PHƯƠNG THỨC - có thể là setKyThuatVien hoặc setKythuatvien
        phieuDichVu.setKyThuatVien(kyThuatVien); // Hoặc phieuDichVu.setKythuatvien(kyThuatVien);
        phieuDichVu.setTrangThai(TrangThaiPhieuDichVu.DANG_THUC_HIEN);
        phieuDichVu.setNgayBatDau(LocalDateTime.now());

        return phieuDichVuRepository.save(phieuDichVu);
    }

    public PhieuDichVu hoanThanhPhieuDichVu(Integer id) {
        PhieuDichVu phieuDichVu = phieuDichVuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phiếu dịch vụ với ID: " + id));

        phieuDichVu.setTrangThai(TrangThaiPhieuDichVu.HOAN_THANH);
        phieuDichVu.setNgayHoanThanh(LocalDateTime.now());

        return phieuDichVuRepository.save(phieuDichVu);
    }

    public void deletePhieuDichVu(Integer id) {
        PhieuDichVu phieuDichVu = phieuDichVuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phiếu dịch vụ với ID: " + id));
        phieuDichVuRepository.delete(phieuDichVu);
    }

    public List<PhieuDichVu> getPhieuDichVuChuaPhanCong() {
        return phieuDichVuRepository.findPhieuChuaPhanCong();
    }

    public List<Object[]> getThongKePhieuDichVuTheoTrangThai() {
        return phieuDichVuRepository.thongKePhieuDichVuTheoTrangThai();
    }
}