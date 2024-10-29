package com.vlad.helpdeskserver.controllers;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriUtils;

import java.net.MalformedURLException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;

@RestController
@RequestMapping("/uploads")
public class DownloadFileController {

    private final Path fileStorageLocation = Paths.get("uploads").toAbsolutePath().normalize();

//    @GetMapping("/{filename:.+}")
//    public ResponseEntity<Resource> downloadFile(@PathVariable String filename) throws MalformedURLException {
//        try {
//            Path filePath = fileStorageLocation.resolve(filename).normalize();
//            Resource resource = new UrlResource(filePath.toUri());
//
//            if (resource.exists()) {
//                return ResponseEntity.ok()
//                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
//                        .body(resource);
//            } else {
//                return ResponseEntity.notFound().build();
//            }
//        } catch (Exception ex) {
//            return ResponseEntity.internalServerError().build();
//        }
//    }

    @GetMapping(value = "/{filename:.+}", produces = "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    public ResponseEntity<Resource> downloadFile(@PathVariable String filename) throws MalformedURLException {
        try {
            Path filePath = fileStorageLocation.resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                // Кодируем имя файла с использованием UriUtils
                String encodedFilename = UriUtils.encode(Objects.requireNonNull(resource.getFilename()), StandardCharsets.UTF_8);

                // Устанавливаем заголовки ответа с закодированным именем файла
                HttpHeaders headers = new HttpHeaders();
                headers.setContentDispositionFormData("attachment", encodedFilename);

                return ResponseEntity.ok()
                        .headers(headers)
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception ex) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
