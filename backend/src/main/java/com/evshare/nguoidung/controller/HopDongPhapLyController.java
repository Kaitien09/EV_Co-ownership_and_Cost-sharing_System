package com.evshare.nguoidung.controller;

import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.evshare.nguoidung.dto.HopDongPhapLyRequest;
import com.evshare.nguoidung.dto.HopDongPhapLyResponse;
import com.evshare.nguoidung.dto.KyHopDongRequest;
import com.evshare.nguoidung.service.HopDongPhapLyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/hop-dong-phap-ly")
@RequiredArgsConstructor
public class HopDongPhapLyController {

    private final HopDongPhapLyService hopDongPhapLyService;

    /**
     * 6.1. Tạo hợp đồng pháp lý mới
     */
    @PostMapping
    @PreAuthorize("hasAnyRole('CoOwner', 'Admin')")
    public ResponseEntity<HopDongPhapLyResponse> taoHopDongPhapLy(@RequestBody HopDongPhapLyRequest request) {
        HopDongPhapLyResponse response = hopDongPhapLyService.taoHopDongPhapLy(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * 6.2. Ký hợp đồng điện tử
     */
    @PostMapping("/{hopDongId}/ky")
    @PreAuthorize("hasAnyRole('CoOwner', 'Admin')")
    public ResponseEntity<HopDongPhapLyResponse> kyHopDong(
            @PathVariable Integer hopDongId,
            @RequestBody KyHopDongRequest request) {
        HopDongPhapLyResponse response = hopDongPhapLyService.kyHopDong(hopDongId, request);
        return ResponseEntity.ok(response);
    }

    /**
     * 6.3. Xác minh hợp đồng
     */
    @GetMapping("/{hopDongId}/xac-minh")
    @PreAuthorize("hasAnyRole('CoOwner', 'Admin')")
    public ResponseEntity<HopDongPhapLyResponse> xacMinhHopDong(@PathVariable Integer hopDongId) {
        HopDongPhapLyResponse response = hopDongPhapLyService.xacMinhHopDong(hopDongId);
        return ResponseEntity.ok(response);
    }

    /**
     * 6.4. Lấy danh sách hợp đồng pháp lý
     */
    @GetMapping
    @PreAuthorize("hasAnyRole('CoOwner', 'Admin')")
    public ResponseEntity<List<HopDongPhapLyResponse>> layDanhSachHopDong() {
        List<HopDongPhapLyResponse> responses = hopDongPhapLyService.layDanhSachHopDong();
        return ResponseEntity.ok(responses);
    }

    /**
     * 6.5. Tải xuống hợp đồng pháp lý (PDF)
     */
    @GetMapping("/{hopDongId}/tai-xuong")
    @PreAuthorize("hasAnyRole('CoOwner', 'Admin')")
    public ResponseEntity<byte[]> taiXuongHopDong(@PathVariable Integer hopDongId) {
        byte[] pdfBytes = hopDongPhapLyService.taiXuongHopDong(hopDongId);
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "hop-dong-" + hopDongId + ".pdf");
        
        return ResponseEntity.ok()
                .headers(headers)
                .body(pdfBytes);
    }

    /**
     * 6.6. Lấy chi tiết hợp đồng
     */
    @GetMapping("/{hopDongId}")
    @PreAuthorize("hasAnyRole('CoOwner', 'Admin')")
    public ResponseEntity<HopDongPhapLyResponse> layChiTietHopDong(@PathVariable Integer hopDongId) {
        HopDongPhapLyResponse response = hopDongPhapLyService.layChiTietHopDong(hopDongId);
        return ResponseEntity.ok(response);
    }

    /**
     * 6.7. Hủy hợp đồng (Admin only)
     */
    @DeleteMapping("/{hopDongId}")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<Void> huyHopDong(@PathVariable Integer hopDongId) {
        hopDongPhapLyService.huyHopDong(hopDongId);
        return ResponseEntity.noContent().build();
    }
}
