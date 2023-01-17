import { Drawer } from 'antd'
import React, { useContext } from 'react'
import { formContext } from '../../contexts/FormProvider'
import { IDrawerProps } from '../drawerStore/DrawerStore.interface'
import MovementsForm from '../forms/MovementsForm'

const DrawerMovement = ({onClose,open}:IDrawerProps) => {
    const {idToEdit } = useContext(formContext)

    return (
        <Drawer title={idToEdit===0?'Add movement':'Edit movement'} open={open} onClose={onClose} >
            <MovementsForm onClose = {onClose} />
        </Drawer>
    )
}

export default DrawerMovement