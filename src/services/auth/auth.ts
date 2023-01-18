import axios from "axios";
import server from "../../utils/server";
import { ILoginBody } from "./interfaces";

export const login = (body:ILoginBody) => {
    return axios.post(server.HOST+'/authUser', body)
}