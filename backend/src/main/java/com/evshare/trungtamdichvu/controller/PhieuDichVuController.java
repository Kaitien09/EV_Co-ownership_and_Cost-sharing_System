package com.evshare.trungtamdichvu.controller;

import com.evshare.trungtamdichvu.entity.PhieuDichVu;
import com.evshare.trungtamdichvu.entity.TrangThaiPhieuDichVu;
import com.evshare.trungtamdichvu.service.PhieuDichVuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/phieu-dich-vu")
@RequiredArgsConstructor
public class PhieuDichVuController {

    private final PhieuDichVuService phieuDichVuService;

    @GetMapping
    public List<PhieuDichVu> getAllPhieuDichVu() {
        return phieuDichVuService.getAllPhieuDichVu();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PhieuDichVu> getPhieuDichVuById(@PathVariable Integer id) {
        Optional<PhieuDichVu> phieuDichVu = phieuDichVuService.getPhieuDichVuById(id);
        return phieuDichVu.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/lich-hen/{lichHenId}")
    public ResponseEntity<PhieuDichVu> getPhieuDichVuByLichHen(@PathVariable Integer lichHenId) {
        Optional<PhieuDichVu> phieuDichVu = phieuDichVuService.getPhieuDichVuByLichHen(lichHenId);
        return phieuDichVu.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/ky-thuat-vien/{kyThuatVienId}")
    public List<PhieuDichVu> getPhieuDichVuByKyThuatVien(@PathVariable Integer kyThuatVienId) {
        return phieuDichVuService.getPhieuDichVuByKyThuatVien(kyThuatVienId);
    }

    @GetMapping("/trang-thai/{trangThai}")
    public List<PhieuDichVu> getPhieuDichVuByTrangThai(@PathVariable TrangThaiPhieuDichVu trangThai) {
        return phieuDichVuService.getPhieuDichVuByTrangThai(trangThai);
    }

    @GetMapping("/xe/{xeId}")
    public List<PhieuDichVu> getPhieuDichVuByXe(@PathVariable Integer xeId) {
        return phieuDichVuService.getPhieuDichVuByXe(xeId);
    }

    @GetMapping("/chu-xe/{chuXeId}")
    public List<PhieuDichVu> getPhieuDichVuByChuXe(@PathVariable Integer chuXeId) {
        return phieuDichVuService.getPhieuDichVuByChuXe(chuXeId);
    }

    @PostMapping
    public ResponseEntity<PhieuDichVu> createPhieuDichVu(@RequestBody PhieuDichVu phieuDichVu) {
        try {
            PhieuDichVu saved = phieuDichVuService.createPhieuDichVu(phieuDichVu);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<PhieuDichVu> updatePhieuDichVu(@PathVariable Integer id, @RequestBody PhieuDichVu phieuDichVuDetails) {
        try {
            PhieuDichVu updated = phieuDichVuService.updatePhieuDichVu(id, phieuDichVuDetails);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/phan-cong")
    public ResponseEntity<PhieuDichVu> phanCongKyThuatVien(
            @PathVariable Integer id,
            @RequestParam Integer kyThuatVienId) {
        try {
            PhieuDichVu updated = phieuDichVuService.phanCongKyThuatVien(id, kyThuatVienId);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}/hoan-thanh")
    public ResponseEntity<PhieuDichVu> hoanThanhPhieuDichVu(@PathVariable Integer id) {
        try {
            PhieuDichVu updated = phieuDichVuService.hoanThanhPhieuDichVu(id);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePhieuDichVu(@PathVariable Integer id) {
        try {
            phieuDichVuService.deletePhieuDichVu(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/chua-phan-cong")
    public List<PhieuDichVu> getPhieuDichVuChuaPhanCong() {
        return phieuDichVuService.getPhieuDichVuChuaPhanCong();
    }

    @GetMapping("/thong-ke/trang-thai")
    public ResponseEntity<List<Object[]>> getThongKePhieuDichVuTheoTrangThai() {
        try {
            List<Object[]> thongKe = phieuDichVuService.getThongKePhieuDichVuTheoTrangThai();
            return ResponseEntity.ok(thongKe);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}