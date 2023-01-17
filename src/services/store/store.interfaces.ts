export interface IBodyStore{
    name:string;
    id_plataform:number;
}
export interface IStoreResponse {
    id:           number;
    name:         string;
    createdAt:    Date;
    updatedAt:    Date;
    id_plataform: number;
    plataform:    Plataform;
}

export interface Plataform {
    name: string;
}