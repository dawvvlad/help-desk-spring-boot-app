package com.vlad.helpdeskserver.service;

import com.vlad.helpdeskserver.dao.ticket.TicketRepo;
import com.vlad.helpdeskserver.entity.Ticket;
import com.vlad.helpdeskserver.enums.TicketPrioriry;
import com.vlad.helpdeskserver.enums.TicketStatus;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class CreateReportService {
    TicketRepo ticketRepo;

    @Autowired
    public CreateReportService(TicketRepo ticketRepo) {
        this.ticketRepo = ticketRepo;
    }

    public ByteArrayInputStream generateReport(String startDate, String endDate) throws IOException {
        List<Ticket> tickets = ticketRepo.findByDateBetween(startDate, endDate);
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try(Workbook wb = new XSSFWorkbook()) {
            Sheet sheet = wb.createSheet("Report");

            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("Номер заявки");
            header.createCell(1).setCellValue("Имя отправителя");
            header.createCell(2).setCellValue("Время отправки");
            header.createCell(3).setCellValue("Тема заявки");
            header.createCell(4).setCellValue("Статус");
            header.createCell(5).setCellValue("Приоритет");
            header.createCell(6).setCellValue("Комментарий отправителя");
            header.createCell(7).setCellValue("Имя исполнителя");
            header.createCell(8).setCellValue("Время закрытия");
            header.createCell(9).setCellValue("Комментарий исполнителя");

            int rowIdx = 1;
            for (Ticket ticket : tickets) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(ticket.getId());
                row.createCell(1).setCellValue(ticket.getSenderFullName());
                row.createCell(2).setCellValue(ticket.getDateTime());

                if(ticket.getTheme() != null) {
                    row.createCell(3).setCellValue(ticket.getTheme().getName());
                } else {
                    row.createCell(3).setCellValue("Нет темы");
                }

                String orderStatus = switch (ticket.getStatus()) {
                    case TicketStatus.ACTIVE -> "В работе";
                    case TicketStatus.OPEN -> "Ожидает";
                    case TicketStatus.CLOSED -> "Закрыта";
                    default -> "";
                };

                String orderPriority = switch (ticket.getPriority()) {
                    case TicketPrioriry.LOW -> "Низкий";
                    case TicketPrioriry.MEDIUM -> "Средний";
                    case TicketPrioriry.HIGH -> "Высокий";
                    default -> "";
                };

                row.createCell(4).setCellValue(orderStatus);
                row.createCell(5).setCellValue(orderPriority);
                row.createCell(6).setCellValue(ticket.getMessage().getText());
                row.createCell(7).setCellValue(ticket.getExecutor());
                row.createCell(8).setCellValue(ticket.getClosedDatetime());
                row.createCell(9).setCellValue(ticket.getCommentAfterClose());
            }

            wb.write(out);

        } catch (IOException e) {
            System.out.println(e.getMessage());
        }

        return new ByteArrayInputStream(out.toByteArray());
    }

}
