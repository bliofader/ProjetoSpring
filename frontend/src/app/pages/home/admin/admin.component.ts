import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../../components/footer/footer.component";
import { HomeComponent } from '../home.component';
import { NavbarComponent } from "../../../components/navbar/navbar.component";
import { HeaderTopComponent } from '../../../components/headertop/headertop.component';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../entities/usuario';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    HomeComponent,
    CommonModule,
    FormsModule,
    RouterOutlet,
    FooterComponent,
    RouterLink,
    NavbarComponent,
    HeaderTopComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminCadastroUsuarioComponent implements OnInit {
  searchTerm = '';
  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.usuarioService.findAll().subscribe({
      next: (res) => this.usuarios = res,
      error: () => alert('Erro ao carregar usuários.')
    });
  }

  onSearch() {
    console.log('Buscando por:', this.searchTerm);
  }

  editarUsuario(usuario: Usuario) {
    console.log('Editando usuário:', usuario);
    this.router.navigate(['/editar-usuario', usuario.id]); // ✅ redireciona com o ID
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
