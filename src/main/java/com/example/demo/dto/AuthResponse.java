package com.example.demo.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {
    
    private String token;
    @Builder.Default
    private String tokenType = "Bearer";
    private Integer nguoiDungId;
    private String tenDangNhap;
    private String email;
    private String loaiNguoiDung;
    private String message;
}
