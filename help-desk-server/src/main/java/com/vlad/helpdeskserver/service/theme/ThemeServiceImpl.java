package com.vlad.helpdeskserver.service.theme;

import com.vlad.helpdeskserver.dao.theme.ThemeRepo;
import com.vlad.helpdeskserver.dto.ThemeDTO;
import com.vlad.helpdeskserver.entity.Theme;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class ThemeServiceImpl implements ThemeService {

    private final ThemeRepo themeRepo;

    @Autowired
    public ThemeServiceImpl(ThemeRepo themeRepo) {
        this.themeRepo = themeRepo;
    }

    @Override
    public void create(String name) {
        Theme theme = new Theme(name);
        themeRepo.save(theme);

        System.out.println("Создано: " + theme);
    }

    @Override
    public void changeName(Long id, String name) {
        Theme theme = themeRepo.findById(id);
        theme.setName(name);

        themeRepo.update(theme);
    }

    @Override
    public void delete(Long id) {
        Theme theme = themeRepo.findById(id);
        themeRepo.delete(theme);
    }

    @Override
    public ThemeDTO getTheme(Long id) {
        Theme theme = themeRepo.findById(id);
        return theme != null ? new ThemeDTO(theme) : null;
    }

    @Override
    public List<ThemeDTO> getAllThemes() {
        List<Theme> list = themeRepo.findAll();
        List<ThemeDTO> themeDTOs = new ArrayList<>();
        for(Theme theme : list) {
            themeDTOs.add(new ThemeDTO(theme));
        }

        return themeDTOs.isEmpty() ? Collections.emptyList() : themeDTOs;
    }
}
