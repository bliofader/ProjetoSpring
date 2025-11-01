package br.com.gymfy.controllers;

import br.com.gymfy.DTO.LinkagemRequestDTO;
import br.com.gymfy.entities.Usuario;
import br.com.gymfy.services.AdminService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/linkagem")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping
    public ResponseEntity<Usuario> linkar(@RequestBody @Valid LinkagemRequestDTO linkagemDTO) {

        Usuario usuarioLinkado = adminService.linkarPersonalAUsuario(linkagemDTO);

        usuarioLinkado.setSenha(null);
        usuarioLinkado.getPersonal().setSenha(null);

        return ResponseEntity.ok(usuarioLinkado);
    }
}