package br.com.gymfy.repositories;


import br.com.gymfy.entities.Exercicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ExercicioRepository extends JpaRepository<Exercicio, Integer> {



}
