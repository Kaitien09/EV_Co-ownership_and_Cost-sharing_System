package com.evshare.trungtamdichvu.repository;

import com.evshare.trungtamdichvu.entity.PhieuDichVu;
import com.evshare.trungtamdichvu.entity.TrangThaiPhieuDichVu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PhieuDichVuRepository extends JpaRepository<PhieuDichVu, Integer> {

    Optional<PhieuDichVu> findByLichHen_LichHenId(Integer lichHenId);
    List<PhieuDichVu> findByKyThuatVien_KyThuatVienId(Integer kyThuatVienId);
    List<PhieuDichVu> findByTrangThai(TrangThaiPhieuDichVu trangThai);
    List<PhieuDichVu> findByLichHen_Xe_XeId(Integer xeId);
    List<PhieuDichVu> findByLichHen_ChuXe_ChuXeId(Integer chuXeId);

    @Query("SELECT p FROM PhieuDichVu p WHERE p.ngayTiepNhan BETWEEN :start AND :end")
    List<PhieuDichVu> findByNgayTiepNhanBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT p FROM PhieuDichVu p WHERE p.kyThuatVien IS NULL AND p.trangThai = 'Moi'")
    List<PhieuDichVu> findPhieuChuaPhanCong();

    @Query("SELECT p.trangThai, COUNT(p) FROM PhieuDichVu p GROUP BY p.trangThai")
    List<Object[]> thongKePhieuDichVuTheoTrangThai();
}