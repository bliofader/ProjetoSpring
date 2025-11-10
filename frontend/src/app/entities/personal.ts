export interface Personal {
  id?: number;
  nome: string;
  email: string;
  cpf: string;
  dataNascimento: string;
  tipo: string;
  especialidade: string;
  descricao: string;
  redeSocial: string;
  imagePath?: string; // opcional, se estiver usando imagens
}
