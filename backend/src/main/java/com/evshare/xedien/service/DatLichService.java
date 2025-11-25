package com.evshare.xedien.service;

import com.evshare.xedien.entity.DatLich;
import com.evshare.xedien.entity.TrangThaiDatLich;
import com.evshare.xedien.repository.DatLichRepository;
import com.evshare.xedien.repository.XeDienRepository;
import com.evshare.nguoidung.repository.ChuXeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DatLichService {

    private final DatLichRepository datLichRepository;
    private final XeDienRepository xeDienRepository;
    private final ChuXeRepository chuXeRepository;

    public List<DatLich> getAllDatLich() {
        return datLichRepository.findAll();
    }

    public Optional<DatLich> getDatLichById(Integer id) {
        return datLichRepository.findById(id);
    }

    public List<DatLich> getDatLichByChuXe(Integer chuXeId) {
        return datLichRepository.findByChuXe_ChuXeId(chuXeId);
    }

    public List<DatLich> getDatLichByXe(Integer xeId) {
        return datLichRepository.findByXe_XeId(xeId);
    }

    public List<DatLich> getDatLichByTrangThai(TrangThaiDatLich trangThai) {
        return datLichRepository.findByTrangThai(trangThai);
    }

    public List<DatLich> getDatLichSapToiByChuXe(Integer chuXeId) {
        return datLichRepository.findDatLichSapToiByChuXe(chuXeId, LocalDateTime.now());
    }

    public DatLich createDatLich(DatLich datLich) {
        // Kiểm tra xe tồn tại
        if (!xeDienRepository.existsById(datLich.getXe().getXeId())) {
            throw new RuntimeException("Không tìm thấy xe");
        }

        // Kiểm tra chủ xe tồn tại
        if (!chuXeRepository.existsById(datLich.getChuXe().getChuXeId())) {
            throw new RuntimeException("Không tìm thấy chủ xe");
        }

        // Kiểm tra thời gian hợp lệ
        if (!datLich.isValid()) {
            throw new RuntimeException("Thời gian đặt lịch không hợp lệ");
        }

        // Kiểm tra trùng lịch
        boolean trungLich = datLichRepository.existsTrungLich(
                datLich.getXe().getXeId(),
                datLich.getThoiGianBatDau(),
                datLich.getThoiGianKetThuc()
        );

        if (trungLich) {
            throw new RuntimeException("Xe đã được đặt trong khoảng thời gian này");
        }

        return datLichRepository.save(datLich);
    }

    public DatLich updateTrangThaiDatLich(Integer id, TrangThaiDatLich trangThai) {
        DatLich datLich = datLichRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đặt lịch với ID: " + id));

        datLich.setTrangThai(trangThai);
        return datLichRepository.save(datLich);
    }

    public DatLich huyDatLich(Integer id) {
        DatLich datLich = datLichRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đặt lịch với ID: " + id));

        // Chỉ cho phép hủy đặt lịch chưa bắt đầu
        if (datLich.getThoiGianBatDau().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Không thể hủy đặt lịch đã bắt đầu");
        }

        datLich.setTrangThai(TrangThaiDatLich.HUY);
        return datLichRepository.save(datLich);
    }

    public void deleteDatLich(Integer id) {
        DatLich datLich = datLichRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đặt lịch với ID: " + id));
        datLichRepository.delete(datLich);
    }

    public List<Object[]> getThongKeDatLich() {
        return datLichRepository.thongKeDatLichTheoTrangThai();
    }

    public boolean kiemTraTrungLich(Integer xeId, LocalDateTime start, LocalDateTime end) {
        return datLichRepository.existsTrungLich(xeId, start, end);
    }
}