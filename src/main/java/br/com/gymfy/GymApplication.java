package br.com.gymfy;


import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GymApplication implements CommandLineRunner {


	public static void main(String[] args) {
		SpringApplication.run(GymApplication.class, args);
	}

    @Override
    public void run(String... args) throws Exception {


    }
}
