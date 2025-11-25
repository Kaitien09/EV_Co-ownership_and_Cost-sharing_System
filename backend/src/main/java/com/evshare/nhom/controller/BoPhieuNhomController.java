package com.evshare.nhom.controller;

import com.evshare.nhom.entity.BoPhieuNhom;
import com.evshare.nhom.service.BoPhieuNhomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bo-phieu")
@RequiredArgsConstructor
public class BoPhieuNhomController {

    private final BoPhieuNhomService boPhieuService;

    @GetMapping("/nhom/{nhomId}")
    public List<BoPhieuNhom> getBoPhieuByNhom(@PathVariable Integer nhomId) {
        return boPhieuService.getBoPhieuByNhom(nhomId);
    }

    @PostMapping
    public BoPhieuNhom createBoPhieu(@RequestBody BoPhieuNhom boPhieu) {
        return boPhieuService.createBoPhieu(boPhieu);
    }

    @PostMapping("/{id}/ket-thuc")
    public ResponseEntity<BoPhieuNhom> ketThucBoPhieu(@PathVariable Integer id) {
        try {
            BoPhieuNhom updated = boPhieuService.ketThucBoPhieu(id);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBoPhieu(@PathVariable Integer id) {
        try {
            boPhieuService.deleteBoPhieu(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}