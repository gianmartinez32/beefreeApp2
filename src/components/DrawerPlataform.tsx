import { Drawer } from 'antd'
import React, { useContext } from 'react'
import { formContext } from '../contexts/FormProvider';
import { IDrawerProps } from './drawerStore/DrawerStore.interface';
import PlataformForm from './forms/PlataformForm';


const DrawerPlataform = ({open, onClose}:IDrawerProps) => {
  const {idToEdit} = useContext(formContext)
  return (
    <Drawer title={idToEdit === 0 ?'Add plataform':'Edit plataform'} open={open} closable onClose={onClose}>
      <PlataformForm idPlataform={idToEdit} onClose={onClose} />
    </Drawer>
  )
}

export default DrawerPlataform