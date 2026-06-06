package com.example.demo.exceptions;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class GlobalException {

    @ExceptionHandler(SellerException.class)
    public ResponseEntity<ErroDetails> sellerExceptionHandler(SellerException se, WebRequest req) {
        ErroDetails erroDetails = new ErroDetails();
        erroDetails.setError(se.getMessage());
        erroDetails.setDetails(req.getDescription(false));
        erroDetails.setTimestamp(LocalDateTime.now());
        return new ResponseEntity<>(erroDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ProductException.class)
    public ResponseEntity<ErroDetails> productExceptionHandler(ProductException pe, WebRequest req) {
        ErroDetails erroDetails = new ErroDetails();
        erroDetails.setError(pe.getMessage());
        erroDetails.setDetails(req.getDescription(false));
        erroDetails.setTimestamp(LocalDateTime.now());
        return new ResponseEntity<>(erroDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserException.class)
    public ResponseEntity<ErroDetails> userExceptionHandler(UserException ue, WebRequest req) {
        ErroDetails erroDetails = new ErroDetails();
        erroDetails.setError(ue.getMessage());
        erroDetails.setDetails(req.getDescription(false));
        erroDetails.setTimestamp(LocalDateTime.now());
        return new ResponseEntity<>(erroDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(OrderException.class)
    public ResponseEntity<ErroDetails> orderExceptionHandler(OrderException oe, WebRequest req) {
        ErroDetails erroDetails = new ErroDetails();
        erroDetails.setError(oe.getMessage());
        erroDetails.setDetails(req.getDescription(false));
        erroDetails.setTimestamp(LocalDateTime.now());
        return new ResponseEntity<>(erroDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErroDetails> genericExceptionHandler(Exception e, WebRequest req) {
        ErroDetails erroDetails = new ErroDetails();
        erroDetails.setError(e.getMessage());
        erroDetails.setDetails(req.getDescription(false));
        erroDetails.setTimestamp(LocalDateTime.now());
        return new ResponseEntity<>(erroDetails, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
