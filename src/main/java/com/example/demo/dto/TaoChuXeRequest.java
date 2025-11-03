package com.example.demo.dto;

import lombok.*;
import jakarta.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaoChuXeRequest {
    
    @NotNull(message = "ID người dùng không được để trống")
    private Integer nguoiDungId;
    
    @NotBlank(message = "Họ tên không được để trống")
    @Size(max = 100, message = "Họ tên không được quá 100 ký tự")
    private String hoTen;
    
    @Pattern(regexp = "^[0-9]{9,12}$", message = "CCCD không hợp lệ (9-12 chữ số)")
    private String cccd;
    
    @Pattern(regexp = "^[0-9]{10,11}$", message = "Số điện thoại không hợp lệ")
    private String sdt;
    
    private String gplx;
    
    private String diaChi;
}
