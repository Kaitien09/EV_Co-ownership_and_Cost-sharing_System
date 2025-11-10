package com.evshare.trungtamdichvu.repository;

import com.evshare.trungtamdichvu.entity.LichHenDichVu;
import com.evshare.trungtamdichvu.entity.TrangThaiLichHen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface LichHenDichVuRepository extends JpaRepository<LichHenDichVu, Long> {
    Optional<LichHenDichVu> findByMaLichHen(String maLichHen);
    List<LichHenDichVu> findByTrangThai(TrangThaiLichHen trangThai);
    List<LichHenDichVu> findByThoiGianHenBetween(LocalDateTime start, LocalDateTime end);
    List<LichHenDichVu> findByBienSoXe(String bienSoXe);
    List<LichHenDichVu> findByKyThuatVienId(Long kyThuatVienId);
    List<LichHenDichVu> findByTrungTamId(Long trungTamId);
}