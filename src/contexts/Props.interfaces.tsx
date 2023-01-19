import { ReactNode } from "react";

export interface IPropsFormProvider {
    children: ReactNode
}

export interface IContext { idToEdit:number, setIdToEdit:React.Dispatch<React.SetStateAction<number>>, reloadData:boolean, setReloadData:React.Dispatch<React.SetStateAction<boolean>>, storeSelected:number, setStoreSelected:React.Dispatch<React.SetStateAction<number>>, logged:boolean, setLogged:React.Dispatch<React.SetStateAction<boolean>> }