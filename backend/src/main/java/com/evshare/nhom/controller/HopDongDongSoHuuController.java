package com.evshare.nhom.controller;

import com.evshare.nhom.entity.HopDongDongSoHuu;
import com.evshare.nhom.service.HopDongDongSoHuuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/hop-dong")
@RequiredArgsConstructor
public class HopDongDongSoHuuController {

    private final HopDongDongSoHuuService hopDongService;

    @GetMapping("/nhom/{nhomId}")
    public List<HopDongDongSoHuu> getHopDongByNhom(@PathVariable Integer nhomId) {
        return hopDongService.getHopDongByNhom(nhomId);
    }

    @PostMapping
    public HopDongDongSoHuu createHopDong(@RequestBody HopDongDongSoHuu hopDong) {
        return hopDongService.createHopDong(hopDong);
    }

    @PostMapping("/{id}/ket-thuc")
    public ResponseEntity<HopDongDongSoHuu> ketThucHopDong(@PathVariable Integer id) {
        try {
            HopDongDongSoHuu updated = hopDongService.ketThucHopDong(id);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHopDong(@PathVariable Integer id) {
        try {
            hopDongService.deleteHopDong(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}