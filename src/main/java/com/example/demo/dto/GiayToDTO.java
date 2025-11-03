package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GiayToDTO {
    
    private Integer id;
    private Integer chuXeId;
    private String loaiGiayTo;
    private String soGiayTo;
    private String hinhAnhMatTruoc; // Base64
    private String hinhAnhMatSau; // Base64
    private LocalDate ngayCap;
    private String noiCap;
    private String trangThaiXacThuc;
    private Integer nguoiDuyet;
    private LocalDateTime ngayDuyet;
    private String lyDoTuChoi;
    private String ghiChu;
    private LocalDateTime ngayTao;
    private LocalDateTime ngayCapNhat;
}
