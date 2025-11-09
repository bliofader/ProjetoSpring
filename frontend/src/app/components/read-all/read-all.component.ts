import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../entities/usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  listaComum: Usuario[] = []; // lista de usuários do tipo comum

  constructor(private service: UsuarioService) {}

  ngOnInit(): void {
    this.listarComuns();
  }

  listarComuns(): void {
    this.service.findAll().subscribe((resposta) => {
      // filtra apenas os usuários do tipo 'comum'
      this.listaComum = resposta.filter(usuario => usuario.tipo === 'comum');
    });
  }
}