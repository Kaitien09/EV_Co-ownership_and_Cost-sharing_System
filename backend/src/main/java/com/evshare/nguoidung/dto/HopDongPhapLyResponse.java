package com.evshare.nguoidung.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HopDongPhapLyResponse {
    private Integer hopDongPhapLyId;
    private Integer hopDongDongSoHuuId;
    private String noiDungHopDong;
    private String trangThai;
    private Integer nguoiKyId;
    private LocalDateTime ngayKy;
    private LocalDateTime ngayTao;
    private boolean daKy;
    private String chuKyDienTu;
}
