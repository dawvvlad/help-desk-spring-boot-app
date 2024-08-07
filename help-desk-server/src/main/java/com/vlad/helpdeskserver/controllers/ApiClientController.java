package com.vlad.helpdeskserver.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vlad.helpdeskserver.dto.MessageDTO;
import com.vlad.helpdeskserver.dto.ThemeDTO;
import com.vlad.helpdeskserver.dto.TicketDTO;
import com.vlad.helpdeskserver.dto.TicketResponse;
import com.vlad.helpdeskserver.dto.requests.TicketRequest;

import com.vlad.helpdeskserver.enums.TicketStatus;
import com.vlad.helpdeskserver.exception_handling.NoSuchValueException;
import com.vlad.helpdeskserver.service.FileUploader;
import com.vlad.helpdeskserver.service.theme.ThemeService;
import com.vlad.helpdeskserver.service.ticket.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
    private final ThemeService themeService;

    private static final Logger logger = LoggerFactory.getLogger(ApiClientController.class);

    @Autowired
    public ApiClientController(TicketService ticketService, ThemeService themeService) {
        this.ticketService = ticketService;
        this.themeService = themeService;
    }

//    @GetMapping("/tickets/{id}")
//    public ResponseEntity<TicketDTO> getTicket(@PathVariable("id") Long id) {
//        TicketDTO ticketDTO = ticketService.getTicket(id);
//
//        if(ticketDTO == null) {
//            throw new NoSuchValueException("Ticket not found");
//        }
//
//        return ResponseEntity.status(HttpStatus.OK).body(ticketDTO);
//    }

    @GetMapping("/ticket/{id}")
    public ResponseEntity<TicketResponse> getTicket(@PathVariable("id") Long id) {
        TicketResponse ticketResponse = ticketService.getTicketResponse(id);

        if(ticketResponse == null) {
            throw new NoSuchValueException("Ticket not found");
        }

        return ResponseEntity.status(HttpStatus.OK).body(ticketResponse);
    }

    @GetMapping("/ticketsPages/{status}")
    public Page<TicketResponse> getAllTicketsPages(@PathVariable("status") TicketStatus status,
                                                   @RequestParam(defaultValue = "0") int page,
                                                   @RequestParam(defaultValue = "14") int size,
                                                   @RequestParam("username") String username) {

        return ticketService.getAllTicketResponse(PageRequest.of(page, size), status, username);
    }

    @GetMapping("/ticketsPages")
    public Page<TicketResponse> getAllTicketsPages(@RequestParam(defaultValue = "0") int page,
                                                   @RequestParam(defaultValue = "14") int size,
                                                   @RequestParam("username") String username) {

        return ticketService.getAllTicketResponse(PageRequest.of(page, size), username);
    }

    @GetMapping("/themes")
    public ResponseEntity<List<ThemeDTO>> getAllThemes() {
        List<ThemeDTO> themes = themeService.getAllThemes();

        if(themes == null) {
            throw new NoSuchValueException("Themes not found");
        }

        return ResponseEntity.status(HttpStatus.OK).body(themes);
    }

    @PostMapping("/createTicket")
    public ResponseEntity<?> createTicket(@RequestParam(value = "file", required = false)  List<MultipartFile> files,
                                               @RequestParam("message") String ticketJSON) throws IOException {

        try {
            // map to POJO
            ObjectMapper mapper = new ObjectMapper();
            // read JSON and map to Ticket class
            TicketRequest ticket = mapper.readValue(ticketJSON, TicketRequest.class);
            FileUploader fileUploader = new FileUploader();

            List<String> filePaths;
            if(files != null && !files.isEmpty()) {
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


}
