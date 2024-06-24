package com.example.demo.modal.response;

import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

@Setter
@Getter
public class ApiResponse<T> {
    private String status;
    private T payload;
    private Map<String, String> error;
    private Map<String, Object> metadata;

    public void ok() {
        this.status = "SUCCESS";
    }

    public void ok(T data) {
        this.status = "SUCCESS";
        this.payload = data;
    }

    public void error(String errorMessage) {
        this.status = "ERROR";
        this.error = new HashMap<>();
        this.error.put("message", errorMessage);
    }
    public void ok(HashMap<String, Object> metadata) {
        this.status = "SUCCESS";
        this.metadata = metadata;
    }

    public void ok(T data, HashMap<String, Object> metadata) {
        this.status = "SUCCESS";
        this.payload = data;
        this.metadata = metadata;
    }

    public void error(Map<String, String> error) {
        this.status = "ERROR";
        this.error = error;
    }

}
