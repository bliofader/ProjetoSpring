package br.com.gymfy.services;

import br.com.gymfy.DTO.ListaDTO;
import br.com.gymfy.entities.Exercicio;
import br.com.gymfy.entities.Lista;
import br.com.gymfy.entities.Usuario;
import br.com.gymfy.repositories.ExercicioRepository;
import br.com.gymfy.repositories.ListaRepository;
import br.com.gymfy.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ListaService {
    @Autowired
    ListaRepository listaRepository;
    @Autowired
    ExercicioRepository exercicioRepository;
    @Autowired
    UsuarioRepository usuarioRepository;

    public Lista findById(Integer id){
        Optional<Lista> lista = listaRepository.findById(id);
        return lista.orElse(null);
    }
    public List<Lista> findByUsuario(Integer id) {
        return listaRepository.findByUsuarioId(id);
    }

    public List<Lista> findAll(){
        List<Lista> listas = listaRepository.findAll();
        return listas;
    }


    public Lista cadastrarLista(ListaDTO dto) {
        Lista lista = new Lista(dto.getNome(), dto.getDescricao(), dto.getData(), dto.getDia());

        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        lista.setUsuario(usuario);

        List<Exercicio> exercicios = exercicioRepository.findAllById(dto.getExercicioIds());
        lista.setExercicios(exercicios);

        return listaRepository.save(lista);
    }




    public void deletar(Integer id){
        listaRepository.deleteById(id);
    }
}
