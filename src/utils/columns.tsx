import { Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import { IMovementResponse } from "../services/movement/movement.interfaces";

export const COLUMNS_MOVEMENTS: (onEdit: (id: number) => any, onDelete: (id: number) => any) => ColumnsType<IMovementResponse> = (onEdit?, onDelete?) => [
    {
        title: 'Store',
        dataIndex: ['store','name'],
        key: 'id'
    },
    {
        title: 'Movement Type',
        dataIndex: 'type_movement',
        key: 'nombre'
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'apellido'
    },{
        title: 'Movement value',
        dataIndex: 'movement_value',
        key: 'apellido'
    },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'contraseña'
    },
    {
        title: 'Actions',
        fixed: 'right',
        dataIndex: 'actions',
        key: 'acciones',
        render: (_value, record) => <>
            <Button key={record.id} onClick={() => onEdit(record.id)}>Editar</Button>
       

            <Button key={record.id} onClick={() => onDelete(record.id)}>Eliminar</Button>
        </>
    }
]