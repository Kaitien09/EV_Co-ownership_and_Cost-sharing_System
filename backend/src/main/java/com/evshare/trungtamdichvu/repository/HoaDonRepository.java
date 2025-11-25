package com.evshare.trungtamdichvu.repository;

import com.evshare.trungtamdichvu.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface HoaDonRepository extends JpaRepository<HoaDon, Integer> {

    Optional<HoaDon> findByMaHoaDon(String maHoaDon);
    Optional<HoaDon> findByPhieuDichVu_PhieuId(Integer phieuId);
    List<HoaDon> findByTrangThaiThanhToan(String trangThaiThanhToan);

    @Query("SELECT h FROM HoaDon h WHERE h.ngayLap BETWEEN :start AND :end")
    List<HoaDon> findByNgayLapBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT h FROM HoaDon h WHERE h.phieuDichVu.lichHen.chuXe.chuXeId = :chuXeId")
    List<HoaDon> findByChuXeId(@Param("chuXeId") Integer chuXeId);

    @Query("SELECT SUM(h.tongTien) FROM HoaDon h WHERE h.ngayLap BETWEEN :start AND :end AND h.trangThaiThanhToan = 'DaThanhToan'")
    Double tinhDoanhThuTheoThang(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT h.trangThaiThanhToan, COUNT(h), SUM(h.tongTien) FROM HoaDon h WHERE h.ngayLap BETWEEN :start AND :end GROUP BY h.trangThaiThanhToan")
    List<Object[]> thongKeHoaDonTheoTrangThai(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}