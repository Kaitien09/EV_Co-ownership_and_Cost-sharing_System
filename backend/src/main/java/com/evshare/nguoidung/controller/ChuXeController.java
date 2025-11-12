package com.evshare.nguoidung.controller;

import com.evshare.nguoidung.dto.ChuXeDTO;
import com.evshare.nguoidung.dto.TaoChuXeRequest;
import com.evshare.nguoidung.service.ChuXeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chu-xe")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ChuXeController {
    
    private final ChuXeService chuXeService;
    
    @PostMapping
    @PreAuthorize("hasAnyRole('CoOwner', 'Admin')")
    public ResponseEntity<ChuXeDTO> taoChuXe(@Valid @RequestBody TaoChuXeRequest request) {
        try {
            ChuXeDTO dto = chuXeService.taoChuXe(request);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('CoOwner', 'Admin')")
    public ResponseEntity<ChuXeDTO> getChuXe(@PathVariable Integer id) {
        try {
            ChuXeDTO dto = chuXeService.getChuXeById(id);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/nguoi-dung/{nguoiDungId}")
    @PreAuthorize("hasAnyRole('CoOwner', 'Admin')")
    public ResponseEntity<ChuXeDTO> getChuXeByNguoiDung(@PathVariable Integer nguoiDungId) {
        try {
            ChuXeDTO dto = chuXeService.getChuXeByNguoiDungId(nguoiDungId);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<List<ChuXeDTO>> getAllChuXe() {
        try {
            List<ChuXeDTO> dtos = chuXeService.getAllChuXe();
            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('CoOwner', 'Admin')")
    public ResponseEntity<ChuXeDTO> capNhatChuXe(
            @PathVariable Integer id,
            @Valid @RequestBody TaoChuXeRequest request) {
        try {
            ChuXeDTO dto = chuXeService.capNhatChuXe(id, request);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
