package com.evshare.nguoidung.repository;

import com.evshare.nguoidung.entity.NguoiDung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NguoiDungRepository extends JpaRepository<NguoiDung, Integer> {
    
    Optional<NguoiDung> findByEmail(String email);
    
    Optional<NguoiDung> findByTenDangNhap(String tenDangNhap);
    
    boolean existsByEmail(String email);
    
    boolean existsByTenDangNhap(String tenDangNhap);
}
