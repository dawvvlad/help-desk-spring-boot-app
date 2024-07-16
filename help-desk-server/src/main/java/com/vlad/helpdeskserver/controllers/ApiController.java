package com.vlad.helpdeskserver.controllers;

import com.vlad.helpdeskserver.dto.ThemeDTO;
import com.vlad.helpdeskserver.dto.TicketDTO;
import com.vlad.helpdeskserver.enums.TicketStatus;
import com.vlad.helpdeskserver.service.theme.ThemeService;
import com.vlad.helpdeskserver.service.ticket.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.ldap.userdetails.Person;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {

    private final ThemeService themeService;
    private final TicketService ticketService;

    @Autowired
    public ApiController(ThemeService themeService, TicketService ticketService) {
        this.themeService = themeService;
        this.ticketService = ticketService;
    }

    @PostMapping("/createTheme")
    public ResponseEntity<ThemeDTO> createTheme(@RequestBody ThemeDTO themeDTO) {
        themeService.create(themeDTO.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(themeDTO);
    }

    @PostMapping("/createTicket")
    public ResponseEntity<TicketDTO> createTicket(@RequestBody TicketDTO ticketDTO) {
        ticketService.create(ticketDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(ticketDTO);
    }

    @PatchMapping("/changeStatus/{id}")
    public void changeStatus(@PathVariable("id") Long id, @RequestBody Map<String, TicketStatus> body) {
        ticketService.changeStatus(id, body.get("status"));
        System.out.println("Changed status to " + body.get("status"));
    }

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
