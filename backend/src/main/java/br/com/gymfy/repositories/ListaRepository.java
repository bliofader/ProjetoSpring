package br.com.gymfy.repositories;

import br.com.gymfy.entities.Lista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ListaRepository extends JpaRepository<Lista,Integer> {
    List<Lista> findByUsuarioId(Integer id);
}
