import React from 'react'
import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react'
import { Menu } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { IPropsSideBar, sideBarItems } from './SideBar.helpers';

const SideBar = ({collapsed}:IPropsSideBar) => {
    let navigateTo = useNavigate()


   const renderItems = ()=> {
    return sideBarItems.map(sideBarItem =>{
        if(!sideBarItem.children){
            return {...sideBarItem,
            onClick: () =>navigateTo(sideBarItem.key)}
        }else{
            return {
                ...sideBarItem,
                children: sideBarItem.children.map((children:any )=> ({...children, onClick: () =>navigateTo(children.key)}))
            }
        }
   })
   }
    
    const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
        (icon, index) => {
          const key = String(index + 1);
      
          return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: `subnav ${key}`,
      
            children: new Array(4).fill(null).map((_, j) => {
              const subKey = index * 4 + j + 1;
              return {
                key: subKey,
                label: `option${subKey}`,
                onClick:()=>console.log('hola'),
              };
            }),
          };
        },
      );
  return (
    <Menu
    disabledOverflow
    mode="inline"
    defaultSelectedKeys={['1']}
    style={{ height: '100%', borderRight: 0 }}
    items={renderItems()}
    inlineCollapsed = {collapsed}
  />
  )
}

export default SideBar