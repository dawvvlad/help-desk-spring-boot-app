package com.vlad.helpdeskserver.service.theme;

import com.vlad.helpdeskserver.dto.ThemeDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ThemeService {
    void create(String name);
    void changeName(Long id, String name);
    void changeDescription(Long id, String description);
    void delete(Long id);
    ThemeDTO getTheme(Long id);
    List<ThemeDTO> getAllThemes();
}
