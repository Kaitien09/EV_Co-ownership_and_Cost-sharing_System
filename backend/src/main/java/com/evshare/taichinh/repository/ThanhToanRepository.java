package com.evshare.repository;

import com.evshare.entity.ThanhToan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ThanhToanRepository extends JpaRepository<ThanhToan, Integer> {

    List<ThanhToan> findByChuXeId(Integer chuXeId);

    List<ThanhToan> findByTrangThai(ThanhToan.TrangThai trangThai);

    Optional<ThanhToan> findByChiaChiPhiId(Integer chiaChiPhiId);

    List<ThanhToan> findByChuXeIdAndTrangThai(Integer chuXeId, ThanhToan.TrangThai trangThai);

    List<ThanhToan> findByNgayThanhToanBetween(LocalDateTime tuNgay, LocalDateTime denNgay);

    @Query("SELECT SUM(t.soTienThanhToan) FROM ThanhToan t " +
            "WHERE t.chuXeId = :chuXeId AND t.trangThai = 'DaThanhToan'")
    BigDecimal getTongTienDaThanhToanByChuXeId(@Param("chuXeId") Integer chuXeId);
}