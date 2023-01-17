import { useState } from 'react'
import PrincipalLayout from './containers/PrincipalLayout'
import FormProvider from './contexts/FormProvider'

function App() {

  return (
    <FormProvider>
      <PrincipalLayout />
    </FormProvider>

  )
}

export default App
