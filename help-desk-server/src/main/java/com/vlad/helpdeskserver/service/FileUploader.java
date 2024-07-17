package com.vlad.helpdeskserver.service;

import com.vlad.helpdeskserver.controllers.ApiClientController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class FileUploader {
    private final Path root = Paths.get("uploads");
    private final Logger logger = LoggerFactory.getLogger(ApiClientController.class);
    private final Random random = new Random();

    public FileUploader() {}

    public List<String> uploadFiles(List<MultipartFile> files) throws IOException {

        if (!Files.exists(root)) {
            Files.createDirectories(root);
        }

        // Список путей файла
        List<String> filePaths = new ArrayList<>();

        if (files != null) {
            for (MultipartFile file : files) {
                String originalFileName = file.getOriginalFilename();
                if (originalFileName == null || originalFileName.isEmpty()) {
                    continue; // Пропускаем файлы без имени
                }

                String fileName = originalFileName;
                Path filePath = root.resolve(fileName);

                while (Files.exists(filePath)) {
                    String fileExtension = "";
                    int dotIndex = fileName.lastIndexOf('.');
                    if (dotIndex > 0) {
                        fileExtension = fileName.substring(dotIndex);
                        fileName = fileName.substring(0, dotIndex);
                    }
                    fileName = fileName + "_" + random.nextInt(10000) + fileExtension;
                    filePath = root.resolve(fileName);
                }

                Files.copy(file.getInputStream(), filePath);
                filePaths.add(filePath.toString());
            }
        }

        logger.info("Uploaded files: {}", filePaths);

        return filePaths;
    }
}
