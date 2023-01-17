import React, { useContext, useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd';
import { createPlataform, getPlataformById, updatePlataform } from '../../services/plataform/plataform.services';
import { IPlataformBody } from '../../services/plataform/plataform.interfaces';
import { IdcardFilled } from '@ant-design/icons';
import { formContext } from '../../contexts/FormProvider';

const PlataformForm = ({idPlataform, onClose}:any) => {
    const [form] = Form.useForm();
    const [loadingRequest, setLoadingRequest] = useState(false)
    const {reloadData,setReloadData, setIdToEdit, idToEdit} = useContext(formContext)


    useEffect(() => {
    if(idToEdit !=0){
        getPlataformToEdit()
    }
    }, [idPlataform])

    const getPlataformToEdit = async () => {
        try {
            let plataform = await getPlataformById(idToEdit)
            console.log('plataform', plataform);
            form.setFieldValue(['name'], plataform.data.name)
            form.setFieldValue(['email'], plataform.data.email)
            form.setFieldValue(['link'], plataform.data.link)
        } catch (error:any) {
            message.error(error.response.data.message)
        }
    }

    const addPlataform =async (body:IPlataformBody) =>{
        try {
            setLoadingRequest(true)
            if(idToEdit ==0){
                let response = await createPlataform(body)
                message.success(response.data.message)
                setIdToEdit(0)
            }else{
                let response = await updatePlataform(body,idToEdit)
                setIdToEdit(0)
                message.success(response.data.message)
            }
            form.resetFields()
            setReloadData(!reloadData)
            onClose()
        } catch (error:any) {
            message.error(error.response.data.message)
        } finally{
            setLoadingRequest(false)
            setIdToEdit(0)

        }
    }
    
    const onFinish = (values: IPlataformBody) => {
        console.log('Success:', values);
        addPlataform(values)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
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
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input a plataform´s name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Link"
                name="link"
                rules={[{ required: true, message: 'Please input a link'}]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input an email!', type:'email' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button loading={loadingRequest} type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    )
}

export default PlataformForm