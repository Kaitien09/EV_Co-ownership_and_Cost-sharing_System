package com.example.demo.dto;

import lombok.*;
import jakarta.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DuyetHopDongRequest {
    
    @NotNull(message = "ID hợp đồng không được để trống")
    private Long idHopDong;
    
    @NotBlank(message = "Trạng thái duyệt không được để trống")
    @Pattern(regexp = "DA_DUYET|TU_CHOI", message = "Trạng thái chỉ có thể là DA_DUYET hoặc TU_CHOI")
    private String trangThai;
    
    private String lyDoTuChoi;
}
