package br.com.gymfy.services;

import br.com.gymfy.entities.Personal;
import br.com.gymfy.repositories.PersonalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonalService {

    @Autowired
    private PersonalRepository personalRepository;

    public Personal findById(Integer id) {
        Optional<Personal> personal = personalRepository.findById(id);
        return personal.orElse(null);
    }

    public List<Personal> findAll() {
        List<Personal> personais = personalRepository.findAll();
        return personais;
    }


    public Personal cadastrarPersonal(Personal personal) {
        return personalRepository.save(personal);
    }

    public void deletar(Integer id) {
        personalRepository.deleteById(id);
    }

    public Personal update(Integer id, Personal novo) {
        Personal atual = findById(id);
        if (atual != null) {
            atual.setNome(novo.getNome());
            atual.setEmail(novo.getEmail());
            atual.setCpf(novo.getCpf());
            atual.setDataNascimento(novo.getDataNascimento());
            atual.setEspecialidade(novo.getEspecialidade());
            atual.setDescricão(novo.getDescricão());
            atual.setRedeSocial(novo.getRedeSocial());
            return personalRepository.save(atual);
        }
        return null;
    }
}