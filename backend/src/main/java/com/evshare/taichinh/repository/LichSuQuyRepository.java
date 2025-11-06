package com.evshare.repository;

import com.evshare.entity.LichSuQuy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LichSuQuyRepository extends JpaRepository<LichSuQuy, Integer> {

    List<LichSuQuy> findByQuyId(Integer quyId);

    List<LichSuQuy> findByQuyIdOrderByNgayGiaoDichDesc(Integer quyId);

    List<LichSuQuy> findByQuyIdAndLoaiGiaoDich(
            Integer quyId,
            LichSuQuy.LoaiGiaoDich loaiGiaoDich
    );

    List<LichSuQuy> findByQuyIdAndNgayGiaoDichBetween(
            Integer quyId,
            LocalDateTime tuNgay,
            LocalDateTime denNgay
    );

    @Query("SELECT SUM(l.soTien) FROM LichSuQuy l " +
            "WHERE l.quyId = :quyId AND l.loaiGiaoDich = :loaiGiaoDich")
    BigDecimal getTongTienByQuyIdAndLoaiGiaoDich(
            @Param("quyId") Integer quyId,
            @Param("loaiGiaoDich") LichSuQuy.LoaiGiaoDich loaiGiaoDich
    );
}