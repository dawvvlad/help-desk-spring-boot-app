package com.vlad.helpdeskserver.dto;

import com.vlad.helpdeskserver.enums.TicketPrioriry;
import com.vlad.helpdeskserver.enums.TicketStatus;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TicketWebsocketMessage {
    private String message;
    private String theme;
    private TicketStatus status;
    private String recipientUsername;
    private String executor;
    private TicketPrioriry priority;
    private String dateTime;

    public TicketWebsocketMessage() {}
}
