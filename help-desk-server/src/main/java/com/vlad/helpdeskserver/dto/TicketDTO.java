package com.vlad.helpdeskserver.dto;

import com.vlad.helpdeskserver.dto.requests.TicketRequest;
import com.vlad.helpdeskserver.entity.Ticket;
import com.vlad.helpdeskserver.enums.TicketPrioriry;
import com.vlad.helpdeskserver.enums.TicketStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TicketDTO {
    private Long id;
    private String sender;
    private String executor;
    private Long themeId;
    private MessageDTO message;
    private TicketStatus status;
    private TicketPrioriry priority;
    private String dateTime;
    private String commentBeforeClose;

    public TicketDTO() {}
    public TicketDTO(Ticket ticket) {
        this.id = ticket.getId();
        this.sender = ticket.getSender();
        this.executor = ticket.getExecutor();
        this.themeId = ticket.getTheme().getId();
        this.status = ticket.getStatus();
        this.priority = ticket.getPriority();
        this.dateTime = ticket.getDateTime();
        this.message = new MessageDTO(ticket.getMessage());
//        this.commentBeforeClose = ticket.getCommentBeforeClose();
    }

    public TicketDTO(TicketRequest ticketWithFileRequest) {
        this.id = ticketWithFileRequest.getId();
        this.sender = ticketWithFileRequest.getSender();
        this.executor = ticketWithFileRequest.getExecutor();
        this.themeId = ticketWithFileRequest.getThemeId();
        this.status = ticketWithFileRequest.getStatus();
        this.priority = ticketWithFileRequest.getPriority();
        this.dateTime = ticketWithFileRequest.getDateTime();
        this.commentBeforeClose = ticketWithFileRequest.getCommentBeforeClose();
    }

}
