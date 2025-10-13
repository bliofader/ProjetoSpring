package br.com.gymfy.services;

import br.com.gymfy.entities.Produto;
import br.com.gymfy.repositories.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {
    @Autowired
    ProdutoRepository produtoRepository;

    public Produto findById(Integer id) {
        Optional<Produto> produto = produtoRepository.findById(id);
        return produto.orElse(null);
    }

    public List<Produto> findByTipo(String tipo) {
        return produtoRepository.findByTipo(tipo);
    }

    public List<Produto> findAll(){
        List<Produto> produtos = produtoRepository.findAll();
        return produtos;
    }


    public Produto cadastrarProduto(Produto produto){
        return produtoRepository.save(produto);
    }

    public void deletar(Integer id) {
        produtoRepository.deleteById(id);
    }

    public Produto update (Integer id, Produto produto){
        Produto alterado = findById(id);
        if(alterado!=null){
            alterado.setNome(produto.getNome());
            alterado.setDescricao(produto.getDescricao());
            alterado.setTipo(produto.getTipo());


            return produtoRepository.save(alterado);
        }
        return null;
    }
}
