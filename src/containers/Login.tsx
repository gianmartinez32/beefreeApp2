import { Button, Card, Form, Image, Input, Layout, message } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { formContext } from '../contexts/FormProvider';
import LOGO from '../assets/logo.svg'
import FONDO from '../assets/fondo-login.jpg'
import { ILoginBody } from '../services/auth/interfaces';
import { login } from '../services/auth/auth';

const Login = () => {
  const [form] = Form.useForm();
  const [loadingRequest, setLoadingRequest] = useState(false)
  const {reloadData,setReloadData, setIdToEdit, idToEdit,setLogged} = useContext(formContext)




  

  const loginRequest = async (body:ILoginBody)=>{
    try {
      setLoadingRequest(true)
      let response = await login(body)
      if(response.status === 401) {
        message.warning(response.data.message)
      }else{
        console.log(response)
        localStorage.setItem('token',response.data.token)
        setLogged(true)
        setReloadData(!reloadData)
      }
    } catch (error:any) {
      message.warning(error.response.data.message || 'Error in login request')
      
    } finally{
      setLoadingRequest(false)

    }
  }

  
  const onFinish = (values: ILoginBody) => {
      console.log('Success:', values);
      loginRequest(values)
  };

  const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
  };
  return (
    <Layout style={{display:'flex',justifyContent:'center', alignItems:'center', height:'97vh', backgroundImage:`url(${FONDO})`}}>
      <Card
      >
        <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
        <Image preview={false} src={LOGO} style={{ width: '200px' }} >

</Image>
        </div>

      <Form
            name="plataform"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input a username!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input a password'}]}
            >
                <Input type='password' />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button loading={loadingRequest} type="primary" htmlType="submit">
                Log in
                </Button>
            </Form.Item>
        </Form>
      </Card>
    </Layout>
  )
}

export default Login