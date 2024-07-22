package com.vlad.helpdeskserver.dao.ticket;

import com.vlad.helpdeskserver.entity.Ticket;
import com.vlad.helpdeskserver.enums.TicketStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepo {
    void save(Ticket ticket);
    void update(Ticket ticket);
    Ticket findById(Long id);
    List<Ticket> findAll();
    List<Ticket> findAllByUsername(String username);
    List<Ticket> findAllByStatus(TicketStatus status);

    Page<Ticket> findAll(Pageable pageable);
    Page<Ticket> findAll(Pageable pageable, TicketStatus status);
    Page<Ticket> findAll(Pageable pageable, TicketStatus status, String username);
    Page<Ticket> findAll(Pageable pageable, String username);
}
