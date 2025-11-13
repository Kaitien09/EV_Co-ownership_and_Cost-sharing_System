package com.evshare.taichinh.repository;

import com.evshare.taichinh.entity.ChiaChiPhi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ChiaChiPhiRepository extends JpaRepository<ChiaChiPhi, Integer> {

    // Tìm chia chi phí theo chi phí
    List<ChiaChiPhi> findByChiPhi_ChiPhiId(Integer chiPhiId);

    // Tìm chia chi phí theo chủ xe
    List<ChiaChiPhi> findByChuXe_ChuXeId(Integer chuXeId);

    // Tìm chia chi phí theo nhóm
    List<ChiaChiPhi> findByChiPhi_Nhom_NhomId(Integer nhomId);

    // Tìm chia chi phí của chủ xe trong nhóm
    List<ChiaChiPhi> findByChuXe_ChuXeIdAndChiPhi_Nhom_NhomId(Integer chuXeId, Integer nhomId);

    // Kiểm tra đã chia chi phí cho chủ xe chưa
    boolean existsByChiPhi_ChiPhiIdAndChuXe_ChuXeId(Integer chiPhiId, Integer chuXeId);

    // Tính tổng số tiền phải trả của chủ xe trong nhóm
    @Query("SELECT COALESCE(SUM(c.soTienPhaiTra), 0) FROM ChiaChiPhi c WHERE c.chuXe.chuXeId = :chuXeId AND c.chiPhi.nhom.nhomId = :nhomId")
    Double findTongSoTienPhaiTraByChuXeAndNhom(@Param("chuXeId") Integer chuXeId, @Param("nhomId") Integer nhomId);

    // Tìm chia chi phí chưa thanh toán
    @Query("SELECT c FROM ChiaChiPhi c WHERE c.chuXe.chuXeId = :chuXeId AND NOT EXISTS (SELECT t FROM ThanhToan t WHERE t.chiaChiPhi = c)")
    List<ChiaChiPhi> findChiaChiPhiChuaThanhToan(@Param("chuXeId") Integer chuXeId);

    // Tìm chia chi phí đã thanh toán
    @Query("SELECT c FROM ChiaChiPhi c WHERE c.chuXe.chuXeId = :chuXeId AND EXISTS (SELECT t FROM ThanhToan t WHERE t.chiaChiPhi = c AND t.trangThai = 'DaThanhToan')")
    List<ChiaChiPhi> findChiaChiPhiDaThanhToan(@Param("chuXeId") Integer chuXeId);
}