package com.vlad.helpdeskserver.controllers;

import com.vlad.helpdeskserver.dto.TicketDTO;
import com.vlad.helpdeskserver.service.ticket.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class ApiClientController {

    private final TicketService ticketService;

    @Autowired
    public ApiClientController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping("/createTicket")
    public ResponseEntity<TicketDTO> createTicket(@RequestBody TicketDTO ticketDTO) {
        ticketService.create(ticketDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(ticketDTO);
    }
}
