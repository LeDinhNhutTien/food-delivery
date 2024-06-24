package com.example.demo.security;

import jakarta.xml.bind.DatatypeConverter;

import java.security.SecureRandom;

public class JwtMain {
    public static void main(String[] args) {
        int keyLengthBytes = 32;

        byte[] randomBytes = new byte[keyLengthBytes];
        SecureRandom secureRandom = new SecureRandom();
        secureRandom.nextBytes(randomBytes);

        String secretKey = DatatypeConverter.printHexBinary(randomBytes);

        System.out.println("SECRET_KEY: " + secretKey);
    }
}
