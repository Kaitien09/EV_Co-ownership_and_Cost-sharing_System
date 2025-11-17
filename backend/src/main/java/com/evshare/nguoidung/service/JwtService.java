package com.evshare.nguoidung.service;

import com.evshare.nguoidung.config.JwtConfigurationProperties;
import com.evshare.nguoidung.entity.NguoiDung;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtService {
    
    private final JwtConfigurationProperties jwtConfig;
    
    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    
    public String generateToken(NguoiDung nguoiDung) {
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("id", nguoiDung.getNguoiDungId());
        extraClaims.put("role", nguoiDung.getLoaiNguoiDung().name());
        return generateToken(extraClaims, nguoiDung);
    }
    
    public String generateToken(Map<String, Object> extraClaims, NguoiDung nguoiDung) {
        return buildToken(extraClaims, nguoiDung, jwtConfig.getExpiration());
    }
    
    private String buildToken(
            Map<String, Object> extraClaims,
            NguoiDung nguoiDung,
            long expiration
    ) {
        return Jwts
                .builder()
                .claims(extraClaims)
                .subject(nguoiDung.getEmail())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey())
                .compact();
    }
    
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String email = extractEmail(token);
        return (email.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }
    
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    
    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
    
    private SecretKey getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtConfig.getSecret());
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
