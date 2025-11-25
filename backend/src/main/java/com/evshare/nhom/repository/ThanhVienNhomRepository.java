package com.evshare.nhom.repository;

import com.evshare.nhom.entity.ThanhVienNhom;
import com.evshare.nhom.entity.VaiTro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ThanhVienNhomRepository extends JpaRepository<ThanhVienNhom, Integer> {

    // Tìm thành viên theo nhóm
    List<ThanhVienNhom> findByNhom_NhomId(Integer nhomId);

    // Tìm thành viên theo chủ xe
    List<ThanhVienNhom> findByChuXe_ChuXeId(Integer chuXeId);

    // Tìm thành viên theo xe
    List<ThanhVienNhom> findByXe_XeId(Integer xeId);

    // Tìm DANH SÁCH thành viên theo vai trò trong nhóm
    List<ThanhVienNhom> findByNhom_NhomIdAndVaiTro(Integer nhomId, VaiTro vaiTro);

    // Kiểm tra thành viên đã tồn tại trong nhóm với xe
    boolean existsByChuXe_ChuXeIdAndNhom_NhomIdAndXe_XeId(Integer chuXeId, Integer nhomId, Integer xeId);

    // Tính tổng tỷ lệ sở hữu trong nhóm
    @Query("SELECT COALESCE(SUM(t.tyLeSoHuu), 0) FROM ThanhVienNhom t WHERE t.nhom.nhomId = :nhomId")
    Double findTongTyLeSoHuuByNhom(@Param("nhomId") Integer nhomId);

    // Đếm số thành viên trong nhóm
    Long countByNhom_NhomId(Integer nhomId);

    // Tìm TRƯỞNG NHÓM (chỉ 1 người)
    Optional<ThanhVienNhom> findTruongNhomByNhom_NhomIdAndVaiTro(Integer nhomId, VaiTro vaiTro);
}