package com.evshare.nhom.repository;

import com.evshare.nhom.entity.NhomDongSoHuu;
import com.evshare.nhom.entity.TrangThaiNhom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface NhomDongSoHuuRepository extends JpaRepository<NhomDongSoHuu, Integer> {

    // Tìm nhóm theo trạng thái
    List<NhomDongSoHuu> findByTrangThai(TrangThaiNhom trangThai);

    // Tìm nhóm theo tên (tìm kiếm gần đúng)
    List<NhomDongSoHuu> findByTenNhomContainingIgnoreCase(String tenNhom);

    // Kiểm tra nhóm có tồn tại theo tên
    boolean existsByTenNhom(String tenNhom);

    // Đếm số nhóm theo trạng thái
    Long countByTrangThai(TrangThaiNhom trangThai);
}