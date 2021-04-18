import React from  'react'
import { PieChart } from 'react-minimal-pie-chart';
import SpecRecord from './SpecRecord'
import { getSpecs } from '../net/net'

export default class SpecsDisplay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      specData: [],
      totalSpecs: 0,
      withRuns: [],
      withoutRuns: [],
      currentlyPassing: [],
      currentlyFailing: [],
    }
  }

  async componentDidMount() {
    const specData = await getSpecs()
    const [ withRuns, withoutRuns ] = this.parseRunData(specData)
    const [ currentlyPassing, currentlyFailing ] = this.parsePassFail(withRuns)
    console.log("SpecsDisplay currently passing: " + JSON.stringify(currentlyPassing))
    console.log("SpecsDisplay currently failing: " + JSON.stringify(currentlyFailing))
    this.setState({
      specData,
      totalSpecs: specData.length,
      withRuns,
      withoutRuns,
      currentlyPassing,
      currentlyFailing,
    })
  }

  parseRunData = (specData) => {
    const withRuns = []
    const withoutRuns = []

    for (let ii=0; ii<specData.length; ii++ ) {
      const data = specData[ii]
      if ( data.run_records.length === 0 ) {
        withoutRuns.push(data)
      } else {
        withRuns.push(data)
      }
    }
    //console.log("parseRunData withRuns: " + JSON.stringify(withRuns))
    //console.log("parseRunData withoutRuns: " + JSON.stringify(withoutRuns))
    return [ withRuns, withoutRuns ]
  }

  parsePassFail = (withRuns) => {
    const passing = []
    const failing = []

    for (let ii=0; ii<withRuns.length; ii++ ) {
      const spec = withRuns[ii]
      const rrs = spec.run_records
      const lastRecord = rrs[rrs.length - 1]
      console.log("parsePassFail with rrs.length: " + rrs.length)
      console.log("parsePassFail with rrs: " + JSON.stringify(rrs))
      console.log("parsePassFail with lastRecord: " + JSON.stringify(lastRecord))
      console.log("parsePassFail with lastRecord p/f: " + lastRecord.result)

      if ( lastRecord.result.toLowerCase() === 'pass' ) {
        passing.push(spec)
      } else {
        failing.push(spec)
      }
    }
    //console.log("parseRunData withRuns: " + JSON.stringify(withRuns))
    //console.log("parseRunData withoutRuns: " + JSON.stringify(withoutRuns))
    return [ passing, failing ]
  }


  renderSpecsWithRunsPieChart = () => {
    const shiftSize = 2;
    return (
      <div className="pie-chart-container">
        <div className="pie-chart-title">
          {/*
          Automated vs Pending ( { this.state.totalSpecs } total )
          */}
          Automated vs Pending
        </div>
        <PieChart data={[
          { title: 'w runs', value: this.state.withRuns.length, color: '#E38627' },
          { title: 'w/o', value: this.state.withoutRuns.length, color: '#C13C37' },
        ]}
        label={({ dataEntry }) => dataEntry.value}
          segmentsShift={(index) => (index === 0 ? shiftSize : 0.5)}

        />
      </div>
    )
  }

  renderPassFailPieChart = () => {
    const shiftSize = 2;
    return (
      <div className="pie-chart-container">
        <div className="pie-chart-title">
           Current P/F
        </div>
        <PieChart data={[
          { title: 'pass', value: this.state.currentlyPassing.length, color: '#E38627' },
          { title: 'fail', value: this.state.currentlyFailing.length, color: '#C13C37' },
        ]}
        label={({ dataEntry }) => dataEntry.value}
          segmentsShift={(index) => (index === 0 ? shiftSize : 0.5)}

        />
      </div>
    )
  }


  render() {
    return (
      <div id="specs-display" className="">
        <div id="pie-charts-row" className="flex-row">
          { this.renderSpecsWithRunsPieChart() }
          { this.renderPassFailPieChart() }
        </div>
        {
          this.state.specData.map(
            (data, ii) => { return <SpecRecord key={ii} data={data}/> }
          )
        }
      </div>
    )
  }
}
