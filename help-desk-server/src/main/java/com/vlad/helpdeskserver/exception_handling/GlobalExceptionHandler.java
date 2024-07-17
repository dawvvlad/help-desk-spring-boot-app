package com.vlad.helpdeskserver.exception_handling;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<IncorrectData> handleNoSuchValueException(NoSuchValueException e) {
        IncorrectData incorrectData = new IncorrectData();
        incorrectData.setInfo(e.getMessage());
        return new ResponseEntity<IncorrectData>(incorrectData, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<IncorrectRequest> handleException(Exception e) {
        IncorrectRequest incorrectRequest = new IncorrectRequest();
        incorrectRequest.setInfo(e.getMessage());
        return new ResponseEntity<IncorrectRequest>(incorrectRequest, HttpStatus.BAD_REQUEST);
    }
}
