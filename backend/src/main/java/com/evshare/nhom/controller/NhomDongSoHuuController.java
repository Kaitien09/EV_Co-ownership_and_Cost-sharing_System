package com.evshare.nhom.controller;

import com.evshare.nhom.entity.NhomDongSoHuu;
import com.evshare.nhom.service.NhomDongSoHuuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/nhom")
@RequiredArgsConstructor
public class NhomDongSoHuuController {

    private final NhomDongSoHuuService nhomService;

    @GetMapping
    public List<NhomDongSoHuu> getAllNhom() {
        return nhomService.getAllNhom();
    }

    @GetMapping("/{id}")
    public ResponseEntity<NhomDongSoHuu> getNhomById(@PathVariable Integer id) {
        Optional<NhomDongSoHuu> nhom = nhomService.getNhomById(id);
        return nhom.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public NhomDongSoHuu createNhom(@RequestBody NhomDongSoHuu nhom) {
        return nhomService.createNhom(nhom);
    }

    @PutMapping("/{id}")
    public ResponseEntity<NhomDongSoHuu> updateNhom(@PathVariable Integer id, @RequestBody NhomDongSoHuu nhomDetails) {
        try {
            NhomDongSoHuu updated = nhomService.updateNhom(id, nhomDetails);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNhom(@PathVariable Integer id) {
        try {
            nhomService.deleteNhom(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}