import React from 'react'
import { purple500 } from 'material-ui/styles/colors'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const styles = {
  main: {
    display: 'flex',
    backgroundColor: purple500,
    minHeight: '100vh',
  },
  paper: {
    minWidth: 300,
    margin: 'auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 1em 1em 1em',
  },
}

export default () => (
  <div style={styles.main}>
    <Paper style={styles.paper}>
      <form style={styles.form}>
        <TextField floatingLabelText="Email" />
        <TextField floatingLabelText="Password" type="password" />
        <RaisedButton type="submit" primary label="Sign in" />
      </form>
    </Paper>
  </div>
)
