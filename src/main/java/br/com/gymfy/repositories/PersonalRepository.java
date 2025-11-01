package br.com.gymfy.repositories;


import br.com.gymfy.entities.Personal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface PersonalRepository extends JpaRepository<Personal,Integer> {

    Optional<Personal> findByEmail(String email);

}
