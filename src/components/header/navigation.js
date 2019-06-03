import React from 'react'
import { List, ListExpand, ListItem } from "material-bread"

export const Navigation = () => { 
  return (
    <List style={{ maxWidth: 300 }}>
      <ListExpand title={'GitHub'}>
        <ListItem text={'Connect'} />
        <ListItem text={'Repos'} />
      </ListExpand>
      <ListItem text={'About'} />
      <ListItem text={'Donate'} />
      <ListItem text={'Logout'} />
    </List>
  )
}