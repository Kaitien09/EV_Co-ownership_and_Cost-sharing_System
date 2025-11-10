package com.evshare.service;

import com.evshare.entity.ChiPhi;
import com.evshare.repository.ChiPhiRepository;
import com.evshare.repository.ChiaChiPhiRepository;
import com.evshare.repository.ThanhToanRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BaoCaoService {

    private final ChiPhiRepository chiPhiRepository;
    private final ChiaChiPhiRepository chiaChiPhiRepository;
    private final ThanhToanRepository thanhToanRepository;
    private final QuyChungService quyChungService;

    public BaoCaoTaiChinhNhom taoBaoCaoTaiChinhNhom(Integer nhomId, LocalDate tuNgay, LocalDate denNgay) {
        BaoCaoTaiChinhNhom baoCao = new BaoCaoTaiChinhNhom();
        baoCao.setNhomId(nhomId);
        baoCao.setTuNgay(tuNgay);
        baoCao.setDenNgay(denNgay);

        // Lấy danh sách chi phí trong khoảng thời gian
        List<ChiPhi> danhSachChiPhi = chiPhiRepository
            .findByNhomIdAndNgayPhatSinhBetween(nhomId, tuNgay, denNgay);

        // Tính tổng chi phí theo loại
        Map<ChiPhi.LoaiChiPhi, BigDecimal> chiPhiTheoLoai = danhSachChiPhi.stream()
            .collect(Collectors.groupingBy(
                ChiPhi::getLoaiChiPhi,
                Collectors.reducing(
                    BigDecimal.ZERO,
                    ChiPhi::getSoTien,
                    BigDecimal::add
                )
            ));

        baoCao.setChiPhiTheoLoai(chiPhiTheoLoai);

        // Tính tổng chi phí
        BigDecimal tongChiPhi = chiPhiTheoLoai.values().stream()
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        baoCao.setTongChiPhi(tongChiPhi);

        // Thông tin quỹ chung
        try {
            baoCao.setSoDuQuyChung(quyChungService.layQuyChungTheoNhom(nhomId).getSoDu());
            baoCao.setTongThu(quyChungService.tinhTongThu(nhomId));
            baoCao.setTongChi(quyChungService.tinhTongChi(nhomId));
        } catch (Exception e) {
            baoCao.setSoDuQuyChung(BigDecimal.ZERO);
            baoCao.setTongThu(BigDecimal.ZERO);
            baoCao.setTongChi(BigDecimal.ZERO);
        }

        return baoCao;
    }

    public BaoCaoCaNhan taoBaoCaoCaNhan(Integer chuXeId, LocalDate tuNgay, LocalDate denNgay) {
        BaoCaoCaNhan baoCao = new BaoCaoCaNhan();
        baoCao.setChuXeId(chuXeId);
        baoCao.setTuNgay(tuNgay);
        baoCao.setDenNgay(denNgay);

        // Tổng tiền phải trả
        BigDecimal tongPhaiTra = chiaChiPhiRepository.getTongTienPhaiTraByChuXeId(chuXeId);
        baoCao.setTongTienPhaiTra(tongPhaiTra != null ? tongPhaiTra : BigDecimal.ZERO);

        // Tổng tiền đã thanh toán
        BigDecimal tongDaThanhToan = thanhToanRepository.getTongTienDaThanhToanByChuXeId(chuXeId);
        baoCao.setTongTienDaThanhToan(tongDaThanhToan != null ? tongDaThanhToan : BigDecimal.ZERO);

        // Tổng tiền còn nợ
        baoCao.setTongTienConNo(
            baoCao.getTongTienPhaiTra().subtract(baoCao.getTongTienDaThanhToan())
        );

        return baoCao;
    }

    @Data
    public static class BaoCaoTaiChinhNhom {
        private Integer nhomId;
        private LocalDate tuNgay;
        private LocalDate denNgay;
        private Map<ChiPhi.LoaiChiPhi, BigDecimal> chiPhiTheoLoai;
        private BigDecimal tongChiPhi;
        private BigDecimal soDuQuyChung;
        private BigDecimal tongThu;
        private BigDecimal tongChi;
    }

    @Data
    public static class BaoCaoCaNhan {
        private Integer chuXeId;
        private LocalDate tuNgay;
        private LocalDate denNgay;
        private BigDecimal tongTienPhaiTra;
        private BigDecimal tongTienDaThanhToan;
        private BigDecimal tongTienConNo;
    }
}