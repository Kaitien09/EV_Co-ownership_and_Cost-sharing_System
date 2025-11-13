package com.evshare.taichinh.repository;

import com.evshare.taichinh.entity.ChiPhi;
import com.evshare.taichinh.entity.LoaiChiPhi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ChiPhiRepository extends JpaRepository<ChiPhi, Integer> {

    // Tìm chi phí theo nhóm
    List<ChiPhi> findByNhom_NhomId(Integer nhomId);

    // Tìm chi phí theo loại
    List<ChiPhi> findByLoaiChiPhi(LoaiChiPhi loaiChiPhi);

    // Tìm chi phí theo nhóm và loại
    List<ChiPhi> findByNhom_NhomIdAndLoaiChiPhi(Integer nhomId, LoaiChiPhi loaiChiPhi);

    // Tìm chi phí trong khoảng thời gian
    List<ChiPhi> findByNgayPhatSinhBetween(LocalDate startDate, LocalDate endDate);

    // Tìm chi phí của nhóm trong khoảng thời gian
    List<ChiPhi> findByNhom_NhomIdAndNgayPhatSinhBetween(Integer nhomId, LocalDate startDate, LocalDate endDate);

    // Tính tổng chi phí theo nhóm
    @Query("SELECT COALESCE(SUM(c.soTien), 0) FROM ChiPhi c WHERE c.nhom.nhomId = :nhomId")
    Double findTongChiPhiByNhom(@Param("nhomId") Integer nhomId);

    // Tính tổng chi phí theo nhóm và loại
    @Query("SELECT COALESCE(SUM(c.soTien), 0) FROM ChiPhi c WHERE c.nhom.nhomId = :nhomId AND c.loaiChiPhi = :loaiChiPhi")
    Double findTongChiPhiByNhomAndLoai(@Param("nhomId") Integer nhomId, @Param("loaiChiPhi") LoaiChiPhi loaiChiPhi);

    // Thống kê chi phí theo loại trong nhóm
    @Query("SELECT c.loaiChiPhi, SUM(c.soTien) FROM ChiPhi c WHERE c.nhom.nhomId = :nhomId GROUP BY c.loaiChiPhi")
    List<Object[]> thongKeChiPhiTheoLoai(@Param("nhomId") Integer nhomId);

    // Tìm chi phí chưa được chia
    @Query("SELECT c FROM ChiPhi c WHERE c.nhom.nhomId = :nhomId AND SIZE(c.danhSachChia) = 0")
    List<ChiPhi> findChiPhiChuaChia(@Param("nhomId") Integer nhomId);
}