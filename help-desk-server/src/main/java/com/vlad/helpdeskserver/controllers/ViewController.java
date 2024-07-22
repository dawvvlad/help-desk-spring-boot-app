package com.vlad.helpdeskserver.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class ViewController {
    @GetMapping
    public String index() {
        return "index.html";
    }

    @GetMapping("ticket/**")
    public String getTicket() {
        return "forward:/index.html";
    }

    @GetMapping("tickets/**")
    public String getTickets() {
        return "forward:/index.html";
    }

    @GetMapping("settings/**")
    public String settings() {
        return "forward:/index.html";
    }

//
//    @GetMapping("tickets/all")
//    public String newTickets() {
//        return "index.html";
//    }
//
//    @GetMapping("tickets/all")
//    public String closedTickets() {
//        return "index.html";
//    }
//
//    @GetMapping("tickets/all")
//    public String openTickets() {
//        return "index.html";
//    }
//
//    @GetMapping("tickets/all")
//    public String allTickets() {
//        return "index.html";
//    }
//
//    @GetMapping("tickets/all")
//    public String allTickets() {
//        return "index.html";
//    }

//

}
