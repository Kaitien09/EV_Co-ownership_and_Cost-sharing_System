package com.evshare.trungtamdichvu.controller;

import com.evshare.trungtamdichvu.entity.KyThuatVien;
import com.evshare.trungtamdichvu.service.KyThuatVienService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ky-thuat-vien")
@RequiredArgsConstructor
public class KyThuatVienController {

    private final KyThuatVienService kyThuatVienService;

    @GetMapping
    public List<KyThuatVien> getAllKyThuatVien() {
        return kyThuatVienService.getAllKyThuatVien();
    }

    @GetMapping("/{id}")
    public ResponseEntity<KyThuatVien> getKyThuatVienById(@PathVariable Integer id) {
        Optional<KyThuatVien> kyThuatVien = kyThuatVienService.getKyThuatVienById(id);
        return kyThuatVien.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/trung-tam/{trungTamId}")
    public List<KyThuatVien> getKyThuatVienByTrungTam(@PathVariable Integer trungTamId) {
        return kyThuatVienService.getKyThuatVienByTrungTam(trungTamId);
    }

    @GetMapping("/search")
    public List<KyThuatVien> searchKyThuatVien(@RequestParam String ten) {
        return kyThuatVienService.searchKyThuatVienByTen(ten);
    }

    @GetMapping("/chuyen-mon/{chuyenMon}")
    public List<KyThuatVien> getKyThuatVienByChuyenMon(@PathVariable String chuyenMon) {
        return kyThuatVienService.getKyThuatVienByChuyenMon(chuyenMon);
    }

    @GetMapping("/dang-lam-viec")
    public List<KyThuatVien> getKyThuatVienDangLamViec() {
        return kyThuatVienService.getKyThuatVienDangLamViec();
    }

    @PostMapping
    public ResponseEntity<KyThuatVien> createKyThuatVien(@RequestBody KyThuatVien kyThuatVien) {
        try {
            KyThuatVien saved = kyThuatVienService.createKyThuatVien(kyThuatVien);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<KyThuatVien> updateKyThuatVien(@PathVariable Integer id, @RequestBody KyThuatVien kyThuatVienDetails) {
        try {
            KyThuatVien updated = kyThuatVienService.updateKyThuatVien(id, kyThuatVienDetails);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteKyThuatVien(@PathVariable Integer id) {
        try {
            kyThuatVienService.deleteKyThuatVien(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/trung-tam/{trungTamId}/dang-lam-viec")
    public List<KyThuatVien> getKyThuatVienDangLamViecByTrungTam(@PathVariable Integer trungTamId) {
        return kyThuatVienService.getKyThuatVienDangLamViecByTrungTam(trungTamId);
    }

    @GetMapping("/thong-ke/chuyen-mon")
    public ResponseEntity<List<Object[]>> getThongKeKyThuatVienTheoChuyenMon() {
        try {
            List<Object[]> thongKe = kyThuatVienService.getThongKeKyThuatVienTheoChuyenMon();
            return ResponseEntity.ok(thongKe);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}