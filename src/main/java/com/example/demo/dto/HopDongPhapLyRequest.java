package com.example.demo.dto;

import lombok.Data;

@Data
public class HopDongPhapLyRequest {
    private Integer hopDongDongSoHuuId;
    private String noiDungHopDong;
    private String tepHopDong; // Base64 encoded PDF
}
