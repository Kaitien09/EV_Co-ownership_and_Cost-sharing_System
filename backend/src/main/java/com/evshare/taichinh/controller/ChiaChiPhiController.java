package com.evshare.taichinh.controller;

import com.evshare.taichinh.entity.ChiaChiPhi;
import com.evshare.taichinh.service.ChiaChiPhiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/chia-chi-phi")
@RequiredArgsConstructor
public class ChiaChiPhiController {

    private final ChiaChiPhiService chiaChiPhiService;

    @GetMapping
    public List<ChiaChiPhi> getAllChiaChiPhi() {
        return chiaChiPhiService.getAllChiaChiPhi();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChiaChiPhi> getChiaChiPhiById(@PathVariable Integer id) {
        Optional<ChiaChiPhi> chiaChiPhi = chiaChiPhiService.getChiaChiPhiById(id);
        return chiaChiPhi.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/chi-phi/{chiPhiId}")
    public List<ChiaChiPhi> getChiaChiPhiByChiPhi(@PathVariable Integer chiPhiId) {
        return chiaChiPhiService.getChiaChiPhiByChiPhi(chiPhiId);
    }

    @GetMapping("/chu-xe/{chuXeId}")
    public List<ChiaChiPhi> getChiaChiPhiByChuXe(@PathVariable Integer chuXeId) {
        return chiaChiPhiService.getChiaChiPhiByChuXe(chuXeId);
    }

    @GetMapping("/nhom/{nhomId}")
    public List<ChiaChiPhi> getChiaChiPhiByNhom(@PathVariable Integer nhomId) {
        return chiaChiPhiService.getChiaChiPhiByNhom(nhomId);
    }

    @PostMapping
    public ResponseEntity<ChiaChiPhi> createChiaChiPhi(@RequestBody ChiaChiPhi chiaChiPhi) {
        try {
            ChiaChiPhi saved = chiaChiPhiService.createChiaChiPhi(chiaChiPhi);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ChiaChiPhi> updateChiaChiPhi(@PathVariable Integer id, @RequestBody ChiaChiPhi chiaChiPhiDetails) {
        try {
            ChiaChiPhi updated = chiaChiPhiService.updateChiaChiPhi(id, chiaChiPhiDetails);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChiaChiPhi(@PathVariable Integer id) {
        try {
            chiaChiPhiService.deleteChiaChiPhi(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/chu-xe/{chuXeId}/nhom/{nhomId}/tong")
    public ResponseEntity<Double> getTongSoTienPhaiTra(@PathVariable Integer chuXeId, @PathVariable Integer nhomId) {
        try {
            Double tong = chiaChiPhiService.getTongSoTienPhaiTraByChuXeAndNhom(chuXeId, nhomId);
            return ResponseEntity.ok(tong);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/chu-xe/{chuXeId}/chua-thanh-toan")
    public List<ChiaChiPhi> getChiaChiPhiChuaThanhToan(@PathVariable Integer chuXeId) {
        return chiaChiPhiService.getChiaChiPhiChuaThanhToan(chuXeId);
    }
}