import axios from "axios";
import server from "../../utils/server";
import { IBodyMovement } from "./movement.interfaces";

export const getMovements = () =>{
     return axios.get(server.HOST+"/movements")
}

export const getMovementById = (id:number) =>{
    return axios.get(server.HOST+'/movements/'+id)
}

export const createMovement = (body:IBodyMovement) =>{
    return axios.post(server.HOST+'/movements/',body)
}
export const updateMovement = (body:IBodyMovement, idMovement:number) =>{
    return axios.put(server.HOST+'/movements/'+idMovement,body)
}

export const deleteMovement = (idMovement:number) =>{
    return axios.delete(server.HOST+'/movements/'+idMovement)
}