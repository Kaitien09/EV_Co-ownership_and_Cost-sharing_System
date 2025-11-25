package com.evshare.nguoidung.controller;

import com.evshare.nguoidung.entity.NguoiDung;
import com.evshare.nguoidung.entity.LoaiNguoiDung;
import com.evshare.nguoidung.entity.TrangThaiNguoiDung;
import com.evshare.nguoidung.service.NguoiDungService;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.Setter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/nguoi-dung")
@RequiredArgsConstructor
public class NguoiDungController {
    private final NguoiDungService nguoiDungService;

    @GetMapping
    public List<NguoiDung> getAllNguoiDung() {
        return nguoiDungService.getAllNguoiDung();
    }

    @GetMapping("/{id}")
    public ResponseEntity<NguoiDung> getNguoiDungById(@PathVariable Integer id) {
        Optional<NguoiDung> nguoiDung = nguoiDungService.getNguoiDungById(id);
        return nguoiDung.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<NguoiDung> updateNguoiDung(@PathVariable Integer id, @Valid @RequestBody NguoiDung nguoiDung) {
        try {
            NguoiDung updated = nguoiDungService.updateNguoiDung(id, nguoiDung);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNguoiDung(@PathVariable Integer id) {
        try {
            nguoiDungService.deleteNguoiDung(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/loai/{loaiNguoiDung}")
    public List<NguoiDung> getNguoiDungByLoai(@PathVariable LoaiNguoiDung loaiNguoiDung) {
        return nguoiDungService.getNguoiDungByLoai(loaiNguoiDung);
    }

    @GetMapping("/trang-thai/{trangThai}")
    public List<NguoiDung> getNguoiDungByTrangThai(@PathVariable TrangThaiNguoiDung trangThai) {
        return nguoiDungService.getNguoiDungByTrangThai(trangThai);
    }

    @PatchMapping("/{id}/trang-thai")
    public ResponseEntity<NguoiDung> changeStatus(@PathVariable Integer id, @Valid @RequestBody TrangThaiRequest request) {
        try {
            NguoiDung updated = nguoiDungService.changeStatus(id, request.getTrangThai());
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public List<NguoiDung> searchNguoiDung(@RequestParam String keyword) {
        return nguoiDungService.searchNguoiDung(keyword);
    }

    @GetMapping("/ten-dang-nhap/{tenDangNhap}")
    public ResponseEntity<NguoiDung> getNguoiDungByTenDangNhap(@PathVariable String tenDangNhap) {
        Optional<NguoiDung> nguoiDung = nguoiDungService.getNguoiDungByTenDangNhap(tenDangNhap);
        return nguoiDung.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Getter
    @Setter
    public static class TrangThaiRequest {
        private TrangThaiNguoiDung trangThai;
    }
}