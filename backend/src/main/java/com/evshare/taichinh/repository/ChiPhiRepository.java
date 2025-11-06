package com.evshare.repository;

import com.evshare.entity.ChiPhi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ChiPhiRepository extends JpaRepository<ChiPhi, Integer> {

    List<ChiPhi> findByNhomId(Integer nhomId);

    List<ChiPhi> findByNhomIdAndLoaiChiPhi(Integer nhomId, ChiPhi.LoaiChiPhi loaiChiPhi);

    List<ChiPhi> findByNhomIdAndNgayPhatSinhBetween(
            Integer nhomId,
            LocalDate tuNgay,
            LocalDate denNgay
    );

    @Query("SELECT SUM(c.soTien) FROM ChiPhi c WHERE c.nhomId = :nhomId")
    BigDecimal getTongChiPhiByNhomId(@Param("nhomId") Integer nhomId);

    @Query("SELECT SUM(c.soTien) FROM ChiPhi c WHERE c.nhomId = :nhomId " +
            "AND c.ngayPhatSinh BETWEEN :tuNgay AND :denNgay")
    BigDecimal getTongChiPhiByNhomIdAndDateRange(
            @Param("nhomId") Integer nhomId,
            @Param("tuNgay") LocalDate tuNgay,
            @Param("denNgay") LocalDate denNgay
    );
}