package com.evshare.nhom.service;

import com.evshare.nhom.entity.ThanhVienNhom;
import com.evshare.nhom.entity.VaiTro;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import com.evshare.nhom.repository.ThanhVienNhomRepository;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ThanhVienNhomService {

    private final ThanhVienNhomRepository thanhVienRepository;

    public List<ThanhVienNhom> getThanhVienByNhom(Integer nhomId) {
        return thanhVienRepository.findByNhom_NhomId(nhomId);
    }

    public ThanhVienNhom addThanhVien(ThanhVienNhom thanhVien) {
        // Kiểm tra tổng tỷ lệ sở hữu
        Double tongTyLeHienTai = thanhVienRepository.findTongTyLeSoHuuByNhom(thanhVien.getNhom().getNhomId());
        if (tongTyLeHienTai + thanhVien.getTyLeSoHuu() > 100) {
            throw new RuntimeException("Tổng tỷ lệ sở hữu vượt quá 100%");
        }

        return thanhVienRepository.save(thanhVien);
    }

    public void removeThanhVien(Integer thanhVienId) {
        ThanhVienNhom thanhVien = thanhVienRepository.findById(thanhVienId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thành viên"));
        thanhVienRepository.delete(thanhVien);
    }

    public ThanhVienNhom updateVaiTro(Integer thanhVienId, VaiTro vaiTro) {
        ThanhVienNhom thanhVien = thanhVienRepository.findById(thanhVienId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thành viên"));
        thanhVien.setVaiTro(vaiTro);
        return thanhVienRepository.save(thanhVien);
    }

    public ThanhVienNhom updateTyLeSoHuu(Integer thanhVienId, Double tyLeSoHuu) {
        ThanhVienNhom thanhVien = thanhVienRepository.findById(thanhVienId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thành viên"));

        thanhVien.setTyLeSoHuu(tyLeSoHuu);
        return thanhVienRepository.save(thanhVien);
    }
}