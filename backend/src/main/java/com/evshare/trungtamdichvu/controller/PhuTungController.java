package com.evshare.trungtamdichvu.controller;

import com.evshare.trungtamdichvu.entity.PhuTung;
import com.evshare.trungtamdichvu.service.PhuTungService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/trung-tam-dich-vu/phu-tung")
@RequiredArgsConstructor
public class PhuTungController {

    private final PhuTungService phuTungService;

    @GetMapping
    public ResponseEntity<List<PhuTung>> getAllPhuTung() {
        return ResponseEntity.ok(phuTungService.getAllPhuTung());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PhuTung> getPhuTungById(@PathVariable Long id) {
        return ResponseEntity.ok(phuTungService.getPhuTungById(id));
    }

    @PostMapping
    public ResponseEntity<PhuTung> createPhuTung(@RequestBody PhuTung phuTung) {
        return ResponseEntity.ok(phuTungService.createPhuTung(phuTung));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PhuTung> updatePhuTung(@PathVariable Long id, @RequestBody PhuTung phuTung) {
        return ResponseEntity.ok(phuTungService.updatePhuTung(id, phuTung));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePhuTung(@PathVariable Long id) {
        phuTungService.deletePhuTung(id);
        return ResponseEntity.ok().build();
    }
}