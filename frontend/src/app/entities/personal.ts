export interface Personal {
  id: number;
  nome: string;
  email: string;
  tipo: string;
  especialidade: string;
  descricao: string;   // ✅ agora sem acento
  redeSocial: string;
  imagem: string;
}
