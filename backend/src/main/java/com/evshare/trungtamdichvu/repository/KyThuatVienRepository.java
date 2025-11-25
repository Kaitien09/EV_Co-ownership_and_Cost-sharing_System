package com.evshare.trungtamdichvu.repository;

import com.evshare.trungtamdichvu.entity.KyThuatVien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface KyThuatVienRepository extends JpaRepository<KyThuatVien, Integer> {

    List<KyThuatVien> findByTrungTam_TrungTamId(Integer trungTamId);
    List<KyThuatVien> findByHoTenContainingIgnoreCase(String hoTen);
    List<KyThuatVien> findByChuyenMon(String chuyenMon);
    List<KyThuatVien> findByDangLamViec(Boolean dangLamViec);
    Optional<KyThuatVien> findByEmail(String email);

    @Query("SELECT k FROM KyThuatVien k WHERE k.trungTam.trungTamId = :trungTamId AND k.dangLamViec = true")
    List<KyThuatVien> findKyThuatVienDangLamViecByTrungTam(@Param("trungTamId") Integer trungTamId);

    @Query("SELECT k.chuyenMon, COUNT(k) FROM KyThuatVien k WHERE k.dangLamViec = true GROUP BY k.chuyenMon")
    List<Object[]> thongKeKyThuatVienTheoChuyenMon();
}