package com.evshare.trungtamdichvu.repository;

import com.evshare.trungtamdichvu.entity.PhieuDichVu;
import com.evshare.trungtamdichvu.entity.TrangThaiPhieuDichVu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PhieuDichVuRepository extends JpaRepository<PhieuDichVu, Long> {
    Optional<PhieuDichVu> findByMaPhieu(String maPhieu);
    List<PhieuDichVu> findByTrangThai(TrangThaiPhieuDichVu trangThai);
    Optional<PhieuDichVu> findByLichHenId(Long lichHenId);
}