package br.com.gymfy.resources;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/imagens")
@CrossOrigin(origins = "http://localhost:4200")
public class ImagemResource {

    @GetMapping("/{nomeImagem}")
    public ResponseEntity<Resource> servirImagem(@PathVariable String nomeImagem) {
        try {
            Path caminho = Paths.get("uploads").resolve(nomeImagem).normalize();
            Resource imagem = new UrlResource(caminho.toUri());

            if (imagem.exists()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG) // ou IMAGE_PNG se necessário
                        .body(imagem);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
