package br.com.gymfy.repositories;

import br.com.gymfy.entities.Lista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListaRepository extends JpaRepository<Lista,Integer> {

}
