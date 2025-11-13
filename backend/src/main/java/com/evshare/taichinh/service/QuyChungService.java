package com.evshare.taichinh.service;

import com.evshare.taichinh.entity.QuyChung;
import com.evshare.taichinh.repository.QuyChungRepository;
import com.evshare.nhom.repository.NhomDongSoHuuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuyChungService {

    private final QuyChungRepository quyChungRepository;
    private final NhomDongSoHuuRepository nhomRepository;

    public List<QuyChung> getAllQuyChung() {
        return quyChungRepository.findAll();
    }

    public Optional<QuyChung> getQuyChungById(Integer id) {
        return quyChungRepository.findById(id);
    }

    public Optional<QuyChung> getQuyChungByNhom(Integer nhomId) {
        return quyChungRepository.findByNhom_NhomId(nhomId);
    }

    public QuyChung createQuyChung(QuyChung quyChung) {
        // Kiểm tra nhóm tồn tại
        if (!nhomRepository.existsById(quyChung.getNhom().getNhomId())) {
            throw new RuntimeException("Không tìm thấy nhóm");
        }

        // Kiểm tra quỹ đã tồn tại cho nhóm
        boolean daTonTai = quyChungRepository.existsByNhom_NhomId(quyChung.getNhom().getNhomId());
        if (daTonTai) {
            throw new RuntimeException("Đã có quỹ cho nhóm này");
        }

        return quyChungRepository.save(quyChung);
    }

    public QuyChung updateSoDuQuyChung(Integer id, Double soDu) {
        QuyChung quyChung = quyChungRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy quỹ với ID: " + id));

        quyChung.setSoDu(soDu);
        return quyChungRepository.save(quyChung);
    }

    public QuyChung napTienVaoQuy(Integer id, Double soTien) {
        QuyChung quyChung = quyChungRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy quỹ với ID: " + id));

        quyChung.setSoDu(quyChung.getSoDu() + soTien);
        return quyChungRepository.save(quyChung);
    }

    public QuyChung rutTienTuQuy(Integer id, Double soTien) {
        QuyChung quyChung = quyChungRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy quỹ với ID: " + id));

        if (quyChung.getSoDu() < soTien) {
            throw new RuntimeException("Số dư không đủ để rút");
        }

        quyChung.setSoDu(quyChung.getSoDu() - soTien);
        return quyChungRepository.save(quyChung);
    }

    public void deleteQuyChung(Integer id) {
        QuyChung quyChung = quyChungRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy quỹ với ID: " + id));
        quyChungRepository.delete(quyChung);
    }

    public Double getTongSoDuTatCaQuy() {
        return quyChungRepository.findTongSoDuTatCaQuy();
    }
}