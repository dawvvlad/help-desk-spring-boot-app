package com.vlad.helpdeskserver.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TicketWebsocketMessage {
    private String message = "";
    private String recipientUsername = null;
    private String dateTime = null;

    public TicketWebsocketMessage() {}
}
