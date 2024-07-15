package com.vlad.helpdeskserver.service.ticket;

import com.vlad.helpdeskserver.dao.theme.ThemeRepo;
import com.vlad.helpdeskserver.dao.ticket.TicketRepo;
import com.vlad.helpdeskserver.dto.MessageDTO;
import com.vlad.helpdeskserver.dto.TicketDTO;
import com.vlad.helpdeskserver.entity.Message;
import com.vlad.helpdeskserver.entity.MessageFile;
import com.vlad.helpdeskserver.entity.Theme;
import com.vlad.helpdeskserver.entity.Ticket;
import com.vlad.helpdeskserver.enums.TicketStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class TicketServiceImpl implements TicketService {

    private final TicketRepo ticketRepo;
    private final ThemeRepo themeRepo;

    @Autowired
    public TicketServiceImpl(TicketRepo ticketRepo, ThemeRepo themeRepo) {
        this.ticketRepo = ticketRepo;
        this.themeRepo = themeRepo;
    }


    @Override
    public TicketDTO create(TicketDTO ticketDTO) {
        Theme theme = themeRepo.findByName(ticketDTO.getTheme());
        Message message = new Message(ticketDTO.getMessage().getText());

        for(String url : ticketDTO.getMessage().getFileUrlList()) {
            message.addFile(new MessageFile(url));
        }
        Ticket ticket = new Ticket(ticketDTO.getSender(),
                ticketDTO.getExecutor(),
                ticketDTO.getPriority(),
                ticketDTO.getStatus(),
                ticketDTO.getDateTime());

        ticket.setTheme(theme);
        ticket.addMessage(message);

        return ticketDTO;
    }

    @Override
    public void changeStatus(Long id, TicketStatus ticketStatus) {
        Ticket ticket = ticketRepo.findById(id);
        ticket.setStatus(ticketStatus);

        ticketRepo.update(ticket);

        System.out.println("Ticket " + id + " updated: ");
        System.out.println("Status: " + ticketStatus);
    }

    @Override
    public void changeExecutor(Long id, String executorUsername) {
        Ticket ticket = ticketRepo.findById(id);
        ticket.setExecutor(executorUsername);

        ticketRepo.update(ticket);

        System.out.println("Ticket " + id + " updated: ");
        System.out.println("Executor: " + executorUsername);
    }

    @Override
    public TicketDTO getTicket(Long id) {
        Ticket ticket = ticketRepo.findById(id);
        return new TicketDTO(ticket);
    }

    @Override
    public List<TicketDTO> getAllTickets() {
        List<Ticket> ticketList = ticketRepo.findAll();
        List<TicketDTO> ticketDTOList = new ArrayList<>();

        for(Ticket ticket : ticketList) {
            ticketDTOList.add(new TicketDTO(ticket));
        }

        return ticketDTOList.isEmpty() ? Collections.emptyList() : ticketDTOList;
    }
}
