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

  render() {
    const rrs = this.props.data.run_records
    const spec = this.props.data.spec
    //console.log("SpecRecord w data: " + JSON.stringify(this.props.data.spec))
    return (
      <div className="spec-record">
        <div onClick={this.toggleExpand} className="cursor-pointer">
          {/*
          Summary: { specData.summary }
          */}
          { spec.summary }
        </div>
        { this.state.expand
          ? <div>Description: { spec.description } </div>
          : null
        }
      </div>
    )
  }
}
