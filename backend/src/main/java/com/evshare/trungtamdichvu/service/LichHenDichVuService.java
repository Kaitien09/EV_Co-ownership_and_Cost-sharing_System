package com.evshare.trungtamdichvu.service;

import com.evshare.trungtamdichvu.entity.LichHenDichVu;
import com.evshare.trungtamdichvu.entity.LoaiDichVu;
import com.evshare.trungtamdichvu.entity.TrangThaiLichHen;
import com.evshare.trungtamdichvu.repository.LichHenDichVuRepository;
import com.evshare.trungtamdichvu.repository.TrungTamDichVuRepository;
import com.evshare.xedien.repository.XeDienRepository;
import com.evshare.nguoidung.repository.ChuXeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LichHenDichVuService {

    private final LichHenDichVuRepository lichHenRepository;
    private final TrungTamDichVuRepository trungTamRepository;
    private final XeDienRepository xeDienRepository;
    private final ChuXeRepository chuXeRepository;

    public List<LichHenDichVu> getAllLichHen() {
        return lichHenRepository.findAll();
    }

    public Optional<LichHenDichVu> getLichHenById(Integer id) {
        return lichHenRepository.findById(id);
    }

    public List<LichHenDichVu> getLichHenByChuXe(Integer chuXeId) {
        return lichHenRepository.findByChuXe_ChuXeId(chuXeId);
    }

    public List<LichHenDichVu> getLichHenByXe(Integer xeId) {
        return lichHenRepository.findByXe_XeId(xeId);
    }

    public List<LichHenDichVu> getLichHenByTrungTam(Integer trungTamId) {
        return lichHenRepository.findByTrungTam_TrungTamId(trungTamId);
    }

    public List<LichHenDichVu> getLichHenByTrangThai(TrangThaiLichHen trangThai) {
        return lichHenRepository.findByTrangThai(trangThai);
    }

    public List<LichHenDichVu> getLichHenByLoaiDichVu(LoaiDichVu loaiDichVu) {
        return lichHenRepository.findByLoaiDichVu(loaiDichVu);
    }

    public LichHenDichVu createLichHen(LichHenDichVu lichHen) {
        // Kiểm tra xe tồn tại
        if (!xeDienRepository.existsById(lichHen.getXe().getXeId())) {
            throw new RuntimeException("Không tìm thấy xe");
        }

        // Kiểm tra chủ xe tồn tại
        if (!chuXeRepository.existsById(lichHen.getChuXe().getChuXeId())) {
            throw new RuntimeException("Không tìm thấy chủ xe");
        }

        // Kiểm tra trung tâm tồn tại
        if (!trungTamRepository.existsById(lichHen.getTrungTam().getTrungTamId())) {
            throw new RuntimeException("Không tìm thấy trung tâm");
        }

        // Kiểm tra trùng lịch hẹn
        boolean trungLich = lichHenRepository.existsLichHenTrung(
                lichHen.getTrungTam().getTrungTamId(), lichHen.getNgayHen());

        if (trungLich) {
            throw new RuntimeException("Đã có lịch hẹn trong thời gian này");
        }

        return lichHenRepository.save(lichHen);
    }

    public LichHenDichVu updateTrangThaiLichHen(Integer id, TrangThaiLichHen trangThai) {
        LichHenDichVu lichHen = lichHenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy lịch hẹn với ID: " + id));

        lichHen.setTrangThai(trangThai);
        return lichHenRepository.save(lichHen);
    }

    public LichHenDichVu huyLichHen(Integer id) {
        LichHenDichVu lichHen = lichHenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy lịch hẹn với ID: " + id));

        // Chỉ cho phép hủy lịch hẹn chưa xác nhận hoặc đã xác nhận
        if (lichHen.getTrangThai() == TrangThaiLichHen.DANG_THUC_HIEN ||
                lichHen.getTrangThai() == TrangThaiLichHen.HOAN_THANH) {
            throw new RuntimeException("Không thể hủy lịch hẹn đang thực hiện hoặc đã hoàn tất");
        }

        lichHen.setTrangThai(TrangThaiLichHen.HUY);
        return lichHenRepository.save(lichHen);
    }

    public void deleteLichHen(Integer id) {
        LichHenDichVu lichHen = lichHenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy lịch hẹn với ID: " + id));
        lichHenRepository.delete(lichHen);
    }

    public List<LichHenDichVu> getLichHenByTrungTamAndKhoangThoiGian(Integer trungTamId, LocalDateTime start, LocalDateTime end) {
        return lichHenRepository.findByTrungTamAndNgayHenBetween(trungTamId, start, end);
    }

    public List<Object[]> getThongKeLichHenTheoTrangThai() {
        return lichHenRepository.thongKeLichHenTheoTrangThai();
    }
}