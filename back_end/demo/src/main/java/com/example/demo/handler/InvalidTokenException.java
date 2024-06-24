package com.example.demo.handler;

public class InvalidTokenException extends RuntimeException{
    public InvalidTokenException(String message) {
        super(message);
    }
}
