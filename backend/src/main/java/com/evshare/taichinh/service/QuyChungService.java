package com.evshare.service;

import com.evshare.entity.LichSuQuy;
import com.evshare.entity.QuyChung;
import com.evshare.repository.LichSuQuyRepository;
import com.evshare.repository.QuyChungRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuyChungService {

    private final QuyChungRepository quyChungRepository;
    private final LichSuQuyRepository lichSuQuyRepository;

    @Transactional
    public QuyChung taoQuyChung(Integer nhomId) {
        // Kiểm tra xem nhóm đã có quỹ chưa
        return quyChungRepository.findByNhomId(nhomId)
                .orElseGet(() -> {
                    QuyChung quy = new QuyChung();
                    quy.setNhomId(nhomId);
                    quy.setSoDu(BigDecimal.ZERO);
                    return quyChungRepository.save(quy);
                });
    }

    @Transactional
    public QuyChung nopTienVaoQuy(Integer nhomId, BigDecimal soTien, String moTa) {
        if (soTien.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("Số tiền nộp phải lớn hơn 0");
        }

        QuyChung quy = quyChungRepository.findByNhomId(nhomId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy quỹ chung"));

        // Cập nhật số dư
        quy.setSoDu(quy.getSoDu().add(soTien));
        quyChungRepository.save(quy);

        // Ghi lịch sử
        LichSuQuy lichSu = new LichSuQuy();
        lichSu.setQuyId(quy.getQuyId());
        lichSu.setSoTien(soTien);
        lichSu.setLoaiGiaoDich(LichSuQuy.LoaiGiaoDich.Thu);
        lichSu.setMoTa(moTa);
        lichSuQuyRepository.save(lichSu);

        return quy;
    }

    @Transactional
    public QuyChung chiTienTuQuy(Integer nhomId, BigDecimal soTien, String moTa) {
        if (soTien.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("Số tiền chi phải lớn hơn 0");
        }

        QuyChung quy = quyChungRepository.findByNhomId(nhomId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy quỹ chung"));

        if (quy.getSoDu().compareTo(soTien) < 0) {
            throw new RuntimeException("Số dư quỹ không đủ");
        }

        // Cập nhật số dư
        quy.setSoDu(quy.getSoDu().subtract(soTien));
        quyChungRepository.save(quy);

        // Ghi lịch sử
        LichSuQuy lichSu = new LichSuQuy();
        lichSu.setQuyId(quy.getQuyId());
        lichSu.setSoTien(soTien);
        lichSu.setLoaiGiaoDich(LichSuQuy.LoaiGiaoDich.Chi);
        lichSu.setMoTa(moTa);
        lichSuQuyRepository.save(lichSu);

        return quy;
    }

    public QuyChung layQuyChungTheoNhom(Integer nhomId) {
        return quyChungRepository.findByNhomId(nhomId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy quỹ chung"));
    }

    public List<LichSuQuy> layLichSuQuy(Integer nhomId) {
        QuyChung quy = layQuyChungTheoNhom(nhomId);
        return lichSuQuyRepository.findByQuyIdOrderByNgayGiaoDichDesc(quy.getQuyId());
    }

    public List<LichSuQuy> layLichSuQuyTheoKhoangThoiGian(
            Integer nhomId,
            LocalDateTime tuNgay,
            LocalDateTime denNgay
    ) {
        QuyChung quy = layQuyChungTheoNhom(nhomId);
        return lichSuQuyRepository.findByQuyIdAndNgayGiaoDichBetween(
                quy.getQuyId(),
                tuNgay,
                denNgay
        );
    }

    public BigDecimal tinhTongThu(Integer nhomId) {
        QuyChung quy = layQuyChungTheoNhom(nhomId);
        BigDecimal tongThu = lichSuQuyRepository.getTongTienByQuyIdAndLoaiGiaoDich(
                quy.getQuyId(),
                LichSuQuy.LoaiGiaoDich.Thu
        );
        return tongThu != null ? tongThu : BigDecimal.ZERO;
    }

    public BigDecimal tinhTongChi(Integer nhomId) {
        QuyChung quy = layQuyChungTheoNhom(nhomId);
        BigDecimal tongChi = lichSuQuyRepository.getTongTienByQuyIdAndLoaiGiaoDich(
                quy.getQuyId(),
                LichSuQuy.LoaiGiaoDich.Chi
        );
        return tongChi != null ? tongChi : BigDecimal.ZERO;
    }
}