import { Component } from '@angular/core';
import { HeaderPersonalComponent } from "../../../components/header-personal/header-personal.component";

@Component({
  selector: 'app-tela-personal-inicial',
  standalone: true,
  imports: [HeaderPersonalComponent],
  templateUrl: './tela-personal-inicial.component.html',
  styleUrl: './tela-personal-inicial.component.css'
})
export class TelaPersonalInicialComponent {

}
