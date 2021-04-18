import React from  'react'
import { PieChart } from 'react-minimal-pie-chart';

export default class SpecsDisplay extends React.Component {

  render() {
    return (
      <div style={{ height: 300, width: 300, marginTop: '100px' }}>
        <PieChart data={[
          { title: 'pass', value: 33, color: '#E38627' },
          { title: 'fail', value: 27, color: '#C13C37' },
        ]}
        label={({ dataEntry }) => dataEntry.value}
        segmentsShift={(index) => (index === 0 ? this.CHART_SHIFT_SIZE : 0.5)}
        radius="30"
        />

      </div>
    )
  }
}
