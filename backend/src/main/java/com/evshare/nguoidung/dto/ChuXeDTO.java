package com.evshare.nguoidung.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChuXeDTO {
    
    private Integer chuXeId;
    private Integer nguoiDungId;
    private String hoTen;
    private String cccd;
    private String sdt;
    private String gplx;
    private String diaChi;
}
