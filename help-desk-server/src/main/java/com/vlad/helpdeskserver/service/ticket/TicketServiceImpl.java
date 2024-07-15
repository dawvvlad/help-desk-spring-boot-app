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
        String themeName = ticketDTO.getTheme();
        Theme theme;
        if(themeName == null) {
            theme = null;
        }
        else {
            theme = themeRepo.findByName(themeName);
        }

        Message message = new Message(ticketDTO.getMessage().getText());

        for(String url : ticketDTO.getMessage().getFileUrlList()) {
            message.addFile(new MessageFile(url));
        }

        Ticket ticket = new Ticket(ticketDTO.getSender(),
                ticketDTO.getExecutor(),
                ticketDTO.getPriority(),
                ticketDTO.getStatus(),
                ticketDTO.getDateTime());

        if(theme != null) {
            ticket.addTheme(theme);
        } else {
            ticket.setTheme(null);
        }
        ticket.addMessage(message);

        System.out.println("Заявка создана");

        return ticketDTO;
    }

    @Override
    public void changeStatus(Long id, TicketStatus ticketStatus) {
        Ticket ticket = ticketRepo.findById(id);
        ticket.setStatus(ticketStatus);

        ticketRepo.update(ticket);

        System.out.println("Заявка " + id + " обновлена: ");
        System.out.println("Статус: " + ticketStatus);
    }

    @Override
    public void changeExecutor(Long id, String executorUsername) {
        Ticket ticket = ticketRepo.findById(id);
        ticket.setExecutor(executorUsername);

        ticketRepo.update(ticket);

        System.out.println("Заявка " + id + " обновлена: ");
        System.out.println("Исполнитель: " + executorUsername);
    }

    @Override
    public TicketDTO getTicket(Long id) {
        Ticket ticket = ticketRepo.findById(id);

        System.out.println("Найдено: " + ticket);

        return new TicketDTO(ticket);
    }

    @Override
    public List<TicketDTO> getAllTickets() {
        List<Ticket> ticketList = ticketRepo.findAll();
        System.out.println("Найдено: " + ticketList);

        if(ticketList.isEmpty()) {

            System.out.println("Лист пуст. Возвращен пустой лист!");

            return Collections.emptyList();
        }
        List<TicketDTO> ticketDTOList = new ArrayList<>();
        for(Ticket ticket : ticketList) {
            ticketDTOList.add(new TicketDTO(ticket));
        }
        return ticketDTOList;
    }
}
