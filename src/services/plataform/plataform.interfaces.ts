export interface IPlataformBody {
    name: string;
    email:string;
    link:string;
}
export interface IPlataformResponse {
    id:        number;
    name:      string;
    email:     string;
    link:      string;
    createdAt: Date;
    updatedAt: Date;
}