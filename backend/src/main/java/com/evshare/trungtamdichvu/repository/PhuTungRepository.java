package com.evshare.trungtamdichvu.repository;

import com.evshare.trungtamdichvu.entity.PhuTung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PhuTungRepository extends JpaRepository<PhuTung, Long> {
    Optional<PhuTung> findByMaPhuTung(String maPhuTung);
    boolean existsByMaPhuTung(String maPhuTung);
}