package com.vlad.helpdeskserver.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "message")
@Getter
@Setter
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "comment")
    private String text;

    @OneToMany(mappedBy = "message", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MessageFile> fileList;

    public Message() {}
    public Message(String text) {
        this.text = text;
    }

    public void addFile(MessageFile file) {
        if(this.fileList == null) {
            this.fileList = new ArrayList<>();
        }
        this.fileList.add(file);
        file.setMessage(this);
    }
}
