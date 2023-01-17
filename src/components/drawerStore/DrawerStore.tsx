import { Drawer } from 'antd'
import React, { useContext } from 'react'
import { formContext } from '../../contexts/FormProvider'
import StoreForm from '../forms/StoreForm'
import { IDrawerProps } from './DrawerStore.interface'

const DrawerStore = ({open, onClose}:IDrawerProps) => {
  const {idToEdit} = useContext(formContext)

  return (
    <Drawer title={idToEdit === 0 ?'Add store':'Edit store'} open={open} closable onClose={onClose}>
        <StoreForm onClose={onClose} />
  </Drawer>
  )
}

export default DrawerStore