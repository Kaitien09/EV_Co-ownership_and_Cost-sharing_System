package com.evshare.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Entity
@Table(name = "quy_chung")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuyChung {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer quyId;

    @Column(nullable = false)
    private Integer nhomId;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal soDu;

    @PrePersist
    protected void onCreate() {
        if (soDu == null) {
            soDu = BigDecimal.ZERO;
        }
    }
}