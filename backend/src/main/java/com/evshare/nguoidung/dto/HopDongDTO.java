package com.evshare.nguoidung.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HopDongDTO {
    
    private Integer hopDongId;
    private Integer xeId;
    private Integer chuXeId;
    private LocalDateTime ngayBatDau;
    private LocalDateTime ngayKetThuc;
    
    // Workflow fields
    private String trangThai;
    private Integer nguoiDuyet;
    private LocalDateTime ngayDuyet;
    private String lyDoTuChoi;
}
