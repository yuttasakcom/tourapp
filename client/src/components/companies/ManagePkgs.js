import React, { Component } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

import { helloWorldAction, getCompaniesPkgsAction } from '../../store/actions'

const mapStateToProps = state => ({
  world: state.helloWorld.world,
  pkgs: state.companies.pkgs,
})

const mapDispatchToProps = dispatch => ({
  onAddClick: () => dispatch(helloWorldAction()),
  getCompaniesPkgs: () => dispatch(getCompaniesPkgsAction()),
})

const styles = {
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  addButton: {
    width: 100,
    alignSelf: 'flex-end',
  },
}

class ManagePkgs extends Component {
  componentDidMount() {
    this.props.getCompaniesPkgs()
  }

  render() {
    return (
      <div style={styles.content}>
        <RaisedButton
          onTouchTap={this.props.onAddClick}
          style={styles.addButton}
          label={this.props.world}
          primary
        />
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Description</TableHeaderColumn>
              <TableHeaderColumn>Price Adult</TableHeaderColumn>
              <TableHeaderColumn>Price Child</TableHeaderColumn>
              <TableHeaderColumn>Manage</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.props.pkgs.map((row, index) => (
              <TableRow key={index}>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{row.description}</TableRowColumn>
                <TableRowColumn>{row.priceAdult}</TableRowColumn>
                <TableRowColumn>{row.priceChild}</TableRowColumn>
                <TableRowColumn>
                  <RaisedButton label="Edit" primary />
                  <RaisedButton label="Delete" primary />
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePkgs)
