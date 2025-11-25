package com.evshare.nhom.service;

import com.evshare.nhom.entity.HopDongDongSoHuu;
import com.evshare.nhom.entity.TrangThaiHopDong;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import com.evshare.nhom.repository.HopDongDongSoHuuRepository;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HopDongDongSoHuuService {

    private final HopDongDongSoHuuRepository hopDongRepository;

    public List<HopDongDongSoHuu> getHopDongByNhom(Integer nhomId) {
        return hopDongRepository.findByNhom_NhomId(nhomId);
    }

    public HopDongDongSoHuu createHopDong(HopDongDongSoHuu hopDong) {
        return hopDongRepository.save(hopDong);
    }

    public HopDongDongSoHuu ketThucHopDong(Integer hopDongId) {
        HopDongDongSoHuu hopDong = hopDongRepository.findById(hopDongId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hợp đồng"));

        hopDong.setTrangThai(TrangThaiHopDong.KET_THUC);
        return hopDongRepository.save(hopDong);
    }

    public void deleteHopDong(Integer hopDongId) {
        HopDongDongSoHuu hopDong = hopDongRepository.findById(hopDongId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hợp đồng"));
        hopDongRepository.delete(hopDong);
    }
}