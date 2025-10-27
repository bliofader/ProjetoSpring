import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminCadastroUsuarioComponent {
  searchTerm = '';
  usuarios = [
    { ID: '1', Nome: 'Icaro', Tipo: 'Usuario', DataDeNascimento: '06/06/1993', CPF: '448.875.485-77', Email: 'icaro.123@gmail.com', Senha: 'icaro123', ativo: true },
    { ID: '2', Nome: 'Maria', Tipo: 'Personal', DataDeNascimento: '12/12/2005', CPF: '265.875.485-76', Email: 'maria.123@gmail.com', Senha: 'maria123', ativo: true },
    { ID: '3', Nome: 'Ellen', Tipo: 'Personal', DataDeNascimento: '13/04/2003', CPF: '328.875.665-54', Email: 'ellen.123@gmail.com', Senha: 'ellen123', ativo: true },
  ];

  onSearch() {
    console.log('Buscando por:', this.searchTerm);
  }

  excluirUsuario(usuario: any) {
    this.usuarios = this.usuarios.filter((u) => u !== usuario);
  }
}
