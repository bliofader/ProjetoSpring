package br.com.gymfy.services;

import br.com.gymfy.DTO.UsuarioCadastroDTO;
import br.com.gymfy.DTO.UsuarioDadosDTO;
import br.com.gymfy.DTO.UsuarioUpdateDTO;
import br.com.gymfy.entities.Usuario;
import br.com.gymfy.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Usuario findById(Integer id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário com ID " + id + " não encontrado."));
    }

    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    public List<Usuario> findByTipo(String tipo) {
        return usuarioRepository.findByTipo(tipo);
    }

    public Usuario cadastrarUsuario(UsuarioCadastroDTO dto, MultipartFile imagem) {
        Optional<Usuario> existente = usuarioRepository.findByEmail(dto.getEmail());
        if (existente.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "E-mail já está em uso por outro usuário.");
        }

        Usuario usuario = new Usuario();
        usuario.setNome(dto.getNome());
        usuario.setEmail(dto.getEmail());
        usuario.setTipo(dto.getTipo());
        usuario.setCpf(dto.getCpf());

        // ✅ Conversão de LocalDate para java.sql.Date
        usuario.setDataNascimento(Date.valueOf(dto.getDataNascimento()));

        usuario.setSenha(passwordEncoder.encode(dto.getSenha()));

        if (imagem != null && !imagem.isEmpty()) {
            salvarImagem(usuario, imagem);
        }

        return usuarioRepository.save(usuario);
    }

    public Usuario updateComImagem(Integer id, UsuarioUpdateDTO dto, MultipartFile imagem) {
        Usuario alterado = findById(id);

        Optional<Usuario> existente = usuarioRepository.findByEmail(dto.getEmail());
        if (existente.isPresent() && !existente.get().getId().equals(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "E-mail já está em uso por outro usuário.");
        }

        alterado.setNome(dto.getNome());
        alterado.setEmail(dto.getEmail());
        alterado.setTipo(dto.getTipo());
        alterado.setSenha(passwordEncoder.encode(dto.getSenha()));

        if (imagem != null && !imagem.isEmpty()) {
            salvarImagem(alterado, imagem);
        }

        return usuarioRepository.save(alterado);
    }

    public void deletar(Integer id) {
        Usuario usuario = findById(id);
        usuarioRepository.delete(usuario);
    }

    private void salvarImagem(Usuario usuario, MultipartFile imagem) {
        try {
            String nomeArquivo = System.currentTimeMillis() + "_" + imagem.getOriginalFilename();
            String pastaUpload = new File("").getAbsolutePath() + File.separator + "uploads";
            File pasta = new File(pastaUpload);
            if (!pasta.exists()) {
                pasta.mkdirs();
            }

            String caminho = pastaUpload + File.separator + nomeArquivo;
            imagem.transferTo(new File(caminho));
            usuario.setImagem(nomeArquivo);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao salvar imagem: " + e.getMessage());
        }
    }

    public void atualizarDados(Integer id, UsuarioDadosDTO dto) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        usuario.setNome(dto.getNome());
        usuario.setEmail(dto.getEmail());
        usuario.setCpf(dto.getCpf());

        try {
            // Converte String → java.util.Date
            SimpleDateFormat formato = new SimpleDateFormat("yyyy-MM-dd");
            java.util.Date dataUtil = formato.parse(dto.getDataNascimento());

            // Converte java.util.Date → java.sql.Date
            java.sql.Date dataSql = new java.sql.Date(dataUtil.getTime());

            usuario.setDataNascimento(dataSql);

        } catch (ParseException e) {
            throw new RuntimeException("Formato de data inválido. Use yyyy-MM-dd.");
        }

        usuarioRepository.save(usuario);
    }



}
