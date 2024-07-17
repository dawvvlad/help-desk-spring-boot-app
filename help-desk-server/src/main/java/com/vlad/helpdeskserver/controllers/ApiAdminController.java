package com.vlad.helpdeskserver.controllers;

import com.vlad.helpdeskserver.dto.ThemeDTO;
import com.vlad.helpdeskserver.dto.TicketDTO;
import com.vlad.helpdeskserver.enums.TicketStatus;
import com.vlad.helpdeskserver.service.theme.ThemeService;
import com.vlad.helpdeskserver.service.ticket.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
public class ApiAdminController {

    private final ThemeService themeService;
    private final TicketService ticketService;

    @Autowired
    public ApiAdminController(ThemeService themeService, TicketService ticketService) {
        this.themeService = themeService;
        this.ticketService = ticketService;
    }

    /* theme */
    @PostMapping("/createTheme")
    public ResponseEntity<ThemeDTO> createTheme(@RequestBody ThemeDTO themeDTO) {
        themeService.create(themeDTO.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(themeDTO);
    }
    @DeleteMapping("/deleteTheme/{id}")
    public ResponseEntity<ThemeDTO> deleteTheme(@PathVariable Long id) {
        themeService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PatchMapping("/changeThemeName/{id}")
    public void changeThemeName(@PathVariable("id") Long id, @RequestBody Map<String, String> body) {
        themeService.changeName(id, body.get("name"));
    }

    @PatchMapping("/changeTicketStatus/{ticketId}")
    public void changeStatus(@PathVariable("ticketId") Long id, @RequestBody Map<String, TicketStatus> body) {
        ticketService.changeStatus(id, body.get("status"));
        System.out.println("Changed status to " + body.get("status"));
    }

    @PatchMapping("/changeTicketExecutor/{ticketId}")
    public void changePriority(@PathVariable("ticketId") Long id, @RequestBody Map<String, String> body) {
        ticketService.changeExecutor(id, body.get("executor"));
    }

    @PatchMapping("/changeTicketCommentBeforeClose/{ticketId}")
    public void changeCommentBeforeClose(@PathVariable("ticketId") Long id, Map<String, String> comment) {
        ticketService.changeCommentBefore(id, comment.get("comment"));
    }


}
