import { Component } from '@angular/core';
import { HeaderPersonalComponent } from '../../../components/header-personal/header-personal.component';
import { FooterComponent } from "../../../components/footer/footer.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tela-personal-inicial',
  standalone: true,
  imports: [HeaderPersonalComponent, FooterComponent, CommonModule, RouterModule],
  templateUrl: './tela-personal-inicial.component.html',
  styleUrl: './tela-personal-inicial.component.css'
})
export class TelaPersonalInicialComponent {

}