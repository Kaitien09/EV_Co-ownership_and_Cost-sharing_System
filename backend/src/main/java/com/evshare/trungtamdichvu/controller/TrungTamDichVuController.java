package com.evshare.trungtamdichvu.controller;

import com.evshare.trungtamdichvu.entity.TrungTamDichVu;
import com.evshare.trungtamdichvu.service.TrungTamDichVuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/trung-tam-dich-vu")
@RequiredArgsConstructor
public class TrungTamDichVuController {

    private final TrungTamDichVuService trungTamService;

    @GetMapping
    public List<TrungTamDichVu> getAllTrungTam() {
        return trungTamService.getAllTrungTam();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrungTamDichVu> getTrungTamById(@PathVariable Integer id) {
        Optional<TrungTamDichVu> trungTam = trungTamService.getTrungTamById(id);
        return trungTam.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public List<TrungTamDichVu> searchTrungTam(@RequestParam String keyword) {
        return trungTamService.searchTrungTamByTen(keyword);
    }

    @PostMapping
    public ResponseEntity<TrungTamDichVu> createTrungTam(@RequestBody TrungTamDichVu trungTam) {
        try {
            TrungTamDichVu saved = trungTamService.createTrungTam(trungTam);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<TrungTamDichVu> updateTrungTam(@PathVariable Integer id, @RequestBody TrungTamDichVu trungTamDetails) {
        try {
            TrungTamDichVu updated = trungTamService.updateTrungTam(id, trungTamDetails);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrungTam(@PathVariable Integer id) {
        try {
            trungTamService.deleteTrungTam(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/co-ky-thuat-vien")
    public List<TrungTamDichVu> getTrungTamCoKyThuatVien() {
        return trungTamService.getTrungTamCoKyThuatVien();
    }
}