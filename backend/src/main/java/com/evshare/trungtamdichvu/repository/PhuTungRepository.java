package com.evshare.trungtamdichvu.repository;

import com.evshare.trungtamdichvu.entity.PhuTung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface PhuTungRepository extends JpaRepository<PhuTung, Integer> {

    Optional<PhuTung> findByMaPhuTung(String maPhuTung);
    List<PhuTung> findByTenPhuTungContainingIgnoreCase(String tenPhuTung);
    List<PhuTung> findByLoaiPhuTung(String loaiPhuTung);
    List<PhuTung> findBySoLuongTonLessThan(Integer soLuong);

    @Query("SELECT p FROM PhuTung p WHERE p.soLuongTon <= p.soLuongToiThieu")
    List<PhuTung> findPhuTungCanNhap();

    @Query("SELECT p.loaiPhuTung, SUM(p.soLuongTon) FROM PhuTung p GROUP BY p.loaiPhuTung")
    List<Object[]> thongKeTonKhoTheoLoai();

    // THÊM @Modifying và @Transactional cho UPDATE queries
    @Modifying
    @Transactional
    @Query("UPDATE PhuTung p SET p.soLuongTon = p.soLuongTon - :soLuong WHERE p.id = :phuTungId AND p.soLuongTon >= :soLuong")
    int giamSoLuongTon(@Param("phuTungId") Integer phuTungId, @Param("soLuong") Integer soLuong);

    @Modifying
    @Transactional
    @Query("UPDATE PhuTung p SET p.soLuongTon = p.soLuongTon + :soLuong WHERE p.id = :phuTungId")
    int tangSoLuongTon(@Param("phuTungId") Integer phuTungId, @Param("soLuong") Integer soLuong);
}