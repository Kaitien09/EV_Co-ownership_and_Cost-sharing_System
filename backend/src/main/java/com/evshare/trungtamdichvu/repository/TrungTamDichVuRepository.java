package com.evshare.trungtamdichvu.repository;

import com.evshare.trungtamdichvu.entity.TrungTamDichVu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TrungTamDichVuRepository extends JpaRepository<TrungTamDichVu, Integer> {

    List<TrungTamDichVu> findByTenTrungTamContainingIgnoreCase(String tenTrungTam);
    List<TrungTamDichVu> findByDiaChiContainingIgnoreCase(String diaChi);
    boolean existsByTenTrungTam(String tenTrungTam);

    @Query("SELECT t FROM TrungTamDichVu t WHERE SIZE(t.kyThuatViens) > 0")
    List<TrungTamDichVu> findTrungTamCoKyThuatVien();
}