package com.example.demo.controller;

import com.example.demo.entity.XeDien;
import com.example.demo.service.XeDienService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/xe-dien")
@CrossOrigin("*")
public class XeDienController {

    private final XeDienService xeDienService;

    public XeDienController(XeDienService xeDienService) {
        this.xeDienService = xeDienService;
    }

    @GetMapping
    public List<XeDien> getAll() {
        return xeDienService.layTatCaXe();
    }

    @PostMapping
    public XeDien create(@RequestBody XeDien xe) {
        return xeDienService.taoXeMoi(xe);
    }

    @PutMapping("/{id}")
    public XeDien update(@PathVariable Integer id, @RequestBody XeDien xe) {
        return xeDienService.capNhatXe(id, xe);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        xeDienService.xoaXe(id);
    }
}
