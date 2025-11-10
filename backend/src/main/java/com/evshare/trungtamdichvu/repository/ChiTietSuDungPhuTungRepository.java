package com.evshare.trungtamdichvu.repository;

import com.evshare.trungtamdichvu.entity.ChiTietSuDungPhuTung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ChiTietSuDungPhuTungRepository extends JpaRepository<ChiTietSuDungPhuTung, Long> {
    List<ChiTietSuDungPhuTung> findByPhieuDichVuId(Long phieuDichVuId);
    List<ChiTietSuDungPhuTung> findByPhuTungId(Long phuTungId);
}