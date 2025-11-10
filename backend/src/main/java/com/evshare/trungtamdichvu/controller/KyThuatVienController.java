package com.evshare.trungtamdichvu.controller;

import com.evshare.trungtamdichvu.entity.KyThuatVien;
import com.evshare.trungtamdichvu.entity.TrangThaiKyThuatVien;
import com.evshare.trungtamdichvu.service.KyThuatVienService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/trung-tam-dich-vu/ky-thuat-vien")
@RequiredArgsConstructor
public class KyThuatVienController {

    private final KyThuatVienService kyThuatVienService;

    @GetMapping
    public ResponseEntity<List<KyThuatVien>> getAllKyThuatVien() {
        return ResponseEntity.ok(kyThuatVienService.getAllKyThuatVien());
    }

    @GetMapping("/{id}")
    public ResponseEntity<KyThuatVien> getKyThuatVienById(@PathVariable Long id) {
        return ResponseEntity.ok(kyThuatVienService.getKyThuatVienById(id));
    }

    @PostMapping
    public ResponseEntity<KyThuatVien> createKyThuatVien(@RequestBody KyThuatVien kyThuatVien) {
        return ResponseEntity.ok(kyThuatVienService.createKyThuatVien(kyThuatVien));
    }

    @PutMapping("/{id}")
    public ResponseEntity<KyThuatVien> updateKyThuatVien(@PathVariable Long id, @RequestBody KyThuatVien kyThuatVien) {
        return ResponseEntity.ok(kyThuatVienService.updateKyThuatVien(id, kyThuatVien));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteKyThuatVien(@PathVariable Long id) {
        kyThuatVienService.deleteKyThuatVien(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/trang-thai/{trangThai}")
    public ResponseEntity<List<KyThuatVien>> getKyThuatVienTheoTrangThai(@PathVariable TrangThaiKyThuatVien trangThai) {
        return ResponseEntity.ok(kyThuatVienService.getKyThuatVienTheoTrangThai(trangThai));
    }

    @GetMapping("/trung-tam/{trungTamId}")
    public ResponseEntity<List<KyThuatVien>> getKyThuatVienTheoTrungTam(@PathVariable Long trungTamId) {
        return ResponseEntity.ok(kyThuatVienService.getKyThuatVienTheoTrungTam(trungTamId));
    }

    @PutMapping("/{id}/trang-thai")
    public ResponseEntity<KyThuatVien> capNhatTrangThai(@PathVariable Long id, @RequestParam TrangThaiKyThuatVien trangThai) {
        return ResponseEntity.ok(kyThuatVienService.capNhatTrangThai(id, trangThai));
    }
}