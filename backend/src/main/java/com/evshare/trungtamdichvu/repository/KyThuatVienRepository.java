package com.evshare.trungtamdichvu.repository;

import com.evshare.trungtamdichvu.entity.KyThuatVien;
import com.evshare.trungtamdichvu.entity.TrangThaiKyThuatVien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface KyThuatVienRepository extends JpaRepository<KyThuatVien, Long> {
    Optional<KyThuatVien> findByMaKyThuatVien(String maKyThuatVien);
    List<KyThuatVien> findByTrangThai(TrangThaiKyThuatVien trangThai);
    List<KyThuatVien> findByTrungTamId(Long trungTamId);
    boolean existsByMaKyThuatVien(String maKyThuatVien);
}