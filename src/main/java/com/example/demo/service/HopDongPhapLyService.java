package com.example.demo.service;

import com.example.demo.dto.HopDongPhapLyRequest;
import com.example.demo.dto.HopDongPhapLyResponse;
import com.example.demo.dto.KyHopDongRequest;
import com.example.demo.entity.HopDongPhapLyDienTu;
import com.example.demo.repository.HopDongPhapLyDienTuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HopDongPhapLyService {

    private final HopDongPhapLyDienTuRepository hopDongPhapLyRepository;

    /**
     * Tạo hợp đồng pháp lý mới
     */
    @Transactional
    public HopDongPhapLyResponse taoHopDongPhapLy(HopDongPhapLyRequest request) {
        // Kiểm tra hợp đồng đã tồn tại chưa
        hopDongPhapLyRepository.findByHopDongDongSoHuuId(request.getHopDongDongSoHuuId())
                .ifPresent(hd -> {
                    throw new RuntimeException("Hợp đồng pháp lý đã tồn tại cho hợp đồng đồng sở hữu ID: " + request.getHopDongDongSoHuuId());
                });

        // Decode Base64 PDF nếu có
        byte[] pdfBytes = null;
        if (request.getTepHopDong() != null && !request.getTepHopDong().isEmpty()) {
            try {
                pdfBytes = Base64.getDecoder().decode(request.getTepHopDong());
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("File PDF không hợp lệ (Base64 decode failed)");
            }
        }

        HopDongPhapLyDienTu hopDong = HopDongPhapLyDienTu.builder()
                .hopDongDongSoHuuId(request.getHopDongDongSoHuuId())
                .noiDungHopDong(request.getNoiDungHopDong())
                .tepHopDong(pdfBytes)
                .trangThai(HopDongPhapLyDienTu.TrangThai.ChuaKy)
                .ngayTao(LocalDateTime.now())
                .build();

        HopDongPhapLyDienTu saved = hopDongPhapLyRepository.save(hopDong);
        return convertToResponse(saved);
    }

    /**
     * Ký hợp đồng điện tử
     */
    @Transactional
    public HopDongPhapLyResponse kyHopDong(Integer hopDongId, KyHopDongRequest request) {
        HopDongPhapLyDienTu hopDong = hopDongPhapLyRepository.findById(hopDongId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hợp đồng pháp lý ID: " + hopDongId));

        if (hopDong.getTrangThai() == HopDongPhapLyDienTu.TrangThai.DaKy) {
            throw new RuntimeException("Hợp đồng đã được ký trước đó");
        }

        if (hopDong.getTrangThai() == HopDongPhapLyDienTu.TrangThai.BiHuy) {
            throw new RuntimeException("Hợp đồng đã bị hủy, không thể ký");
        }

        // Lấy thông tin người dùng hiện tại
        Integer nguoiKyId = getCurrentUserId();

        // Cập nhật thông tin ký
        hopDong.setChuKyDienTu(request.getChuKyDienTu());
        hopDong.setNguoiKyId(nguoiKyId);
        hopDong.setNgayKy(LocalDateTime.now());
        hopDong.setTrangThai(HopDongPhapLyDienTu.TrangThai.DaKy);
        hopDong.setNgayCapNhat(LocalDateTime.now());

        HopDongPhapLyDienTu updated = hopDongPhapLyRepository.save(hopDong);
        return convertToResponse(updated);
    }

    /**
     * Xác minh hợp đồng (kiểm tra chữ ký)
     */
    public HopDongPhapLyResponse xacMinhHopDong(Integer hopDongId) {
        HopDongPhapLyDienTu hopDong = hopDongPhapLyRepository.findById(hopDongId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hợp đồng pháp lý ID: " + hopDongId));

        HopDongPhapLyResponse response = convertToResponse(hopDong);
        
        // Thêm logic xác minh chữ ký nếu cần
        // Ví dụ: So sánh hash, kiểm tra certificate, etc.
        
        return response;
    }

    /**
     * Lấy danh sách hợp đồng pháp lý
     */
    public List<HopDongPhapLyResponse> layDanhSachHopDong() {
        return hopDongPhapLyRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Lấy chi tiết hợp đồng
     */
    public HopDongPhapLyResponse layChiTietHopDong(Integer hopDongId) {
        HopDongPhapLyDienTu hopDong = hopDongPhapLyRepository.findById(hopDongId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hợp đồng pháp lý ID: " + hopDongId));
        return convertToResponse(hopDong);
    }

    /**
     * Tải xuống file hợp đồng PDF
     */
    public byte[] taiXuongHopDong(Integer hopDongId) {
        HopDongPhapLyDienTu hopDong = hopDongPhapLyRepository.findById(hopDongId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hợp đồng pháp lý ID: " + hopDongId));

        if (hopDong.getTepHopDong() == null) {
            throw new RuntimeException("Hợp đồng không có file đính kèm");
        }

        return hopDong.getTepHopDong();
    }

    /**
     * Hủy hợp đồng
     */
    @Transactional
    public void huyHopDong(Integer hopDongId) {
        HopDongPhapLyDienTu hopDong = hopDongPhapLyRepository.findById(hopDongId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hợp đồng pháp lý ID: " + hopDongId));

        hopDong.setTrangThai(HopDongPhapLyDienTu.TrangThai.BiHuy);
        hopDong.setNgayCapNhat(LocalDateTime.now());
        hopDongPhapLyRepository.save(hopDong);
    }

    // ==================== Helper Methods ====================

    private HopDongPhapLyResponse convertToResponse(HopDongPhapLyDienTu entity) {
        return HopDongPhapLyResponse.builder()
                .hopDongPhapLyId(entity.getHopDongPhapLyId())
                .hopDongDongSoHuuId(entity.getHopDongDongSoHuuId())
                .noiDungHopDong(entity.getNoiDungHopDong())
                .trangThai(entity.getTrangThai().name())
                .nguoiKyId(entity.getNguoiKyId())
                .ngayKy(entity.getNgayKy())
                .ngayTao(entity.getNgayTao())
                .daKy(entity.getTrangThai() == HopDongPhapLyDienTu.TrangThai.DaKy)
                .chuKyDienTu(entity.getChuKyDienTu())
                .build();
    }

    private Integer getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            // Giả sử username là email, cần lấy ID từ database
            // Hoặc lưu ID trong custom UserDetails
            return 1; // TODO: Lấy ID thực từ authentication
        }
        throw new RuntimeException("Không thể xác định người dùng hiện tại");
    }
}
