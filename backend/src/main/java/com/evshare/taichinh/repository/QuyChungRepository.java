package com.evshare.taichinh.repository;

import com.evshare.taichinh.entity.QuyChung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface QuyChungRepository extends JpaRepository<QuyChung, Integer> {

    // Tìm quỹ theo nhóm
    Optional<QuyChung> findByNhom_NhomId(Integer nhomId);

    // Kiểm tra quỹ đã tồn tại cho nhóm
    boolean existsByNhom_NhomId(Integer nhomId);

    // Cập nhật số dư quỹ
    @Query("UPDATE QuyChung q SET q.soDu = :soDu WHERE q.quyId = :quyId")
    void capNhatSoDu(@Param("quyId") Integer quyId, @Param("soDu") Double soDu);

    // Tính tổng số dư tất cả quỹ
    @Query("SELECT COALESCE(SUM(q.soDu), 0) FROM QuyChung q")
    Double findTongSoDuTatCaQuy();
}