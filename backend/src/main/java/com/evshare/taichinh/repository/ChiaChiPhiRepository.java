package com.evshare.repository;

import com.evshare.entity.ChiaChiPhi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ChiaChiPhiRepository extends JpaRepository<ChiaChiPhi, Integer> {

    List<ChiaChiPhi> findByChiPhiId(Integer chiPhiId);

    List<ChiaChiPhi> findByChuXeId(Integer chuXeId);

    @Query("SELECT SUM(c.soTienPhaiTra) FROM ChiaChiPhi c WHERE c.chuXeId = :chuXeId")
    BigDecimal getTongTienPhaiTraByChuXeId(@Param("chuXeId") Integer chuXeId);

    @Query("SELECT c FROM ChiaChiPhi c WHERE c.chuXeId = :chuXeId " +
            "AND c.chiaChiPhiId NOT IN (SELECT t.chiaChiPhiId FROM ThanhToan t WHERE t.trangThai = 'DaThanhToan')")
    List<ChiaChiPhi> findChuaThanhToanByChuXeId(@Param("chuXeId") Integer chuXeId);

}
