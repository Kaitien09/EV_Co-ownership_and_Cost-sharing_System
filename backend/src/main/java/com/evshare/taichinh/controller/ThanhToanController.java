package com.evshare.controller;

import com.evshare.entity.ThanhToan;
import com.evshare.service.ThanhToanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/thanh-toan")
@RequiredArgsConstructor
public class ThanhToanController {

    private final ThanhToanService thanhToanService;

    @PostMapping
    public ResponseEntity<ThanhToan> taoThanhToan(@RequestBody ThanhToan thanhToan) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(thanhToanService.taoThanhToan(thanhToan));
    }

    @PutMapping("/{id}/xac-nhan")
    public ResponseEntity<ThanhToan> xacNhanThanhToan(@PathVariable Integer id) {
        return ResponseEntity.ok(thanhToanService.xacNhanThanhToan(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> huyThanhToan(@PathVariable Integer id) {
        thanhToanService.huyThanhToan(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ThanhToan> layThanhToan(@PathVariable Integer id) {
        return ResponseEntity.ok(thanhToanService.layThanhToanTheoId(id));
    }

    @GetMapping("/chu-xe/{chuXeId}")
    public ResponseEntity<List<ThanhToan>> layDanhSachThanhToanTheoChuXe(
            @PathVariable Integer chuXeId
    ) {
        return ResponseEntity.ok(
                thanhToanService.layDanhSachThanhToanTheoChuXe(chuXeId)
        );
    }

    @GetMapping("/chu-xe/{chuXeId}/chua-thanh-toan")
    public ResponseEntity<List<ThanhToan>> layDanhSachChuaThanhToan(
            @PathVariable Integer chuXeId
    ) {
        return ResponseEntity.ok(
                thanhToanService.layDanhSachChuaThanhToan(chuXeId)
        );
    }

    @GetMapping("/chu-xe/{chuXeId}/da-thanh-toan")
    public ResponseEntity<List<ThanhToan>> layDanhSachDaThanhToan(
            @PathVariable Integer chuXeId
    ) {
        return ResponseEntity.ok(
                thanhToanService.layDanhSachDaThanhToan(chuXeId)
        );
    }

    @GetMapping("/chu-xe/{chuXeId}/tong-da-thanh-toan")
    public ResponseEntity<BigDecimal> tinhTongTienDaThanhToan(
            @PathVariable Integer chuXeId
    ) {
        return ResponseEntity.ok(
                thanhToanService.tinhTongTienDaThanhToan(chuXeId)
        );
    }

    @GetMapping("/chu-xe/{chuXeId}/tong-chua-thanh-toan")
    public ResponseEntity<BigDecimal> tinhTongTienChuaThanhToan(
            @PathVariable Integer chuXeId
    ) {
        return ResponseEntity.ok(
                thanhToanService.tinhTongTienChuaThanhToan(chuXeId)
        );
    }
}