package com.evshare.trungtamdichvu.controller;

import com.evshare.trungtamdichvu.entity.PhieuDichVu;
import com.evshare.trungtamdichvu.entity.TrangThaiPhieuDichVu;
import com.evshare.trungtamdichvu.service.PhieuDichVuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/trung-tam-dich-vu/phieu-dich-vu")
@RequiredArgsConstructor
public class PhieuDichVuController {

    private final PhieuDichVuService phieuDichVuService;

    @GetMapping
    public ResponseEntity<List<PhieuDichVu>> getAllPhieuDichVu() {
        return ResponseEntity.ok(phieuDichVuService.getAllPhieuDichVu());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PhieuDichVu> getPhieuDichVuById(@PathVariable Long id) {
        return ResponseEntity.ok(phieuDichVuService.getPhieuDichVuById(id));
    }

    @PostMapping
    public ResponseEntity<PhieuDichVu> createPhieuDichVu(@RequestParam Long lichHenId) {
        try {
            PhieuDichVu phieuDichVu = phieuDichVuService.createPhieuDichVu(lichHenId);
            return ResponseEntity.ok(phieuDichVu);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<PhieuDichVu> updatePhieuDichVu(@PathVariable Long id, @RequestBody PhieuDichVu phieuDichVu) {
        return ResponseEntity.ok(phieuDichVuService.updatePhieuDichVu(id, phieuDichVu));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePhieuDichVu(@PathVariable Long id) {
        phieuDichVuService.deletePhieuDichVu(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/trang-thai")
    public ResponseEntity<PhieuDichVu> capNhatTrangThai(@PathVariable Long id, @RequestParam TrangThaiPhieuDichVu trangThai) {
        return ResponseEntity.ok(phieuDichVuService.capNhatTrangThai(id, trangThai));
    }

    @GetMapping("/trang-thai/{trangThai}")
    public ResponseEntity<List<PhieuDichVu>> getPhieuDichVuTheoTrangThai(@PathVariable TrangThaiPhieuDichVu trangThai) {
        return ResponseEntity.ok(phieuDichVuService.getPhieuDichVuTheoTrangThai(trangThai));
    }

    @GetMapping("/lich-hen/{lichHenId}")
    public ResponseEntity<PhieuDichVu> getPhieuDichVuByLichHenId(@PathVariable Long lichHenId) {
        Optional<PhieuDichVu> phieuDichVu = phieuDichVuService.getPhieuDichVuByLichHenId(lichHenId);
        return phieuDichVu.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}