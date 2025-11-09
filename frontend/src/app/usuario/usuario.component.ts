import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../entities/usuario';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  listaComum: Usuario[] = [];

  constructor(private service: UsuarioService) {
    this.service.findComuns().subscribe(res => {
      this.listaComum = res;
    });
  }
}