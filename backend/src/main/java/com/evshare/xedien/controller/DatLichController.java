package com.evshare.xedien.controller;

import com.evshare.xedien.entity.DatLich;
import com.evshare.xedien.entity.TrangThaiDatLich;
import com.evshare.xedien.service.DatLichService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/dat-lich")
@RequiredArgsConstructor
public class DatLichController {

    private final DatLichService datLichService;

    @GetMapping
    public List<DatLich> getAllDatLich() {
        return datLichService.getAllDatLich();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DatLich> getDatLichById(@PathVariable Integer id) {
        Optional<DatLich> datLich = datLichService.getDatLichById(id);
        return datLich.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/chu-xe/{chuXeId}")
    public List<DatLich> getDatLichByChuXe(@PathVariable Integer chuXeId) {
        return datLichService.getDatLichByChuXe(chuXeId);
    }

    @GetMapping("/xe/{xeId}")
    public List<DatLich> getDatLichByXe(@PathVariable Integer xeId) {
        return datLichService.getDatLichByXe(xeId);
    }

    @GetMapping("/trang-thai/{trangThai}")
    public List<DatLich> getDatLichByTrangThai(@PathVariable TrangThaiDatLich trangThai) {
        return datLichService.getDatLichByTrangThai(trangThai);
    }

    @GetMapping("/chu-xe/{chuXeId}/sap-toi")
    public List<DatLich> getDatLichSapToiByChuXe(@PathVariable Integer chuXeId) {
        return datLichService.getDatLichSapToiByChuXe(chuXeId);
    }

    @PostMapping
    public ResponseEntity<DatLich> createDatLich(@RequestBody DatLich datLich) {
        try {
            DatLich saved = datLichService.createDatLich(datLich);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}/trang-thai")
    public ResponseEntity<DatLich> updateTrangThaiDatLich(
            @PathVariable Integer id,
            @RequestParam TrangThaiDatLich trangThai) {
        try {
            DatLich updated = datLichService.updateTrangThaiDatLich(id, trangThai);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/huy")
    public ResponseEntity<DatLich> huyDatLich(@PathVariable Integer id) {
        try {
            DatLich updated = datLichService.huyDatLich(id);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDatLich(@PathVariable Integer id) {
        try {
            datLichService.deleteDatLich(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/thong-ke")
    public ResponseEntity<List<Object[]>> getThongKeDatLich() {
        try {
            List<Object[]> thongKe = datLichService.getThongKeDatLich();
            return ResponseEntity.ok(thongKe);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/kiem-tra-trung-lich")
    public ResponseEntity<Boolean> kiemTraTrungLich(
            @RequestParam Integer xeId,
            @RequestParam java.time.LocalDateTime start,
            @RequestParam java.time.LocalDateTime end) {
        try {
            boolean trungLich = datLichService.kiemTraTrungLich(xeId, start, end);
            return ResponseEntity.ok(trungLich);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}