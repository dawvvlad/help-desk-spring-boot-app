package com.vlad.helpdeskserver.dto;

import com.vlad.helpdeskserver.entity.Theme;
import com.vlad.helpdeskserver.entity.Ticket;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ThemeDTO {
    private Long id;
    private String name;
    private List<TicketDTO> ticketList;

    public ThemeDTO() {}
    public ThemeDTO(Theme theme) {
        this.name = theme.getName();
    }

    public void addTicket(TicketDTO ticketDTO) {
        if(this.ticketList == null) {
            this.ticketList = new ArrayList<>();
        }

        this.ticketList.add(ticketDTO);
    }
}
