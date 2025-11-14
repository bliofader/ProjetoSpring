package br.com.gymfy.services;

import br.com.gymfy.DTO.ListaDTO;
import br.com.gymfy.DTO.ListaResponseDTO;
import br.com.gymfy.entities.Exercicio;
import br.com.gymfy.entities.Lista;
import br.com.gymfy.entities.Usuario;
import br.com.gymfy.repositories.ExercicioRepository;
import br.com.gymfy.repositories.ListaRepository;
import br.com.gymfy.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListaService {

    @Autowired
    private ListaRepository listaRepository;

    @Autowired
    private ExercicioRepository exercicioRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // ✅ Buscar lista por ID e retornar DTO
    public ListaResponseDTO findById(Integer id) {
        Lista lista = listaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lista não encontrada com ID: " + id));
        return new ListaResponseDTO(lista);
    }

    // ✅ Buscar listas de um usuário e retornar DTOs
    public List<ListaResponseDTO> findByUsuario(Integer id) {
        return listaRepository.findByUsuarioId(id)
                .stream()
                .map(ListaResponseDTO::new)
                .toList();
    }

    // ✅ Buscar todas as listas e retornar DTOs
    public List<ListaResponseDTO> findAll() {
        return listaRepository.findAll()
                .stream()
                .map(ListaResponseDTO::new)
                .toList();
    }

    // ✅ Criar nova lista e retornar DTO
    public ListaResponseDTO cadastrarLista(ListaDTO dto) {
        Lista lista = new Lista(dto.getNome(), dto.getDescricao(), dto.getData(), dto.getDia());

        // Buscar usuário
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + dto.getUsuarioId()));
        lista.setUsuario(usuario);

        // Buscar exercícios
        List<Exercicio> exercicios = exercicioRepository.findAllById(dto.getExercicioIds());
        lista.setExercicios(exercicios);

        Lista saved = listaRepository.save(lista);
        return new ListaResponseDTO(saved);
    }

    // ✅ Deletar lista
    public void deletar(Integer id) {
        if (!listaRepository.existsById(id)) {
            throw new RuntimeException("Lista não encontrada para exclusão com ID: " + id);
        }
        listaRepository.deleteById(id);
    }
}
