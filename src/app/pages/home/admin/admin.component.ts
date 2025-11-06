import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, Router, RouterLink, RouterModule } from '@angular/router';
import { FooterComponent } from "../../../components/footer/footer.component";
import { HomeComponent } from '../home.component';
import { NavbarComponent } from "../../../components/navbar/navbar.component";
import { HeaderTopComponent } from '../../../components/headertop/headertop.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ HomeComponent, CommonModule, RouterModule, FormsModule, RouterOutlet, FooterComponent, RouterLink, NavbarComponent, HeaderTopComponent ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminCadastroUsuarioComponent {
  searchTerm = '';
  usuarios = [
    { ID: '1', Nome: 'Icaro', Tipo: 'Usuario', DataDeNascimento: '06/06/1993', CPF: '448.875.485-77', Email: 'icaro.123@gmail.com', Senha: 'icaro123', ativo: true },
    { ID: '2', Nome: 'Maria', Tipo: 'Personal', DataDeNascimento: '12/12/2005', CPF: '265.875.485-76', Email: 'maria.123@gmail.com', Senha: 'maria123', inativo: true },
    { ID: '3', Nome: 'Ellen', Tipo: 'Personal', DataDeNascimento: '13/04/2003', CPF: '328.875.665-54', Email: 'ellen.123@gmail.com', Senha: 'ellen123', ativo: true },
  ];

      // 2. Injete o Router no construtor
      constructor(private router: Router) {}
  
  onSearch() {
    console.log('Buscando por:', this.searchTerm);
  }
  // 3. Atualize o método para usar o router
  editarUsuario(usuario: any) {
    console.log('Redirecionando para a página de edição. Dados do exercício (não enviados):', usuario);
    
    // Navega para a rota estática 'editar-exercicio'
    // A barra '/' no início garante que a navegação seja a partir da raiz.
    this.router.navigate(['/editar-usuario']);
  }


excluirUsuario(usuario: any) {
  const confirmacao = confirm(`Deseja excluir o usuário ${usuario.Nome}?`);
  if (confirmacao) {
    this.usuarios = this.usuarios.filter((u) => u !== usuario);
  }
}
}

