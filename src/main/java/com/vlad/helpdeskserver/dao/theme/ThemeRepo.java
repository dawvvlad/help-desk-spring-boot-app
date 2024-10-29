package com.vlad.helpdeskserver.dao.theme;

import com.vlad.helpdeskserver.entity.Theme;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThemeRepo {
    void save(Theme theme);
    void update(Theme theme);
    void delete(Theme theme);
    Theme findById(Long id);
    Theme findByName(String name);
    List<Theme> findAll();
}
