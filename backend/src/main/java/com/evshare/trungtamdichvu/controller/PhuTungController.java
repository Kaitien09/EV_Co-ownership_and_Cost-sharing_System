package com.evshare.trungtamdichvu.controller;

import com.evshare.trungtamdichvu.entity.PhuTung;
import com.evshare.trungtamdichvu.service.PhuTungService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/phu-tung")
@RequiredArgsConstructor
public class PhuTungController {

    private final PhuTungService phuTungService;

    @GetMapping
    public List<PhuTung> getAllPhuTung() {
        return phuTungService.getAllPhuTung();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PhuTung> getPhuTungById(@PathVariable Integer id) {
        Optional<PhuTung> phuTung = phuTungService.getPhuTungById(id);
        return phuTung.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/ma/{maPhuTung}")
    public ResponseEntity<PhuTung> getPhuTungByMa(@PathVariable String maPhuTung) {
        Optional<PhuTung> phuTung = phuTungService.getPhuTungByMa(maPhuTung);
        return phuTung.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public List<PhuTung> searchPhuTung(@RequestParam String ten) {
        return phuTungService.searchPhuTungByTen(ten);
    }

    @GetMapping("/loai/{loaiPhuTung}")
    public List<PhuTung> getPhuTungByLoai(@PathVariable String loaiPhuTung) {
        return phuTungService.getPhuTungByLoai(loaiPhuTung);
    }

    @GetMapping("/ton-it")
    public List<PhuTung> getPhuTungTonIt() {
        return phuTungService.getPhuTungTonIt();
    }

    @PostMapping
    public ResponseEntity<PhuTung> createPhuTung(@RequestBody PhuTung phuTung) {
        try {
            PhuTung saved = phuTungService.createPhuTung(phuTung);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<PhuTung> updatePhuTung(@PathVariable Integer id, @RequestBody PhuTung phuTungDetails) {
        try {
            PhuTung updated = phuTungService.updatePhuTung(id, phuTungDetails);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/nhap")
    public ResponseEntity<PhuTung> nhapPhuTung(@PathVariable Integer id, @RequestParam Integer soLuong) {
        try {
            PhuTung updated = phuTungService.nhapPhuTung(id, soLuong);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}/xuat")
    public ResponseEntity<PhuTung> xuatPhuTung(@PathVariable Integer id, @RequestParam Integer soLuong) {
        try {
            PhuTung updated = phuTungService.xuatPhuTung(id, soLuong);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePhuTung(@PathVariable Integer id) {
        try {
            phuTungService.deletePhuTung(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/can-nhap")
    public List<PhuTung> getPhuTungCanNhap() {
        return phuTungService.getPhuTungCanNhap();
    }

    @GetMapping("/thong-ke/ton-kho")
    public ResponseEntity<List<Object[]>> getThongKeTonKhoTheoLoai() {
        try {
            List<Object[]> thongKe = phuTungService.getThongKeTonKhoTheoLoai();
            return ResponseEntity.ok(thongKe);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}