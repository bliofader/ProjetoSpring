export interface ListaDTO {
  nome: string;
  descricao?: string;
  data: Date;
  dia: string;
  usuarioId: number;
  exercicioIds: number[];
}
