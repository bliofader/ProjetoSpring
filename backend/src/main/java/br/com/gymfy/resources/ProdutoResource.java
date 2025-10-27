package br.com.gymfy.resources;

import br.com.gymfy.entities.Produto;
import br.com.gymfy.services.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value="/produtos")
public class ProdutoResource {
    @Autowired
    private ProdutoService produtoService;

    @GetMapping(value = "/{id}")
    public ResponseEntity<Produto> findById(@PathVariable Integer id) {
        Produto produto = produtoService.findById(id);
        return ResponseEntity.ok().body(produto);

    }

    @GetMapping(value = "/tipo/{tipo}")
    public ResponseEntity<List<Produto>> findByTipo(@PathVariable String tipo) {
        List<Produto> produtos = produtoService.findByTipo(tipo);
        return ResponseEntity.ok().body(produtos);
    }
    @GetMapping
    public List<Produto> findAll() {
        List<Produto> produtos = produtoService.findAll();
        return produtos;
    }


    @PostMapping
    public ResponseEntity<Produto> CadastrarProduto(
            @RequestBody Produto produto){
        produto = produtoService.cadastrarProduto(produto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(produto.getId()).toUri();
        return ResponseEntity.created(uri).body(produto);
    }

    //deletar
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Produto> deletar(@PathVariable Integer id){
        produtoService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Produto> update(@PathVariable Integer id, @RequestBody Produto produto){
        Produto alterado = produtoService.update(id,produto);
        return ResponseEntity.ok().body(alterado);
    }

}
