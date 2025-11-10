package com.evshare.trungtamdichvu.repository;

import com.evshare.trungtamdichvu.entity.TrungTamDichVu;
import com.evshare.trungtamdichvu.entity.TrangThaiTrungTam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface TrungTamDichVuRepository extends JpaRepository<TrungTamDichVu, Long> {
    Optional<TrungTamDichVu> findByMaTrungTam(String maTrungTam);
    List<TrungTamDichVu> findByTrangThai(TrangThaiTrungTam trangThai);
    boolean existsByMaTrungTam(String maTrungTam);
}