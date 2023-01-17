import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { ConfigProvider, Button } from 'antd';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#24BFCC',
      },
    }}
  >
 <BrowserRouter>
   <App />
 </BrowserRouter>    

  </ConfigProvider>
   
  </React.StrictMode>,
)
