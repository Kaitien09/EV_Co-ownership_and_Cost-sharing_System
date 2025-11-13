package com.evshare.taichinh.service;

import com.evshare.taichinh.entity.ThanhToan;
import com.evshare.taichinh.entity.TrangThaiThanhToan;
import com.evshare.taichinh.repository.ThanhToanRepository;
import com.evshare.taichinh.repository.ChiaChiPhiRepository;
import com.evshare.nguoidung.repository.ChuXeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ThanhToanService {

    private final ThanhToanRepository thanhToanRepository;
    private final ChiaChiPhiRepository chiaChiPhiRepository;
    private final ChuXeRepository chuXeRepository;

    public List<ThanhToan> getAllThanhToan() {
        return thanhToanRepository.findAll();
    }

    public Optional<ThanhToan> getThanhToanById(Integer id) {
        return thanhToanRepository.findById(id);
    }

    public List<ThanhToan> getThanhToanByChuXe(Integer chuXeId) {
        return thanhToanRepository.findByChuXe_ChuXeId(chuXeId);
    }

    public List<ThanhToan> getThanhToanByTrangThai(TrangThaiThanhToan trangThai) {
        return thanhToanRepository.findByTrangThai(trangThai);
    }

    public ThanhToan createThanhToan(ThanhToan thanhToan) {
        // Kiểm tra chủ xe tồn tại
        if (!chuXeRepository.existsById(thanhToan.getChuXe().getChuXeId())) {
            throw new RuntimeException("Không tìm thấy chủ xe");
        }

        // Kiểm tra chia chi phí tồn tại
        if (!chiaChiPhiRepository.existsById(thanhToan.getChiaChiPhi().getChiaChiPhiId())) {
            throw new RuntimeException("Không tìm thấy chia chi phí");
        }

        // Kiểm tra đã có thanh toán cho chia chi phí này chưa
        Optional<ThanhToan> existing = thanhToanRepository.findByChiaChiPhi_ChiaChiPhiId(
                thanhToan.getChiaChiPhi().getChiaChiPhiId());
        if (existing.isPresent()) {
            throw new RuntimeException("Đã có thanh toán cho chia chi phí này");
        }

        // Tạo mã giao dịch duy nhất
        if (thanhToan.getMaGiaoDich() == null) {
            thanhToan.setMaGiaoDich("TT_" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }

        return thanhToanRepository.save(thanhToan);
    }

    public ThanhToan updateTrangThaiThanhToan(Integer id, TrangThaiThanhToan trangThai) {
        ThanhToan thanhToan = thanhToanRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thanh toán với ID: " + id));

        thanhToan.setTrangThai(trangThai);

        if (trangThai == TrangThaiThanhToan.DA_THANH_TOAN && thanhToan.getNgayThanhToan() == null) {
            thanhToan.setNgayThanhToan(LocalDateTime.now());
        }

        return thanhToanRepository.save(thanhToan);
    }

    public void deleteThanhToan(Integer id) {
        ThanhToan thanhToan = thanhToanRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thanh toán với ID: " + id));
        thanhToanRepository.delete(thanhToan);
    }

    public Double getTongSoTienDaThanhToanByChuXe(Integer chuXeId) {
        return thanhToanRepository.findTongSoTienDaThanhToanByChuXe(chuXeId);
    }

    public Double getTongSoTienChuaThanhToanByChuXe(Integer chuXeId) {
        return thanhToanRepository.findTongSoTienChuaThanhToanByChuXe(chuXeId);
    }

    public Optional<ThanhToan> getThanhToanByMaGiaoDich(String maGiaoDich) {
        return thanhToanRepository.findByMaGiaoDich(maGiaoDich);
    }
}