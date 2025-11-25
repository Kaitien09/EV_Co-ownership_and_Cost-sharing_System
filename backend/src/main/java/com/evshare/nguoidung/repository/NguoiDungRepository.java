package com.evshare.nguoidung.repository;

import com.evshare.nguoidung.entity.NguoiDung;
import com.evshare.nguoidung.entity.LoaiNguoiDung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NguoiDungRepository extends JpaRepository<NguoiDung, Integer> {
    Optional<NguoiDung> findByTenDangNhap(String tenDangNhap);
    Optional<NguoiDung> findByEmail(String email);
    boolean existsByTenDangNhap(String tenDangNhap);
    boolean existsByEmail(String email);
    List<NguoiDung> findByLoaiNguoiDung(LoaiNguoiDung loaiNguoiDung);

    @Query("SELECT n FROM NguoiDung n WHERE n.tenDangNhap LIKE %:keyword% OR n.email LIKE %:keyword%")
    List<NguoiDung> searchByKeyword(@Param("keyword") String keyword);

    List<NguoiDung> findByTrangThai(com.evshare.nguoidung.entity.TrangThaiNguoiDung trangThai);
}