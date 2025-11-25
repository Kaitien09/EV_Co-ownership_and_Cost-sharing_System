package com.evshare.taichinh.controller;

import com.evshare.taichinh.entity.LichSuQuy;
import com.evshare.taichinh.entity.LoaiGiaoDich;
import com.evshare.taichinh.service.LichSuQuyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/lich-su-quy")
@RequiredArgsConstructor
public class LichSuQuyController {

    private final LichSuQuyService lichSuQuyService;

    @GetMapping
    public List<LichSuQuy> getAllLichSuQuy() {
        return lichSuQuyService.getAllLichSuQuy();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LichSuQuy> getLichSuQuyById(@PathVariable Integer id) {
        Optional<LichSuQuy> lichSuQuy = lichSuQuyService.getLichSuQuyById(id);
        return lichSuQuy.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/quy/{quyId}")
    public List<LichSuQuy> getLichSuQuyByQuy(@PathVariable Integer quyId) {
        return lichSuQuyService.getLichSuQuyByQuy(quyId);
    }

    @GetMapping("/loai/{loaiGiaoDich}")
    public List<LichSuQuy> getLichSuQuyByLoaiGiaoDich(@PathVariable LoaiGiaoDich loaiGiaoDich) {
        return lichSuQuyService.getLichSuQuyByLoaiGiaoDich(loaiGiaoDich);
    }

    @PostMapping
    public ResponseEntity<LichSuQuy> createLichSuQuy(@RequestBody LichSuQuy lichSuQuy) {
        try {
            LichSuQuy saved = lichSuQuyService.createLichSuQuy(lichSuQuy);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLichSuQuy(@PathVariable Integer id) {
        try {
            lichSuQuyService.deleteLichSuQuy(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/quy/{quyId}/tong-thu")
    public ResponseEntity<Double> getTongThuByQuy(@PathVariable Integer quyId) {
        try {
            Double tong = lichSuQuyService.getTongThuByQuy(quyId);
            return ResponseEntity.ok(tong);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/quy/{quyId}/tong-chi")
    public ResponseEntity<Double> getTongChiByQuy(@PathVariable Integer quyId) {
        try {
            Double tong = lichSuQuyService.getTongChiByQuy(quyId);
            return ResponseEntity.ok(tong);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/quy/{quyId}/thong-ke")
    public ResponseEntity<List<Object[]>> getThongKeThuChiTheoThang(
            @PathVariable Integer quyId,
            @RequestParam LocalDateTime startDate,
            @RequestParam LocalDateTime endDate) {
        try {
            List<Object[]> thongKe = lichSuQuyService.getThongKeThuChiTheoThang(quyId, startDate, endDate);
            return ResponseEntity.ok(thongKe);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}