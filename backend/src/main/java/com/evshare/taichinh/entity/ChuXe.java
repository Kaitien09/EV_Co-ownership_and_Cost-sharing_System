package com.evshare.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "chu_xe")
@Data
public class ChuXe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer chuXeId;

    private String tenChuXe; // tạm thời
}
