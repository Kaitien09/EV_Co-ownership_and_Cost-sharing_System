package com.example.demo.controller;

import com.example.demo.entity.LichSuSuDung;
import com.example.demo.service.LichSuSuDungService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/lich-su")
@CrossOrigin("*")
public class LichSuSuDungController {

    private final LichSuSuDungService lichSuSuDungService;

    public LichSuSuDungController(LichSuSuDungService lichSuSuDungService) {
        this.lichSuSuDungService = lichSuSuDungService;
    }

    @GetMapping
    public List<LichSuSuDung> getAll() {
        return lichSuSuDungService.layTatCa();
    }

    @PostMapping
    public LichSuSuDung create(@RequestBody LichSuSuDung lichSu) {
        return lichSuSuDungService.taoMoi(lichSu);
    }
}
