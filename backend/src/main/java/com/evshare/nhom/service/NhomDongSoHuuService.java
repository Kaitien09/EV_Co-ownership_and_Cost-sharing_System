package com.evshare.nhom.service;

import com.evshare.nhom.entity.NhomDongSoHuu;
import com.evshare.nhom.entity.TrangThaiNhom;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import com.evshare.nhom.repository.NhomDongSoHuuRepository;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NhomDongSoHuuService {

    private final NhomDongSoHuuRepository nhomRepository;

    public List<NhomDongSoHuu> getAllNhom() {
        return nhomRepository.findAll();
    }

    public Optional<NhomDongSoHuu> getNhomById(Integer id) {
        return nhomRepository.findById(id);
    }

    public NhomDongSoHuu createNhom(NhomDongSoHuu nhom) {
        return nhomRepository.save(nhom);
    }

    public NhomDongSoHuu updateNhom(Integer id, NhomDongSoHuu nhomDetails) {
        NhomDongSoHuu nhom = nhomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhóm với ID: " + id));

        nhom.setTenNhom(nhomDetails.getTenNhom());
        nhom.setTrangThai(nhomDetails.getTrangThai());

        return nhomRepository.save(nhom);
    }

    public void deleteNhom(Integer id) {
        NhomDongSoHuu nhom = nhomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhóm với ID: " + id));
        nhomRepository.delete(nhom);
    }

    public List<NhomDongSoHuu> getNhomByTrangThai(TrangThaiNhom trangThai) {
        return nhomRepository.findByTrangThai(trangThai);
    }
}