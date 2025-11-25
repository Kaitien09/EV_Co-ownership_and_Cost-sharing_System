package com.evshare.trungtamdichvu.repository;

import com.evshare.trungtamdichvu.entity.ChiTietSuDungPhuTung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ChiTietSuDungPhuTungRepository extends JpaRepository<ChiTietSuDungPhuTung, Integer> {

    List<ChiTietSuDungPhuTung> findByPhieuDichVu_PhieuId(Integer phieuId);
    List<ChiTietSuDungPhuTung> findByPhuTung_PhuTungId(Integer phuTungId);

    @Query("SELECT c FROM ChiTietSuDungPhuTung c WHERE c.phieuDichVu.lichHen.xe.xeId = :xeId")
    List<ChiTietSuDungPhuTung> findByXeId(@Param("xeId") Integer xeId);

    @Query("SELECT c.phuTung.loaiPhuTung, SUM(c.soLuong), SUM(c.soLuong * c.donGia) " +
            "FROM ChiTietSuDungPhuTung c WHERE c.phieuDichVu.ngayTiepNhan BETWEEN :start AND :end " +
            "GROUP BY c.phuTung.loaiPhuTung")
    List<Object[]> thongKeSuDungPhuTungTheoLoai(@Param("start") java.time.LocalDateTime start,
                                                @Param("end") java.time.LocalDateTime end);
}