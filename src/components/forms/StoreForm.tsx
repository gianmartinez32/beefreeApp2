import { Button, Form, Input, message, Select } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { formContext } from '../../contexts/FormProvider'
import { IPlataformResponse } from '../../services/plataform/plataform.interfaces';
import { getPlataforms } from '../../services/plataform/plataform.services';
import { IBodyStore } from '../../services/store/store.interfaces';
import { createStore, getStoreById, updateStore } from '../../services/store/store.services';

const StoreForm = ({onClose}:any) => {
    const [form] = Form.useForm();
    const [loadingRequest, setLoadingRequest] = useState(false)
    const [plataformOptions, setPlataformOptions] = useState([])

    const { reloadData, setReloadData, setIdToEdit, idToEdit } = useContext(formContext)

    const getPlataformSelect = async () => {
        let { data } = await getPlataforms()
        let plataforms = data.map((plataform: IPlataformResponse) => ({ label: plataform.name, value: plataform.id }))
        setPlataformOptions(plataforms)
    }
    const getStoreToEdit = async () => {
        try {
            let store = await getStoreById(idToEdit)
            form.setFieldValue(['name'], store.data.name)
            form.setFieldValue(['id_plataform'], store.data.id_plataform)
        } catch (error:any) {
            message.error(error.response.data.message)
        }
    }
    const createOrUpdateStore = async (body: IBodyStore) => {
        try {
            if (idToEdit === 0) {
                let response = await createStore(body)
                message.success(response.data.message)
            } else {
                let response = await updateStore(body, idToEdit)
                message.success(response.data.message)
                setIdToEdit(0)

            }
            form.resetFields()
            setReloadData(!reloadData)
            onClose()

        } catch (error: any) {
            message.error(error.response.data.message)
        }
    }
    useEffect(() => {
        getPlataformSelect()
        if (idToEdit != 0) {
            getStoreToEdit()
        }
    }, [idToEdit])


    const onFinish = (values: IBodyStore) => {
        console.log('Success:', values);
        createOrUpdateStore(values)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
            name="store"
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
                label="Plataform"
                name="id_plataform"
                rules={[{ required: true, message: 'Please select a plataform' }]}
            >
                <Select
                    showSearch
                    placeholder="Select a plataform"
                    optionFilterProp="children"
                    options={plataformOptions}
                />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button loading={loadingRequest} type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    )
}

export default StoreForm