package com.vlad.helpdeskserver.service.ticket;

import com.vlad.helpdeskserver.dto.TicketDTO;
import com.vlad.helpdeskserver.enums.TicketStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TicketService {
    TicketDTO create(TicketDTO ticketDTO);
    void changeStatus(Long id, TicketStatus ticketStatus);
    void changeExecutor(Long id, String executorUsername);

    TicketDTO getTicket(Long id);
    List<TicketDTO> getAllTickets();
    List<TicketDTO> getAllTicketsBySender(String username);
}
