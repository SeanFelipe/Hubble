import React from  'react'

export default class SpecsRecord extends React.Component {
  renderSpec = (specData) => {
    return (
      <div className="spec-record">
        <div>
          {/*
          Summary: { specData.summary }
          */}
          { specData.summary }
        </div>
        <div>
          Description: { specData.description }
        </div>
      </div>
    )
  }

  render() {
    const rrs = this.props.data.run_records
    const spec = this.props.data.spec
    console.log("SpecRecord w data: " + JSON.stringify(this.props.data.spec))
    return (
      <>
        { this.renderSpec(spec) }
      </>
    )
  }
}
