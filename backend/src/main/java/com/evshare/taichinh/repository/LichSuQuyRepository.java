package com.evshare.taichinh.repository;

import com.evshare.taichinh.entity.LichSuQuy;
import com.evshare.taichinh.entity.LoaiGiaoDich;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LichSuQuyRepository extends JpaRepository<LichSuQuy, Integer> {

    // Tìm lịch sử quỹ theo quỹ
    List<LichSuQuy> findByQuy_QuyId(Integer quyId);

    // Tìm lịch sử quỹ theo loại giao dịch
    List<LichSuQuy> findByLoaiGiaoDich(LoaiGiaoDich loaiGiaoDich);

    // Tìm lịch sử quỹ theo quỹ và loại giao dịch
    List<LichSuQuy> findByQuy_QuyIdAndLoaiGiaoDich(Integer quyId, LoaiGiaoDich loaiGiaoDich);

    // Tìm lịch sử quỹ trong khoảng thời gian
    List<LichSuQuy> findByNgayGiaoDichBetween(LocalDateTime startDate, LocalDateTime endDate);

    // Tìm lịch sử quỹ của quỹ trong khoảng thời gian
    List<LichSuQuy> findByQuy_QuyIdAndNgayGiaoDichBetween(Integer quyId, LocalDateTime startDate, LocalDateTime endDate);

    // Tính tổng thu theo quỹ
    @Query("SELECT COALESCE(SUM(l.soTien), 0) FROM LichSuQuy l WHERE l.quy.quyId = :quyId AND l.loaiGiaoDich = 'Thu'")
    Double findTongThuByQuy(@Param("quyId") Integer quyId);

    // Tính tổng chi theo quỹ
    @Query("SELECT COALESCE(SUM(l.soTien), 0) FROM LichSuQuy l WHERE l.quy.quyId = :quyId AND l.loaiGiaoDich = 'Chi'")
    Double findTongChiByQuy(@Param("quyId") Integer quyId);

    // Thống kê thu chi theo tháng
    @Query("SELECT YEAR(l.ngayGiaoDich), MONTH(l.ngayGiaoDich), l.loaiGiaoDich, SUM(l.soTien) " +
            "FROM LichSuQuy l WHERE l.quy.quyId = :quyId AND l.ngayGiaoDich BETWEEN :startDate AND :endDate " +
            "GROUP BY YEAR(l.ngayGiaoDich), MONTH(l.ngayGiaoDich), l.loaiGiaoDich " +
            "ORDER BY YEAR(l.ngayGiaoDich), MONTH(l.ngayGiaoDich)")
    List<Object[]> thongKeThuChiTheoThang(@Param("quyId") Integer quyId,
                                          @Param("startDate") LocalDateTime startDate,
                                          @Param("endDate") LocalDateTime endDate);
}