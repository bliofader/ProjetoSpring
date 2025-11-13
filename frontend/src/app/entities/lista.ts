export interface Lista {
  id?: number;
  nome: string;
  descricao?: string;
  dia?: string;
  data?: Date;
  usuarioId: number;
  exercicios?: {
    id: number;
    nome: string;
    grupoMuscular?: string;
    descricao?: string;
  }[];
}
