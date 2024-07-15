package com.vlad.helpdeskserver.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "file")
public class MessageFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;


}
