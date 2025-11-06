import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
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
import { UserHomeComponent } from './pages/User/user-home/user-home.component';
import { UserTreinoComponent } from './pages/User/user-treino/user-treino.component';
import { UserContaComponent } from './pages/User/user-conta/user-conta.component';
import { UserPersonalComponent } from './pages/User/user-personal/user-personal.component';
import { ListaPersonaisComponent } from './pages/home/personal/lista-personais/lista-personais.component';
import { ListaPersonaisDetalhesComponent } from './pages/home/personal/lista-personais-detalhes/lista-personais-detalhes.component';
import { LoginAdminComponent } from './pages/login/login-admin/login-admin.component';


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
        path: 'login-admin',
        component: LoginAdminComponent,
        title: 'Gymfy - Login Admin',
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

    //personal
    {
        path: 'tela-personal',
        component: TelaPersonalInicialComponent,
        title: 'Home - Personal'
    },

    {
        path: 'personal',
        component: ListaPersonaisComponent,
        title: 'Lista - Personal'
    },

    {
        path: 'personal-detalhes/:nome',
        component: ListaPersonaisDetalhesComponent,
        title: 'Detalhes - Personal'
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

    //Pedro Usuários

    {
        path:'user/home',
        component: UserHomeComponent,
        title:'Home - Usuários'
    },

    {
        path:'user/treinos',
        component: UserTreinoComponent,
        title:'Treino - Usuários'
    },

    {
        path:'user/conta',
        component:UserContaComponent,
        title:'Conta - Usuário'
    },

    {
        path:'user/personal',
        component:UserPersonalComponent,
        title:'Personal - Usuário'
    }

    // {
    //     path: 'cadastrarexercicios',
    //     component: CadastrarExerciciosComponent,
    //     title: 'Cad - Exercicios',
    // }

];


