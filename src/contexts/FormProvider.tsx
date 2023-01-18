import React, { createContext, useState, ReactNode, useMemo, useEffect } from 'react'
import {IPropsFormProvider} from './Props.interfaces'
export const formContext = createContext({})


const FormProvider = ({children}:IPropsFormProvider)  =>{
    const [idToEdit, setIdToEdit] = useState<number>(0)
    const [reloadData, setReloadData] = useState(false)
    const [storeSelected, setStoreSelected] = useState(0)
    const [logged, setLogged] = useState(false)
    
    useEffect(() => {
    console.log('entree')
     let token = localStorage.getItem('token')
     console.log('token',token)
     if(token) setLogged(true)
    }, [logged])
    
    const value = useMemo(()=>({idToEdit, setIdToEdit,reloadData,setReloadData,storeSelected, setStoreSelected,logged, setLogged}),[idToEdit, setIdToEdit,reloadData,setReloadData,storeSelected, setStoreSelected])
    console.log(value)
    return <formContext.Provider value={value}>
        {children}
    </formContext.Provider>
}

export default FormProvider