package com.vlad.helpdeskserver.entity;

import com.vlad.helpdeskserver.enums.TicketPrioriry;
import com.vlad.helpdeskserver.enums.TicketStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tickets")
@Getter
@Setter
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "theme_id")
    private Theme theme;

    @Column(name = "sender_username")
    private String sender;

    @Column(name = "executor_username")
    private String executor;

    @Enumerated(EnumType.STRING)
    @Column(name = "priority")
    private TicketPrioriry priority;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private TicketStatus status;

    @Column(name = "datetime")
    private String dateTime;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "message")
    private Message message;

    @Column(name = "comment_after_close")
    private String commentAfterClose = null;

    @Column(name = "closed_datetime")
    private String closedDatetime = null;

    public Ticket() {}
    public Ticket(String sender, String executor, TicketPrioriry priority, TicketStatus status, String dateTime) {
        this.sender = sender;
        this.executor = executor;
        this.priority = priority;
        this.status = status;
        this.dateTime = dateTime;
    }

    public void addMessage(Message mes) {
        if(mes != null) {
            if(this.message == null) {
                this.message = new Message();
            }
            this.message.setText(mes.getText());
            if(mes.getFileList() != null && !mes.getFileList().isEmpty()) {
                for(MessageFile file : mes.getFileList()) {
                    this.message.addFile(file);
                }
            } else this.message.setFileList(null);
        } else this.message = null;
    }

    public void addTheme(Theme theme) {
        if(theme != null) {
            if(this.theme == null) {
                this.theme = new Theme();
            }
            this.setTheme(theme);
        } else this.theme = null;
    }
}
