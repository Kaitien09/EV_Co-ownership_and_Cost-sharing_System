package com.evshare.trungtamdichvu.controller;

import com.evshare.trungtamdichvu.entity.ChiTietSuDungPhuTung;
import com.evshare.trungtamdichvu.service.ChiTietSuDungPhuTungService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/chi-tiet-su-dung-phu-tung")
@RequiredArgsConstructor
public class ChiTietSuDungPhuTungController {

    private final ChiTietSuDungPhuTungService chiTietService;

    @GetMapping
    public List<ChiTietSuDungPhuTung> getAllChiTiet() {
        return chiTietService.getAllChiTiet();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChiTietSuDungPhuTung> getChiTietById(@PathVariable Integer id) {
        try {
            ChiTietSuDungPhuTung chiTiet = chiTietService.getChiTietById(id);
            return ResponseEntity.ok(chiTiet);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/phieu-dich-vu/{phieuId}")
    public List<ChiTietSuDungPhuTung> getChiTietByPhieuDichVu(@PathVariable Integer phieuId) {
        return chiTietService.getChiTietByPhieuDichVu(phieuId);
    }

    @GetMapping("/phu-tung/{phuTungId}")
    public List<ChiTietSuDungPhuTung> getChiTietByPhuTung(@PathVariable Integer phuTungId) {
        return chiTietService.getChiTietByPhuTung(phuTungId);
    }

    @GetMapping("/xe/{xeId}")
    public List<ChiTietSuDungPhuTung> getChiTietByXe(@PathVariable Integer xeId) {
        return chiTietService.getChiTietByXe(xeId);
    }

    @PostMapping
    public ResponseEntity<ChiTietSuDungPhuTung> createChiTiet(@RequestBody ChiTietSuDungPhuTung chiTiet) {
        try {
            ChiTietSuDungPhuTung saved = chiTietService.createChiTiet(chiTiet);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ChiTietSuDungPhuTung> updateChiTiet(@PathVariable Integer id, @RequestBody ChiTietSuDungPhuTung chiTietDetails) {
        try {
            ChiTietSuDungPhuTung updated = chiTietService.updateChiTiet(id, chiTietDetails);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChiTiet(@PathVariable Integer id) {
        try {
            chiTietService.deleteChiTiet(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/thong-ke/su-dung")
    public ResponseEntity<List<Object[]>> getThongKeSuDungPhuTungTheoLoai(
            @RequestParam java.time.LocalDateTime start,
            @RequestParam java.time.LocalDateTime end) {
        try {
            List<Object[]> thongKe = chiTietService.getThongKeSuDungPhuTungTheoLoai(start, end);
            return ResponseEntity.ok(thongKe);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}