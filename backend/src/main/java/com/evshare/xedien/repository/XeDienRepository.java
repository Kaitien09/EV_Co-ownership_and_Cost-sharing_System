package com.evshare.xedien.repository;

import com.evshare.xedien.entity.XeDien;
import com.evshare.xedien.entity.TrangThaiXe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface XeDienRepository extends JpaRepository<XeDien, Integer> {

    // Tìm xe theo VIN
    Optional<XeDien> findByVin(String vin);

    // Tìm xe theo biển số
    Optional<XeDien> findByBienSo(String bienSo);

    // Tìm xe theo trạng thái
    List<XeDien> findByTrangThai(TrangThaiXe trangThai);

    // Tìm xe theo model
    List<XeDien> findByModelContainingIgnoreCase(String model);

    // Kiểm tra VIN đã tồn tại
    boolean existsByVin(String vin);

    // Kiểm tra biển số đã tồn tại
    boolean existsByBienSo(String bienSo);

    // Tìm xe có sẵn trong khoảng thời gian
    @Query("SELECT x FROM XeDien x WHERE x.trangThai = 'DangTrong' AND x.xeId NOT IN " +
            "(SELECT d.xe.xeId FROM DatLich d WHERE d.trangThai = 'DaDuyet' AND " +
            "((d.thoiGianBatDau BETWEEN :start AND :end) OR (d.thoiGianKetThuc BETWEEN :start AND :end) OR " +
            "(d.thoiGianBatDau <= :start AND d.thoiGianKetThuc >= :end)))")
    List<XeDien> findXeSanTrongKhoangThoiGian(@Param("start") java.time.LocalDateTime start,
                                              @Param("end") java.time.LocalDateTime end);

    // Đếm số xe theo trạng thái
    Long countByTrangThai(TrangThaiXe trangThai);
}