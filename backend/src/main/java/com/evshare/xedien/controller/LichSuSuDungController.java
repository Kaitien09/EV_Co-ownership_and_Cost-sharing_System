package com.evshare.xedien.controller;

import com.evshare.xedien.entity.LichSuSuDung;
import com.evshare.xedien.service.LichSuSuDungService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/lich-su-su-dung")
@RequiredArgsConstructor
public class LichSuSuDungController {

    private final LichSuSuDungService lichSuSuDungService;

    @GetMapping
    public List<LichSuSuDung> getAllLichSuSuDung() {
        return lichSuSuDungService.getAllLichSuSuDung();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LichSuSuDung> getLichSuSuDungById(@PathVariable Integer id) {
        Optional<LichSuSuDung> lichSuSuDung = lichSuSuDungService.getLichSuSuDungById(id);
        return lichSuSuDung.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/xe/{xeId}")
    public List<LichSuSuDung> getLichSuSuDungByXe(@PathVariable Integer xeId) {
        return lichSuSuDungService.getLichSuSuDungByXe(xeId);
    }

    @GetMapping("/chu-xe/{chuXeId}")
    public List<LichSuSuDung> getLichSuSuDungByChuXe(@PathVariable Integer chuXeId) {
        return lichSuSuDungService.getLichSuSuDungByChuXe(chuXeId);
    }

    @GetMapping("/dat-lich/{datLichId}")
    public ResponseEntity<LichSuSuDung> getLichSuSuDungByDatLich(@PathVariable Integer datLichId) {
        Optional<LichSuSuDung> lichSuSuDung = lichSuSuDungService.getLichSuSuDungByDatLich(datLichId);
        return lichSuSuDung.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<LichSuSuDung> createLichSuSuDung(@RequestBody LichSuSuDung lichSuSuDung) {
        try {
            LichSuSuDung saved = lichSuSuDungService.createLichSuSuDung(lichSuSuDung);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/{datLichId}/check-in")
    public ResponseEntity<LichSuSuDung> checkIn(
            @PathVariable Integer datLichId,
            @RequestParam String diemXuatPhat) {
        try {
            LichSuSuDung lichSuSuDung = lichSuSuDungService.checkIn(datLichId, diemXuatPhat);
            return ResponseEntity.ok(lichSuSuDung);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{datLichId}/check-out")
    public ResponseEntity<LichSuSuDung> checkOut(
            @PathVariable Integer datLichId,
            @RequestParam String diemDen,
            @RequestParam Integer quangDuong,
            @RequestParam Double nangLuongTieuThu) {
        try {
            LichSuSuDung lichSuSuDung = lichSuSuDungService.checkOut(datLichId, diemDen, quangDuong, nangLuongTieuThu);
            return ResponseEntity.ok(lichSuSuDung);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLichSuSuDung(@PathVariable Integer id) {
        try {
            lichSuSuDungService.deleteLichSuSuDung(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/xe/{xeId}/tong-quang-duong")
    public ResponseEntity<Integer> getTongQuangDuongByXe(@PathVariable Integer xeId) {
        try {
            Integer tong = lichSuSuDungService.getTongQuangDuongByXe(xeId);
            return ResponseEntity.ok(tong);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/chu-xe/{chuXeId}/tong-quang-duong")
    public ResponseEntity<Integer> getTongQuangDuongByChuXe(@PathVariable Integer chuXeId) {
        try {
            Integer tong = lichSuSuDungService.getTongQuangDuongByChuXe(chuXeId);
            return ResponseEntity.ok(tong);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/xe/{xeId}/thong-ke")
    public ResponseEntity<List<Object[]>> getThongKeSuDungTheoThang(
            @PathVariable Integer xeId,
            @RequestParam LocalDateTime start,
            @RequestParam LocalDateTime end) {
        try {
            List<Object[]> thongKe = lichSuSuDungService.getThongKeSuDungTheoThang(xeId, start, end);
            return ResponseEntity.ok(thongKe);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/chua-hoan-thanh")
    public List<LichSuSuDung> getLichSuSuDungChuaHoanThanh() {
        return lichSuSuDungService.getLichSuSuDungChuaHoanThanh();
    }
}