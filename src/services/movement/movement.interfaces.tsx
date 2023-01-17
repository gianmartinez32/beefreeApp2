export interface IBodyMovement {
description:string;
type_movement:number;
id_store:number;
id_user:number;
movement_value:number;
}

export interface IMovementResponse {
    id:             number;
    description:    string;
    type_movement:  number ;
    movement_value: number;
    createdAt:      Date;
    updatedAt:      Date;
    id_user:        number;
    id_store:       number;
    store:          Store;
}

export interface Store {
    name: string;
}