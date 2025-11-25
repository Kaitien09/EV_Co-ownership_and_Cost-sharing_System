package com.evshare.xedien.repository;

import com.evshare.xedien.entity.DatLich;
import com.evshare.xedien.entity.TrangThaiDatLich;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DatLichRepository extends JpaRepository<DatLich, Integer> {

    // Tìm đặt lịch theo chủ xe
    List<DatLich> findByChuXe_ChuXeId(Integer chuXeId);

    // Tìm đặt lịch theo xe
    List<DatLich> findByXe_XeId(Integer xeId);

    // Tìm đặt lịch theo trạng thái
    List<DatLich> findByTrangThai(TrangThaiDatLich trangThai);

    // Tìm đặt lịch theo chủ xe và trạng thái
    List<DatLich> findByChuXe_ChuXeIdAndTrangThai(Integer chuXeId, TrangThaiDatLich trangThai);

    // Tìm đặt lịch trong khoảng thời gian
    List<DatLich> findByThoiGianBatDauBetween(LocalDateTime start, LocalDateTime end);

    // Tìm đặt lịch của xe trong khoảng thời gian
    List<DatLich> findByXe_XeIdAndThoiGianBatDauBetween(Integer xeId, LocalDateTime start, LocalDateTime end);

    // Kiểm tra trùng lịch
    @Query("SELECT COUNT(d) > 0 FROM DatLich d WHERE d.xe.xeId = :xeId AND d.trangThai = 'DaDuyet' AND " +
            "((d.thoiGianBatDau BETWEEN :start AND :end) OR (d.thoiGianKetThuc BETWEEN :start AND :end) OR " +
            "(d.thoiGianBatDau <= :start AND d.thoiGianKetThuc >= :end))")
    boolean existsTrungLich(@Param("xeId") Integer xeId,
                            @Param("start") LocalDateTime start,
                            @Param("end") LocalDateTime end);

    // Tìm đặt lịch sắp tới của chủ xe
    @Query("SELECT d FROM DatLich d WHERE d.chuXe.chuXeId = :chuXeId AND d.thoiGianBatDau > :now ORDER BY d.thoiGianBatDau ASC")
    List<DatLich> findDatLichSapToiByChuXe(@Param("chuXeId") Integer chuXeId, @Param("now") LocalDateTime now);

    // Thống kê đặt lịch theo trạng thái
    @Query("SELECT d.trangThai, COUNT(d) FROM DatLich d GROUP BY d.trangThai")
    List<Object[]> thongKeDatLichTheoTrangThai();
}