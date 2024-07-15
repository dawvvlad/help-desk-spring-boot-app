package com.vlad.helpdeskserver.dao.ticket;

import com.vlad.helpdeskserver.entity.Ticket;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepo {
    void save(Ticket ticket);

}
