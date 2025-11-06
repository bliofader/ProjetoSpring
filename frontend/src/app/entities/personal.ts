import { Usuario } from "./usuario";

export interface Personal  extends Usuario{
    especialidade: string,
    descricao: string,
    redeSocial: string
}