package com.vlad.helpdeskserver.dao.ticket;

import com.vlad.helpdeskserver.entity.Ticket;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepo {
    void save(Ticket ticket);
    void update(Ticket ticket);
    Ticket findById(Long id);
    List<Ticket> findAll();
}
