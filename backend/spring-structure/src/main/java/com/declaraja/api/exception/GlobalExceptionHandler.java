package com.declaraja.api.exception;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SecurityException;
import io.jsonwebtoken.security.WeakKeyException;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    // 🔥 Erros de entidade não encontrada (Ex.: findById)
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleEntityNotFoundException(EntityNotFoundException ex) {
        logger.error("[EntityNotFoundException] {}", ex.getMessage(), ex);
        return buildResponse(HttpStatus.NOT_FOUND, "Recurso não encontrado", ex.getMessage());
    }

    // 🔑 Erros relacionados ao JWT
    @ExceptionHandler({
            ExpiredJwtException.class,
            MalformedJwtException.class,
            SecurityException.class,
            WeakKeyException.class
    })
    public ResponseEntity<Map<String, Object>> handleJwtException(Exception ex) {
        logger.error("[JwtException] {}", ex.getMessage(), ex);
        return buildResponse(HttpStatus.UNAUTHORIZED, "Token JWT inválido ou expirado", ex.getMessage());
    }

    // 🔐 Erros de acesso negado
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Map<String, Object>> handleAccessDeniedException(AccessDeniedException ex) {
        logger.error("[AccessDeniedException] {}", ex.getMessage(), ex);
        return buildResponse(HttpStatus.FORBIDDEN, "Acesso negado", ex.getMessage());
    }

    // 🛑 Validações de parâmetros (@Valid)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationException(MethodArgumentNotValidException ex) {
        logger.error("[ValidationException] {}", ex.getMessage(), ex);

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(err ->
                errors.put(err.getField(), err.getDefaultMessage())
        );

        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", HttpStatus.BAD_REQUEST.value());
        body.put("error", "Erro de validação");
        body.put("message", errors);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    // ⚠️ Qualquer outra exceção não tratada
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleAllUncaughtException(Exception ex) {
        logger.error("[UnhandledException] Erro não tratado: {}", ex.getMessage(), ex);
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Erro interno no servidor", ex.getMessage());
    }

    // 🧠 Método utilitário para gerar respostas padronizadas
    private ResponseEntity<Map<String, Object>> buildResponse(HttpStatus status, String error, String message) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", status.value());
        body.put("error", error);
        body.put("message", message);
        return ResponseEntity.status(status).body(body);
    }
}
