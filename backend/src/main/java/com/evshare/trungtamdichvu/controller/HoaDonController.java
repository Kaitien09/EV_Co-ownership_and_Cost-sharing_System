package com.evshare.trungtamdichvu.controller;

import com.evshare.trungtamdichvu.entity.HoaDon;
import com.evshare.trungtamdichvu.service.HoaDonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/hoa-don")
@RequiredArgsConstructor
public class HoaDonController {

    private final HoaDonService hoaDonService;

    @GetMapping
    public List<HoaDon> getAllHoaDon() {
        return hoaDonService.getAllHoaDon();
    }

    @GetMapping("/{id}")
    public ResponseEntity<HoaDon> getHoaDonById(@PathVariable Integer id) {
        Optional<HoaDon> hoaDon = hoaDonService.getHoaDonById(id);
        return hoaDon.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/ma/{maHoaDon}")
    public ResponseEntity<HoaDon> getHoaDonByMa(@PathVariable String maHoaDon) {
        Optional<HoaDon> hoaDon = hoaDonService.getHoaDonByMa(maHoaDon);
        return hoaDon.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/phieu-dich-vu/{phieuId}")
    public ResponseEntity<HoaDon> getHoaDonByPhieuDichVu(@PathVariable Integer phieuId) {
        Optional<HoaDon> hoaDon = hoaDonService.getHoaDonByPhieuDichVu(phieuId);
        return hoaDon.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/trang-thai/{trangThai}")
    public List<HoaDon> getHoaDonByTrangThai(@PathVariable String trangThai) {
        return hoaDonService.getHoaDonByTrangThai(trangThai);
    }

    @GetMapping("/chu-xe/{chuXeId}")
    public List<HoaDon> getHoaDonByChuXe(@PathVariable Integer chuXeId) {
        return hoaDonService.getHoaDonByChuXe(chuXeId);
    }

    @PostMapping
    public ResponseEntity<HoaDon> createHoaDon(@RequestBody HoaDon hoaDon) {
        try {
            HoaDon saved = hoaDonService.createHoaDon(hoaDon);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<HoaDon> updateHoaDon(@PathVariable Integer id, @RequestBody HoaDon hoaDonDetails) {
        try {
            HoaDon updated = hoaDonService.updateHoaDon(id, hoaDonDetails);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/thanh-toan")
    public ResponseEntity<HoaDon> thanhToanHoaDon(@PathVariable Integer id, @RequestParam String phuongThuc) {
        try {
            HoaDon updated = hoaDonService.thanhToanHoaDon(id, phuongThuc);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHoaDon(@PathVariable Integer id) {
        try {
            hoaDonService.deleteHoaDon(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/doanh-thu")
    public ResponseEntity<Double> getDoanhThuTheoThang(
            @RequestParam LocalDateTime start,
            @RequestParam LocalDateTime end) {
        try {
            Double doanhThu = hoaDonService.getDoanhThuTheoThang(start, end);
            return ResponseEntity.ok(doanhThu);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/thong-ke/trang-thai")
    public ResponseEntity<List<Object[]>> getThongKeHoaDonTheoTrangThai(
            @RequestParam LocalDateTime start,
            @RequestParam LocalDateTime end) {
        try {
            List<Object[]> thongKe = hoaDonService.getThongKeHoaDonTheoTrangThai(start, end);
            return ResponseEntity.ok(thongKe);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}