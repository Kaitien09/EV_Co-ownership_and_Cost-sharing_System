package com.evshare.nguoidung.service;

import com.evshare.nguoidung.entity.ChuXe;
import com.evshare.nguoidung.repository.ChuXeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChuXeService {
    private final ChuXeRepository chuXeRepository;

    public List<ChuXe> getAllChuXe() {
        return chuXeRepository.findAll();
    }

    public Optional<ChuXe> getChuXeById(Integer id) {
        return chuXeRepository.findById(id);
    }

    public Optional<ChuXe> getChuXeByNguoiDungId(Integer nguoiDungId) {
        return chuXeRepository.findByNguoiDungId(nguoiDungId);
    }

    public ChuXe updateChuXe(Integer id, ChuXe chuXe) {
        ChuXe existing = chuXeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Chủ xe không tồn tại"));

        existing.setHoTen(chuXe.getHoTen());
        existing.setCccd(chuXe.getCccd());
        existing.setSdt(chuXe.getSdt());
        existing.setGplx(chuXe.getGplx());
        existing.setDiaChi(chuXe.getDiaChi());

        return chuXeRepository.save(existing);
    }

    public List<ChuXe> searchChuXe(String keyword) {
        return chuXeRepository.searchByKeyword(keyword);
    }

    public boolean existsByCccd(String cccd) {
        return chuXeRepository.findByCccd(cccd).isPresent();
    }

    public ChuXe createChuXe(ChuXe chuXe) {
        // Kiểm tra CCCD trùng
        if (chuXe.getCccd() != null && existsByCccd(chuXe.getCccd())) {
            throw new RuntimeException("CCCD đã tồn tại");
        }
        return chuXeRepository.save(chuXe);
    }
}