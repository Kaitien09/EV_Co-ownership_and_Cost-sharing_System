package com.evshare.nguoidung.repository;

import com.evshare.nguoidung.entity.ChuXe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChuXeRepository extends JpaRepository<ChuXe, Integer> {
    
    Optional<ChuXe> findByNguoiDungId(Integer nguoiDungId);
    
    Optional<ChuXe> findByCccd(String cccd);
    
    boolean existsByNguoiDungId(Integer nguoiDungId);
    
    boolean existsByCccd(String cccd);
}
