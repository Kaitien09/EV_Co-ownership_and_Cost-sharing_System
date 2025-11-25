package com.evshare.taichinh.controller;

import com.evshare.taichinh.entity.ThanhToan;
import com.evshare.taichinh.entity.TrangThaiThanhToan;
import com.evshare.taichinh.service.ThanhToanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/thanh-toan")
@RequiredArgsConstructor
public class ThanhToanController {

    private final ThanhToanService thanhToanService;

    @GetMapping
    public List<ThanhToan> getAllThanhToan() {
        return thanhToanService.getAllThanhToan();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ThanhToan> getThanhToanById(@PathVariable Integer id) {
        Optional<ThanhToan> thanhToan = thanhToanService.getThanhToanById(id);
        return thanhToan.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/chu-xe/{chuXeId}")
    public List<ThanhToan> getThanhToanByChuXe(@PathVariable Integer chuXeId) {
        return thanhToanService.getThanhToanByChuXe(chuXeId);
    }

    @GetMapping("/trang-thai/{trangThai}")
    public List<ThanhToan> getThanhToanByTrangThai(@PathVariable TrangThaiThanhToan trangThai) {
        return thanhToanService.getThanhToanByTrangThai(trangThai);
    }

    @PostMapping
    public ResponseEntity<ThanhToan> createThanhToan(@RequestBody ThanhToan thanhToan) {
        try {
            ThanhToan saved = thanhToanService.createThanhToan(thanhToan);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}/trang-thai")
    public ResponseEntity<ThanhToan> updateTrangThaiThanhToan(
            @PathVariable Integer id,
            @RequestParam TrangThaiThanhToan trangThai) {
        try {
            ThanhToan updated = thanhToanService.updateTrangThaiThanhToan(id, trangThai);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteThanhToan(@PathVariable Integer id) {
        try {
            thanhToanService.deleteThanhToan(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/chu-xe/{chuXeId}/da-thanh-toan")
    public ResponseEntity<Double> getTongSoTienDaThanhToan(@PathVariable Integer chuXeId) {
        try {
            Double tong = thanhToanService.getTongSoTienDaThanhToanByChuXe(chuXeId);
            return ResponseEntity.ok(tong);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/chu-xe/{chuXeId}/chua-thanh-toan")
    public ResponseEntity<Double> getTongSoTienChuaThanhToan(@PathVariable Integer chuXeId) {
        try {
            Double tong = thanhToanService.getTongSoTienChuaThanhToanByChuXe(chuXeId);
            return ResponseEntity.ok(tong);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/ma-giao-dich/{maGiaoDich}")
    public ResponseEntity<ThanhToan> getThanhToanByMaGiaoDich(@PathVariable String maGiaoDich) {
        Optional<ThanhToan> thanhToan = thanhToanService.getThanhToanByMaGiaoDich(maGiaoDich);
        return thanhToan.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}