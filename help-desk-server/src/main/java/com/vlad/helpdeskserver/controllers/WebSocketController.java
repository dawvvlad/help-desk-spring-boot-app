package com.vlad.helpdeskserver.controllers;

import com.vlad.helpdeskserver.dto.TicketWebsocketMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public WebSocketController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/admin")
    @SendTo("/topic/admin")
    public TicketWebsocketMessage sendTicketToAdmin(TicketWebsocketMessage message) {
        return message;
    }

    @MessageMapping("/chat")
    public TicketWebsocketMessage sendResponseToUser(TicketWebsocketMessage message) {
        String recipient = message.getRecipientUsername();
        messagingTemplate.convertAndSendToUser(recipient, "/queue/reply", message);

        System.out.println("sended to: " + recipient);
        return message;
    }
}
