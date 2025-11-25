package com.evshare.nhom.controller;

import com.evshare.nhom.entity.PhieuBau;
import com.evshare.nhom.service.PhieuBauService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/phieu-bau")
@RequiredArgsConstructor
public class PhieuBauController {

    private final PhieuBauService phieuBauService;

    @GetMapping("/bo-phieu/{boPhieuId}")
    public List<PhieuBau> getPhieuBauByBoPhieu(@PathVariable Integer boPhieuId) {
        return phieuBauService.getPhieuBauByBoPhieu(boPhieuId);
    }

    @PostMapping
    public ResponseEntity<PhieuBau> bauPhieu(@RequestBody PhieuBau phieuBau) {
        try {
            PhieuBau saved = phieuBauService.bauPhieu(phieuBau);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePhieuBau(@PathVariable Integer id) {
        try {
            phieuBauService.deletePhieuBau(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}