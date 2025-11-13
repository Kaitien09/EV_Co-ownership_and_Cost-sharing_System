package com.evshare.taichinh.repository;

import com.evshare.taichinh.entity.ThanhToan;
import com.evshare.taichinh.entity.TrangThaiThanhToan;
import com.evshare.taichinh.entity.PhuongThucThanhToan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ThanhToanRepository extends JpaRepository<ThanhToan, Integer> {

    // Tìm thanh toán theo chủ xe
    List<ThanhToan> findByChuXe_ChuXeId(Integer chuXeId);

    // Tìm thanh toán theo trạng thái
    List<ThanhToan> findByTrangThai(TrangThaiThanhToan trangThai);

    // Tìm thanh toán theo phương thức
    List<ThanhToan> findByPhuongThuc(PhuongThucThanhToan phuongThuc);

    // Tìm thanh toán theo chia chi phí
    Optional<ThanhToan> findByChiaChiPhi_ChiaChiPhiId(Integer chiaChiPhiId);

    // Tìm thanh toán của chủ xe theo trạng thái
    List<ThanhToan> findByChuXe_ChuXeIdAndTrangThai(Integer chuXeId, TrangThaiThanhToan trangThai);

    // Tìm thanh toán trong khoảng thời gian
    List<ThanhToan> findByNgayThanhToanBetween(LocalDateTime startDate, LocalDateTime endDate);

    // Tính tổng số tiền đã thanh toán theo chủ xe
    @Query("SELECT COALESCE(SUM(t.soTienThanhToan), 0) FROM ThanhToan t WHERE t.chuXe.chuXeId = :chuXeId AND t.trangThai = 'DaThanhToan'")
    Double findTongSoTienDaThanhToanByChuXe(@Param("chuXeId") Integer chuXeId);

    // Tính tổng số tiền chưa thanh toán theo chủ xe
    @Query("SELECT COALESCE(SUM(c.soTienPhaiTra), 0) FROM ChiaChiPhi c WHERE c.chuXe.chuXeId = :chuXeId AND NOT EXISTS (SELECT t FROM ThanhToan t WHERE t.chiaChiPhi = c AND t.trangThai = 'DaThanhToan')")
    Double findTongSoTienChuaThanhToanByChuXe(@Param("chuXeId") Integer chuXeId);

    // Kiểm tra mã giao dịch đã tồn tại
    boolean existsByMaGiaoDich(String maGiaoDich);

    // Tìm thanh toán theo mã giao dịch
    Optional<ThanhToan> findByMaGiaoDich(String maGiaoDich);
}