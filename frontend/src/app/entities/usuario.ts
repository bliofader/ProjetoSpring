export interface Usuario {
  nome: string;
  tipo: string;
  dataNascimento: string; // ou Date, dependendo do backend
  cpf: string;
  email: string;
  senha: string;
}
