package com.evshare.nguoidung.controller;

import com.evshare.nguoidung.entity.ChuXe;
import com.evshare.nguoidung.service.ChuXeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/chu-xe")
@RequiredArgsConstructor
public class ChuXeController {
    private final ChuXeService chuXeService;

    @GetMapping
    public List<ChuXe> getAllChuXe() {
        return chuXeService.getAllChuXe();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChuXe> getChuXeById(@PathVariable Integer id) {
        Optional<ChuXe> chuXe = chuXeService.getChuXeById(id);
        return chuXe.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/nguoi-dung/{nguoiDungId}")
    public ResponseEntity<ChuXe> getChuXeByNguoiDungId(@PathVariable Integer nguoiDungId) {
        Optional<ChuXe> chuXe = chuXeService.getChuXeByNguoiDungId(nguoiDungId);
        return chuXe.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ChuXe> createChuXe(@Valid @RequestBody ChuXe chuXe) {
        try {
            ChuXe created = chuXeService.createChuXe(chuXe);
            return ResponseEntity.ok(created);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ChuXe> updateChuXe(@PathVariable Integer id, @Valid @RequestBody ChuXe chuXe) {
        try {
            ChuXe updated = chuXeService.updateChuXe(id, chuXe);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public List<ChuXe> searchChuXe(@RequestParam String keyword) {
        return chuXeService.searchChuXe(keyword);
    }

    @GetMapping("/cccd/{cccd}")
    public ResponseEntity<Boolean> checkCccdExists(@PathVariable String cccd) {
        boolean exists = chuXeService.existsByCccd(cccd);
        return ResponseEntity.ok(exists);
    }
}