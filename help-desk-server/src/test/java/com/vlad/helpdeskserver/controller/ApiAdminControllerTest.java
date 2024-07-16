package com.vlad.helpdeskserver.controller;

import com.vlad.helpdeskserver.dto.ThemeDTO;
import com.vlad.helpdeskserver.service.theme.ThemeService;
import com.vlad.helpdeskserver.service.ticket.TicketService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.HashMap;
import java.util.Map;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class ApiAdminControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ThemeService themeService;

    @MockBean
    private TicketService ticketService;

    @Test
    public void testCreateTheme() throws Exception {
        String themeName = "New Theme";
        ThemeDTO themeDTO = new ThemeDTO();
        themeDTO.setName(themeName);

        mockMvc.perform(post("/api/v1/admin/createTheme")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\": \"" + themeName + "\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value(themeName));

        verify(themeService, times(1)).create(themeName);
    }

    @Test
    public void testUpdateTheme() throws Exception {
        Long id = 1L;
        String themeName = "New Theme";

        Map<String, String> map = new HashMap<>();
        map.put("name", themeName);

        mockMvc.perform(patch("/api/v1/admin/changeThemeName/{id}", id)
        .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\": \"" + themeName + "\"}"))
                .andExpect(status().isOk());

        verify(themeService, times(1)).changeName(id, themeName);
    }
}
