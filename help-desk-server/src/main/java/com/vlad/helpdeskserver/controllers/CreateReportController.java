package com.vlad.helpdeskserver.controllers;

import com.vlad.helpdeskserver.service.CreateReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class CreateReportController {

    private final CreateReportService createReportService;

    @Autowired
    public CreateReportController(final CreateReportService createReportService) {
        this.createReportService = createReportService;
    }

    @GetMapping("/excel")
    public ResponseEntity<InputStreamResource> createReport(@RequestBody Map<String, String> dates) throws IOException {

        ByteArrayInputStream in = createReportService.generateReport(dates.get("startDate"), dates.get("endDate"));

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=tickets_report.xlsx");
        return ResponseEntity.ok().headers(headers).body(new InputStreamResource(in));
    }

}
