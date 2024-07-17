package com.vlad.helpdeskserver.dao.banner;

import com.vlad.helpdeskserver.entity.Banner;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BannerRepo {
    void save(Banner banner);
    void update(Banner banner);
    void delete(Banner banner);
    Banner find(Long id);
    List<Banner> findAll();
}
