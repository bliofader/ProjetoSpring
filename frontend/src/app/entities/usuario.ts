export interface Usuario {
    id?: number,
    nome: string,
    tipo: string,
    dataNascimento: Date,
    cpf: string,
    email: string,
    senha: string,
    imagePath: string
}