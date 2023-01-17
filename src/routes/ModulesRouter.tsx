import React from 'react'
import { Route } from 'react-router'
import { Routes } from 'react-router-dom'
import Costs from '../views/Costs'
import Dashboard from '../views/Dashboard'
import Income from '../views/Income'
import Plataform from '../views/Plataform'
import Stores from '../views/Stores'

const ModulesRouter = () => {
  return (
    <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/movements" element={<Income />} />

        <Route path="/costs" element={<Costs />} />

        <Route path="/stores" element={<Stores />} />

        <Route path="/plataforms" element={<Plataform />} />

        <Route path="*" element={<Dashboard />}/ >

    </Routes>
  )
}

export default ModulesRouter