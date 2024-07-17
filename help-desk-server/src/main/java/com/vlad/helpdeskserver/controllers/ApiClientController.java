package com.vlad.helpdeskserver.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vlad.helpdeskserver.dto.MessageDTO;
import com.vlad.helpdeskserver.dto.TicketDTO;
import com.vlad.helpdeskserver.dto.requests.TicketRequest;

import com.vlad.helpdeskserver.service.FileUploader;
import com.vlad.helpdeskserver.service.ticket.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ApiClientController {

    private final TicketService ticketService;
    private static final Logger logger = LoggerFactory.getLogger(ApiClientController.class);

    @Autowired
    public ApiClientController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping("/createTicket")
    public ResponseEntity<?> createTicket(@RequestParam("file") List<MultipartFile> files,
                                               @RequestParam("message") String ticketJSON) throws IOException {
        try {
            // map to POJO
            ObjectMapper mapper = new ObjectMapper();
            // read JSON and map to Ticket class
            TicketRequest ticket = mapper.readValue(ticketJSON, TicketRequest.class);
            FileUploader fileUploader = new FileUploader();

            List<String> filePaths;
            if(files != null) {
                filePaths = fileUploader.uploadFiles(files);
            } else {
                filePaths = Collections.emptyList();
            }

            TicketDTO ticketDTO = new TicketDTO(ticket);

            MessageDTO messageDTO = new MessageDTO();
            messageDTO.setText(ticket.getText());
            messageDTO.setFileUrlList(filePaths);

            ticketDTO.setMessage(messageDTO);
            ticketService.create(ticketDTO);

            return ResponseEntity.status(HttpStatus.CREATED).body(ticketDTO);
        } catch (IOException e) {
            logger.error("Error uploading files", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload files");
        } catch (Exception e) {
            logger.error("Unexpected error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error occurred");
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
