export interface Mensagem {
  id: number;              // identificador único da mensagem
  idUsuario: number;       // usuário que enviou a mensagem
  idPersonal: number;      // personal que vai receber
  conteudo: string;        // texto da mensagem
  dataEnvio: Date;         // data/hora do envio
}
