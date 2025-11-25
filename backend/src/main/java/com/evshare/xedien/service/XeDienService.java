package com.evshare.xedien.service;

import com.evshare.xedien.entity.XeDien;
import com.evshare.xedien.entity.TrangThaiXe;
import com.evshare.xedien.repository.XeDienRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class XeDienService {

    private final XeDienRepository xeDienRepository;

    public List<XeDien> getAllXeDien() {
        return xeDienRepository.findAll();
    }

    public Optional<XeDien> getXeDienById(Integer id) {
        return xeDienRepository.findById(id);
    }

    public Optional<XeDien> getXeDienByVin(String vin) {
        return xeDienRepository.findByVin(vin);
    }

    public Optional<XeDien> getXeDienByBienSo(String bienSo) {
        return xeDienRepository.findByBienSo(bienSo);
    }

    public List<XeDien> getXeDienByTrangThai(TrangThaiXe trangThai) {
        return xeDienRepository.findByTrangThai(trangThai);
    }

    public List<XeDien> searchXeDienByModel(String model) {
        return xeDienRepository.findByModelContainingIgnoreCase(model);
    }

    public XeDien createXeDien(XeDien xeDien) {
        // Kiểm tra VIN đã tồn tại
        if (xeDienRepository.existsByVin(xeDien.getVin())) {
            throw new RuntimeException("VIN đã tồn tại");
        }

        // Kiểm tra biển số đã tồn tại
        if (xeDienRepository.existsByBienSo(xeDien.getBienSo())) {
            throw new RuntimeException("Biển số đã tồn tại");
        }

        return xeDienRepository.save(xeDien);
    }

    public XeDien updateXeDien(Integer id, XeDien xeDienDetails) {
        XeDien xeDien = xeDienRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy xe điện với ID: " + id));

        // Kiểm tra VIN mới không trùng với xe khác
        if (!xeDien.getVin().equals(xeDienDetails.getVin()) &&
                xeDienRepository.existsByVin(xeDienDetails.getVin())) {
            throw new RuntimeException("VIN đã tồn tại");
        }

        // Kiểm tra biển số mới không trùng với xe khác
        if (!xeDien.getBienSo().equals(xeDienDetails.getBienSo()) &&
                xeDienRepository.existsByBienSo(xeDienDetails.getBienSo())) {
            throw new RuntimeException("Biển số đã tồn tại");
        }

        xeDien.setVin(xeDienDetails.getVin());
        xeDien.setModel(xeDienDetails.getModel());
        xeDien.setBienSo(xeDienDetails.getBienSo());
        xeDien.setMauXe(xeDienDetails.getMauXe());
        xeDien.setNamSanXuat(xeDienDetails.getNamSanXuat());
        xeDien.setDungLuongPin(xeDienDetails.getDungLuongPin());
        xeDien.setQuangDuongToiDa(xeDienDetails.getQuangDuongToiDa());
        xeDien.setHinhAnh(xeDienDetails.getHinhAnh());
        xeDien.setMoTa(xeDienDetails.getMoTa());

        return xeDienRepository.save(xeDien);
    }

    public XeDien updateTrangThaiXe(Integer id, TrangThaiXe trangThai) {
        XeDien xeDien = xeDienRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy xe điện với ID: " + id));

        xeDien.setTrangThai(trangThai);
        return xeDienRepository.save(xeDien);
    }

    public void deleteXeDien(Integer id) {
        XeDien xeDien = xeDienRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy xe điện với ID: " + id));
        xeDienRepository.delete(xeDien);
    }

    public List<XeDien> getXeSanTrongKhoangThoiGian(LocalDateTime start, LocalDateTime end) {
        return xeDienRepository.findXeSanTrongKhoangThoiGian(start, end);
    }

    public Long countXeByTrangThai(TrangThaiXe trangThai) {
        return xeDienRepository.countByTrangThai(trangThai);
    }
}