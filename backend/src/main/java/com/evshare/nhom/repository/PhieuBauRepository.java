package com.evshare.nhom.repository;

import com.evshare.nhom.entity.PhieuBau;
import com.evshare.nhom.entity.LuaChon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PhieuBauRepository extends JpaRepository<PhieuBau, Integer> {

    // Tìm phiếu bầu theo bỏ phiếu
    List<PhieuBau> findByBoPhieu_BoPhieuId(Integer boPhieuId);

    // Tìm phiếu bầu theo chủ xe
    List<PhieuBau> findByChuXe_ChuXeId(Integer chuXeId);

    // Tìm phiếu bầu theo lựa chọn trong bỏ phiếu
    List<PhieuBau> findByBoPhieu_BoPhieuIdAndLuaChon(Integer boPhieuId, LuaChon luaChon);

    // Kiểm tra chủ xe đã bầu trong bỏ phiếu chưa
    boolean existsByBoPhieu_BoPhieuIdAndChuXe_ChuXeId(Integer boPhieuId, Integer chuXeId);

    // Kiểm tra chủ xe đã bầu trong bỏ phiếu chưa (dùng entity)
    boolean existsByBoPhieuAndChuXe(com.evshare.nhom.entity.BoPhieuNhom boPhieu, com.evshare.nguoidung.entity.ChuXe chuXe);

    // Đếm số phiếu bầu theo lựa chọn trong bỏ phiếu
    Long countByBoPhieu_BoPhieuIdAndLuaChon(Integer boPhieuId, LuaChon luaChon);

    // Tìm phiếu bầu của chủ xe trong bỏ phiếu
    Optional<PhieuBau> findByBoPhieu_BoPhieuIdAndChuXe_ChuXeId(Integer boPhieuId, Integer chuXeId);

    // Thống kê kết quả bỏ phiếu
    @Query("SELECT p.luaChon, COUNT(p) FROM PhieuBau p WHERE p.boPhieu.boPhieuId = :boPhieuId GROUP BY p.luaChon")
    List<Object[]> thongKeKetQuaBoPhieu(@Param("boPhieuId") Integer boPhieuId);
}