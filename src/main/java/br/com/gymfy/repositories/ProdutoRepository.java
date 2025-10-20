package br.com.gymfy.repositories;

import br.com.gymfy.entities.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto,Integer> {
    List<Produto> findByTipo(String tipo);
}
