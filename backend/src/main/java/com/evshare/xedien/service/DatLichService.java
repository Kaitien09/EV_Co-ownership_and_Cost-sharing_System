package com.example.demo.service;

import com.example.demo.entity.DatLich;
import com.example.demo.repository.DatLichRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class DatLichService {

    private final DatLichRepository datLichRepository;

    public DatLichService(DatLichRepository datLichRepository) {
        this.datLichRepository = datLichRepository;
    }

    public List<DatLich> layTatCa() {
        return datLichRepository.findAll();
    }

    public DatLich taoDatLich(DatLich datLich) {
        boolean trung = datLichRepository.existsByXeDien_XeIdAndThoiGianBatDauLessThanEqualAndThoiGianKetThucGreaterThanEqual(
                datLich.getXeDien().getXeId(),
                datLich.getThoiGianKetThuc(),
                datLich.getThoiGianBatDau()
        );
        if (trung) throw new RuntimeException("Xe này đã được đặt trong thời gian đó!");
        return datLichRepository.save(datLich);
    }

    public void xoaDatLich(Integer id) {
        datLichRepository.deleteById(id);
    }
}
