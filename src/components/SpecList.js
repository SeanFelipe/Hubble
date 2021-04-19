import React from  'react'
import SpecRecord from './SpecRecord'

export default class SpecList extends React.Component {
  render() {
    return (
      <div id="spec-list-container" className="flex-column">
        <div id="spec-list" className="flex-column">
            {
              this.props.specData.map(
                (data, ii) => { return <SpecRecord key={ii} data={data}/> }
              )
            }
        </div>
      </div>
    )
  }
}

