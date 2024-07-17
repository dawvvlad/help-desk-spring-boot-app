package com.vlad.helpdeskserver.dao.banner;

import com.vlad.helpdeskserver.entity.Banner;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Repository
public class BannerRepoImpl implements BannerRepo {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public void save(Banner banner) {
        entityManager.persist(banner);
    }

    @Override
    @Transactional
    public void update(Banner banner) {
        entityManager.merge(banner);
    }

    @Override
    @Transactional
    public void delete(Banner banner) {
        entityManager.remove(banner);
    }

    @Override
    @Transactional
    public Banner find(Long id) {
        return entityManager.find(Banner.class, id);
    }

    @Override
    @Transactional
    public List<Banner> findAll() {
        List<Banner> bannerList = entityManager.createQuery("from Banner ", Banner.class)
                .getResultList();
        return bannerList.isEmpty() ? Collections.emptyList() : bannerList;
    }
}
