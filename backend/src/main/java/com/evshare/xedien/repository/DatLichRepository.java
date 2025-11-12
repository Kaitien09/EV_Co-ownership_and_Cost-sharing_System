package com.example.demo.repository;

import com.example.demo.entity.DatLich;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DatLichRepository extends JpaRepository<DatLich, Integer> {
    boolean existsByXeDien_XeIdAndThoiGianBatDauLessThanEqualAndThoiGianKetThucGreaterThanEqual(
            Integer xeId, java.time.LocalDateTime ketThuc, java.time.LocalDateTime batDau);
}
