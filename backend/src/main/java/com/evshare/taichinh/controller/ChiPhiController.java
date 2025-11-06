package com.evshare.controller;

import com.evshare.entity.ChiPhi;
import com.evshare.entity.ChiaChiPhi;
import com.evshare.service.ChiPhiService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/chi-phi")
@RequiredArgsConstructor
public class ChiPhiController {

    private final ChiPhiService chiPhiService;

    @PostMapping
    public ResponseEntity<ChiPhi> taoChiPhi(@RequestBody ChiPhi chiPhi) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(chiPhiService.taoChiPhi(chiPhi));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ChiPhi> capNhatChiPhi(
            @PathVariable Integer id,
            @RequestBody ChiPhi chiPhi
    ) {
        return ResponseEntity.ok(chiPhiService.capNhatChiPhi(id, chiPhi));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> xoaChiPhi(@PathVariable Integer id) {
        chiPhiService.xoaChiPhi(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChiPhi> layChiPhi(@PathVariable Integer id) {
        return ResponseEntity.ok(chiPhiService.layChiPhiTheoId(id));
    }

    @GetMapping("/nhom/{nhomId}")
    public ResponseEntity<List<ChiPhi>> layDanhSachChiPhiTheoNhom(
            @PathVariable Integer nhomId
    ) {
        return ResponseEntity.ok(chiPhiService.layDanhSachChiPhiTheoNhom(nhomId));
    }

    @GetMapping("/nhom/{nhomId}/khoang-thoi-gian")
    public ResponseEntity<List<ChiPhi>> layChiPhiTheoKhoangThoiGian(
            @PathVariable Integer nhomId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate tuNgay,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate denNgay
    ) {
        return ResponseEntity.ok(
                chiPhiService.layChiPhiTheoKhoangThoiGian(nhomId, tuNgay, denNgay)
        );
    }

    @GetMapping("/nhom/{nhomId}/tong")
    public ResponseEntity<BigDecimal> tinhTongChiPhi(@PathVariable Integer nhomId) {
        return ResponseEntity.ok(chiPhiService.tinhTongChiPhi(nhomId));
    }

    @PostMapping("/{id}/chia-deu")
    public ResponseEntity<List<ChiaChiPhi>> chiaChiPhiDeuNhau(
            @PathVariable Integer id,
            @RequestBody List<Integer> danhSachChuXeId
    ) {
        return ResponseEntity.ok(
                chiPhiService.chiaChiPhiDeuNhau(id, danhSachChuXeId)
        );
    }

    @PostMapping("/{id}/chia-theo-ti-le")
    public ResponseEntity<List<ChiaChiPhi>> chiaChiPhiTheoTiLe(
            @PathVariable Integer id,
            @RequestBody List<ChiPhiService.ChiaChiPhiRequest> danhSachChia
    ) {
        return ResponseEntity.ok(
                chiPhiService.chiaChiPhiTheoTiLe(id, danhSachChia)
        );
    }
}