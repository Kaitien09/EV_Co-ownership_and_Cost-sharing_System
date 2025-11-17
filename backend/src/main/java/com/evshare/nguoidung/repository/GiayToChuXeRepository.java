package com.evshare.nguoidung.repository;

import com.evshare.nguoidung.entity.GiayToChuXe;
import com.evshare.nguoidung.entity.GiayToChuXe.TrangThaiXacThuc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GiayToChuXeRepository extends JpaRepository<GiayToChuXe, Integer> {
    
    List<GiayToChuXe> findByChuXeId(Integer chuXeId);
    
    List<GiayToChuXe> findByTrangThaiXacThuc(TrangThaiXacThuc trangThai);
    
    List<GiayToChuXe> findByTrangThaiXacThucAndLoaiGiayTo(TrangThaiXacThuc trangThai, String loaiGiayTo);
}
