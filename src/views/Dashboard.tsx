import { ArrowUpOutlined } from '@ant-design/icons'
import { Grid } from '@mui/material'
import { Card, message, Statistic } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import BarChart from '../components/charts/BarChart'
import Indicator from '../components/Indicator/Indicator'
import { formContext } from '../contexts/FormProvider'
import { IResponseIndicator, IValuesIncomeWeekResponse } from '../services/dashboard/dashboard.interfaces'
import { getCostsValuesWeek, getIncomesValuesWeek, getIndicators } from '../services/dashboard/dashboard.services'
import { DAYS_OF_WEEK } from '../utils/constants'

const Dashboard = () => {
  const { storeSelected } = useContext(formContext)
  const [loading, setLoading] = useState(false)
  const [dataChartIncomes, setDataChartIncomes] = useState<number[]>([])
  const [dataChartCosts, setDataChartCosts] = useState<number[]>([])

  const [indicators, setIndicators] = useState<IResponseIndicator>({
    incomesWeek: 0,
    costsWeek: 0,
    incomesToday: 0,
    costsToday: 0
  })

  const getIndicator = async () => {
    try {
      setLoading(true)
      const response = await getIndicators(storeSelected)
      setIndicators(response.data)
    } catch (error: any) {
      message.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  const getValuesIncomeWeek = async () => {
    try {
      console.log('ALOOOO');
      
      const response = await getIncomesValuesWeek(storeSelected)

      console.log(response);
      
     setDataChartIncomes(response.data.map((income:IValuesIncomeWeekResponse) =>income.movementValueSum)) 
    } catch (error:any) {
      message.error(error.response.data.message )
    }
  }

  const getValuesCostWeek = async () => {
    try {
      const response = await getCostsValuesWeek(storeSelected)
      console.log(response.data.map((income:IValuesIncomeWeekResponse) =>income.movementValueSum));
      
      setDataChartCosts(response.data.map((income:IValuesIncomeWeekResponse) =>income.movementValueSum)) 
    } catch (error:any) {
      message.error(error.response.data.message )
    }
  }

  useEffect(() => {

    getIndicator()
    getValuesIncomeWeek()
    getValuesCostWeek()

  }, [storeSelected])


  return (
    <Grid container style={{ width: '100%', height: '100%' }} spacing={2}>
      <Indicator loading={loading} indicator={indicators} />

      <Grid item xs={12} md={6} lg={6}>
        <BarChart nameData='Incomes' labels={DAYS_OF_WEEK} barColor={'green'} data={dataChartIncomes} />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <BarChart nameData='Costs' labels={DAYS_OF_WEEK} barColor={'red'} data={dataChartCosts} />
      </Grid>
    </Grid>
  )
}

export default Dashboard