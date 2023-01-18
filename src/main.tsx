import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { ConfigProvider, Button } from 'antd';
import FormProvider from './contexts/FormProvider';


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
        <FormProvider>

          <App />
        </FormProvider>

      </BrowserRouter>

    </ConfigProvider>

  </React.StrictMode>,
)
