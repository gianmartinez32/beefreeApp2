import { Grid } from '@mui/material'
import { Button, message, Table, Typography } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import DrawerMovement from '../components/drawerMovement/DrawerMovement'
import { formContext } from '../contexts/FormProvider'
import { IMovementResponse } from '../services/movement/movement.interfaces'
import { deleteMovement, getMovements } from '../services/movement/movement.services'
import { COLUMNS_MOVEMENTS } from '../utils/columns'
import { MOVEMENT_TYPE } from '../utils/constants'

const Income = () => {
  const {idToEdit, setIdToEdit, reloadData, setReloadData } = useContext(formContext)
  const [loading, setLoading] = useState(false)

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [movements, setMovements] = useState<IMovementResponse[]>([])

  useEffect(() => {
    getMovementsData()
  }, [reloadData])
  const getMovementsData = async ()=>{
    setLoading(true)
    try {
      let response = await getMovements()
      setMovements(response.data.map((movement:IMovementResponse) =>({...movement, 
        type_movement:movement.type_movement ==1 ?'Income':'Cost',
        createdAt:new Date(movement.createdAt).toUTCString(),
      })))
    } catch (error:any) {
      message.error(error.response.data.message)
    }finally{
      setLoading(false)
    }
  }

  const onDelete = async (id:number)=>{
    try {
      let response = await deleteMovement(id)
      message.success(response.data.message)
      setReloadData(!reloadData)
    } catch (error:any) {
      message.error(error.response.data.message)
    }
  }

  const onEdit = (id:number)=>{
    setIdToEdit(id)
    setDrawerOpen(true)
    setReloadData(!reloadData)
  }
  return (
    <Grid container spacing={2}>
      <DrawerMovement onClose={() => setDrawerOpen(false)} open={drawerOpen} />
      <Grid item xs={12} md={12} lg={12}>
        <Typography style={{ textAlign: 'center', fontSize: '25px', fontWeight: '300', }}>Movements</Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <Button onClick={() => setDrawerOpen(!drawerOpen)}>Add movement</Button>
      </Grid>
      <Grid item xs={12} md={12}>
        <Table 
        dataSource={movements} 
        columns={COLUMNS_MOVEMENTS(onEdit,onDelete)}
        loading={loading}
        />
      </Grid>




    </Grid>
  )
}

export default Income