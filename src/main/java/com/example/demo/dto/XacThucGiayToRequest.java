package com.example.demo.dto;

import lombok.*;
import jakarta.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class XacThucGiayToRequest {
    
    @NotBlank(message = "Số CCCD không được để trống")
    @Pattern(regexp = "^[0-9]{12}$", message = "Số CCCD phải có 12 chữ số")
    private String cccd;
    
    @NotBlank(message = "Ảnh CCCD mặt trước không được để trống")
    private String cccdMatTruoc; // Base64 hoặc URL
    
    @NotBlank(message = "Ảnh CCCD mặt sau không được để trống")
    private String cccdMatSau;
    
    @Pattern(regexp = "^[0-9]{12}$", message = "Số GPLX phải có 12 chữ số")
    private String gplx;
    
    private String gplxImage;
}
