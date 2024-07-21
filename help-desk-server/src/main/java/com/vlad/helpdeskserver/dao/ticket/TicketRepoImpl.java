package com.vlad.helpdeskserver.dao.ticket;

import com.vlad.helpdeskserver.entity.Ticket;
import com.vlad.helpdeskserver.enums.TicketStatus;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
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

    @Override
    @Transactional
    public void update(Ticket ticket) {
        entityManager.merge(ticket);
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
            return entityManager.createQuery("from Ticket t ORDER BY t.id DESC", Ticket.class)
                    .getResultList();
        } catch (NoResultException e) {
            return Collections.emptyList();
        }
    }

    @Override
    @Transactional
    public List<Ticket> findAllByUsername(String username) {
        try {
            return entityManager.createQuery("select t from Ticket t where t.sender=:name ORDER BY t.id DESC", Ticket.class)
                    .setParameter("name", username)
                    .getResultList();
        } catch (NoResultException e) {
            return Collections.emptyList();
        }
    }

    @Override
    public List<Ticket> findAllByStatus(TicketStatus status) {
        try {
            return entityManager.createQuery("select t from Ticket t where t.status=:status ORDER BY t.id DESC", Ticket.class)
                    .setParameter("status", status)
                    .getResultList();
        } catch (NoResultException e) {
            return Collections.emptyList();
        }
    }

    @Override
    public Page<Ticket> findAll(Pageable pageable) {
        String queryStr = "select t from Ticket t order by t.id desc";
        TypedQuery<Ticket> query = entityManager.createQuery(queryStr, Ticket.class);

        int totalRows = query.getResultList().size();
        query.setFirstResult((int) pageable.getOffset());
        query.setMaxResults(pageable.getPageSize());

        List<Ticket> items = query.getResultList();

        return new PageImpl<>(items, pageable, totalRows);
    }
}
