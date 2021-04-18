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
    }
  }

  async componentDidMount() {
    const specData = await getSpecs()
    //console.log("SpecsDisplay CDM: " + JSON.stringify(specData))
    const [ withRuns, withoutRuns ] = this.parseRunData(specData)
    this.setState({
      specData,
      totalSpecs: specData.length,
      withRuns,
      withoutRuns,
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

  renderSpecsWithRunsPieChart = () => {
    const shiftSize = 2;
    return (
      <div className="pie-chart-container">
        <div className="pie-chart-title">
          Automated ( { this.state.totalSpecs } total )
        </div>
        <PieChart data={[
          { title: 'w runs', value: this.state.withRuns, color: '#E38627' },
          { title: 'w/o', value: this.state.withoutRuns, color: '#C13C37' },
        ]}
        label={({ dataEntry }) => dataEntry.value}
          segmentsShift={(index) => (index === 0 ? shiftSize : 0.5)}

        />
      </div>
    )
  }

  renderSpecsPassingPieChart = () => {
    const shiftSize = 2;
    return (
      <div className="pie-chart-container">
        <div className="pie-chart-title">
          Passing ( { this.state.withRuns } total )
        </div>
        <PieChart data={[
          { title: 'passing', value: this.state.numPassing, color: '#E38627' },
          { title: 'failing', value: this.state.numFailing, color: '#C13C37' },
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
        { this.renderSpecsWithRunsPieChart() }
        {
          this.state.specData.map(
            (data, ii) => { return <SpecRecord key={ii} data={data}/> }
          )
        }
      </div>
    )
  }
}
