import { BarChartOutlined, CompareArrows,Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { ItemType } from 'antd/lib/menu/hooks/useItems';
import Costs from '../../views/Costs';
import Dashboard from '../../views/Dashboard';
import Income from '../../views/Income';
import Plataform from '../../views/Plataform';
import Stores from '../../views/Stores';
export interface IPropsSideBar {
    collapsed: boolean;
}

export const sideBarItems: ItemType[] | any[]= [
    {
        label: 'Dashboard',
        icon: <BarChartOutlined />,
        key: '/dashboard',

    },
    {
        label: 'Transactions',
        icon: <CompareArrows />,
        key: 'transactions',
        children: [
            {
                label: 'Movements',
                key: '/movements',
            },
        ]

    },
    {
        label: 'Settings',

        icon: <Settings />,
        key: 'settings',
        children: [
            {
                label: 'Stores',
                key: '/stores',
            },
            {
                label: 'Plataforms',
                key: '/plataforms',
            }
        ]

    }

] 