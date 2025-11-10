package com.evshare.trungtamdichvu.controller;

import com.evshare.trungtamdichvu.entity.ChiTietSuDungPhuTung;
import com.evshare.trungtamdichvu.service.ChiTietSuDungPhuTungService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/trung-tam-dich-vu/chi-tiet-phu-tung")
@RequiredArgsConstructor
public class ChiTietSuDungPhuTungController {

    private final ChiTietSuDungPhuTungService chiTietService;

    @GetMapping
    public ResponseEntity<List<ChiTietSuDungPhuTung>> getAllChiTiet() {
        return ResponseEntity.ok(chiTietService.getAllChiTiet());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChiTietSuDungPhuTung> getChiTietById(@PathVariable Long id) {
        return ResponseEntity.ok(chiTietService.getChiTietById(id));
    }

    @PostMapping
    public ResponseEntity<ChiTietSuDungPhuTung> createChiTiet(
            @RequestParam Long phieuDichVuId,
            @RequestParam Long phuTungId,
            @RequestParam Integer soLuong) {
        try {
            ChiTietSuDungPhuTung chiTiet = chiTietService.createChiTiet(phieuDichVuId, phuTungId, soLuong);
            return ResponseEntity.ok(chiTiet);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteChiTiet(@PathVariable Long id) {
        chiTietService.deleteChiTiet(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/phieu-dich-vu/{phieuDichVuId}")
    public ResponseEntity<List<ChiTietSuDungPhuTung>> getChiTietTheoPhieuDichVu(@PathVariable Long phieuDichVuId) {
        return ResponseEntity.ok(chiTietService.getChiTietTheoPhieuDichVu(phieuDichVuId));
    }
}