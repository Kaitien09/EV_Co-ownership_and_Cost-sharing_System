package com.evshare.controller;

import com.evshare.entity.LichSuQuy;
import com.evshare.entity.QuyChung;
import com.evshare.service.QuyChungService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/quy-chung")
@RequiredArgsConstructor
public class QuyChungController {

    private final QuyChungService quyChungService;

    @PostMapping("/nhom/{nhomId}")
    public ResponseEntity<QuyChung> taoQuyChung(@PathVariable Integer nhomId) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(quyChungService.taoQuyChung(nhomId));
    }

    @PostMapping("/nhom/{nhomId}/nop-tien")
    public ResponseEntity<QuyChung> nopTienVaoQuy(
            @PathVariable Integer nhomId,
            @RequestBody NopTienRequest request
    ) {
        return ResponseEntity.ok(
                quyChungService.nopTienVaoQuy(nhomId, request.getSoTien(), request.getMoTa())
        );
    }

    @PostMapping("/nhom/{nhomId}/chi-tien")
    public ResponseEntity<QuyChung> chiTienTuQuy(
            @PathVariable Integer nhomId,
            @RequestBody ChiTienRequest request
    ) {
        return ResponseEntity.ok(
                quyChungService.chiTienTuQuy(nhomId, request.getSoTien(), request.getMoTa())
        );
    }

    @GetMapping("/nhom/{nhomId}")
    public ResponseEntity<QuyChung> layQuyChungTheoNhom(@PathVariable Integer nhomId) {
        return ResponseEntity.ok(quyChungService.layQuyChungTheoNhom(nhomId));
    }

    @GetMapping("/nhom/{nhomId}/lich-su")
    public ResponseEntity<List<LichSuQuy>> layLichSuQuy(@PathVariable Integer nhomId) {
        return ResponseEntity.ok(quyChungService.layLichSuQuy(nhomId));
    }

    @GetMapping("/nhom/{nhomId}/lich-su/khoang-thoi-gian")
    public ResponseEntity<List<LichSuQuy>> layLichSuQuyTheoKhoangThoiGian(
            @PathVariable Integer nhomId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime tuNgay,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime denNgay
    ) {
        return ResponseEntity.ok(
                quyChungService.layLichSuQuyTheoKhoangThoiGian(nhomId, tuNgay, denNgay)
        );
    }

    @GetMapping("/nhom/{nhomId}/tong-thu")
    public ResponseEntity<BigDecimal> tinhTongThu(@PathVariable Integer nhomId) {
        return ResponseEntity.ok(quyChungService.tinhTongThu(nhomId));
    }

    @GetMapping("/nhom/{nhomId}/tong-chi")
    public ResponseEntity<BigDecimal> tinhTongChi(@PathVariable Integer nhomId) {
        return ResponseEntity.ok(quyChungService.tinhTongChi(nhomId));
    }

    @Data
    public static class NopTienRequest {
        private BigDecimal soTien;
        private String moTa;
    }

    @Data
    public static class ChiTienRequest {
        private BigDecimal soTien;
        private String moTa;
    }
}