package com.evshare.xedien.repository;

import com.evshare.xedien.entity.LichSuSuDung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface LichSuSuDungRepository extends JpaRepository<LichSuSuDung, Integer> {

    // Tìm lịch sử theo xe
    List<LichSuSuDung> findByXe_XeId(Integer xeId);

    // Tìm lịch sử theo chủ xe (qua đặt lịch)
    @Query("SELECT l FROM LichSuSuDung l WHERE l.datLich.chuXe.chuXeId = :chuXeId")
    List<LichSuSuDung> findByChuXeId(@Param("chuXeId") Integer chuXeId);

    // Tìm lịch sử trong khoảng thời gian
    List<LichSuSuDung> findByThoiGianNhanXeBetween(LocalDateTime start, LocalDateTime end);

    // Tìm lịch sử chưa hoàn thành (chưa có thời gian trả xe)
    @Query("SELECT l FROM LichSuSuDung l WHERE l.thoiGianTraXe IS NULL")
    List<LichSuSuDung> findChuaHoanThanh();

    // Tính tổng quãng đường theo xe
    @Query("SELECT COALESCE(SUM(l.quangDuong), 0) FROM LichSuSuDung l WHERE l.xe.xeId = :xeId")
    Integer findTongQuangDuongByXe(@Param("xeId") Integer xeId);

    // Tính tổng quãng đường theo chủ xe
    @Query("SELECT COALESCE(SUM(l.quangDuong), 0) FROM LichSuSuDung l WHERE l.datLich.chuXe.chuXeId = :chuXeId")
    Integer findTongQuangDuongByChuXe(@Param("chuXeId") Integer chuXeId);

    // Thống kê sử dụng theo tháng
    @Query("SELECT YEAR(l.thoiGianNhanXe), MONTH(l.thoiGianNhanXe), SUM(l.quangDuong), SUM(l.nangLuongTieuThu) " +
            "FROM LichSuSuDung l WHERE l.xe.xeId = :xeId AND l.thoiGianNhanXe BETWEEN :start AND :end " +
            "GROUP BY YEAR(l.thoiGianNhanXe), MONTH(l.thoiGianNhanXe) " +
            "ORDER BY YEAR(l.thoiGianNhanXe), MONTH(l.thoiGianNhanXe)")
    List<Object[]> thongKeSuDungTheoThang(@Param("xeId") Integer xeId,
                                          @Param("start") LocalDateTime start,
                                          @Param("end") LocalDateTime end);

    // Tìm lịch sử theo đặt lịch
    Optional<LichSuSuDung> findByDatLich_DatLichId(Integer datLichId);
}