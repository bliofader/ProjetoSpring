import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from "../../../components/footer/footer.component";
import { NavbarComponent } from "../../../components/navbar/navbar.component";
import { HeaderTopComponent } from '../../../components/headertop/headertop.component';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../entities/usuario';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ CommonModule, RouterModule, FormsModule, FooterComponent, NavbarComponent, HeaderTopComponent ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminCadastroUsuarioComponent implements OnInit {
  searchTerm = '';
  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.findAll().subscribe({
      next: (res) => this.usuarios = res,
      error: () => alert('Erro ao carregar usuários.')
    });
  }

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


  editarUsuario(usuario: Usuario) {
    console.log('Editando usuário:', usuario);
    // redirecionar ou abrir modal
  }

  excluirUsuario(usuario: Usuario) {
    const confirmacao = confirm(`Deseja excluir o usuário ${usuario.nome}?`);
    if (confirmacao) {
      this.usuarioService.delete(usuario.id!).subscribe({
        next: () => {
          alert('Usuário excluído com sucesso!');
          this.usuarios = this.usuarios.filter(u => u.id !== usuario.id);
        },
        error: () => alert('Erro ao excluir usuário.')
      });
    }
  }
}
