package com.example.demo.service;

import com.example.demo.dto.HopDongDTO;
import com.example.demo.dto.TaoHopDongRequest;
import com.example.demo.entity.*;
import com.example.demo.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HopDongService {
    
    private final HopDongDongSoHuuRepository hopDongRepository;
    private final ChuXeRepository chuXeRepository;
    
    @Transactional
    public HopDongDTO taoHopDong(TaoHopDongRequest request) {
        // Kiểm tra chủ xe
        chuXeRepository.findById(request.getChuXeId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy chủ xe"));
        
        // Tạo hợp đồng
        HopDongDongSoHuu hopDong = HopDongDongSoHuu.builder()
                .xeId(request.getXeId())
                .chuXeId(request.getChuXeId())
                .ngayBatDau(LocalDateTime.parse(request.getNgayBatDau()))
                .ngayKetThuc(request.getNgayKetThuc() != null ? 
                        LocalDateTime.parse(request.getNgayKetThuc()) : null)
                .build();
        
        hopDong = hopDongRepository.save(hopDong);
        
        return convertToDTO(hopDong);
    }
    
    @Transactional(readOnly = true)
    public List<HopDongDTO> getDanhSachHopDongChuXe(Integer chuXeId) {
        List<HopDongDongSoHuu> hopDongs = hopDongRepository.findByChuXeId(chuXeId);
        return hopDongs.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public List<HopDongDTO> getDanhSachHopDongXe(Integer xeId) {
        List<HopDongDongSoHuu> hopDongs = hopDongRepository.findByXeId(xeId);
        return hopDongs.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public HopDongDTO getChiTietHopDong(Integer hopDongId) {
        HopDongDongSoHuu hopDong = hopDongRepository.findById(hopDongId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hợp đồng"));
        
        return convertToDTO(hopDong);
    }
    
    // ===== WORKFLOW METHODS =====
    
    @Transactional(readOnly = true)
    public List<HopDongDTO> getDanhSachChoDuyet() {
        return hopDongRepository.findByTrangThai(HopDongDongSoHuu.TrangThaiHopDong.ChoDuyet)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public HopDongDTO duyetHopDong(Integer hopDongId, Integer nguoiDuyetId, 
                                    boolean approve, String lyDo) {
        HopDongDongSoHuu hopDong = hopDongRepository.findById(hopDongId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hợp đồng"));
        
        if (hopDong.getTrangThai() != HopDongDongSoHuu.TrangThaiHopDong.ChoDuyet) {
            throw new RuntimeException("Hợp đồng không ở trạng thái chờ duyệt");
        }
        
        hopDong.setNguoiDuyet(nguoiDuyetId);
        hopDong.setNgayDuyet(LocalDateTime.now());
        
        if (approve) {
            hopDong.setTrangThai(HopDongDongSoHuu.TrangThaiHopDong.DaDuyet);
        } else {
            hopDong.setTrangThai(HopDongDongSoHuu.TrangThaiHopDong.TuChoi);
            hopDong.setLyDoTuChoi(lyDo);
        }
        
        hopDong = hopDongRepository.save(hopDong);
        return convertToDTO(hopDong);
    }
    
    @Transactional
    public HopDongDTO kichHoatHopDong(Integer hopDongId) {
        HopDongDongSoHuu hopDong = hopDongRepository.findById(hopDongId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hợp đồng"));
        
        if (hopDong.getTrangThai() != HopDongDongSoHuu.TrangThaiHopDong.DaDuyet) {
            throw new RuntimeException("Hợp đồng chưa được duyệt");
        }
        
        hopDong.setTrangThai(HopDongDongSoHuu.TrangThaiHopDong.DangHieuLuc);
        hopDong = hopDongRepository.save(hopDong);
        return convertToDTO(hopDong);
    }
    
    @Transactional
    public HopDongDTO ketThucHopDong(Integer hopDongId) {
        HopDongDongSoHuu hopDong = hopDongRepository.findById(hopDongId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hợp đồng"));
        
        if (hopDong.getTrangThai() != HopDongDongSoHuu.TrangThaiHopDong.DangHieuLuc) {
            throw new RuntimeException("Hợp đồng không đang hiệu lực");
        }
        
        hopDong.setTrangThai(HopDongDongSoHuu.TrangThaiHopDong.HetHan);
        hopDong = hopDongRepository.save(hopDong);
        return convertToDTO(hopDong);
    }
    
    @Scheduled(cron = "0 0 0 * * ?") // Chạy mỗi ngày lúc 00:00
    @Transactional
    public void autoExpireContracts() {
        List<HopDongDongSoHuu> expiredContracts = 
            hopDongRepository.findExpiredContracts(LocalDateTime.now());
        
        expiredContracts.forEach(hd -> {
            hd.setTrangThai(HopDongDongSoHuu.TrangThaiHopDong.HetHan);
            hopDongRepository.save(hd);
        });
    }
    
    private HopDongDTO convertToDTO(HopDongDongSoHuu hopDong) {
        return HopDongDTO.builder()
                .hopDongId(hopDong.getHopDongId())
                .xeId(hopDong.getXeId())
                .chuXeId(hopDong.getChuXeId())
                .ngayBatDau(hopDong.getNgayBatDau())
                .ngayKetThuc(hopDong.getNgayKetThuc())
                .trangThai(hopDong.getTrangThai() != null ? hopDong.getTrangThai().name() : null)
                .nguoiDuyet(hopDong.getNguoiDuyet())
                .ngayDuyet(hopDong.getNgayDuyet())
                .lyDoTuChoi(hopDong.getLyDoTuChoi())
                .build();
    }
}
