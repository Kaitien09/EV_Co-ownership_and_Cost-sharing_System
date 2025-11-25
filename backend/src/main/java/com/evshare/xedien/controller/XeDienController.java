package com.evshare.xedien.controller;

import com.evshare.xedien.entity.XeDien;
import com.evshare.xedien.entity.TrangThaiXe;
import com.evshare.xedien.service.XeDienService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/xe-dien")
@RequiredArgsConstructor
public class XeDienController {

    private final XeDienService xeDienService;

    @GetMapping
    public List<XeDien> getAllXeDien() {
        return xeDienService.getAllXeDien();
    }

    @GetMapping("/{id}")
    public ResponseEntity<XeDien> getXeDienById(@PathVariable Integer id) {
        Optional<XeDien> xeDien = xeDienService.getXeDienById(id);
        return xeDien.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/vin/{vin}")
    public ResponseEntity<XeDien> getXeDienByVin(@PathVariable String vin) {
        Optional<XeDien> xeDien = xeDienService.getXeDienByVin(vin);
        return xeDien.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/bien-so/{bienSo}")
    public ResponseEntity<XeDien> getXeDienByBienSo(@PathVariable String bienSo) {
        Optional<XeDien> xeDien = xeDienService.getXeDienByBienSo(bienSo);
        return xeDien.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/trang-thai/{trangThai}")
    public List<XeDien> getXeDienByTrangThai(@PathVariable TrangThaiXe trangThai) {
        return xeDienService.getXeDienByTrangThai(trangThai);
    }

    @GetMapping("/search")
    public List<XeDien> searchXeDienByModel(@RequestParam String model) {
        return xeDienService.searchXeDienByModel(model);
    }

    @PostMapping
    public ResponseEntity<XeDien> createXeDien(@RequestBody XeDien xeDien) {
        try {
            XeDien saved = xeDienService.createXeDien(xeDien);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<XeDien> updateXeDien(@PathVariable Integer id, @RequestBody XeDien xeDienDetails) {
        try {
            XeDien updated = xeDienService.updateXeDien(id, xeDienDetails);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/trang-thai")
    public ResponseEntity<XeDien> updateTrangThaiXe(@PathVariable Integer id, @RequestParam TrangThaiXe trangThai) {
        try {
            XeDien updated = xeDienService.updateTrangThaiXe(id, trangThai);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteXeDien(@PathVariable Integer id) {
        try {
            xeDienService.deleteXeDien(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/san-trong")
    public List<XeDien> getXeSanTrongKhoangThoiGian(
            @RequestParam LocalDateTime start,
            @RequestParam LocalDateTime end) {
        return xeDienService.getXeSanTrongKhoangThoiGian(start, end);
    }

    @GetMapping("/thong-ke/trang-thai")
    public ResponseEntity<Long> countXeByTrangThai(@RequestParam TrangThaiXe trangThai) {
        try {
            Long count = xeDienService.countXeByTrangThai(trangThai);
            return ResponseEntity.ok(count);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}