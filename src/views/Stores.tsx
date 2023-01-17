import { Grid } from '@mui/material'
import { Button, Card, Empty, message, Typography } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import CardStores from '../components/CardStores'
import DrawerStore from '../components/drawerStore/DrawerStore'
import Loader from '../components/loader/Loader'
import { formContext } from '../contexts/FormProvider'
import { IStoreResponse } from '../services/store/store.interfaces'
import { getStores } from '../services/store/store.services'

const Stores = () => {
  const { reloadData } = useContext(formContext)

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [loadingRequest, setLoadingRequest] = useState(false)

  const [stores, setStores] = useState<IStoreResponse[]>([])
  useEffect(() => {
    getAllStores()
  }, [reloadData])


  const getAllStores = async () => {
    try {
      setLoadingRequest(true)
      let response = await getStores()
      setStores(response.data)
    } catch (error: any) {
      message.error(error.response.data.message)
    } finally {
      setLoadingRequest(false)
    }
  }

  return (
    <Grid container spacing={2}>
      <DrawerStore open={drawerOpen} onClose={() => setDrawerOpen(!drawerOpen)} />
      <Grid item xs={12} md={12} lg={12}>
        <Typography style={{ textAlign: 'center', fontSize: '25px', fontWeight: '300', }}>Stores</Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <Button onClick={() => setDrawerOpen(!drawerOpen)}>Add Store</Button>
      </Grid>

      {loadingRequest ? <Loader /> :
        <>
          {stores.length === 0 ?
            <Grid item xs={12} md={12}>
              <Empty />
            </Grid> :
            stores.map(store => <Grid key={store.id} item xs={12} md={6} lg={4}>
              <CardStores onOpenDrawer={() => setDrawerOpen(true)} store={store} key={store.id} />
            </Grid>)}
        </>}


    </Grid>
  )
}

export default Stores