package br.com.gymfy.services;

import br.com.gymfy.entities.Lista;
import br.com.gymfy.repositories.ListaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ListaService {
    @Autowired
    ListaRepository listaRepository;


    public Lista findById(Integer id){
        Optional<Lista> lista = listaRepository.findById(id);
        return lista.orElse(null);
    }

    public List<Lista> findAll(){
        List<Lista> listas = listaRepository.findAll();
        return listas;
    }

    public Lista cadastrarLista(Lista lista){
        return listaRepository.save(lista);
    }

    public void deletar(Integer id){
        listaRepository.deleteById(id);
    }

    public Lista update(Integer id, Lista lista) {
        Lista alterado = findById(id);
        if(alterado != null){
            alterado.setNome(lista.getNome());
            alterado.setData(lista.getData());
            alterado.setDia(lista.getDia());
            return listaRepository.save(alterado);
        }
        return null;
    }
}
