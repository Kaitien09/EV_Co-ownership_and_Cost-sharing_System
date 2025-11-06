package com.evshare.service;

import com.evshare.entity.ChiaChiPhi;
import com.evshare.entity.ThanhToan;
import com.evshare.repository.ChiaChiPhiRepository;
import com.evshare.repository.ThanhToanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ThanhToanService {

    private final ThanhToanRepository thanhToanRepository;
    private final ChiaChiPhiRepository chiaChiPhiRepository;

    @Transactional
    public ThanhToan taoThanhToan(ThanhToan thanhToan) {
        // Kiểm tra xem đã có thanh toán cho phần chia chi phí này chưa
        thanhToanRepository.findByChiaChiPhiId(thanhToan.getChiaChiPhiId())
                .ifPresent(t -> {
                    throw new RuntimeException("Đã có thanh toán cho phần chia chi phí này");
                });

        // Kiểm tra phần chia chi phí có tồn tại không
        ChiaChiPhi chiaChiPhi = chiaChiPhiRepository.findById(thanhToan.getChiaChiPhiId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phần chia chi phí"));

        // Kiểm tra số tiền thanh toán
        if (thanhToan.getSoTienThanhToan().compareTo(chiaChiPhi.getSoTienPhaiTra()) != 0) {
            throw new RuntimeException("Số tiền thanh toán không khớp với số tiền phải trả");
        }

        return thanhToanRepository.save(thanhToan);
    }

    @Transactional
    public ThanhToan xacNhanThanhToan(Integer thanhToanId) {
        ThanhToan thanhToan = thanhToanRepository.findById(thanhToanId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thanh toán"));

        thanhToan.setTrangThai(ThanhToan.TrangThai.DaThanhToan);
        return thanhToanRepository.save(thanhToan);
    }

    @Transactional
    public void huyThanhToan(Integer thanhToanId) {
        ThanhToan thanhToan = thanhToanRepository.findById(thanhToanId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thanh toán"));

        if (thanhToan.getTrangThai() == ThanhToan.TrangThai.DaThanhToan) {
            throw new RuntimeException("Không thể hủy thanh toán đã xác nhận");
        }

        thanhToanRepository.delete(thanhToan);
    }

    public ThanhToan layThanhToanTheoId(Integer thanhToanId) {
        return thanhToanRepository.findById(thanhToanId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thanh toán"));
    }

    public List<ThanhToan> layDanhSachThanhToanTheoChuXe(Integer chuXeId) {
        return thanhToanRepository.findByChuXeId(chuXeId);
    }

    public List<ThanhToan> layDanhSachChuaThanhToan(Integer chuXeId) {
        return thanhToanRepository.findByChuXeIdAndTrangThai(
                chuXeId,
                ThanhToan.TrangThai.ChuaThanhToan
        );
    }

    public List<ThanhToan> layDanhSachDaThanhToan(Integer chuXeId) {
        return thanhToanRepository.findByChuXeIdAndTrangThai(
                chuXeId,
                ThanhToan.TrangThai.DaThanhToan
        );
    }

    public BigDecimal tinhTongTienDaThanhToan(Integer chuXeId) {
        BigDecimal tong = thanhToanRepository.getTongTienDaThanhToanByChuXeId(chuXeId);
        return tong != null ? tong : BigDecimal.ZERO;
    }

    public BigDecimal tinhTongTienChuaThanhToan(Integer chuXeId) {
        List<ChiaChiPhi> chuaThanhToan = chiaChiPhiRepository
                .findChuaThanhToanByChuXeId(chuXeId);

        return chuaThanhToan.stream()
                .map(ChiaChiPhi::getSoTienPhaiTra)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}