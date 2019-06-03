import React from 'react'
import { View } from "react-native"
import { Navigation } from './navigation'
import { Appbar } from "material-bread"

export const PageHeader = props => {
  const nav = props && props.nav || {}
  
  return  (
    <View style={{ marginBottom: 80, width: '100%' }}>
      <Appbar
        barType={ props.type || "dense"}
        title={ props.title || 'GitHub JSON Editor'}
        navigation={'menu'}
        onNavigation={ nav.toggle }
      />
      { nav.open && <Navigation { ...props } onNavigate={ props.nav.onPress } /> }
    </View>
  )
}