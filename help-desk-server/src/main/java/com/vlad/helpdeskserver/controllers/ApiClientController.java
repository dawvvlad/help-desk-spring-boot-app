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
