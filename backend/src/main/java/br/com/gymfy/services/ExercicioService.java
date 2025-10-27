package br.com.gymfy.services;

import br.com.gymfy.entities.Exercicio;
import br.com.gymfy.repositories.ExercicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExercicioService {
    @Autowired
    ExercicioRepository exercicioRepository;

    public Exercicio findById(Integer id) {
        Optional<Exercicio> exercicio = exercicioRepository.findById(id);
        return exercicio.orElse(null);
    }




    public List<Exercicio> findByTipo(String tipo) {
        return exercicioRepository.findByTipo(tipo);
    }

    public List<Exercicio> findAll(){
        List<Exercicio> exercicios = exercicioRepository.findAll();
        return exercicios;
    }

    







    public Exercicio CadastrarExecicio(Exercicio exercicio){
        return exercicioRepository.save(exercicio);
    }

    public void deletar(Integer id) {
        exercicioRepository.deleteById(id);
    }


}


