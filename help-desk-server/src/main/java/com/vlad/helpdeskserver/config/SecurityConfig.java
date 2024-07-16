//package com.vlad.helpdeskserver.config;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.Customizer;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.ldap.authentication.ad.ActiveDirectoryLdapAuthenticationProvider;
//import org.springframework.security.ldap.userdetails.LdapUserDetailsMapper;
//import org.springframework.security.ldap.userdetails.PersonContextMapper;
//import org.springframework.security.ldap.userdetails.UserDetailsContextMapper;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//    @Value("${active.directory.domain}")
//    private String adDomain;
//    @Value("${active.directory.ldap}")
//    private String adLdap;
//
//    @Bean
//    ActiveDirectoryLdapAuthenticationProvider authenticationProvider() {
//        ActiveDirectoryLdapAuthenticationProvider provider = new ActiveDirectoryLdapAuthenticationProvider(adDomain, adLdap);
//        provider.setUserDetailsContextMapper(new PersonContextMapper());
//
//        return provider;
//    }
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
//        http
//                .authorizeHttpRequests(auth ->
//                        auth.anyRequest().authenticated())
//                .formLogin(Customizer.withDefaults());
//
//        return http.build();
//    }
//
//    @Bean
//    public UserDetailsContextMapper userDetailsContextMapper() {
//        return new LdapUserDetailsMapper();
//    }
//
//}
