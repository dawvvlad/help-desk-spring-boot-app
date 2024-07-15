package com.vlad.helpdeskserver.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "THEME")
@Getter
@Setter
public class Theme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "theme")
    private List<Ticket> ticketList;

    public Theme() {}

    public Theme(String name) {
        this.name = name;
    }

    public Theme(String name, List<Ticket> list) {
        this.name = name;
        this.ticketList.addAll(list);
    }

    public void addTicket(Ticket ticket) {
        if(this.ticketList == null) {
            this.ticketList = new ArrayList<>();
        }
        this.ticketList.add(ticket);
    }
}
