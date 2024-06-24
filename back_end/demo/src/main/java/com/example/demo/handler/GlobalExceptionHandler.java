package com.example.demo.handler;

import com.example.demo.modal.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.nio.file.AccessDeniedException;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public ApiResponse handleException(Exception ex) {
        ApiResponse apiResponse = new ApiResponse();

        Map<String, String> error = new HashMap<>();
        error.put("errorCode", "500");
        error.put("errorMessage", ex.getMessage());

        apiResponse.error(error);

        return apiResponse;
    }

    @ExceptionHandler(InvalidTokenException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ResponseBody
    public ApiResponse handleInvalidTokenException(InvalidTokenException ex) {
        ApiResponse apiResponse = new ApiResponse();

        Map<String, String> error = new HashMap<>();
        error.put("errorCode", "403");
        error.put("errorMessage", ex.getMessage());

        apiResponse.error(error);

        return apiResponse;
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ResponseBody
    public ApiResponse handleAccessDeniedException(AccessDeniedException ex) {
        ApiResponse apiResponse = new ApiResponse();

        Map<String, String> error = new HashMap<>();
        error.put("errorCode", "403");
        error.put("errorMessage", ex.getMessage());

        apiResponse.error(error);

        return apiResponse;
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public ApiResponse handleRuntimeException(RuntimeException ex) {
        ApiResponse apiResponse = new ApiResponse();

        Map<String, String> error = new HashMap<>();
        error.put("errorCode", "500");
        error.put("errorMessage", ex.getMessage());

        apiResponse.error(error);

        return apiResponse;
    }

}
