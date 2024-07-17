package com.vlad.helpdeskserver.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vlad.helpdeskserver.dto.requests.TicketWithFileRequest;
//import com.vlad.helpdeskserver.mapper.TicketWithFileRequestMapper;
import com.vlad.helpdeskserver.service.ticket.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1")
public class ApiClientController {

    private final TicketService ticketService;
    private final Path root = Paths.get("uploads/");

    @Autowired
    public ApiClientController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping("/createTicket")
    public ResponseEntity<String> createTicket(@RequestParam("file") List<MultipartFile> files,
                                               @RequestParam("message") String ticketJSON) throws IOException {
        try {
            ObjectMapper mapper = new ObjectMapper();
            TicketWithFileRequest ticket = mapper.readValue(ticketJSON, TicketWithFileRequest.class);

            System.out.println(ticket);
            System.out.println(files);

            for(MultipartFile file : files) {
                Files.copy(file.getInputStream(), this.root.resolve(file.getOriginalFilename()));
            }

            return ResponseEntity.ok("File uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
        }
    }


/* test */
//    //test
//    @GetMapping("/info")
//    public Map<String, Object> getCurrentUser(Authentication authentication) {
//        Map<String, Object> userInfo = new HashMap<>();
//        if(authentication != null && authentication.getPrincipal() instanceof UserDetails) {
//            userInfo.put("roles", authentication.getDetails());
//            userInfo.put("info", authentication.getPrincipal());
//            userInfo.put("g", authentication.getCredentials());
//        }
//        return userInfo;
//    }
//
//
//    //test
//    @GetMapping("/hello")
//    public Map<String, Object> hello(@AuthenticationPrincipal Person person) {
//        Map<String, Object> userInfo = new HashMap<>();
//        userInfo.put("cn", person.getCn());
//        userInfo.put("dn", person.getSn());
//        userInfo.put("sn", person.getDn());
//        userInfo.put("authorities", person.getAuthorities());
//        userInfo.put("description", person.getDescription());
//        return userInfo;
//    }
}
