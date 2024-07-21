package com.vlad.helpdeskserver.controllers;

import com.vlad.helpdeskserver.dto.BannerDTO;
import com.vlad.helpdeskserver.dto.ThemeDTO;
import com.vlad.helpdeskserver.dto.TicketDTO;
import com.vlad.helpdeskserver.dto.TicketResponse;
import com.vlad.helpdeskserver.enums.TicketStatus;
import com.vlad.helpdeskserver.exception_handling.NoSuchValueException;
import com.vlad.helpdeskserver.service.banner.BannerService;
import com.vlad.helpdeskserver.service.theme.ThemeService;
import com.vlad.helpdeskserver.service.ticket.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
public class ApiAdminController {

    private final ThemeService themeService;
    private final TicketService ticketService;
    private final BannerService bannerService;

    @Autowired
    public ApiAdminController(ThemeService themeService, TicketService ticketService, BannerService bannerService) {
        this.themeService = themeService;
        this.ticketService = ticketService;
        this.bannerService = bannerService;
    }

    @GetMapping("/tickets")
    public ResponseEntity<List<TicketResponse>> getAllTickets() {
        List<TicketResponse> tickets = ticketService.getAllTicketResponse();

        if(tickets == null) {
            throw new NoSuchValueException("Tickets not found");
        }

        return ResponseEntity.status(HttpStatus.OK).body(tickets);
    }

    @GetMapping("/ticketsPages")
    public Page<TicketResponse> getAllTicketsPages(@RequestParam(defaultValue = "0") int page,
                                                   @RequestParam(defaultValue = "10") int size) {


        return ticketService.getAllTicketResponse(PageRequest.of(page, size));
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

//    @PatchMapping("/changeTicketCommentBeforeClose/{ticketId}")
//    public void changeCommentBeforeClose(@PathVariable("ticketId") Long id, @RequestBody Map<String, String> comment) {
//        ticketService.changeCommentBefore(id, comment.get("comment"));
//    }

    @PostMapping("/createBanner")
    public void createBanner(@RequestBody BannerDTO bannerDTO) {
        bannerService.create(bannerDTO);
    }

    @GetMapping("/banners/{id}")
    public ResponseEntity<BannerDTO> getBanner(@PathVariable("id") Long id) {
        BannerDTO bannerDTO = bannerService.findById(id);

        if(bannerDTO == null) {
            throw new NoSuchValueException("Banner not found");
        }

        return ResponseEntity.status(HttpStatus.OK).body(bannerDTO);
    }

    @DeleteMapping("/deleteBanner/{id}")
    public void deleteBanner(@PathVariable("id") Long id) {
        bannerService.delete(id);
    }

    @PatchMapping("/changeBannerStatus/{id}")
    public void changeBannerStatus(@PathVariable("id") Long id, @RequestBody Map<String, String> status) {
        bannerService.changeStatus(id, status.get("status"));
    }

    @PatchMapping("/changeBanner/{id}")
    public void changeBanner(@PathVariable("id") Long id, Map<String, String> changes) {
        if(changes.get("title") != null) {
            bannerService.changeTitle(id, changes.get("status"));
        }
        if(changes.get("description") != null) {
            bannerService.changeDescription(id, changes.get("description"));
        }
    }

    @GetMapping("/banners")
    public ResponseEntity<List<BannerDTO>> getAllBanners() {
        List<BannerDTO> bannerDTOs = bannerService.findAll();

        if(bannerDTOs == null) {
            throw new NoSuchValueException("Banners not found");
        }

        return ResponseEntity.status(HttpStatus.OK).body(bannerDTOs);
    }
}
