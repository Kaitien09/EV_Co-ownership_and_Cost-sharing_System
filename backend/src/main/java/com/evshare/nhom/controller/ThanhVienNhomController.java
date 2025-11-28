package com.evshare.nhom.controller;

import com.evshare.nhom.entity.ThanhVienNhom;
import com.evshare.nhom.entity.VaiTro;
import com.evshare.nhom.service.ThanhVienNhomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/thanh-vien")
@RequiredArgsConstructor
public class ThanhVienNhomController {

    private final ThanhVienNhomService thanhVienService;

    @GetMapping("/nhom/{nhomId}")
    public List<ThanhVienNhom> getThanhVienByNhom(@PathVariable Integer nhomId) {
        return thanhVienService.getThanhVienByNhom(nhomId);
    }

    @PostMapping
    public ResponseEntity<ThanhVienNhom> addThanhVien(@RequestBody ThanhVienNhom thanhVien) {
        try {
            ThanhVienNhom saved = thanhVienService.addThanhVien(thanhVien);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}/vai-tro")
    public ResponseEntity<ThanhVienNhom> updateVaiTro(@PathVariable Integer id, @RequestParam VaiTro vaiTro) {
        try {
            ThanhVienNhom updated = thanhVienService.updateVaiTro(id, vaiTro);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeThanhVien(@PathVariable Integer id) {
        try {
            thanhVienService.removeThanhVien(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{thanhVienId}/ty-le-so-huu")
    public ResponseEntity<ThanhVienNhom> updateTyLeSoHuu(
            @PathVariable Integer thanhVienId,
            @RequestParam Double tyLeSoHuu) {
        try {
            ThanhVienNhom updated = thanhVienService.updateTyLeSoHuu(thanhVienId, tyLeSoHuu);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}