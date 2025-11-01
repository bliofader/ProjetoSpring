import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../../components/footer/footer.component";
import { HeaderComponent } from "../../../components/header/header.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SafeUrlPipe } from '../../../pipes/safe-url.pipes';
import { Exercicio } from '../../../entities/exercicio';

@Component({
  selector: 'app-tela-exercicio-detalhes',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, CommonModule, SafeUrlPipe],
  templateUrl: './tela-exercicio-detalhes.component.html',
  styleUrl: './tela-exercicio-detalhes.component.css'
})
export class TelaExercicioDetalhesComponent implements OnInit {
  exercicio: any;
  //banco local
  exercises: Exercicio[] = [
    { nome: 'Agachamento Livre', agrupamento: 'pernas', imagePath: 'assets/images/pernas.png', tipo: 'força', descricao: 'Exercício básico para o desenvolvimento dos músculos das pernas e glúteos.', nivel: 'básico', videoUrl: 'https://www.youtube.com/embed/86ZW7tmmLuU?si=H6zrJ3uIFWE0d6YQ' },
    { nome: 'Leg Press', agrupamento: 'quadriceps', imagePath: 'assets/images/pernas.png', tipo: 'força', descricao: 'Exercício básico para o desenvolvimento dos músculos das pernas e glúteos.', nivel: 'intermediário', videoUrl: 'https://www.youtube.com/embed/86ZW7tmmLuU?si=H6zrJ3uIFWE0d6YQ' },
    { nome: 'Panturrilha em Pé', agrupamento: 'panturrilha', imagePath: 'assets/images/pernas.png', tipo: 'resistência', descricao: 'Exercício básico para o desenvolvimento dos músculos das pernas e glúteos.', nivel: 'básico', videoUrl: 'https://www.youtube.com/embed/86ZW7tmmLuU?si=H6zrJ3uIFWE0d6YQ' },
    { nome: 'Supino Reto', agrupamento: 'peito', imagePath: 'assets/images/pernas.png', tipo: 'força', descricao: 'Exercício básico para o desenvolvimento dos músculos do peitoral e tríceps.', nivel: 'intermediário', videoUrl: 'https://www.youtube.com/embed/86ZW7tmmLuU?si=H6zrJ3uIFWE0d6YQ' },
    { nome: 'Remada Curvada', agrupamento: 'costas', imagePath: 'assets/images/pernas.png', tipo: 'força', descricao: 'Exercício básico para o fortalecimento dos músculos das costas e bíceps.', nivel: 'avançado', videoUrl: 'https://www.youtube.com/embed/86ZW7tmmLuU?si=H6zrJ3uIFWE0d6YQ' },
    { nome: 'Elevação Lateral', agrupamento: 'ombro', imagePath: 'assets/images/pernas.png', tipo: 'isolado', descricao: 'Exercício básico para o desenvolvimento dos músculos laterais dos ombros.', nivel: 'intermediário', videoUrl: 'https://www.youtube.com/embed/86ZW7tmmLuU?si=H6zrJ3uIFWE0d6YQ' },
    { nome: 'Prancha Abdominal', agrupamento: 'abs', imagePath: 'assets/images/pernas.png', tipo: 'resistência', descricao: 'Exercício básico para o fortalecimento do abdômen e estabilidade corporal.', nivel: 'básico', videoUrl: 'https://www.youtube.com/embed/86ZW7tmmLuU?si=H6zrJ3uIFWE0d6YQ' },
    { nome: 'Tríceps Corda', agrupamento: 'triceps', imagePath: 'assets/images/pernas.png', tipo: 'isolado', descricao: 'Exercício básico para o fortalecimento e definição do tríceps.', nivel: 'intermediário', videoUrl: 'https://www.youtube.com/embed/86ZW7tmmLuU?si=H6zrJ3uIFWE0d6YQ' },
    { nome: 'Rosca Direta', agrupamento: 'biceps', imagePath: 'assets/images/pernas.png', tipo: 'isolado', descricao: 'Exercício básico para o desenvolvimento dos músculos do bíceps.', nivel: 'básico', videoUrl: 'https://www.youtube.com/embed/86ZW7tmmLuU?si=H6zrJ3uIFWE0d6YQ' },
    { nome: 'Rosca Alternada', agrupamento: 'biceps', imagePath: 'assets/images/pernas.png', tipo: 'isolado', descricao: 'Exercício básico para o fortalecimento e simetria dos músculos do bíceps.', nivel: 'intermediário', videoUrl: 'https://www.youtube.com/embed/86ZW7tmmLuU?si=H6zrJ3uIFWE0d6YQ' }
  ];
  

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
      const nome = this.route.snapshot.paramMap.get('nome');
      if(nome) {
        const nomeNormalizado = nome.replace(/-/g, ' ').toLowerCase();
        this.exercicio = this.exercises.find(
          (ex) => ex.nome.toLowerCase() === nomeNormalizado
        );
      }
    }
}
