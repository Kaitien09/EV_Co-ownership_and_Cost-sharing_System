package com.example.demo.repository;

import com.example.demo.entity.XeDien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface XeDienRepository extends JpaRepository<XeDien, Integer> {
}
