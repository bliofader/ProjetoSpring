package br.com.gymfy.validadores;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = CPFValidator.class)
@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface CPFValido {
    String message() default "CPF inválido.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
