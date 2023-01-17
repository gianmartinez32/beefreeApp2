import axios from "axios";
import server from "../../utils/server";
import { IBodyStore } from "./store.interfaces";
export const getStores = () =>{
    return axios.get(server.HOST+"/stores")
}

export const getStoreById = (id:number) =>{
   return axios.get(server.HOST+'/stores/'+id)
}

export const createStore = (body:IBodyStore) =>{
   return axios.post(server.HOST+'/stores/',body)
}
export const updateStore = (body:IBodyStore, idStore:number) =>{
   return axios.put(server.HOST+'/stores/'+idStore,body)
}

export const deleteStore = (idStore:number) =>{
   return axios.delete(server.HOST+'/stores/'+idStore)
}