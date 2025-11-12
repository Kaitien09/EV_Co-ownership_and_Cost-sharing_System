package com.evshare.nguoidung.service;

import com.evshare.nguoidung.dto.GiayToDTO;
import com.evshare.nguoidung.dto.UploadGiayToRequest;
import com.evshare.nguoidung.entity.GiayToChuXe;
import com.evshare.nguoidung.entity.GiayToChuXe.TrangThaiXacThuc;
import com.evshare.nguoidung.repository.GiayToChuXeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GiayToService {
    
    private final GiayToChuXeRepository giayToRepository;
    
    /**
     * Upload giấy tờ cho chủ xe
     */
    @Transactional
    public GiayToDTO uploadGiayTo(Integer chuXeId, UploadGiayToRequest request) {
        GiayToChuXe giayTo = GiayToChuXe.builder()
                .chuXeId(chuXeId)
                .loaiGiayTo(request.getLoaiGiayTo())
                .soGiayTo(request.getSoGiayTo())
                .hinhAnhMatTruoc(request.getHinhAnhMatTruoc())
                .hinhAnhMatSau(request.getHinhAnhMatSau())
                .ngayCap(request.getNgayCap())
                .noiCap(request.getNoiCap())
                .ghiChu(request.getGhiChu())
                .trangThaiXacThuc(TrangThaiXacThuc.ChuaXacThuc)
                .build();
        
        GiayToChuXe saved = giayToRepository.save(giayTo);
        return convertToDTO(saved);
    }
    
    /**
     * Gửi yêu cầu xác thực giấy tờ
     */
    @Transactional
    public GiayToDTO guiYeuCauXacThuc(Integer giayToId) {
        GiayToChuXe giayTo = giayToRepository.findById(giayToId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giấy tờ"));
        
        if (giayTo.getTrangThaiXacThuc() != TrangThaiXacThuc.ChuaXacThuc) {
            throw new RuntimeException("Giấy tờ đã được gửi xác thực trước đó");
        }
        
        giayTo.setTrangThaiXacThuc(TrangThaiXacThuc.DangChoDuyet);
        GiayToChuXe saved = giayToRepository.save(giayTo);
        return convertToDTO(saved);
    }
    
    /**
     * Duyệt hoặc từ chối giấy tờ (Admin only)
     */
    @Transactional
    public GiayToDTO duyetGiayTo(Integer giayToId, Integer nguoiDuyetId, boolean approve, String lyDo) {
        GiayToChuXe giayTo = giayToRepository.findById(giayToId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giấy tờ"));
        
        if (giayTo.getTrangThaiXacThuc() != TrangThaiXacThuc.DangChoDuyet) {
            throw new RuntimeException("Giấy tờ không ở trạng thái chờ duyệt");
        }
        
        giayTo.setNguoiDuyet(nguoiDuyetId);
        giayTo.setNgayDuyet(LocalDateTime.now());
        
        if (approve) {
            giayTo.setTrangThaiXacThuc(TrangThaiXacThuc.DaXacThuc);
            giayTo.setLyDoTuChoi(null);
        } else {
            giayTo.setTrangThaiXacThuc(TrangThaiXacThuc.TuChoi);
            giayTo.setLyDoTuChoi(lyDo != null ? lyDo : "Không đạt yêu cầu");
        }
        
        GiayToChuXe saved = giayToRepository.save(giayTo);
        return convertToDTO(saved);
    }
    
    /**
     * Lấy danh sách giấy tờ chờ duyệt (Admin only)
     */
    public List<GiayToDTO> getDanhSachChoDuyet() {
        List<GiayToChuXe> list = giayToRepository.findByTrangThaiXacThuc(TrangThaiXacThuc.DangChoDuyet);
        return list.stream().map(this::convertToDTO).collect(Collectors.toList());
    }
    
    /**
     * Lấy tất cả giấy tờ của chủ xe
     */
    public List<GiayToDTO> getGiayToByChuXe(Integer chuXeId) {
        List<GiayToChuXe> list = giayToRepository.findByChuXeId(chuXeId);
        return list.stream().map(this::convertToDTO).collect(Collectors.toList());
    }
    
    /**
     * Lấy chi tiết giấy tờ
     */
    public GiayToDTO getChiTietGiayTo(Integer giayToId) {
        GiayToChuXe giayTo = giayToRepository.findById(giayToId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giấy tờ"));
        return convertToDTO(giayTo);
    }
    
    /**
     * Convert entity to DTO
     */
    private GiayToDTO convertToDTO(GiayToChuXe entity) {
        return GiayToDTO.builder()
                .id(entity.getId())
                .chuXeId(entity.getChuXeId())
                .loaiGiayTo(entity.getLoaiGiayTo())
                .soGiayTo(entity.getSoGiayTo())
                .hinhAnhMatTruoc(entity.getHinhAnhMatTruoc())
                .hinhAnhMatSau(entity.getHinhAnhMatSau())
                .ngayCap(entity.getNgayCap())
                .noiCap(entity.getNoiCap())
                .trangThaiXacThuc(entity.getTrangThaiXacThuc().name())
                .nguoiDuyet(entity.getNguoiDuyet())
                .ngayDuyet(entity.getNgayDuyet())
                .lyDoTuChoi(entity.getLyDoTuChoi())
                .ghiChu(entity.getGhiChu())
                .ngayTao(entity.getNgayTao())
                .ngayCapNhat(entity.getNgayCapNhat())
                .build();
    }
}
