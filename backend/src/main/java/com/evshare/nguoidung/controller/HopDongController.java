package com.evshare.nguoidung.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.evshare.nguoidung.dto.HopDongDTO;
import com.evshare.nguoidung.dto.TaoHopDongRequest;
import com.evshare.nguoidung.service.HopDongService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/hop-dong")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class HopDongController {
    
    private final HopDongService hopDongService;
    
    @PostMapping
    @PreAuthorize("hasAnyRole('CoOwner', 'Admin')")
    public ResponseEntity<?> taoHopDong(@Valid @RequestBody TaoHopDongRequest request) {
        try {
            HopDongDTO dto = hopDongService.taoHopDong(request);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            e.printStackTrace(); // Log to console
            return ResponseEntity.badRequest().body(
                java.util.Map.of("error", e.getMessage(), "details", e.getClass().getSimpleName())
            );
        }
    }
    
    @GetMapping("/chu-xe/{chuXeId}")
    @PreAuthorize("hasAnyRole('CoOwner', 'Admin')")
    public ResponseEntity<List<HopDongDTO>> getDanhSachHopDongChuXe(@PathVariable Integer chuXeId) {
        try {
            List<HopDongDTO> dtos = hopDongService.getDanhSachHopDongChuXe(chuXeId);
            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/xe/{xeId}")
    @PreAuthorize("hasAnyRole('CoOwner', 'Admin')")
    public ResponseEntity<List<HopDongDTO>> getDanhSachHopDongXe(@PathVariable Integer xeId) {
        try {
            List<HopDongDTO> dtos = hopDongService.getDanhSachHopDongXe(xeId);
            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('CoOwner', 'Admin')")
    public ResponseEntity<HopDongDTO> getChiTietHopDong(@PathVariable Integer id) {
        try {
            HopDongDTO dto = hopDongService.getChiTietHopDong(id);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // ===== WORKFLOW ENDPOINTS =====
    
    @GetMapping("/cho-duyet")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<List<HopDongDTO>> getDanhSachChoDuyet() {
        try {
            List<HopDongDTO> dtos = hopDongService.getDanhSachChoDuyet();
            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/{id}/duyet")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<HopDongDTO> duyetHopDong(
            @PathVariable Integer id,
            @RequestParam Integer nguoiDuyetId,
            @RequestParam boolean approve,
            @RequestParam(required = false) String lyDo) {
        try {
            HopDongDTO dto = hopDongService.duyetHopDong(id, nguoiDuyetId, approve, lyDo);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/{id}/kich-hoat")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<HopDongDTO> kichHoatHopDong(@PathVariable Integer id) {
        try {
            HopDongDTO dto = hopDongService.kichHoatHopDong(id);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/{id}/ket-thuc")
    @PreAuthorize("hasAnyRole('Admin', 'CoOwner')")
    public ResponseEntity<HopDongDTO> ketThucHopDong(@PathVariable Integer id) {
        try {
            HopDongDTO dto = hopDongService.ketThucHopDong(id);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
