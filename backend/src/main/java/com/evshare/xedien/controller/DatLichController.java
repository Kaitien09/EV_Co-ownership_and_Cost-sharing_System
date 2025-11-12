package com.example.demo.controller;

import com.example.demo.entity.DatLich;
import com.example.demo.service.DatLichService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/dat-lich")
@CrossOrigin("*")
public class DatLichController {

    private final DatLichService datLichService;

    public DatLichController(DatLichService datLichService) {
        this.datLichService = datLichService;
    }

    @GetMapping
    public List<DatLich> getAll() {
        return datLichService.layTatCa();
    }

    @PostMapping
    public DatLich create(@RequestBody DatLich datLich) {
        return datLichService.taoDatLich(datLich);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        datLichService.xoaDatLich(id);
    }
}

