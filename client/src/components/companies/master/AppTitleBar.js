import React from 'react'
import AppBar from 'material-ui/AppBar'

const styles = {
  appBarTitle: {
    paddingLeft: 256,
  },
}

export default () => (
  <AppBar title="Title Name" titleStyle={styles.appBarTitle} />
)
