package com.example.demo.controller;

import com.example.demo.dto.NguoiDungDTO;
import com.example.demo.entity.NguoiDung;
import com.example.demo.service.NguoiDungService;
import com.example.demo.repository.NguoiDungRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/nguoi-dung")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class NguoiDungController {
    
    private final NguoiDungService nguoiDungService;
    private final NguoiDungRepository nguoiDungRepository;
    
    @GetMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getProfile() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            
            if (authentication == null) {
                return ResponseEntity.status(401).body("No authentication found");
            }
            
            if (!authentication.isAuthenticated()) {
                return ResponseEntity.status(401).body("Not authenticated");
            }
            
            // Debug info
            String email = authentication.getName();
            System.out.println("DEBUG - Email from token: " + email);
            System.out.println("DEBUG - Principal class: " + authentication.getPrincipal().getClass().getName());
            
            // Tìm user theo email
            Optional<NguoiDung> nguoiDungOpt = nguoiDungRepository.findByEmail(email);
            if (!nguoiDungOpt.isPresent()) {
                String errorMsg = "Không tìm thấy người dùng với email: " + email;
                System.err.println("ERROR - " + errorMsg);
                return ResponseEntity.status(404).body(errorMsg);
            }
            
            NguoiDung nguoiDung = nguoiDungOpt.get();
            System.out.println("DEBUG - Found user ID: " + nguoiDung.getNguoiDungId());
            
            NguoiDungDTO dto = nguoiDungService.getHoSo(nguoiDung.getNguoiDungId());
            System.out.println("DEBUG - DTO created successfully");
            
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            System.err.println("ERROR in getProfile: " + e.getClass().getName());
            System.err.println("ERROR message: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error: " + e.getClass().getName() + " - " + e.getMessage());
        }
    }
    
    @GetMapping("/debug")
    // @PreAuthorize("isAuthenticated()") // Tạm bỏ để debug
    public ResponseEntity<?> debug() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null) {
                return ResponseEntity.ok("Authentication is null");
            }
            
            return ResponseEntity.ok(Map.of(
                "authenticated", authentication.isAuthenticated(),
                "name", authentication.getName(),
                "principalClass", authentication.getPrincipal().getClass().getName(),
                "authorities", authentication.getAuthorities().toString()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
    
    @GetMapping("/{id}/ho-so")
    @PreAuthorize("hasAnyRole('CoOwner', 'Admin', 'Staff')")
    public ResponseEntity<NguoiDungDTO> getHoSo(@PathVariable Integer id) {
        try {
            NguoiDungDTO dto = nguoiDungService.getHoSo(id);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}/trang-thai")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<NguoiDungDTO> capNhatTrangThai(
            @PathVariable Integer id,
            @RequestParam NguoiDung.TrangThai trangThai) {
        try {
            NguoiDungDTO dto = nguoiDungService.capNhatTrangThai(id, trangThai);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updateProfile(@RequestBody NguoiDungDTO updateRequest) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            
            NguoiDung nguoiDung = nguoiDungRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
            
            NguoiDungDTO updated = nguoiDungService.capNhatProfile(
                nguoiDung.getNguoiDungId(), 
                updateRequest
            );
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
    
    @PutMapping("/doi-mat-khau")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> doiMatKhau(@RequestBody DoiMatKhauRequest request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            
            NguoiDung nguoiDung = nguoiDungRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
            
            nguoiDungService.doiMatKhau(
                nguoiDung.getNguoiDungId(),
                request.getMatKhauCu(),
                request.getMatKhauMoi()
            );
            return ResponseEntity.ok("Đổi mật khẩu thành công");
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
}

// DTO class for password change
@lombok.Data
class DoiMatKhauRequest {
    private String matKhauCu;
    private String matKhauMoi;
    private String xacNhanMatKhau;
}
