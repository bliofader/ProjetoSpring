package br.com.gymfy.repositories;


import br.com.gymfy.entities.Exercicio;
import br.com.gymfy.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExercicioRepository extends JpaRepository<Exercicio, Integer> {

    List<Exercicio> findByTipo(String tipo);


}
