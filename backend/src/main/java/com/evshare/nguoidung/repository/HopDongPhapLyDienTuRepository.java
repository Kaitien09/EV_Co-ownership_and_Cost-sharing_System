package com.evshare.nguoidung.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.evshare.nguoidung.entity.HopDongPhapLyDienTu;

@Repository
public interface HopDongPhapLyDienTuRepository extends JpaRepository<HopDongPhapLyDienTu, Integer> {
    
    Optional<HopDongPhapLyDienTu> findByHopDongDongSoHuuId(Integer hopDongDongSoHuuId);
    
    List<HopDongPhapLyDienTu> findByTrangThai(HopDongPhapLyDienTu.TrangThai trangThai);
    
    List<HopDongPhapLyDienTu> findByNguoiKyId(Integer nguoiKyId);
}
