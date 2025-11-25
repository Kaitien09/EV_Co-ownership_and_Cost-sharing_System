package com.evshare.taichinh.controller;

import com.evshare.taichinh.entity.ChiPhi;
import com.evshare.taichinh.entity.LoaiChiPhi;
import com.evshare.taichinh.service.ChiPhiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/chi-phi")
@RequiredArgsConstructor
public class ChiPhiController {

    private final ChiPhiService chiPhiService;

    @GetMapping
    public List<ChiPhi> getAllChiPhi() {
        return chiPhiService.getAllChiPhi();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChiPhi> getChiPhiById(@PathVariable Integer id) {
        Optional<ChiPhi> chiPhi = chiPhiService.getChiPhiById(id);
        return chiPhi.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/nhom/{nhomId}")
    public List<ChiPhi> getChiPhiByNhom(@PathVariable Integer nhomId) {
        return chiPhiService.getChiPhiByNhom(nhomId);
    }

    @PostMapping
    public ResponseEntity<ChiPhi> createChiPhi(@RequestBody ChiPhi chiPhi) {
        try {
            ChiPhi saved = chiPhiService.createChiPhi(chiPhi);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ChiPhi> updateChiPhi(@PathVariable Integer id, @RequestBody ChiPhi chiPhiDetails) {
        try {
            ChiPhi updated = chiPhiService.updateChiPhi(id, chiPhiDetails);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChiPhi(@PathVariable Integer id) {
        try {
            chiPhiService.deleteChiPhi(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/loai/{loaiChiPhi}")
    public List<ChiPhi> getChiPhiByLoai(@PathVariable LoaiChiPhi loaiChiPhi) {
        return chiPhiService.getChiPhiByLoai(loaiChiPhi);
    }

    @GetMapping("/nhom/{nhomId}/loai/{loaiChiPhi}")
    public List<ChiPhi> getChiPhiByNhomAndLoai(@PathVariable Integer nhomId, @PathVariable LoaiChiPhi loaiChiPhi) {
        return chiPhiService.getChiPhiByNhomAndLoai(nhomId, loaiChiPhi);
    }

    @GetMapping("/nhom/{nhomId}/tong")
    public ResponseEntity<Double> getTongChiPhiByNhom(@PathVariable Integer nhomId) {
        try {
            Double tong = chiPhiService.getTongChiPhiByNhom(nhomId);
            return ResponseEntity.ok(tong);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/nhom/{nhomId}/chua-chia")
    public List<ChiPhi> getChiPhiChuaChia(@PathVariable Integer nhomId) {
        return chiPhiService.getChiPhiChuaChia(nhomId);
    }
}