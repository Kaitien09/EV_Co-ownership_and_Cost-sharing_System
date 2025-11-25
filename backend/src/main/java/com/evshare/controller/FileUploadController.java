package com.evshare.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "http://localhost:3000")
public class FileUploadController {

    private final String UPLOAD_DIR = System.getProperty("user.dir") + File.separator + "uploads" + File.separator;

    @PostMapping("/gplx")
    public ResponseEntity<Map<String, String>> uploadGplx(
            @RequestParam("file") MultipartFile file) {

        Map<String, String> response = new HashMap<>();

        System.out.println("=== UPLOAD START ===");
        System.out.println("Upload directory: " + UPLOAD_DIR);

        if (file == null || file.isEmpty()) {
            response.put("error", "File không được để trống");
            return ResponseEntity.badRequest().body(response);
        }

        try {
            System.out.println("File name: " + file.getOriginalFilename());
            System.out.println("File size: " + file.getSize());

            // Kiểm tra loại file
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                response.put("error", "Chỉ chấp nhận file ảnh");
                return ResponseEntity.badRequest().body(response);
            }

            // Tạo thư mục
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
                System.out.println("Created directory: " + uploadPath.toAbsolutePath());
            }

            // Tạo tên file
            String originalFileName = file.getOriginalFilename();
            String fileExtension = "";
            if (originalFileName != null && originalFileName.contains(".")) {
                fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
            }
            String fileName = "gplx_" + UUID.randomUUID().toString() + fileExtension;
            String filePath = UPLOAD_DIR + fileName;

            System.out.println("Saving to: " + filePath);

            // Lưu file
            Files.copy(file.getInputStream(), Paths.get(filePath));

            System.out.println("=== UPLOAD SUCCESS ===");
            System.out.println("File saved: " + fileName);

            response.put("filePath", fileName);
            response.put("message", "Upload ảnh GPLX thành công");
            return ResponseEntity.ok(response);

        } catch (IOException e) {
            System.out.println("=== UPLOAD ERROR ===");
            e.printStackTrace();

            response.put("error", "Upload thất bại: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    // THÊM METHOD NÀY ĐỂ XEM ẢNH
    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(UPLOAD_DIR).resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() || resource.isReadable()) {
                String contentType = Files.probeContentType(filePath);
                if (contentType == null) {
                    contentType = "application/octet-stream";
                }

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }
}