package com.vlad.helpdeskserver.service.ticket;

import com.vlad.helpdeskserver.dto.TicketDTO;
import com.vlad.helpdeskserver.dto.TicketResponse;
import com.vlad.helpdeskserver.enums.TicketStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TicketService {
    TicketDTO create(TicketDTO ticketDTO);
    void changeStatus(Long id, TicketStatus ticketStatus);
    void changeExecutor(Long id, String executorUsername);
//    void changeCommentBefore(Long id, String comment);
    TicketDTO getTicket(Long id);
    TicketResponse getTicketResponse(Long id);
    List<TicketDTO> getAllTickets();
    List<TicketDTO> getAllTicketsBySender(String username);

    List<TicketResponse> getAllTicketResponse();
    List<TicketResponse> getAllTicketResponse(TicketStatus status);

    Page<TicketResponse> getAllTicketResponse(Pageable pageable, TicketStatus status);
    Page<TicketResponse> getAllTicketResponse(Pageable pageable, TicketStatus status, String username);
    Page<TicketResponse> getAllTicketResponse(Pageable pageable);
    Page<TicketResponse> getAllTicketResponse(Pageable pageable, String username);

}
