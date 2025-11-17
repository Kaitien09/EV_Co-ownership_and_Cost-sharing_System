package com.evshare.nguoidung.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NguoiDungDTO {
    
    private Integer nguoiDungId;
    private String tenDangNhap;
    private String email;
    private String loaiNguoiDung;
    private LocalDateTime ngayTao;
    private String trangThai;
}
