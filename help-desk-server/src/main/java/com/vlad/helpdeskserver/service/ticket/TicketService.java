package com.vlad.helpdeskserver.service.ticket;

import com.vlad.helpdeskserver.dto.TicketDTO;
import com.vlad.helpdeskserver.dto.TicketResponse;
import com.vlad.helpdeskserver.enums.TicketStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TicketService {
    TicketDTO create(TicketDTO ticketDTO);
    void changeStatus(Long id, TicketStatus ticketStatus);
    void changeExecutor(Long id, String executorUsername);
//    void changeCommentBefore(Long id, String comment);
    TicketDTO getTicket(Long id);
    List<TicketDTO> getAllTickets();
    List<TicketDTO> getAllTicketsBySender(String username);

    List<TicketResponse> getAllTicketResponseBySender(String username);
    List<TicketResponse> getAllTicketResponse();
    List<TicketResponse> getAllTicketResponseByStatus(TicketStatus status);

}
