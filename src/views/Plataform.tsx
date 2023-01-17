import { Grid } from '@mui/material'
import { Button, Card, Drawer, Typography, message, Empty } from 'antd'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import CardPlataform from '../components/CardPlataform'
import DrawerPlataform from '../components/DrawerPlataform'
import Loader from '../components/loader/Loader'
import { formContext } from '../contexts/FormProvider'
import { IPlataformResponse } from '../services/plataform/plataform.interfaces'
import { getPlataforms } from '../services/plataform/plataform.services'
import server from '../utils/server'

const Plataform = () => {
  const { setIdToEdit, reloadData } = useContext(formContext)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [plataforms, setPlataforms] = useState<IPlataformResponse[]>([])

   const getPlataformsData = async () => {
    try {
      setLoading(true)
      let response = await getPlataforms()
      console.log(response)
      setPlataforms(response.data)
    } catch (error: any) {
      message.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getPlataformsData()
  }, [reloadData])

  return (
    <Grid container spacing={2}>
      <DrawerPlataform open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <Grid item xs={12} md={12}>
        <Typography style={{ textAlign: 'center', fontSize: '25px', fontWeight: '300', }}>Plataforms</Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <Button onClick={() => setDrawerOpen(!drawerOpen)}>Add Plataform</Button>
      </Grid>
      {loading ?
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <Loader />
        </Grid> : <>
        {plataforms.length === 0 ? 
        
        <Grid item xs={12} md={12}><Empty /></Grid> :
        plataforms.map(plataform => (
        <Grid key={plataform.id} item xs={12} md={3}>
            <CardPlataform
            key={plataform.id}
              name={plataform.name}
              email={plataform.email}
              link={plataform.link}
              id={plataform.id}
              onOpenDrawer={() => setDrawerOpen(true)}
              color='#24BFCC' />
          </Grid>
          ))}
        </>}


    </Grid>
  )
}

export default Plataform