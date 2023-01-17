import { Button, Card, message, Typography } from 'antd'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import React, { useContext } from 'react'
import { deletePlataform } from '../services/plataform/plataform.services';
import { formContext } from '../contexts/FormProvider';

export interface ICardPlataformProps {
    name: string,
    email: string,
    link: string,
    color: string,
    id: number
    onOpenDrawer:()=>void
}

const CardPlataform = ({ color, email, link, name,id,onOpenDrawer }: ICardPlataformProps) => {
const {setReloadData,reloadData, setIdToEdit} = useContext(formContext)
    const deletePlataformById = async ()=>{
        try {
            console.log('id=',id);
            let response = await deletePlataform(id)
            message.success(response.data.message)
            setReloadData(!reloadData)
        } catch (error:any) {
            message.error(error.response.data.message)
        }
    }

    const handleEditPlataform = ()=>{
        setIdToEdit(id)
        onOpenDrawer()
    }
    return (
        <Card title={<Typography style={{ color: color }}>{name}</Typography>}
            style={{ maxWidth: '300px', borderColor: color, color: 'white' }}
            bodyStyle={{ maxHeight: '100px', paddingTop: '10px' }}
            headStyle={{border:'none'}}
            hoverable
            actions={[
            <Button style={{ border: 'none' }} onClick={handleEditPlataform}><EditOutlinedIcon /></Button>,
            <Button style={{ border: 'none' }} onClick={deletePlataformById}><DeleteOutlineOutlinedIcon /></Button>
            ]}
            >
            <Typography style={{ fontSize: '12px', color: color }} > <b>Email:</b> {email}</Typography>
            <Typography style={{ fontSize: '12px', color: color }}><b>Link:</b> {link}</Typography>
        </Card>
    )
}

export default CardPlataform