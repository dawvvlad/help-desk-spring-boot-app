package com.vlad.helpdeskserver.service.ticket;

import com.vlad.helpdeskserver.dao.theme.ThemeRepo;
import com.vlad.helpdeskserver.dao.ticket.TicketRepo;
import com.vlad.helpdeskserver.dto.MessageDTO;
import com.vlad.helpdeskserver.dto.TicketDTO;
import com.vlad.helpdeskserver.dto.TicketResponse;
import com.vlad.helpdeskserver.entity.Message;
import com.vlad.helpdeskserver.entity.MessageFile;
import com.vlad.helpdeskserver.entity.Theme;
import com.vlad.helpdeskserver.entity.Ticket;
import com.vlad.helpdeskserver.enums.TicketStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

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
        Theme theme;
        Message message;

        if(ticketDTO.getThemeId() != null) {
            theme = themeRepo.findById(ticketDTO.getThemeId());
        } else theme = null;

        if(ticketDTO.getMessage() != null) {
           message = new Message(ticketDTO.getMessage().getText());
            for(String url : ticketDTO.getMessage().getFileUrlList()) {
                message.addFile(new MessageFile(url));
            }
        } else message = null;

        Ticket ticket = new Ticket(ticketDTO.getSender(),
                ticketDTO.getExecutor(),
                ticketDTO.getPriority(),
                ticketDTO.getStatus(),
                ticketDTO.getDateTime());

        ticket.addTheme(theme);
        ticket.addMessage(message);

        System.out.println("Заявка создана");

        ticketRepo.save(ticket);
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

//    @Override
//    public void changeCommentBefore(Long id, String comment) {
//        Ticket ticket = ticketRepo.findById(id);
//        ticket.setCommentBeforeClose(comment);
//        ticketRepo.update(ticket);
//    }

    @Override
    public TicketDTO getTicket(Long id) {
        Ticket ticket = ticketRepo.findById(id);

        System.out.println("Найдено: " + ticket);

        return new TicketDTO(ticket);
    }

    @Override
    public TicketResponse getTicketResponse(Long id) {
        Ticket ticket = ticketRepo.findById(id);

        System.out.println("Найдено: " + ticket);

        return new TicketResponse(ticket);
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

    @Override
    public List<TicketResponse> getAllTicketResponse() {
        List<Ticket> ticketList = ticketRepo.findAll();
        System.out.println("Найдено: " + ticketList);

        if(ticketList.isEmpty()) {
            System.out.println("Лист пуст. Возвращен пустой лист!");

            return Collections.emptyList();
        }
        List<TicketResponse> ticketDTOList = new ArrayList<>();
        for(Ticket ticket : ticketList) {
            ticketDTOList.add(new TicketResponse(ticket));
        }
        return ticketDTOList;
    }

    @Override
    public List<TicketResponse> getAllTicketResponse(TicketStatus status) {
        List<Ticket> tickets = ticketRepo.findAllByStatus(status);
        List<TicketResponse> ticketResponseList = new ArrayList<>();

        if(tickets.isEmpty()) {
            return Collections.emptyList();
        } else {
            for(Ticket ticket : tickets) {
                ticketResponseList.add(new TicketResponse(ticket));
            }
            return ticketResponseList;
        }

    }

    @Override
    public Page<TicketResponse> getAllTicketResponse(Pageable pageable) {
        Page<Ticket> ticketsPage = ticketRepo.findAll(pageable);
        List<TicketResponse> ticketResponseList = ticketsPage
                .stream()
                .map(TicketResponse::new)
                .collect(Collectors.toList());


        return new PageImpl<>(ticketResponseList, pageable, ticketsPage.getTotalElements());
    }

    @Override
    public Page<TicketResponse> getAllTicketResponse(Pageable pageable, String username) {
        Page<Ticket> ticketsPage = ticketRepo.findAll(pageable, username);
        List<TicketResponse> ticketResponseList = ticketsPage
                .stream()
                .map(TicketResponse::new)
                .collect(Collectors.toList());

        return new PageImpl<>(ticketResponseList, pageable, ticketsPage.getTotalElements());
    }

    @Override
    public Page<TicketResponse> getAllTicketResponse(Pageable pageable, TicketStatus status) {
        Page<Ticket> ticketsPage = ticketRepo.findAll(pageable, status);
        List<TicketResponse> ticketResponseList = ticketsPage
                .stream()
                .map(TicketResponse::new)
                .collect(Collectors.toList());


        return new PageImpl<>(ticketResponseList, pageable, ticketsPage.getTotalElements());
    }

    @Override
    public Page<TicketResponse> getAllTicketResponse(Pageable pageable, TicketStatus status, String username) {
        Page<Ticket> ticketsPage = ticketRepo.findAll(pageable, status, username);
        List<TicketResponse> ticketResponseList = ticketsPage
                .stream()
                .map(TicketResponse::new)
                .collect(Collectors.toList());


        return new PageImpl<>(ticketResponseList, pageable, ticketsPage.getTotalElements());
    }

    @Override
    public List<TicketDTO> getAllTicketsBySender(String username) {
        List<Ticket> tickets = ticketRepo.findAllByUsername(username);
        List<TicketDTO> ticketDTOList = new ArrayList<>();

        if(tickets.isEmpty()) {
            return Collections.emptyList();
        } else {
            for(Ticket ticket : tickets) {
                ticketDTOList.add(new TicketDTO(ticket));
            }
            return ticketDTOList;
        }

    }

}
