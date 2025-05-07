package com.example.demo.exceptions;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalException {
	
    @ExceptionHandler(SellerException.class)
	public ResponseEntity<ErroDetails> sellerExeptionHandler(SellerException se, WebRequest req) {
        ErroDetails erroDetails = new ErroDetails();
        erroDetails.setError(se.getMessage());
        erroDetails.setDetails(req.getDescription(false));
        erroDetails.setTimestamp(LocalDateTime.now());
       
        return new ResponseEntity<>(erroDetails,HttpStatus.BAD_REQUEST);
	}
    
    @ExceptionHandler(ProductException.class)
   	public ResponseEntity<ErroDetails> productExeptionHandler(SellerException se, WebRequest req) {
           ErroDetails erroDetails = new ErroDetails();
           erroDetails.setError(se.getMessage());
           erroDetails.setDetails(req.getDescription(false));
           erroDetails.setTimestamp(LocalDateTime.now());
          
           return new ResponseEntity<>(erroDetails,HttpStatus.BAD_REQUEST);
   	}

}
