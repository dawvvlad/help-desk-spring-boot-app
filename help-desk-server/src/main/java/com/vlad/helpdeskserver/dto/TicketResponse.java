package com.vlad.helpdeskserver.dto;

import com.vlad.helpdeskserver.entity.Ticket;
import com.vlad.helpdeskserver.enums.TicketPrioriry;
import com.vlad.helpdeskserver.enums.TicketStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TicketResponse {
        private Long id;
        private String sender;
        private String senderFullName;
        private String executor;
        private String theme;
        private MessageDTO message;
        private TicketStatus status;
        private TicketPrioriry priority;
        private String dateTime;
        private String commentAfterClose = null;
        private String closedDateTime = null;

        public TicketResponse() {}
        public TicketResponse(Ticket ticket) {
                this.id = ticket.getId();
                this.sender = ticket.getSender();
                this.executor = ticket.getExecutor();

                if(ticket.getTheme() == null) {
                        this.theme = null;
                } else this.theme = ticket.getTheme().getName();

                this.status = ticket.getStatus();
                this.priority = ticket.getPriority();
                this.dateTime = ticket.getDateTime();
                this.message = new MessageDTO(ticket.getMessage());
                this.commentAfterClose = ticket.getCommentAfterClose();
                this.closedDateTime = ticket.getClosedDatetime();
                this.senderFullName = ticket.getSenderFullName();
        }
}
