import { Grid } from '@mui/material'
import { Card, Statistic } from 'antd'
import React from 'react'
import { IPropsIndicator } from './Indicator.interface'

const Indicator = ({indicator, loading}:IPropsIndicator) => {
  return (
    <>
    <Grid item xs={12} md={3} lg={3}>
        <Card>
          <Statistic
            loading={loading}
            title="Income today"
            value={indicator.incomesToday}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={"$"}
          />
        </Card>
      </Grid>
      <Grid item xs={12} md={3} lg={3}>
        <Card>
          <Statistic
            loading={loading}
            title="Incomes week"
            value={indicator.incomesWeek}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={'$'}
          />
        </Card>
      </Grid>
      <Grid item xs={12} md={3} lg={3}>
        <Card>
          <Statistic
            loading={loading}
            title="Costs today"
            value={indicator.costsToday}
            precision={2}
            valueStyle={{ color: 'red' }}
            prefix={'$'}

          />
        </Card>
      </Grid>
      <Grid item xs={12} md={3} lg={3}>
        <Card>
          <Statistic
            loading={loading}
            title="Costs week"
            value={indicator.costsWeek}
            precision={2}
            valueStyle={{ color: 'red' }}
            prefix={'$'}
          />
        </Card>
      </Grid>
    </>
  )
}

export default Indicator