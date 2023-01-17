import axios from "axios";
import server from "../../utils/server";
import { IPlataformBody } from "./plataform.interfaces";

export const getPlataforms = () =>{
     return axios.get(server.HOST+"/plataforms")
}

export const getPlataformById = (id:number) =>{
    return axios.get(server.HOST+'/plataforms/'+id)
}

export const createPlataform = (body:IPlataformBody) =>{
    return axios.post(server.HOST+'/plataforms/',body)
}
export const updatePlataform = (body:IPlataformBody, idPlataform:number) =>{
    return axios.put(server.HOST+'/plataforms/'+idPlataform,body)
}

export const deletePlataform = (idPlataform:number) =>{
    return axios.delete(server.HOST+'/plataforms/'+idPlataform)
}