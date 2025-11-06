package com.evshare.controller;

import com.evshare.service.BaoCaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;

@RestController
@RequestMapping("/bao-cao")
@RequiredArgsConstructor
public class BaoCaoController {

    private final BaoCaoService baoCaoService;

    @GetMapping("/nhom/{nhomId}")
    public ResponseEntity<BaoCaoService.BaoCaoTaiChinhNhom> layBaoCaoTaiChinhNhom(
            @PathVariable Integer nhomId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate tuNgay,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate denNgay
    ) {
        return ResponseEntity.ok(
                baoCaoService.taoBaoCaoTaiChinhNhom(nhomId, tuNgay, denNgay)
        );
    }

    @GetMapping("/ca-nhan/{chuXeId}")
    public ResponseEntity<BaoCaoService.BaoCaoCaNhan> layBaoCaoCaNhan(
            @PathVariable Integer chuXeId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate tuNgay,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate denNgay
    ) {
        return ResponseEntity.ok(
                baoCaoService.taoBaoCaoCaNhan(chuXeId, tuNgay, denNgay)
        );
    }
}