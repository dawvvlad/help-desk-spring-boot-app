package com.vlad.helpdeskserver.dao.ticket;

import com.vlad.helpdeskserver.entity.Ticket;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Repository
public class TicketRepoImpl implements TicketRepo {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public void save(Ticket ticket) {
        entityManager.persist(ticket);
    }

    @Transactional
    @Override
    public Ticket findById(Long id) {
        try {
            return entityManager.find(Ticket.class, id);
        } catch (NoResultException e) {
            return null;
        }
    }

    @Override
    @Transactional
    public List<Ticket> findAll() {
        try {
            return entityManager.createQuery("from Ticket ", Ticket.class)
                    .getResultList();
        } catch (NoResultException e) {
            return Collections.emptyList();
        }
    }
}
