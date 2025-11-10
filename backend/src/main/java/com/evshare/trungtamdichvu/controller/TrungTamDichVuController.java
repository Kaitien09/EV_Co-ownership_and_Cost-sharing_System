package com.evshare.trungtamdichvu.controller;

import com.evshare.trungtamdichvu.entity.TrungTamDichVu;
import com.evshare.trungtamdichvu.entity.TrangThaiTrungTam;
import com.evshare.trungtamdichvu.service.TrungTamDichVuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/trung-tam-dich-vu")
@RequiredArgsConstructor
public class TrungTamDichVuController {

    private final TrungTamDichVuService trungTamDichVuService;

    @GetMapping
    public ResponseEntity<List<TrungTamDichVu>> getAllTrungTam() {
        return ResponseEntity.ok(trungTamDichVuService.getAllTrungTam());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrungTamDichVu> getTrungTamById(@PathVariable Long id) {
        return ResponseEntity.ok(trungTamDichVuService.getTrungTamById(id));
    }

    @GetMapping("/ma/{maTrungTam}")
    public ResponseEntity<TrungTamDichVu> getTrungTamByMa(@PathVariable String maTrungTam) {
        return ResponseEntity.ok(trungTamDichVuService.getTrungTamByMa(maTrungTam));
    }

    @PostMapping
    public ResponseEntity<TrungTamDichVu> createTrungTam(@RequestBody TrungTamDichVu trungTam) {
        return ResponseEntity.ok(trungTamDichVuService.createTrungTam(trungTam));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TrungTamDichVu> updateTrungTam(@PathVariable Long id, @RequestBody TrungTamDichVu trungTam) {
        return ResponseEntity.ok(trungTamDichVuService.updateTrungTam(id, trungTam));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTrungTam(@PathVariable Long id) {
        trungTamDichVuService.deleteTrungTam(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/trang-thai/{trangThai}")
    public ResponseEntity<List<TrungTamDichVu>> getTrungTamTheoTrangThai(@PathVariable TrangThaiTrungTam trangThai) {
        return ResponseEntity.ok(trungTamDichVuService.getTrungTamTheoTrangThai(trangThai));
    }

    @PutMapping("/{id}/trang-thai")
    public ResponseEntity<TrungTamDichVu> capNhatTrangThai(@PathVariable Long id, @RequestParam TrangThaiTrungTam trangThai) {
        return ResponseEntity.ok(trungTamDichVuService.capNhatTrangThai(id, trangThai));
    }
}