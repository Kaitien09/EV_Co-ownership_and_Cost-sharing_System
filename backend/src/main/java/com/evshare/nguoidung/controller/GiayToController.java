package com.evshare.nguoidung.controller;

import com.evshare.nguoidung.dto.GiayToDTO;
import com.evshare.nguoidung.dto.UploadGiayToRequest;
import com.evshare.nguoidung.service.GiayToService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/giay-to")
@RequiredArgsConstructor
public class GiayToController {
    
    private final GiayToService giayToService;
    
    /**
     * Upload giấy tờ cho chủ xe
     * POST /api/giay-to/chu-xe/{chuXeId}
     */
    @PostMapping("/chu-xe/{chuXeId}")
    @PreAuthorize("hasAnyRole('CoOwner', 'Admin')")
    public ResponseEntity<GiayToDTO> uploadGiayTo(
            @PathVariable Integer chuXeId,
            @Valid @RequestBody UploadGiayToRequest request) {
        try {
            GiayToDTO dto = giayToService.uploadGiayTo(chuXeId, request);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Gửi yêu cầu xác thực giấy tờ
     * POST /api/giay-to/{id}/gui-xac-thuc
     */
    @PostMapping("/{id}/gui-xac-thuc")
    @PreAuthorize("hasAnyRole('CoOwner', 'Admin')")
    public ResponseEntity<GiayToDTO> guiYeuCauXacThuc(@PathVariable Integer id) {
        try {
            GiayToDTO dto = giayToService.guiYeuCauXacThuc(id);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Lấy danh sách giấy tờ của chủ xe
     * GET /api/giay-to/chu-xe/{chuXeId}
     */
    @GetMapping("/chu-xe/{chuXeId}")
    @PreAuthorize("hasAnyRole('CoOwner', 'Admin')")
    public ResponseEntity<List<GiayToDTO>> getGiayToByChuXe(@PathVariable Integer chuXeId) {
        try {
            List<GiayToDTO> dtos = giayToService.getGiayToByChuXe(chuXeId);
            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Lấy chi tiết giấy tờ
     * GET /api/giay-to/{id}
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('CoOwner', 'Admin')")
    public ResponseEntity<GiayToDTO> getChiTietGiayTo(@PathVariable Integer id) {
        try {
            GiayToDTO dto = giayToService.getChiTietGiayTo(id);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Lấy danh sách giấy tờ chờ duyệt (Admin only)
     * GET /api/giay-to/cho-duyet
     */
    @GetMapping("/cho-duyet")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<List<GiayToDTO>> getDanhSachChoDuyet() {
        try {
            List<GiayToDTO> dtos = giayToService.getDanhSachChoDuyet();
            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Duyệt hoặc từ chối giấy tờ (Admin only)
     * POST /api/giay-to/{id}/duyet
     */
    @PostMapping("/{id}/duyet")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<GiayToDTO> duyetGiayTo(
            @PathVariable Integer id,
            @RequestParam Integer nguoiDuyetId,
            @RequestParam boolean approve,
            @RequestParam(required = false) String lyDo) {
        try {
            GiayToDTO dto = giayToService.duyetGiayTo(id, nguoiDuyetId, approve, lyDo);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
