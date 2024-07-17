package com.vlad.helpdeskserver.dto.requests;

import com.vlad.helpdeskserver.enums.TicketPrioriry;
import com.vlad.helpdeskserver.enums.TicketStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@ToString
public class TicketRequest {
    private Long id;
    private String sender;
    private String executor;
    private Long themeId;

    //message
    private String text;

    private TicketStatus status;
    private TicketPrioriry priority;
    private String dateTime;
    private String commentBeforeClose = null;

    public TicketRequest() {}
}
