import React from  'react'
import { PieChart } from 'react-minimal-pie-chart';
import SpecList from './SpecList'
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
      criticalsWithRuns: [],
      criticalsWithoutRuns: [],
      criticalsPassing: [],
      criticalsFailing: [],
    }

    this.CHART_SHIFT_SIZE = 5
  }

  async componentDidMount() {
    const specData = await getSpecs()
    const [
      withRuns,
      withoutRuns,
      criticalsWithRuns,
      criticalsWithoutRuns
    ] = this.parseRunData(specData)
    console.log("SpecsDisplay criticalsWithRuns: " + JSON.stringify(criticalsWithRuns))
    //console.log("SpecsDisplay criticalsFailing: " + JSON.stringify(criticalsFailing))

    const [ currentlyPassing, currentlyFailing ] = this.parsePassFail(withRuns)
    const [ criticalsPassing, criticalsFailing ] = this.parseCriticalRuns(criticalsWithRuns)
    console.log("SpecsDisplay criticalsPassing: " + JSON.stringify(criticalsPassing))
    console.log("SpecsDisplay criticalsFailing: " + JSON.stringify(criticalsFailing))

    this.setState({
      specData,
      totalSpecs: specData.length,
      withRuns,
      withoutRuns,
      currentlyPassing,
      currentlyFailing,
      criticalsWithRuns,
      criticalsWithoutRuns,
      criticalsPassing,
      criticalsFailing,
    })
  }

  parseRunData = (specData) => {
    // TODO: clean this up, return an object
    const withRuns = []
    const withoutRuns = []
    const criticalsWithRuns = []
    const criticalsWithoutRuns = []

    for (let ii=0; ii<specData.length; ii++ ) {
      const data = specData[ii]
      if ( data.run_records.length === 0 ) {
        withoutRuns.push(data)
        if ( criticalsWithoutRuns.length < 3 ) {
          criticalsWithoutRuns.push(data)
        }
      } else {
        if ( criticalsWithRuns.length < 3 ) {
          criticalsWithRuns.push(data)
        }
        withRuns.push(data)
      }
    }
    //console.log("parseRunData withRuns: " + JSON.stringify(withRuns))
    //console.log("parseRunData withoutRuns: " + JSON.stringify(withoutRuns))
    return [ withRuns, withoutRuns, criticalsWithRuns, criticalsWithoutRuns ]
  }

  parsePassFail = (withRuns) => {
    const passing = []
    const failing = []

    for (let ii=0; ii<withRuns.length; ii++ ) {
      const spec = withRuns[ii]
      const rrs = spec.run_records
      const lastRecord = rrs[rrs.length - 1]
      //console.log("parsePassFail with rrs.length: " + rrs.length)
      //console.log("parsePassFail with rrs: " + JSON.stringify(rrs))
      //console.log("parsePassFail with lastRecord: " + JSON.stringify(lastRecord))
      //console.log("parsePassFail with lastRecord p/f: " + lastRecord.result)

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

  parseCriticalRuns = (withRuns) => {
    const passing = []
    const failing = []

    for (let ii=0; ii<withRuns.length; ii++ ) {
      const spec = withRuns[ii]
      const rrs = spec.run_records
      const lastRecord = rrs[rrs.length - 1]
      console.log("parseCriticalRuns with rrs.length: " + rrs.length)
      console.log("parseCriticalRuns with rrs: " + JSON.stringify(rrs))
      console.log("parseCriticalRuns with lastRecord: " + JSON.stringify(lastRecord))
      console.log("parseCriticalRuns with lastRecord p/f: " + lastRecord.result)

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
    return (
      <div className="pie-chart-container">
        <div className="pie-chart-title">
          Automated / Pending
        </div>
        <PieChart data={[
          { title: 'w runs', value: this.state.withRuns.length, color: '#E38627' },
          { title: 'w/o', value: this.state.withoutRuns.length, color: '#C13C37' },
        ]}
        radius="40"
        label={({ dataEntry }) => dataEntry.value}
          segmentsShift={(index) => (index === 0 ? this.CHART_SHIFT_SIZE : 0.5)}

        />
      </div>
    )
  }

  renderPassFailPieChart = () => {
    return (
      <div className="pie-chart-container">
        <div className="pie-chart-title">
           Current P/F
        </div>
        <PieChart data={[
          { title: 'pass', value: this.state.currentlyPassing.length, color: '#E38627' },
          { title: 'fail', value: this.state.currentlyFailing.length, color: '#C13C37' },
        ]}
        radius="40"
        label={({ dataEntry }) => dataEntry.value}
          segmentsShift={(index) => (index === 0 ? this.CHART_SHIFT_SIZE : 0.5)}

        />
      </div>
    )
  }

  renderCriticalsPendingPieChart = () => {
    return (
      <div className="pie-chart-container">
        <div className="pie-chart-title">
          Criticals Pending / Automated
        </div>
        <PieChart data={[
          { title: 'w runs', value: this.state.criticalsWithRuns.length, color: '#E38627' },
          { title: 'w/o', value: this.state.criticalsWithoutRuns.length, color: '#C13C37' },
        ]}
        radius="40"
        label={({ dataEntry }) => dataEntry.value}
          segmentsShift={(index) => (index === 0 ? this.CHART_SHIFT_SIZE : 0.5)}

        />
      </div>
    )
  }


  renderCriticalPassFailPieChart = () => {
    return (
      <div className="pie-chart-container">
        <div className="pie-chart-title">
           Criticals P/F
        </div>
        <PieChart data={[
          { title: 'pass', value: this.state.criticalsPassing.length, color: '#E38627' },
          { title: 'fail', value: this.state.criticalsFailing.length, color: '#C13C37' },
        ]}
        label={({ dataEntry }) => dataEntry.value}
        radius="40"
          segmentsShift={(index) => (index === 0 ? this.CHART_SHIFT_SIZE : 0.5)}
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
          { this.renderCriticalsPendingPieChart() }
          { this.renderCriticalPassFailPieChart() }
        </div>

        <SpecList specData={this.state.specData} />
      </div>
    )
  }
}
