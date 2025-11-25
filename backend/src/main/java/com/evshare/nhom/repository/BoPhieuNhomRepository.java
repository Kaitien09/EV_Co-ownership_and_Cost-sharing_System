package com.evshare.nhom.repository;

import com.evshare.nhom.entity.BoPhieuNhom;
import com.evshare.nhom.entity.TrangThaiBoPhieu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BoPhieuNhomRepository extends JpaRepository<BoPhieuNhom, Integer> {

    // Tìm bỏ phiếu theo nhóm
    List<BoPhieuNhom> findByNhom_NhomId(Integer nhomId);

    // Tìm bỏ phiếu theo trạng thái
    List<BoPhieuNhom> findByTrangThai(TrangThaiBoPhieu trangThai);

    // Tìm bỏ phiếu theo nhóm và trạng thái
    List<BoPhieuNhom> findByNhom_NhomIdAndTrangThai(Integer nhomId, TrangThaiBoPhieu trangThai);

    // Tìm bỏ phiếu đã hết hạn (ngày kết thúc đã qua nhưng vẫn đang bầu)
    @Query("SELECT b FROM BoPhieuNhom b WHERE b.trangThai = 'DangBau' AND b.ngayKetThuc < :now")
    List<BoPhieuNhom> findBoPhieuHetHan(@Param("now") LocalDateTime now);

    // Đếm số bỏ phiếu theo trạng thái trong nhóm
    Long countByNhom_NhomIdAndTrangThai(Integer nhomId, TrangThaiBoPhieu trangThai);
}