export interface Lista {
  id?: number;
  nome: string;
  descricao?: string;
  dia?: string;
  data?: Date;
  usuarioNome?: string;
  exercicios?: {
    id: number;
    nome: string;
    tipo?: string;
    agrupamento?: string;
    nivel?: string;
    descricao?: string;
    imagePath?: string;
    videoUrl?: string;
  }[];
}
