package com.example.demo.security;

import com.example.demo.repository.NguoiDungRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    
    private final NguoiDungRepository nguoiDungRepository;
    
    @Override
    public UserDetails loadUserByUsername(String emailOrUsername) throws UsernameNotFoundException {
        var nguoiDung = nguoiDungRepository.findByEmail(emailOrUsername)
                .or(() -> nguoiDungRepository.findByTenDangNhap(emailOrUsername))
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        
        return new User(
                nguoiDung.getEmail(),
                nguoiDung.getMatKhau(),
                nguoiDung.getTrangThai() == com.example.demo.entity.NguoiDung.TrangThai.HoatDong,
                true, // accountNonExpired
                true, // credentialsNonExpired
                true, // accountNonLocked
                Collections.singleton(new SimpleGrantedAuthority("ROLE_" + nguoiDung.getLoaiNguoiDung().name()))
        );
    }
}
