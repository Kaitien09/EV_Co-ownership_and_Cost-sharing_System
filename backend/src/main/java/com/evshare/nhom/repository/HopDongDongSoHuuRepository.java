package com.evshare.nhom.repository;

import com.evshare.nhom.entity.HopDongDongSoHuu;
import com.evshare.nhom.entity.TrangThaiHopDong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface HopDongDongSoHuuRepository extends JpaRepository<HopDongDongSoHuu, Integer> {

    // Tìm hợp đồng theo nhóm
    List<HopDongDongSoHuu> findByNhom_NhomId(Integer nhomId);

    // Tìm hợp đồng theo trạng thái
    List<HopDongDongSoHuu> findByTrangThai(TrangThaiHopDong trangThai);

    // Tìm hợp đồng theo xe
    List<HopDongDongSoHuu> findByXe_XeId(Integer xeId);

    // Tìm hợp đồng theo nhóm và trạng thái
    List<HopDongDongSoHuu> findByNhom_NhomIdAndTrangThai(Integer nhomId, TrangThaiHopDong trangThai);

    // Kiểm tra xe đã có hợp đồng đang hiệu lực
    boolean existsByXe_XeIdAndTrangThai(Integer xeId, TrangThaiHopDong trangThai);

    // Tìm hợp đồng sắp hết hạn (trong vòng 30 ngày tới)
    @Query("SELECT h FROM HopDongDongSoHuu h WHERE h.trangThai = 'DangHieuLuc' AND h.ngayKetThuc BETWEEN :now AND :futureDate")
    List<HopDongDongSoHuu> findHopDongSapHetHan(
            @Param("now") LocalDateTime now,
            @Param("futureDate") LocalDateTime futureDate
    );

    // Tìm hợp đồng đã hết hạn nhưng chưa được cập nhật trạng thái
    @Query("SELECT h FROM HopDongDongSoHuu h WHERE h.trangThai = 'DangHieuLuc' AND h.ngayKetThuc < :now")
    List<HopDongDongSoHuu> findHopDongDaHetHan(@Param("now") LocalDateTime now);

    // Đếm số hợp đồng theo trạng thái trong nhóm
    Long countByNhom_NhomIdAndTrangThai(Integer nhomId, TrangThaiHopDong trangThai);
}