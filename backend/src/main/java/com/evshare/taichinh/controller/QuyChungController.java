package com.evshare.taichinh.controller;

import com.evshare.taichinh.entity.QuyChung;
import com.evshare.taichinh.service.QuyChungService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/quy-chung")
@RequiredArgsConstructor
public class QuyChungController {

    private final QuyChungService quyChungService;

    @GetMapping
    public List<QuyChung> getAllQuyChung() {
        return quyChungService.getAllQuyChung();
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuyChung> getQuyChungById(@PathVariable Integer id) {
        Optional<QuyChung> quyChung = quyChungService.getQuyChungById(id);
        return quyChung.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/nhom/{nhomId}")
    public ResponseEntity<QuyChung> getQuyChungByNhom(@PathVariable Integer nhomId) {
        Optional<QuyChung> quyChung = quyChungService.getQuyChungByNhom(nhomId);
        return quyChung.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<QuyChung> createQuyChung(@RequestBody QuyChung quyChung) {
        try {
            QuyChung saved = quyChungService.createQuyChung(quyChung);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}/so-du")
    public ResponseEntity<QuyChung> updateSoDuQuyChung(@PathVariable Integer id, @RequestParam Double soDu) {
        try {
            QuyChung updated = quyChungService.updateSoDuQuyChung(id, soDu);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/nap-tien")
    public ResponseEntity<QuyChung> napTienVaoQuy(@PathVariable Integer id, @RequestParam Double soTien) {
        try {
            QuyChung updated = quyChungService.napTienVaoQuy(id, soTien);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/{id}/rut-tien")
    public ResponseEntity<QuyChung> rutTienTuQuy(@PathVariable Integer id, @RequestParam Double soTien) {
        try {
            QuyChung updated = quyChungService.rutTienTuQuy(id, soTien);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuyChung(@PathVariable Integer id) {
        try {
            quyChungService.deleteQuyChung(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/tong-so-du")
    public ResponseEntity<Double> getTongSoDuTatCaQuy() {
        try {
            Double tong = quyChungService.getTongSoDuTatCaQuy();
            return ResponseEntity.ok(tong);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}