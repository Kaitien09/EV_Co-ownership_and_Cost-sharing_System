package com.evshare.trungtamdichvu.controller;

import com.evshare.trungtamdichvu.entity.LichHenDichVu;
import com.evshare.trungtamdichvu.entity.LoaiDichVu;
import com.evshare.trungtamdichvu.entity.TrangThaiLichHen;
import com.evshare.trungtamdichvu.service.LichHenDichVuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/lich-hen-dich-vu")
@RequiredArgsConstructor
public class LichHenDichVuController {

    private final LichHenDichVuService lichHenService;

    @GetMapping
    public List<LichHenDichVu> getAllLichHen() {
        return lichHenService.getAllLichHen();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LichHenDichVu> getLichHenById(@PathVariable Integer id) {
        Optional<LichHenDichVu> lichHen = lichHenService.getLichHenById(id);
        return lichHen.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/chu-xe/{chuXeId}")
    public List<LichHenDichVu> getLichHenByChuXe(@PathVariable Integer chuXeId) {
        return lichHenService.getLichHenByChuXe(chuXeId);
    }

    @GetMapping("/xe/{xeId}")
    public List<LichHenDichVu> getLichHenByXe(@PathVariable Integer xeId) {
        return lichHenService.getLichHenByXe(xeId);
    }

    @GetMapping("/trung-tam/{trungTamId}")
    public List<LichHenDichVu> getLichHenByTrungTam(@PathVariable Integer trungTamId) {
        return lichHenService.getLichHenByTrungTam(trungTamId);
    }

    @GetMapping("/trang-thai/{trangThai}")
    public List<LichHenDichVu> getLichHenByTrangThai(@PathVariable TrangThaiLichHen trangThai) {
        return lichHenService.getLichHenByTrangThai(trangThai);
    }

    @GetMapping("/loai-dich-vu/{loaiDichVu}")
    public List<LichHenDichVu> getLichHenByLoaiDichVu(@PathVariable LoaiDichVu loaiDichVu) {
        return lichHenService.getLichHenByLoaiDichVu(loaiDichVu);
    }

    @PostMapping
    public ResponseEntity<LichHenDichVu> createLichHen(@RequestBody LichHenDichVu lichHen) {
        try {
            LichHenDichVu saved = lichHenService.createLichHen(lichHen);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}/trang-thai")
    public ResponseEntity<LichHenDichVu> updateTrangThaiLichHen(
            @PathVariable Integer id,
            @RequestParam TrangThaiLichHen trangThai) {
        try {
            LichHenDichVu updated = lichHenService.updateTrangThaiLichHen(id, trangThai);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/huy")
    public ResponseEntity<LichHenDichVu> huyLichHen(@PathVariable Integer id) {
        try {
            LichHenDichVu updated = lichHenService.huyLichHen(id);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLichHen(@PathVariable Integer id) {
        try {
            lichHenService.deleteLichHen(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/trung-tam/{trungTamId}/thoi-gian")
    public List<LichHenDichVu> getLichHenByTrungTamAndKhoangThoiGian(
            @PathVariable Integer trungTamId,
            @RequestParam LocalDateTime start,
            @RequestParam LocalDateTime end) {
        return lichHenService.getLichHenByTrungTamAndKhoangThoiGian(trungTamId, start, end);
    }

    @GetMapping("/thong-ke/trang-thai")
    public ResponseEntity<List<Object[]>> getThongKeLichHenTheoTrangThai() {
        try {
            List<Object[]> thongKe = lichHenService.getThongKeLichHenTheoTrangThai();
            return ResponseEntity.ok(thongKe);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}