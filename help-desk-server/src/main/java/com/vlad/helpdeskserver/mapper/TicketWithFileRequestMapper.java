//package com.vlad.helpdeskserver.mapper;
//
//import com.vlad.helpdeskserver.dto.MessageDTO;
//import com.vlad.helpdeskserver.dto.TicketDTO;
//import com.vlad.helpdeskserver.dto.requests.TicketWithFileRequest;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.File;
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.util.List;
//
//public class TicketWithFileRequestMapper {
//
//    private static final String UPLOADED_FOLDER = "../uploads/";
//
//    public TicketDTO saveFile(TicketWithFileRequest ticketWithFileRequest) throws IOException {
//
//        MessageWithFile messageWithFile = ticketWithFileRequest.getMessage();
//        List<MultipartFile> fileList;
//
//        if(messageWithFile.getFileList() != null) {
//            fileList = messageWithFile.getFileList();
//        } else fileList = null;
//
//        TicketDTO ticketDTO = new TicketDTO(ticketWithFileRequest);
//        MessageDTO messageDTO = new MessageDTO(messageWithFile);
//
//        Path directoryPath = Paths.get(UPLOADED_FOLDER);
//        if (!Files.exists(directoryPath)) {
//            Files.createDirectories(directoryPath);
//        }
//
//        if(fileList != null) {
//            for (MultipartFile multipartFile : fileList) {
//                try {
//                    File file = new File(UPLOADED_FOLDER + multipartFile.getOriginalFilename());
//                    multipartFile.transferTo(file);
//                    messageDTO.addFileUrl(file.toURI().toString());
//                } catch (IOException e) {
//                    System.out.println(e.getMessage());
//                }
//            }
//        } else messageDTO.setFileUrlList(null);
//
//        ticketDTO.setMessage(messageDTO);
//        return ticketDTO;
//    }
//}
