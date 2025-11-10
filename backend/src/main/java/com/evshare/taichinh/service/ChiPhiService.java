package com.evshare.service;

import com.evshare.entity.ChiPhi;
import com.evshare.entity.ChiaChiPhi;
import com.evshare.repository.ChiPhiRepository;
import com.evshare.repository.ChiaChiPhiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChiPhiService {

    private final ChiPhiRepository chiPhiRepository;
    private final ChiaChiPhiRepository chiaChiPhiRepository;

    @Transactional
    public ChiPhi taoChiPhi(ChiPhi chiPhi) {
        return chiPhiRepository.save(chiPhi);
    }

    @Transactional
    public ChiPhi capNhatChiPhi(Integer chiPhiId, ChiPhi chiPhiUpdate) {
        ChiPhi chiPhi = chiPhiRepository.findById(chiPhiId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy chi phí"));

        chiPhi.setLoaiChiPhi(chiPhiUpdate.getLoaiChiPhi());
        chiPhi.setSoTien(chiPhiUpdate.getSoTien());
        chiPhi.setNgayPhatSinh(chiPhiUpdate.getNgayPhatSinh());
        chiPhi.setGhiChu(chiPhiUpdate.getGhiChu());

        return chiPhiRepository.save(chiPhi);
    }

    @Transactional
    public void xoaChiPhi(Integer chiPhiId) {
        // Xóa các bản ghi chia chi phí liên quan trước
        List<ChiaChiPhi> danhSachChia = chiaChiPhiRepository.findByChiPhiId(chiPhiId);
        chiaChiPhiRepository.deleteAll(danhSachChia);

        chiPhiRepository.deleteById(chiPhiId);
    }

    public ChiPhi layChiPhiTheoId(Integer chiPhiId) {
        return chiPhiRepository.findById(chiPhiId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy chi phí"));
    }

    public List<ChiPhi> layDanhSachChiPhiTheoNhom(Integer nhomId) {
        return chiPhiRepository.findByNhomId(nhomId);
    }

    public List<ChiPhi> layChiPhiTheoKhoangThoiGian(
            Integer nhomId,
            LocalDate tuNgay,
            LocalDate denNgay
    ) {
        return chiPhiRepository.findByNhomIdAndNgayPhatSinhBetween(nhomId, tuNgay, denNgay);
    }

    public BigDecimal tinhTongChiPhi(Integer nhomId) {
        BigDecimal tong = chiPhiRepository.getTongChiPhiByNhomId(nhomId);
        return tong != null ? tong : BigDecimal.ZERO;
    }

    @Transactional
    public List<ChiaChiPhi> chiaChiPhiDeuNhau(Integer chiPhiId, List<Integer> danhSachChuXeId) {
        ChiPhi chiPhi = layChiPhiTheoId(chiPhiId);

        int soLuongChuXe = danhSachChuXeId.size();
        if (soLuongChuXe == 0) {
            throw new RuntimeException("Danh sách chủ xe không được rỗng");
        }

        BigDecimal soTienMoiNguoi = chiPhi.getSoTien()
                .divide(BigDecimal.valueOf(soLuongChuXe), 2, RoundingMode.HALF_UP);

        List<ChiaChiPhi> danhSachChia = danhSachChuXeId.stream()
                .map(chuXeId -> {
                    ChiaChiPhi chia = new ChiaChiPhi();
                    chia.setChiPhiId(chiPhiId);
                    chia.setChuXeId(chuXeId);
                    chia.setSoTienPhaiTra(soTienMoiNguoi);
                    return chia;
                })
                .toList();

        return chiaChiPhiRepository.saveAll(danhSachChia);
    }

    @Transactional
    public List<ChiaChiPhi> chiaChiPhiTheoTiLe(
            Integer chiPhiId,
            List<ChiaChiPhiRequest> danhSachChia
    ) {
        ChiPhi chiPhi = layChiPhiTheoId(chiPhiId);

        // Tính tổng tỉ lệ
        double tongTiLe = danhSachChia.stream()
                .mapToDouble(ChiaChiPhiRequest::getTiLe)
                .sum();

        if (tongTiLe == 0) {
            throw new RuntimeException("Tổng tỉ lệ phải lớn hơn 0");
        }

        List<ChiaChiPhi> result = danhSachChia.stream()
                .map(request -> {
                    BigDecimal soTien = chiPhi.getSoTien()
                            .multiply(BigDecimal.valueOf(request.getTiLe()))
                            .divide(BigDecimal.valueOf(tongTiLe), 2, RoundingMode.HALF_UP);

                    ChiaChiPhi chia = new ChiaChiPhi();
                    chia.setChiPhiId(chiPhiId);
                    chia.setChuXeId(request.getChuXeId());
                    chia.setSoTienPhaiTra(soTien);
                    chia.setGhiChu(request.getGhiChu());
                    return chia;
                })
                .toList();

        return chiaChiPhiRepository.saveAll(result);
    }

    public static class ChiaChiPhiRequest {
        private Integer chuXeId;
        private double tiLe;
        private String ghiChu;

        public Integer getChuXeId() { return chuXeId; }
        public void setChuXeId(Integer chuXeId) { this.chuXeId = chuXeId; }
        public double getTiLe() { return tiLe; }
        public void setTiLe(double tiLe) { this.tiLe = tiLe; }
        public String getGhiChu() { return ghiChu; }
        public void setGhiChu(String ghiChu) { this.ghiChu = ghiChu; }
    }
}