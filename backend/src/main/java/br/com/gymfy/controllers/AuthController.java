package br.com.gymfy.controllers;

import br.com.gymfy.DTO.LoginRequestDTO;
import br.com.gymfy.DTO.TokenResponseDTO;
import br.com.gymfy.services.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<TokenResponseDTO> login(@RequestBody @Valid LoginRequestDTO loginRequestDTO) {
        TokenResponseDTO response = authService.realizarLogin(loginRequestDTO);
        return ResponseEntity.ok(response);
    }
}
