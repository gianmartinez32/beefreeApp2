import { Button, Form, Input, message, Select } from 'antd'
import { format } from 'node:path/win32';
import React, { useContext, useEffect, useState } from 'react'
import { formContext } from '../../contexts/FormProvider';
import { IBodyMovement } from '../../services/movement/movement.interfaces';
import { createMovement, getMovementById, updateMovement } from '../../services/movement/movement.services';
import { IStoreResponse } from '../../services/store/store.interfaces';
import { getStores } from '../../services/store/store.services';
import { MOVEMENT_TYPE_OPTIONS } from '../../utils/constants';

const MovementsForm = ({onClose}:any) => {
    const [form] = Form.useForm();
    const [loadingRequest, setLoadingRequest] = useState(false)
    const [storeOptions, setStoreOptions] = useState([])
    const { reloadData, setReloadData, setIdToEdit, idToEdit } = useContext(formContext)
    const onFinish = (values: any) => {
        console.log('Success:', { ...values, id_user: 1 });
        createOrUpdateMovement({ ...values, id_user: 1 })
    };

    useEffect(() => {
        getOptionsStore()
        if (idToEdit != 0) {
            getMovementToEdit()
        }
    }, [idToEdit])

    const getMovementToEdit = async () => {
        try {
            let response = await getMovementById(idToEdit)
            form.setFieldValue(['id_store'], response.data.id_store)
            form.setFieldValue(['description'], response.data.description)
            form.setFieldValue(['type_movement'], response.data.type_movement)
            form.setFieldValue(['movement_value'], response.data.movement_value)
        } catch (error: any) {
            message.error(error.response.data.message)
        }
    }

    const getOptionsStore = async () => {
        try {
            let response = await getStores()
            let storesOptions = response.data.map((store: IStoreResponse) => ({ label: store.name, value: store.id }))
            setStoreOptions(storesOptions)
        } catch (error: any) {
            message.error(error.response.data.message)
        }
    }

    const createOrUpdateMovement = async (body: IBodyMovement) => {
        try {
            setLoadingRequest(true)
            if (idToEdit === 0) {
                let response = await createMovement(body)
                message.success(response.data.message)
            } else {
                let response = await updateMovement(body, idToEdit)
                message.success(response.data.message)
                setIdToEdit(0)
            }
            form.resetFields()
            setReloadData(!reloadData)
            onClose()

        } catch (error: any) {
            message.error(error.response.data.message)
        } finally{
            setLoadingRequest(false)
        }
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
            name="movement"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
        >
            <Form.Item
                label="Store"
                name="id_store"
                rules={[{ required: true, message: 'Please select a store' }]}
            >
                <Select
                    showSearch
                    placeholder="Select a store"
                    optionFilterProp="children"
                    options={storeOptions}
                />
            </Form.Item>
            <Form.Item
                label="Movement type"
                name="type_movement"
                rules={[{ required: true, message: 'Please select a movement type!' }]}
            >
                <Select
                    showSearch
                    placeholder="Select a movement type"
                    optionFilterProp="children"
                    options={MOVEMENT_TYPE_OPTIONS}
                />
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please input a description' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Movement value"
                name="movement_value"
                rules={[{ required: true, message: 'Please input a value' }]}
            >
                <Input type='number' />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button loading={loadingRequest} type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    )
}

export default MovementsForm