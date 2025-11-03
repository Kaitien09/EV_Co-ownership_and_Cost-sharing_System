package com.example.demo.repository;

import com.example.demo.entity.HopDongDongSoHuu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface HopDongDongSoHuuRepository extends JpaRepository<HopDongDongSoHuu, Integer> {
    
    List<HopDongDongSoHuu> findByChuXeId(Integer chuXeId);
    
    List<HopDongDongSoHuu> findByXeId(Integer xeId);
    
    List<HopDongDongSoHuu> findByTrangThai(HopDongDongSoHuu.TrangThaiHopDong trangThai);
    
    @Query("SELECT h FROM HopDongDongSoHuu h WHERE h.trangThai = 'DangHieuLuc' " +
           "AND h.ngayKetThuc < :now")
    List<HopDongDongSoHuu> findExpiredContracts(@Param("now") LocalDateTime now);
}
