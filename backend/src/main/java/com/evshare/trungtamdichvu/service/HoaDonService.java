package com.evshare.trungtamdichvu.service;

import com.evshare.trungtamdichvu.entity.HoaDon;
import com.evshare.trungtamdichvu.repository.HoaDonRepository;
import com.evshare.trungtamdichvu.repository.PhieuDichVuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class HoaDonService {

    private final HoaDonRepository hoaDonRepository;
    private final PhieuDichVuRepository phieuDichVuRepository;

    public List<HoaDon> getAllHoaDon() {
        return hoaDonRepository.findAll();
    }

    public Optional<HoaDon> getHoaDonById(Integer id) {
        return hoaDonRepository.findById(id);
    }

    public Optional<HoaDon> getHoaDonByMa(String maHoaDon) {
        return hoaDonRepository.findByMaHoaDon(maHoaDon);
    }

    public Optional<HoaDon> getHoaDonByPhieuDichVu(Integer phieuId) {
        return hoaDonRepository.findByPhieuDichVu_PhieuId(phieuId);
    }

    public List<HoaDon> getHoaDonByTrangThai(String trangThai) {
        return hoaDonRepository.findByTrangThaiThanhToan(trangThai);
    }

    public List<HoaDon> getHoaDonByChuXe(Integer chuXeId) {
        return hoaDonRepository.findByChuXeId(chuXeId);
    }

    public HoaDon createHoaDon(HoaDon hoaDon) {
        // Kiểm tra phiếu dịch vụ tồn tại
        if (!phieuDichVuRepository.existsById(hoaDon.getPhieuDichVu().getPhieuId())) {
            throw new RuntimeException("Không tìm thấy phiếu dịch vụ");
        }

        // Kiểm tra đã có hóa đơn cho phiếu dịch vụ này chưa
        Optional<HoaDon> existing = hoaDonRepository.findByPhieuDichVu_PhieuId(
                hoaDon.getPhieuDichVu().getPhieuId());
        if (existing.isPresent()) {
            throw new RuntimeException("Đã có hóa đơn cho phiếu dịch vụ này");
        }

        return hoaDonRepository.save(hoaDon);
    }

    public HoaDon updateHoaDon(Integer id, HoaDon hoaDonDetails) {
        HoaDon hoaDon = hoaDonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hóa đơn với ID: " + id));

        hoaDon.setTienDichVu(hoaDonDetails.getTienDichVu());
        hoaDon.setTienPhuTung(hoaDonDetails.getTienPhuTung());
        hoaDon.setThueVAT(hoaDonDetails.getThueVAT());
        hoaDon.setPhuongThucThanhToan(hoaDonDetails.getPhuongThucThanhToan());
        hoaDon.setTrangThaiThanhToan(hoaDonDetails.getTrangThaiThanhToan());
        hoaDon.setGhiChu(hoaDonDetails.getGhiChu());

        // Tự động tính lại tổng tiền
        hoaDon.setTongTien(hoaDon.getTienDichVu() + hoaDon.getTienPhuTung() + hoaDon.getThueVAT());

        return hoaDonRepository.save(hoaDon);
    }

    public HoaDon thanhToanHoaDon(Integer id, String phuongThuc) {
        HoaDon hoaDon = hoaDonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hóa đơn với ID: " + id));

        hoaDon.setTrangThaiThanhToan("DaThanhToan");
        hoaDon.setPhuongThucThanhToan(phuongThuc);

        return hoaDonRepository.save(hoaDon);
    }

    public void deleteHoaDon(Integer id) {
        HoaDon hoaDon = hoaDonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hóa đơn với ID: " + id));
        hoaDonRepository.delete(hoaDon);
    }

    public Double getDoanhThuTheoThang(LocalDateTime start, LocalDateTime end) {
        return hoaDonRepository.tinhDoanhThuTheoThang(start, end);
    }

    public List<Object[]> getThongKeHoaDonTheoTrangThai(LocalDateTime start, LocalDateTime end) {
        return hoaDonRepository.thongKeHoaDonTheoTrangThai(start, end);
    }
}