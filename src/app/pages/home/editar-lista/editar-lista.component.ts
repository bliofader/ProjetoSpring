import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';

// Importe seus componentes de layout
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { HeaderTopComponent } from '../../../components/headertop/headertop.component';

// Interface simples para tipar nosso exercício (baseado no Exercicio.java)
interface ExercicioSimples {
  id: number;
  nome: string;
  tipo: string;
}

@Component({
  selector: 'app-editar-lista',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    FooterComponent,
    HeaderTopComponent,
  ],
  templateUrl: './editar-lista.component.html',
  styleUrl: './editar-lista.component.css', // Pode reutilizar o CSS do outro componente
})
export class EditarListaComponent implements OnInit {
  listaForm!: FormGroup;

  // Esta lista virá do seu backend (ExercicioService)
  // Estou simulando dados aqui para o exemplo funcionar
  todosExercicios: ExercicioSimples[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Inicializa o formulário
    this.listaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      data: ['', Validators.required],
      dia: ['', Validators.required],
      // Este campo irá guardar um array de IDs dos exercícios selecionados
      // É o campo que será vinculado ao <select multiple>
      exerciciosIds: [[], Validators.required],
    });

    // Simula a busca de exercícios do backend
    this.carregarExercicios();
  }

  // Getter para facilitar acesso aos campos no HTML
  get f() {
    return this.listaForm.controls;
  }

  // Método que simula a busca de exercícios (você substituirá pelo seu service)
  carregarExercicios(): void {
    // TODO: Substituir por this.exercicioService.getAll().subscribe(...)
    this.todosExercicios = [
      { id: 1, nome: 'Supino Reto', tipo: 'Peito' },
      { id: 2, nome: 'Agachamento Livre', tipo: 'Pernas' },
      { id: 3, nome: 'Rosca Direta', tipo: 'Bíceps' },
      { id: 4, nome: 'Tríceps Pulley', tipo: 'Tríceps' },
      { id: 5, nome: 'Levantamento Terra', tipo: 'Costas' },
      { id: 6, nome: 'Desenvolvimento Militar', tipo: 'Ombro' },
      { id: 7, nome: 'Abdominal Supra', tipo: 'ABS' },
    ];
  }

  // Envio do formulário
  onSubmit(): void {
    if (this.listaForm.invalid) {
      this.listaForm.markAllAsTouched();
      return;
    }

    console.log('Dados da Lista para enviar ao Backend:', this.listaForm.value);
    /*
     O 'this.listaForm.value' terá um formato como:
     {
       nome: "Treino A - Peito e Tríceps",
       data: "2025-11-03",
       dia: "Segunda",
       exerciciosIds: ["1", "4"] // IDs dos exercícios selecionados
     }
    */

    // TODO: Chamar o seu ListaService para salvar
    // this.listaService.cadastrar(this.listaForm.value).subscribe(...)
  }
}