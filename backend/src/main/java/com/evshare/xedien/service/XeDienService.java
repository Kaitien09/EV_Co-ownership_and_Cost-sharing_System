package com.example.demo.service;

import com.example.demo.entity.XeDien;
import com.example.demo.repository.XeDienRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class XeDienService {

    private final XeDienRepository xeDienRepository;

    public XeDienService(XeDienRepository xeDienRepository) {
        this.xeDienRepository = xeDienRepository;
    }

    public List<XeDien> layTatCaXe() {
        return xeDienRepository.findAll();
    }

    public XeDien taoXeMoi(XeDien xeDien) {
        return xeDienRepository.save(xeDien);
    }

    public XeDien capNhatXe(Integer id, XeDien xeMoi) {
        return xeDienRepository.findById(id)
                .map(xe -> {
                    xe.setVin(xeMoi.getVin());
                    xe.setModel(xeMoi.getModel());
                    xe.setBienSo(xeMoi.getBienSo());
                    xe.setTrangThai(xeMoi.getTrangThai());
                    return xeDienRepository.save(xe);
                })
                .orElseThrow(() -> new RuntimeException("Không tìm thấy xe ID " + id));
    }

    public void xoaXe(Integer id) {
        xeDienRepository.deleteById(id);
    }
}
