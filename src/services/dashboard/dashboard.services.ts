import axios from "axios";
import server from "../../utils/server";

export const getIndicators = async (id_store:number)=>{
    return axios.get(server.HOST+`/dashboard/indicators/${id_store!=0 ? id_store : ''}`)
}

export const getIncomesValuesWeek = async (id_store:number)=>{
    return axios.get(server.HOST+`/dashboard/charts/incomes/${id_store!=0 ? id_store : ''}`)
}

export const getCostsValuesWeek = async (id_store:number)=>{
    return axios.get(server.HOST+`/dashboard/charts/costs/${id_store!=0 ? id_store : ''}`)

}