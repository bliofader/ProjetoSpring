import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginPersonalComponent } from './pages/login/login-personal/login-personal.component';
import { LoginUsuarioComponent } from './pages/login/login-usuario/login-usuario.component';
import { AdminCadastroUsuarioComponent } from './pages/home/admin/admin.component';
import { AdminCadastroExercicioComponent } from './pages/home/exercicios/exercicios.component';
import { CadastrarExerciciosComponent} from './pages/home/cadastrarexercicios/cadastrarexercicios.component';
import { CadastrarUsuarioComponent } from './pages/home/admin/cadastrarusuario/cadastrarusuario.component';
import { SobreNosComponent } from './pages/nav/sobre-nos/sobre-nos.component';
import { ContatoComponent } from './pages/nav/contato/contato.component';
import { TelaExercicioComponent } from './pages/home/tela-exercicio/tela-exercicio.component';
import { TelaExercicioDetalhesComponent } from './pages/home/tela-exercicio-detalhes/tela-exercicio-detalhes.component';
import { TelaPersonalInicialComponent } from './pages/home/tela-personal-inicial/tela-personal-inicial.component';
import { HeaderTopComponent } from './components/headertop/headertop.component';
import { LoginCadastrarComponent } from './pages/login/login-cadastrar/login-cadastrar.component';
import { CriarListaComponent } from './pages/login/criarlista/criarlista.component';
import { ListarListaComponent } from './pages/login/listar-listas/listar-listas.component';

//link das paginas
export const routes: Routes = [
    {
        //rotas lading page
        path: '',
        component: HomeComponent,
        title: 'Gymfy - Home', //titulo da pagina
    },
    {
        //login 
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


    //pag exercicio 
    {
        path: 'tela-exercicio',
        component: TelaExercicioComponent,
        title: 'Gymfy - Exercicios'
    },

    {
        path:  'detalhes/:nome',
        component: TelaExercicioDetalhesComponent,
        title: 'Gymfy - Detalhes dos Exercicios'
    },

    //persongal
    {
        path: 'tela-personal',
        component: TelaPersonalInicialComponent,
        title: 'Gymfy - Personal'
    },

    //pag criar lista de exercicio
    // {
    //     path: 'tela-criar-lista',
    //     component: TelaCriarListaComponent,
    //     title: 'Gymfy - Criar Lista de Exercicio'
    // },

    // icaro admin
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
        component: CadastrarExerciciosComponent,
        title: 'Cad - Exercicios',
    },
    {
        path: 'cadastrarusuario',
        component: CadastrarUsuarioComponent,
        title: 'Cad - Usuario',
    },
    {
        path: 'login-cadastrar',
        component: LoginCadastrarComponent,
        title: 'Login - Cadastrar',
    },
     {
        path: 'criarlista',
        component: CriarListaComponent,
        title: 'Cadastrar - Lista',
    },
         {
        path: 'listar-listas',
        component: ListarListaComponent,
        title: 'Listar - Lista',
    },
];


