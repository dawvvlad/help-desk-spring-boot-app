package com.vlad.helpdeskserver;

import com.vlad.helpdeskserver.enums.TicketPrioriry;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HelpDeskServerApplication {
	public static void main(String[] args) {
		SpringApplication.run(HelpDeskServerApplication.class, args);
	}
}
