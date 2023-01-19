import React, { useContext, useEffect } from 'react';
import { useState } from 'react'
import {
  LaptopOutlined, NotificationOutlined, UserOutlined, MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import LogoutIcon from '@mui/icons-material/Logout';
import { message, Select } from 'antd';
import { Layout, Button, Image } from 'antd';
import SideBar from '../core/sidebar/SideBar';
import ModulesRouter from '../routes/ModulesRouter';
import LOGO from '../assets/logo.svg'
import { formContext } from '../contexts/FormProvider';
import { IStoreResponse } from '../services/store/store.interfaces';
import { getStores } from '../services/store/store.services';

const { Header, Content, Sider } = Layout;

const PrincipalLayout = () => {



  const { storeSelected, setStoreSelected, reloadData,setReloadData,logged, setLogged } = useContext(formContext)

  const [storeOptions, setStoreOptions] = useState([])
  const [collapsed, setCollapsed] = useState(false)

const logout = () => {
  localStorage.removeItem('token')
  setReloadData(!reloadData)
  setLogged(false)
  
}
  useEffect(() => {
    getOptionsStore()
  }, [reloadData])

  const getOptionsStore = async () => {
    try {
      let response = await getStores()
      let storesOptions = response.data.map((store: IStoreResponse) => ({ label: store.name, value: store.id }))
      setStoreOptions(storesOptions)
    } catch (error: any) {
      message.error(error.response.data.message)
    }
  }
  return (
    <Layout>
      <Header style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'space-between' }}>
        <div className="logo" >
          <Image preview={false} src={LOGO} style={{ width: '200px', marginLeft: '-18px' }} >

          </Image>
        </div>
        <Button style={{ justifySelf: 'end', border: 'none', alignSelf: 'center' }} color='primary' onClick={() => logout()}><LogoutIcon /></Button>

      </Header>
      <Layout>
        <Sider width={250} >
          <SideBar collapsed={collapsed} />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Select
            style={{ margin: '8px' }}
            value={storeSelected}
            defaultValue={0}
            onChange={(e)=>setStoreSelected(e)}
            options={[{ value: 0, label: 'All' }, ...storeOptions]}
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: 'white',
            }}
          >
            <ModulesRouter />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default PrincipalLayout