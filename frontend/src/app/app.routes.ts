import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginPersonalComponent } from './pages/login/login-personal/login-personal.component';
import { LoginUsuarioComponent } from './pages/login/login-usuario/login-usuario.component';
import { AdminCadastroUsuarioComponent } from './pages/home/admin/admin.component';
import { AdminCadastroExercicioComponent } from './pages/home/exercicios/exercicios.component';
import { CadastrarexerciciosComponent } from './pages/home/cadastrarexercicios/cadastrarexercicios.component';
import { CadastrarusuarioComponent } from './pages/home/cadastrarusuario/cadastrarusuario.component';
import { SobreNosComponent } from './pages/nav/sobre-nos/sobre-nos.component';
import { ContatoComponent } from './pages/nav/contato/contato.component';


//link das paginas
export const routes: Routes = [
    {
        //rotas lading page
        path: '',
        component: HomeComponent,
        title: 'Gymfy - Home', //titulo da pagina
    },
    {
        //login Usuario
        path: 'login-personal',
        component: LoginPersonalComponent,
        title: 'Gymfy - Login Personal',
    },
    {
        path: 'login-usuario',
        component: LoginUsuarioComponent,
        title: 'Gymfy - Login Usuario',
    },

    //barra de navegação
    {
        path: 'sobre-nos',
        component: SobreNosComponent,
        title: 'Gymfy - Sobre nos',
    },
    {
        path: 'contato',
        component: ContatoComponent,
        title: 'Gymfy - Contato',
    },
    {
        path: 'sobre-nos',
        component: SobreNosComponent,
        title: 'Gymfy - Sore Nos',
    },
    // icaro
    {
        path: 'admin',
        component: AdminCadastroUsuarioComponent,
        title: 'Gymfy - Admin',
    },
    {
        path: 'exercicios',
        component: AdminCadastroExercicioComponent,
        title: 'Gymfy - Exercicios',
    },
    {
        path: 'cadastrarexercicios',
        component: CadastrarexerciciosComponent,
        title: 'Cad - Exercicios',
    },
    {
        path: 'cadastrarusuario',
        component: CadastrarusuarioComponent,
        title: 'Cad - Usuario',
    }
];


