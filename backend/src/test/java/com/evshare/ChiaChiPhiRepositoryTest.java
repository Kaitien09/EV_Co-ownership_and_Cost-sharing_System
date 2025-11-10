package com.evshare;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@AutoConfigureMockMvc
public class TaiChinhControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testTaoChiPhi() throws Exception {
        String json = """
        {
          "nhomId": 1,
          "loaiChiPhi": "BaoDuong",
          "soTien": 1200000,
          "ngayPhatSinh": "2025-11-06",
          "ghiChu": "Bảo dưỡng định kỳ"
        }
        """;

        mockMvc.perform(post("/api/chiphi")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.chiPhiId").exists())
                .andExpect(jsonPath("$.soTien").value(1200000));
    }

    @Test
    public void testThanhToan() throws Exception {
        mockMvc.perform(post("/api/thanh-toan/5")
                        .param("phuongThuc", "ViDienTu"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.trangThai").value("DaThanhToan"));
    }

    @Test
    public void testNapQuy() throws Exception {
        mockMvc.perform(post("/api/quy/nap")
                        .param("nhomId", "1")
                        .param("soTien", "500000")
                        .param("moTa", "NapQuyDauThang"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.soDu").value(500000));
    }
}

