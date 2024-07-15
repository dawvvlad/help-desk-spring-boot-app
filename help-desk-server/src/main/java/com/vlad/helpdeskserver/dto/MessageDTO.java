package com.vlad.helpdeskserver.dto;

import com.vlad.helpdeskserver.entity.Message;
import com.vlad.helpdeskserver.entity.MessageFile;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class MessageDTO {
    private Long id;
    private String text;
    private List<String> fileUrlList;

    public MessageDTO() {}
    public MessageDTO(Message message) {
        this.text = message.getText();
        if(this.fileUrlList == null) {
            this.fileUrlList = new ArrayList<>();
        }

        for(MessageFile file : message.getFileList()) {
            this.fileUrlList.add(file.getFilePath());
        }
    }

    public void addFileUrl(String filePath) {
        if(this.fileUrlList == null) {
            this.fileUrlList = new ArrayList<>();
        }
        this.fileUrlList.add(filePath);
    }
}
