package com.vlad.helpdeskserver.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "theme")
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

    @Column(name = "description")
    private String description;

    public Theme() {}

    public Theme(String name) {
        this.name = name;
    }

    public Theme(String name, String description, List<Ticket> list) {
        this.name = name;
        this.description = description;
        this.ticketList.addAll(list);
    }
}
