package com.evshare.repository;

import com.evshare.entity.QuyChung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface QuyChungRepository extends JpaRepository<QuyChung, Integer> {

    Optional<QuyChung> findByNhomId(Integer nhomId);
}