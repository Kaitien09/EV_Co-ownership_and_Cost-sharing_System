package com.evshare.trungtamdichvu.service;

import com.evshare.trungtamdichvu.entity.LichHenDichVu;
import com.evshare.trungtamdichvu.entity.TrangThaiLichHen;
import com.evshare.trungtamdichvu.repository.LichHenDichVuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LichHenDichVuService {

    private final LichHenDichVuRepository lichHenDichVuRepository;

    public List<LichHenDichVu> getAllLichHen() {
        return lichHenDichVuRepository.findAll();
    }

    public LichHenDichVu getLichHenById(Long id) {
        return lichHenDichVuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy lịch hẹn với ID: " + id));
    }

    public LichHenDichVu createLichHen(LichHenDichVu lichHen) {
        return lichHenDichVuRepository.save(lichHen);
    }

    public LichHenDichVu updateLichHen(Long id, LichHenDichVu lichHenDetails) {
        LichHenDichVu lichHen = getLichHenById(id);
        lichHen.setTenKhachHang(lichHenDetails.getTenKhachHang());
        lichHen.setSoDienThoai(lichHenDetails.getSoDienThoai());
        lichHen.setBienSoXe(lichHenDetails.getBienSoXe());
        lichHen.setLoaiXe(lichHenDetails.getLoaiXe());
        lichHen.setLoaiDichVu(lichHenDetails.getLoaiDichVu());
        lichHen.setThoiGianHen(lichHenDetails.getThoiGianHen());
        lichHen.setMoTaTinhTrang(lichHenDetails.getMoTaTinhTrang());
        lichHen.setGhiChu(lichHenDetails.getGhiChu());
        lichHen.setKyThuatVien(lichHenDetails.getKyThuatVien());
        lichHen.setTrungTam(lichHenDetails.getTrungTam());
        return lichHenDichVuRepository.save(lichHen);
    }

    public void deleteLichHen(Long id) {
        LichHenDichVu lichHen = getLichHenById(id);
        lichHenDichVuRepository.delete(lichHen);
    }

    public LichHenDichVu capNhatTrangThai(Long id, TrangThaiLichHen trangThai) {
        LichHenDichVu lichHen = getLichHenById(id);
        lichHen.setTrangThai(trangThai);
        return lichHenDichVuRepository.save(lichHen);
    }

    public List<LichHenDichVu> getLichHenTheoTrangThai(TrangThaiLichHen trangThai) {
        return lichHenDichVuRepository.findByTrangThai(trangThai);
    }

    public List<LichHenDichVu> getLichHenTheoThoiGian(LocalDateTime start, LocalDateTime end) {
        return lichHenDichVuRepository.findByThoiGianHenBetween(start, end);
    }

    public List<LichHenDichVu> getLichHenTheoBienSo(String bienSoXe) {
        return lichHenDichVuRepository.findByBienSoXe(bienSoXe);
    }

    public List<LichHenDichVu> getLichHenTheoKyThuatVien(Long kyThuatVienId) {
        return lichHenDichVuRepository.findByKyThuatVienId(kyThuatVienId);
    }

    public List<LichHenDichVu> getLichHenTheoTrungTam(Long trungTamId) {
        return lichHenDichVuRepository.findByTrungTamId(trungTamId);
    }

    public LichHenDichVu phanCongKyThuatVien(Long lichHenId, Long kyThuatVienId) {
        LichHenDichVu lichHen = getLichHenById(lichHenId);
        // KyThuatVien sẽ được set từ controller
        return lichHenDichVuRepository.save(lichHen);
    }
}