import { EditFilled, ShopOutlined } from '@ant-design/icons'
import { Store } from '@mui/icons-material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { Button, Card, message } from 'antd'
import Meta from 'antd/es/card/Meta'
import React, { useContext } from 'react'
import { formContext } from '../contexts/FormProvider';
import { IStoreResponse } from '../services/store/store.interfaces';
import { deleteStore } from '../services/store/store.services';
interface ICardStoreProps{
    store:IStoreResponse;
    onOpenDrawer:()=>void

}
const CardStores = ({store, onOpenDrawer}:ICardStoreProps) => {
    const {setReloadData,reloadData, setIdToEdit} = useContext(formContext)

    const deleteStoreById = async ()=>{
        try {
            let response = await deleteStore(store.id)
            message.success(response.data.message)
            setReloadData(!reloadData)
        } catch (error:any) {
            message.error(error.response.data.message)
        }
    }

    const handlerEdit  = () =>{
        setIdToEdit(store.id)
        onOpenDrawer()
    }


  return (
    <Card
    hoverable
    bodyStyle={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
  >
    <Meta
      avatar={<ShopOutlined style={{ fontSize: '50px' }} />}
      title={store.name}
      description={store.plataform.name}
      style={{ width: '50%' }}
    />
    <div style={{ display: 'flex', width: '100&', flexDirection: 'column', gap: '5px' }}>
      <Button onClick={handlerEdit}><EditFilled /></Button>
      <Button onClick={deleteStoreById}><DeleteOutlineOutlinedIcon /></Button>
    </div>

  </Card>
  )
}

export default CardStores