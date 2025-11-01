package br.com.gymfy.services;

import br.com.gymfy.DTO.PersonalCadastroDTO;
import br.com.gymfy.entities.Personal;
import br.com.gymfy.entities.Usuario;
import br.com.gymfy.repositories.PersonalRepository;
import br.com.gymfy.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PersonalService {




    public Personal findByEmail(String email) {
        Optional<Personal> personal = personalRepository.findByEmail(email);

        return personal.orElse(null);
    }

    public List<Usuario> listarAlunos(Integer personalId) {
        Personal personal = personalRepository.findById(personalId)
                .orElseThrow(() -> new RuntimeException("Personal Trainer não encontrado com ID: " + personalId));

        return personal.getAlunos();
    }


    @Autowired
    private PersonalRepository personalRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Personal findById(Integer id) {
        Optional<Personal> personal = personalRepository.findById(id);
        return personal.orElse(null);
    }

    public List<Personal> findAll() {
        List<Personal> personais = personalRepository.findAll();
        return personais;
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

    public Personal cadastrarPersonal(PersonalCadastroDTO cadastroDTO) {

        if (usuarioRepository.findByEmail(cadastroDTO.getEmail()).isPresent()) {
            throw new RuntimeException("E-mail já cadastrado.");
        }

        Personal novoPersonal = new Personal();

        novoPersonal.setNome(cadastroDTO.getNome());
        novoPersonal.setSobrenome(cadastroDTO.getSobrenome());
        novoPersonal.setCep(cadastroDTO.getCep());
        novoPersonal.setEmail(cadastroDTO.getEmail());
        novoPersonal.setCpf(cadastroDTO.getCpf());



        try {
            SimpleDateFormat formatador = new SimpleDateFormat("yyyy-MM-dd");
            Date dataConvertida = formatador.parse(cadastroDTO.getDataNascimento());
            novoPersonal.setDataNascimento(dataConvertida);
        } catch (ParseException e) {
            throw new RuntimeException("Formato de Data de Nascimento inválido. Use YYYY-MM-DD.", e);
        }

        String senhaCriptografada = passwordEncoder.encode(cadastroDTO.getSenha());
        novoPersonal.setSenha(senhaCriptografada);

        novoPersonal.setEspecialidade(cadastroDTO.getEspecialidade());
        novoPersonal.setDescricão(cadastroDTO.getDescricao());
        novoPersonal.setRedeSocial(cadastroDTO.getRedeSocial());

        novoPersonal.setTipo("PERSONAL");

        return personalRepository.save(novoPersonal);
    }
}