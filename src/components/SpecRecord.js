import React from  'react'

export default class SpecsRecord extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expand: false,
    }
  }

  toggleExpand = () => {
    this.setState({ expand: ! this.state.expand })
  }

  renderDescription = (mx) => {
    return (
      <div className="spec-description-lines">
        {
          mx.map((ll, ii) => {
            return <div key={ii}>{ll}</div>
          })
        }
      </div>
    )

  }

  render() {
    const rrs = this.props.data.run_records
    const spec = this.props.data.spec
    const mx = spec.description.split("\n")
    let lastRunResult = "no runs"
    let lastRRClass = "run-result-no-runs"
    if ( rrs[0] ) {
      lastRunResult = rrs[0].result
      lastRRClass = lastRunResult === "pass" ? 'run-result-pass' : 'run-result-fail'
    }

    console.log("SpecRecord w lastRunResult: " + lastRunResult)
    return (
      <div className="spec-record">
        <div onClick={this.toggleExpand} className="spec-summary-container">
          <div className="spec-summary">
            { spec.summary }
          </div>
          <div className={lastRRClass}>{lastRunResult}</div>
        </div>
        { this.state.expand
          ? this.renderDescription(mx)
          : null
        }
      </div>
    )
  }
}
