import React, { createContext, useState, ReactNode, useMemo } from 'react'
import {IPropsFormProvider} from './Props.interfaces'
export const formContext = createContext({})


const FormProvider = ({children}:IPropsFormProvider)  =>{
    const [idToEdit, setIdToEdit] = useState<number>(0)
    const [reloadData, setReloadData] = useState(false)
    const [storeSelected, setStoreSelected] = useState(0)
    const value = useMemo(()=>({idToEdit, setIdToEdit,reloadData,setReloadData,storeSelected, setStoreSelected}),[idToEdit, setIdToEdit,reloadData,setReloadData,storeSelected, setStoreSelected])
    console.log(value)
    return <formContext.Provider value={value}>
        {children}
    </formContext.Provider>
}

export default FormProvider