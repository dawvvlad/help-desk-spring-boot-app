package com.vlad.helpdeskserver.dao.theme;

import com.vlad.helpdeskserver.entity.Theme;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Repository
public class ThemeRepoImpl implements ThemeRepo{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public void save(Theme theme) {
        entityManager.persist(theme);
    }

    @Override
    @Transactional
    public void update(Theme theme) {
        entityManager.merge(theme);
    }

    @Override
    @Transactional
    public void delete(Theme theme) {
        entityManager.remove(theme);
    }

    @Override
    @Transactional
    public Theme findById(Long id) {
        try {
            return entityManager.find(Theme.class, id);
        } catch (NoResultException e) {
            return null;
        }
    }

    @Override
    @Transactional
    public Theme findByName(String name) {
        try {
            return entityManager.createQuery("select t from Theme t where t.name=:name", Theme.class)
                    .setParameter("name", name)
                    .getSingleResult();
        } catch (NoResultException exception) {
            return null;
        }
    }

    @Override
    @Transactional
    public List<Theme> findAll() {
        try {
            return entityManager.createQuery("from Theme", Theme.class)
                    .getResultList();
        } catch (NoResultException e) {
            return Collections.emptyList();
        }
    }
}
