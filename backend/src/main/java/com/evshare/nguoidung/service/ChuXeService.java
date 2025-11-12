package com.evshare.nguoidung.service;

import com.evshare.nguoidung.dto.ChuXeDTO;
import com.evshare.nguoidung.dto.TaoChuXeRequest;
import com.evshare.nguoidung.entity.ChuXe;
import com.evshare.nguoidung.repository.ChuXeRepository;
import com.evshare.nguoidung.repository.NguoiDungRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class ChuXeService {
    
    private final ChuXeRepository chuXeRepository;
    private final NguoiDungRepository nguoiDungRepository;
    
    @Transactional
    public ChuXeDTO taoChuXe(TaoChuXeRequest request) {
        // Kiểm tra người dùng tồn tại
        nguoiDungRepository.findById(request.getNguoiDungId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
        
        // Kiểm tra đã là chủ xe chưa
        if (chuXeRepository.existsByNguoiDungId(request.getNguoiDungId())) {
            throw new RuntimeException("Người dùng này đã là chủ xe");
        }
        
        // Kiểm tra CCCD trùng
        if (request.getCccd() != null && chuXeRepository.existsByCccd(request.getCccd())) {
            throw new RuntimeException("CCCD đã được sử dụng");
        }
        
        // Tạo chủ xe
        ChuXe chuXe = ChuXe.builder()
                .nguoiDungId(request.getNguoiDungId())
                .hoTen(request.getHoTen())
                .cccd(request.getCccd())
                .sdt(request.getSdt())
                .gplx(request.getGplx())
                .diaChi(request.getDiaChi())
                .build();
        
        chuXe = chuXeRepository.save(chuXe);
        
        return convertToDTO(chuXe);
    }
    
    @Transactional(readOnly = true)
    public ChuXeDTO getChuXeById(Integer chuXeId) {
        ChuXe chuXe = chuXeRepository.findById(chuXeId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy chủ xe"));
        
        return convertToDTO(chuXe);
    }
    
    @Transactional(readOnly = true)
    public ChuXeDTO getChuXeByNguoiDungId(Integer nguoiDungId) {
        ChuXe chuXe = chuXeRepository.findByNguoiDungId(nguoiDungId)
                .orElseThrow(() -> new RuntimeException("Người dùng chưa đăng ký làm chủ xe"));
        
        return convertToDTO(chuXe);
    }
    
    @Transactional(readOnly = true)
    public List<ChuXeDTO> getAllChuXe() {
        return chuXeRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public ChuXeDTO capNhatChuXe(Integer chuXeId, TaoChuXeRequest request) {
        ChuXe chuXe = chuXeRepository.findById(chuXeId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy chủ xe"));
        
        // Kiểm tra CCCD trùng (nếu thay đổi)
        if (request.getCccd() != null && !request.getCccd().equals(chuXe.getCccd())) {
            if (chuXeRepository.existsByCccd(request.getCccd())) {
                throw new RuntimeException("CCCD đã được sử dụng");
            }
            chuXe.setCccd(request.getCccd());
        }
        
        if (request.getHoTen() != null) {
            chuXe.setHoTen(request.getHoTen());
        }
        if (request.getSdt() != null) {
            chuXe.setSdt(request.getSdt());
        }
        if (request.getGplx() != null) {
            chuXe.setGplx(request.getGplx());
        }
        if (request.getDiaChi() != null) {
            chuXe.setDiaChi(request.getDiaChi());
        }
        
        chuXe = chuXeRepository.save(chuXe);
        
        return convertToDTO(chuXe);
    }
    
    private ChuXeDTO convertToDTO(ChuXe chuXe) {
        return ChuXeDTO.builder()
                .chuXeId(chuXe.getChuXeId())
                .nguoiDungId(chuXe.getNguoiDungId())
                .hoTen(chuXe.getHoTen())
                .cccd(chuXe.getCccd())
                .sdt(chuXe.getSdt())
                .gplx(chuXe.getGplx())
                .diaChi(chuXe.getDiaChi())
                .build();
    }
}
