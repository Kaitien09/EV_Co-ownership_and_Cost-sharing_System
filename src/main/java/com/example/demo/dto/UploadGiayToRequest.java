package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UploadGiayToRequest {
    
    @NotBlank(message = "Loại giấy tờ không được để trống")
    private String loaiGiayTo; // CCCD, GPLX, HoKhau
    
    @NotBlank(message = "Số giấy tờ không được để trống")
    private String soGiayTo;
    
    @NotBlank(message = "Hình ảnh mặt trước không được để trống")
    private String hinhAnhMatTruoc; // Base64 encoded
    
    private String hinhAnhMatSau; // Base64 encoded (optional for some documents)
    
    private LocalDate ngayCap;
    
    private String noiCap;
    
    private String ghiChu;
}
