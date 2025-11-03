package com.example.demo.dto;

import lombok.*;
import jakarta.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CapNhatHoSoRequest {
    
    @Size(max = 100, message = "Họ tên không được quá 100 ký tự")
    private String hoTen;
    
    @Pattern(regexp = "^[0-9]{10,11}$", message = "Số điện thoại không hợp lệ")
    private String soDienThoai;
    
    @Size(max = 255, message = "Địa chỉ không được quá 255 ký tự")
    private String diaChi;
    
    private String ngaySinh; // Format: yyyy-MM-dd
}
