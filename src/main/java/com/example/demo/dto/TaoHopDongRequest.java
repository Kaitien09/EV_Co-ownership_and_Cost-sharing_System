package com.example.demo.dto;

import lombok.*;
import jakarta.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaoHopDongRequest {
    
    @NotNull(message = "ID chủ xe không được để trống")
    private Integer chuXeId;
    
    @NotNull(message = "ID xe không được để trống")
    private Integer xeId;
    
    @NotBlank(message = "Ngày bắt đầu không được để trống")
    private String ngayBatDau; // Format: yyyy-MM-dd'T'HH:mm:ss
    
    private String ngayKetThuc; // Format: yyyy-MM-dd'T'HH:mm:ss (optional)
}
