import React from 'react'
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

import { helloWorldAction } from '../../store/actions'

const mapStateToProps = state => ({
  world: state.helloWorld.world,
})

const mapDispatchToProps = dispatch => ({
  onAddClick: () => dispatch(helloWorldAction()),
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

const ManagePkgs = props => (
  <div style={styles.content}>
    <RaisedButton onTouchTap={props.onAddClick} style={styles.addButton} label={props.world} primary />
    <Table selectable={false}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn>ID</TableHeaderColumn>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>Status</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        <TableRow>
          <TableRowColumn>1</TableRowColumn>
          <TableRowColumn>John Smith</TableRowColumn>
          <TableRowColumn><RaisedButton label="Edit" primary /></TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(ManagePkgs)
