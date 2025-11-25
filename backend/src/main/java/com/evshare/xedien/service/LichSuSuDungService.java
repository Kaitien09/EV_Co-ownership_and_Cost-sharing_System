package com.evshare.xedien.service;

import com.evshare.xedien.entity.LichSuSuDung;
import com.evshare.xedien.entity.TrangThaiXe;
import com.evshare.xedien.repository.LichSuSuDungRepository;
import com.evshare.xedien.repository.DatLichRepository;
import com.evshare.xedien.repository.XeDienRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LichSuSuDungService {

    private final LichSuSuDungRepository lichSuSuDungRepository;
    private final DatLichRepository datLichRepository;
    private final XeDienRepository xeDienRepository;

    public List<LichSuSuDung> getAllLichSuSuDung() {
        return lichSuSuDungRepository.findAll();
    }

    public Optional<LichSuSuDung> getLichSuSuDungById(Integer id) {
        return lichSuSuDungRepository.findById(id);
    }

    public List<LichSuSuDung> getLichSuSuDungByXe(Integer xeId) {
        return lichSuSuDungRepository.findByXe_XeId(xeId);
    }

    public List<LichSuSuDung> getLichSuSuDungByChuXe(Integer chuXeId) {
        return lichSuSuDungRepository.findByChuXeId(chuXeId);
    }

    public Optional<LichSuSuDung> getLichSuSuDungByDatLich(Integer datLichId) {
        return lichSuSuDungRepository.findByDatLich_DatLichId(datLichId);
    }

    public LichSuSuDung createLichSuSuDung(LichSuSuDung lichSuSuDung) {
        // Kiểm tra đặt lịch tồn tại
        if (!datLichRepository.existsById(lichSuSuDung.getDatLich().getDatLichId())) {
            throw new RuntimeException("Không tìm thấy đặt lịch");
        }

        // Kiểm tra xe tồn tại
        if (!xeDienRepository.existsById(lichSuSuDung.getXe().getXeId())) {
            throw new RuntimeException("Không tìm thấy xe");
        }

        return lichSuSuDungRepository.save(lichSuSuDung);
    }

    public LichSuSuDung checkIn(Integer datLichId, String diemXuatPhat) {
        // Tìm đặt lịch
        var datLich = datLichRepository.findById(datLichId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đặt lịch"));

        // Kiểm tra đã có lịch sử sử dụng chưa
        Optional<LichSuSuDung> existing = lichSuSuDungRepository.findByDatLich_DatLichId(datLichId);
        if (existing.isPresent()) {
            throw new RuntimeException("Đã check-in cho đặt lịch này");
        }

        // Tạo lịch sử sử dụng mới
        LichSuSuDung lichSuSuDung = new LichSuSuDung();
        lichSuSuDung.setDatLich(datLich);
        lichSuSuDung.setXe(datLich.getXe());
        lichSuSuDung.setThoiGianNhanXe(LocalDateTime.now());
        lichSuSuDung.setDiemXuatPhat(diemXuatPhat);

        // Cập nhật trạng thái xe
        datLich.getXe().setTrangThai(TrangThaiXe.DANG_SU_DUNG);
        xeDienRepository.save(datLich.getXe());

        return lichSuSuDungRepository.save(lichSuSuDung);
    }

    public LichSuSuDung checkOut(Integer datLichId, String diemDen, Integer quangDuong, Double nangLuongTieuThu) {
        // Tìm lịch sử sử dụng
        LichSuSuDung lichSuSuDung = lichSuSuDungRepository.findByDatLich_DatLichId(datLichId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy lịch sử sử dụng"));

        // Kiểm tra đã check-out chưa
        if (lichSuSuDung.getThoiGianTraXe() != null) {
            throw new RuntimeException("Đã check-out cho đặt lịch này");
        }

        // Cập nhật thông tin check-out
        lichSuSuDung.setThoiGianTraXe(LocalDateTime.now());
        lichSuSuDung.setDiemDen(diemDen);
        lichSuSuDung.setQuangDuong(quangDuong);
        lichSuSuDung.setNangLuongTieuThu(nangLuongTieuThu);

        // Cập nhật trạng thái xe
        lichSuSuDung.getXe().setTrangThai(TrangThaiXe.SAN_SANG);
        xeDienRepository.save(lichSuSuDung.getXe());

        return lichSuSuDungRepository.save(lichSuSuDung);
    }

    public void deleteLichSuSuDung(Integer id) {
        LichSuSuDung lichSuSuDung = lichSuSuDungRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy lịch sử sử dụng với ID: " + id));
        lichSuSuDungRepository.delete(lichSuSuDung);
    }

    public Integer getTongQuangDuongByXe(Integer xeId) {
        return lichSuSuDungRepository.findTongQuangDuongByXe(xeId);
    }

    public Integer getTongQuangDuongByChuXe(Integer chuXeId) {
        return lichSuSuDungRepository.findTongQuangDuongByChuXe(chuXeId);
    }

    public List<Object[]> getThongKeSuDungTheoThang(Integer xeId, LocalDateTime start, LocalDateTime end) {
        return lichSuSuDungRepository.thongKeSuDungTheoThang(xeId, start, end);
    }

    public List<LichSuSuDung> getLichSuSuDungChuaHoanThanh() {
        return lichSuSuDungRepository.findChuaHoanThanh();
    }
}