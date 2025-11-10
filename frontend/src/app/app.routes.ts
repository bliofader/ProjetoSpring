import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginPersonalComponent } from './pages/login/login-personal/login-personal.component';
import { LoginUsuarioComponent } from './pages/login/login-usuario/login-usuario.component';
import { LoginAdminComponent } from './pages/login/login-admin/login-admin.component';
import { LoginCadastrarComponent } from './pages/login/login-cadastrar/login-cadastrar.component';

import { SobreNosComponent } from './pages/nav/sobre-nos/sobre-nos.component';
import { ContatoComponent } from './pages/nav/contato/contato.component';

import { TelaExercicioComponent } from './pages/home/tela-exercicio/tela-exercicio.component';
import { TelaExercicioDetalhesComponent } from './pages/home/tela-exercicio-detalhes/tela-exercicio-detalhes.component';

import { TelaPersonalInicialComponent } from './pages/home/tela-personal-inicial/tela-personal-inicial.component';
import { ListaPersonaisComponent } from './pages/home/lista-personais/lista-personais.component';
import { ListaPersonaisDetalhesComponent } from './pages/home/lista-personais-detalhes/lista-personais-detalhes.component';

import { AdminCadastroUsuarioComponent } from './pages/home/admin/admin.component';
import { AdminCadastroExercicioComponent } from './pages/home/exercicios/exercicios.component';
import { CadastrarExerciciosComponent } from './pages/home/cadastrarexercicios/cadastrarexercicios.component';
import { CadastrarUsuarioComponent } from './pages/home/cadastrarusuario/cadastrarusuario.component';
import { CriarListaComponent } from './pages/home/criarlista/criarlista.component';
import { ListarListaComponent } from './pages/home/listar-listas/listar-listas.component';
import { EditarExercicioComponent } from './pages/home/editar-exercicio/editar-exercicio.component';
import { EditarListaComponent } from './pages/home/editar-lista/editar-lista.component';
import { EditarUsuarioComponent } from './pages/home/editar-usuario/editar-usuario.component';

import { UsuarioComponent } from './usuario/usuario.component';
import { UserHomeComponent } from './pages/User/user-home/user-home.component';
import { UserTreinoComponent } from './pages/User/user-treino/user-treino.component';
import { UserContaComponent } from './pages/User/user-conta/user-conta.component';
import { UserPersonalComponent } from './pages/User/user-personal/user-personal.component';
import { ListaUsuarioComponent } from './pages/User/lista-usuario/lista-usuario.component';

import { noAuthGuard } from './guards/no-auth.guard';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Gymfy - Home' },

  // Login
  { path: 'login-personal', component: LoginPersonalComponent, title: 'Gymfy - Login Personal' },
  { path: 'login-usuario', component: LoginUsuarioComponent, title: 'Gymfy - Login Usuario', canActivate: [noAuthGuard] },
  { path: 'login-admin', component: LoginAdminComponent, title: 'Gymfy - Login Admin' },
  { path: 'login-cadastrar', component: LoginCadastrarComponent, title: 'Login - Cadastrar' },

  // Navegação
  { path: 'sobre-nos', component: SobreNosComponent, title: 'Gymfy - Sobre nós' },
  { path: 'contato', component: ContatoComponent, title: 'Gymfy - Contato' },

  // Exercícios
  { path: 'tela-exercicio', component: TelaExercicioComponent, title: 'Gymfy - Exercícios' },
  { path: 'detalhes/:nome', component: TelaExercicioDetalhesComponent, title: 'Gymfy - Detalhes dos Exercícios' },
  {
    path: 'detalhes/:id',
    loadComponent: () => import('./pages/home/tela-exercicio-detalhes/tela-exercicio-detalhes.component')
      .then(m => m.TelaExercicioDetalhesComponent),
    title: 'Gymfy - Detalhes dos Exercícios'
  },

  // Personais
  { path: 'tela-personal', component: ListaPersonaisComponent, title: 'Gymfy - Personal' },
  { path: 'personal-detalhes/:nome', component: ListaPersonaisDetalhesComponent, title: 'Detalhes - Personal' },
  { path: 'personal-detalhes/:id', component: ListaPersonaisDetalhesComponent },

  // Admin





  // Admin (protegidas)
  { path: 'admin', component: AdminCadastroUsuarioComponent, title: 'Gymfy - Admin', canActivate: [adminGuard] },
  { path: 'exercicios', component: AdminCadastroExercicioComponent, title: 'Gymfy - Exercícios', },
  { path: 'cadastrarexercicios', component: CadastrarExerciciosComponent, title: 'Cad - Exercícios', canActivate: [adminGuard] },
  { path: 'cadastrarusuario', component: CadastrarUsuarioComponent, title: 'Cad - Usuário', canActivate: [adminGuard] },
  { path: 'criarlista', component: CriarListaComponent, title: 'Cadastrar - Lista', canActivate: [adminGuard] },
  { path: 'listar-listas', component: ListarListaComponent, title: 'Listar - Lista', canActivate: [adminGuard] },
  { path: 'editar-exercicio', component: EditarExercicioComponent, title: 'Editar - Exercício', canActivate: [adminGuard] },
  { path: 'editar-lista', component: EditarListaComponent, title: 'Editar - Lista', canActivate: [adminGuard] },
  { path: 'editar-usuario', component: EditarUsuarioComponent, title: 'Editar - Usuário', canActivate: [adminGuard] },




  // Usuários
  { path: 'usuarios', component: UsuarioComponent, title: 'Gymfy - Usuários Comuns' },

  // Área do usuário autenticado
  { path: 'user/home', component: UserHomeComponent, title: 'Home - Usuários', canActivate: [authGuard] },
  { path: 'user/treinos', component: UserTreinoComponent, title: 'Treino - Usuários', canActivate: [authGuard] },
  { path: 'user/conta', component: UserContaComponent, title: 'Conta - Usuário', canActivate: [authGuard] },
  { path: 'user/personal', component: UserPersonalComponent, title: 'Personal - Usuário', canActivate: [authGuard] },
  { path: 'user/lista/detalhes', component: ListaUsuarioComponent, title: 'Lista - Usuário', canActivate: [authGuard] }
];
