package com.evshare.trungtamdichvu.repository;

import com.evshare.trungtamdichvu.entity.LichHenDichVu;
import com.evshare.trungtamdichvu.entity.LoaiDichVu;
import com.evshare.trungtamdichvu.entity.TrangThaiLichHen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LichHenDichVuRepository extends JpaRepository<LichHenDichVu, Integer> {

    List<LichHenDichVu> findByChuXe_ChuXeId(Integer chuXeId);
    List<LichHenDichVu> findByXe_XeId(Integer xeId);
    List<LichHenDichVu> findByTrungTam_TrungTamId(Integer trungTamId);
    List<LichHenDichVu> findByTrangThai(TrangThaiLichHen trangThai);
    List<LichHenDichVu> findByLoaiDichVu(LoaiDichVu loaiDichVu);
    List<LichHenDichVu> findByNgayHenBetween(LocalDateTime start, LocalDateTime end);

    @Query("SELECT l FROM LichHenDichVu l WHERE l.trungTam.trungTamId = :trungTamId AND l.ngayHen BETWEEN :start AND :end")
    List<LichHenDichVu> findByTrungTamAndNgayHenBetween(@Param("trungTamId") Integer trungTamId,
                                                        @Param("start") LocalDateTime start,
                                                        @Param("end") LocalDateTime end);

    @Query("SELECT COUNT(l) > 0 FROM LichHenDichVu l WHERE l.trungTam.trungTamId = :trungTamId AND l.ngayHen = :ngayHen AND l.trangThai IN ('ChoXacNhan', 'DaXacNhan')")
    boolean existsLichHenTrung(@Param("trungTamId") Integer trungTamId, @Param("ngayHen") LocalDateTime ngayHen);

    @Query("SELECT l.trangThai, COUNT(l) FROM LichHenDichVu l GROUP BY l.trangThai")
    List<Object[]> thongKeLichHenTheoTrangThai();
}