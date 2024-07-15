package com.vlad.helpdeskserver.controllers;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.ldap.userdetails.Person;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class ApiController {

    //test
    @GetMapping("/info")
    public Map<String, Object> getCurrentUser(Authentication authentication) {
        Map<String, Object> userInfo = new HashMap<>();
        if(authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            userInfo.put("roles", authentication.getDetails());
            userInfo.put("info", authentication.getPrincipal());
            userInfo.put("g", authentication.getCredentials());
        }
        return userInfo;
    }


    //test
    @GetMapping("/hello")
    public Map<String, Object> hello(@AuthenticationPrincipal Person person) {
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("cn", person.getCn());
        userInfo.put("dn", person.getSn());
        userInfo.put("sn", person.getDn());
        userInfo.put("authorities", person.getAuthorities());
        userInfo.put("description", person.getDescription());
        return userInfo;
    }
}
