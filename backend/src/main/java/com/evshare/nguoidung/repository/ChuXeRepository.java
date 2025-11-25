package com.evshare.nguoidung.repository;

import com.evshare.nguoidung.entity.ChuXe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChuXeRepository extends JpaRepository<ChuXe, Integer> {
    Optional<ChuXe> findByNguoiDung_NguoiDungId(Integer nguoiDungId);
    Optional<ChuXe> findByCccd(String cccd);
    List<ChuXe> findByHoTenContainingIgnoreCase(String hoTen);

    @Query("SELECT c FROM ChuXe c WHERE c.nguoiDung.nguoiDungId = :nguoiDungId")
    Optional<ChuXe> findByNguoiDungId(@Param("nguoiDungId") Integer nguoiDungId);

    @Query("SELECT c FROM ChuXe c WHERE c.hoTen LIKE %:keyword% OR c.cccd LIKE %:keyword% OR c.sdt LIKE %:keyword%")
    List<ChuXe> searchByKeyword(@Param("keyword") String keyword);
}