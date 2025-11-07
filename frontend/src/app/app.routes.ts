import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginPersonalComponent } from './pages/login/login-personal/login-personal.component';
import { LoginUsuarioComponent } from './pages/login/login-usuario/login-usuario.component';
import { AdminCadastroUsuarioComponent } from './pages/home/admin/admin.component';
import { AdminCadastroExercicioComponent } from './pages/home/exercicios/exercicios.component';
import { CadastrarExerciciosComponent} from './pages/home/cadastrarexercicios/cadastrarexercicios.component';
import { CadastrarUsuarioComponent } from './pages/home/cadastrarusuario/cadastrarusuario.component';
import { SobreNosComponent } from './pages/nav/sobre-nos/sobre-nos.component';
import { ContatoComponent } from './pages/nav/contato/contato.component';
import { TelaExercicioComponent } from './pages/home/tela-exercicio/tela-exercicio.component';
import { TelaExercicioDetalhesComponent } from './pages/home/tela-exercicio-detalhes/tela-exercicio-detalhes.component';
import { TelaPersonalInicialComponent } from './pages/home/tela-personal-inicial/tela-personal-inicial.component';
import { UsuarioComponent } from './usuario/usuario.component'; // ✅ Adicionado

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'Gymfy - Home' },
    { path: 'login-personal', component: LoginPersonalComponent, title: 'Gymfy - Login Personal' },
    { path: 'login-usuario', component: LoginUsuarioComponent, title: 'Gymfy - Login Usuario' },
    { path: 'sobre-nos', component: SobreNosComponent, title: 'Gymfy - Sobre nos' },
    { path: 'contato', component: ContatoComponent, title: 'Gymfy - Contato' },
    { path: 'tela-exercicio', component: TelaExercicioComponent, title: 'Gymfy - Exercicios' },
    { path: 'tela-personal', component: TelaPersonalInicialComponent, title: 'Gymfy - Personal' },
    { path: 'admin', component: AdminCadastroUsuarioComponent, title: 'Gymfy - Admin' },
    { path: 'exercicios', component: AdminCadastroExercicioComponent, title: 'Gymfy - Exercicios' },
    { path: 'cadastrarexercicios', component: CadastrarExerciciosComponent, title: 'Cad - Exercicios' },
    { path: 'cadastrarusuario', component: CadastrarUsuarioComponent, title: 'Cad - Usuario' },
    { path: 'usuarios', component: UsuarioComponent, title: 'Gymfy - Usuários Comuns' }, 
{ 
  path: 'detalhes/:id', 
  loadComponent: () => import('./pages/home/tela-exercicio-detalhes/tela-exercicio-detalhes.component')
    .then(m => m.TelaExercicioDetalhesComponent),
  title: 'Gymfy - Detalhes dos Exercícios'
}



];