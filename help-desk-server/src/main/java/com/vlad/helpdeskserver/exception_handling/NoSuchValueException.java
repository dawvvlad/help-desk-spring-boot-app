package com.vlad.helpdeskserver.exception_handling;

public class NoSuchValueException extends RuntimeException {
    public NoSuchValueException(String message) {
        super(message);
    }
}
