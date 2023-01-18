import { useContext, useEffect, useState } from 'react'
import Login from './containers/Login'
import PrincipalLayout from './containers/PrincipalLayout'
import FormProvider, { formContext } from './contexts/FormProvider'

function App() {
  const {logged,reloadData,setLogged} = useContext(formContext)
useEffect(() => {
  let token = localStorage.getItem('token')
  if(token) setLogged(true)
}, [logged,reloadData])

  return (<>
  {!logged  ? <Login /> : <PrincipalLayout />}
  </>
      

  )
}

export default App
