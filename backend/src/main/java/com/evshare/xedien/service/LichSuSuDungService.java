package com.example.demo.service;

import com.example.demo.entity.LichSuSuDung;
import com.example.demo.repository.LichSuSuDungRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LichSuSuDungService {

    private final LichSuSuDungRepository lichSuSuDungRepository;

    public LichSuSuDungService(LichSuSuDungRepository lichSuSuDungRepository) {
        this.lichSuSuDungRepository = lichSuSuDungRepository;
    }

    public List<LichSuSuDung> layTatCa() {
        return lichSuSuDungRepository.findAll();
    }

    public LichSuSuDung taoMoi(LichSuSuDung lichSuSuDung) {
        return lichSuSuDungRepository.save(lichSuSuDung);
    }
}
