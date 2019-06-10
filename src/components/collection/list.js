import React from 'react'
import { View, Text } from 'react-native'
import { List, ListItem, ListSection } from 'material-bread'
import { isStr, isObj, isColl, mapColl, inFunc, either } from 'jsutils'
import { Icon } from "../"

const defItemStyle = {
  width: '100%',
  minHeight: '50px',
  textAlign: 'center',
}

const buildRow = (id, item, props) => {
  if(!item || !isObj(item)) return null
  
  const itemProps = {}
  itemProps.text = item.text || item.name || item.title || item.content || item.description
  itemProps.style = { ...defItemStyle, ...props.itemStyle, ...item.style }

  if(isStr(item.icon))
    itemProps.icon = <Icon name={ item.icon } size={ item.iconSize || 24} />
  
  
  return (<ListItem { ...itemProps } />)
}

const buildHeader = (props) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        padding: "0px 20px"
      }}
    >
      <Icon 
        name={"fire"}
        size={ 16 }
        style={{ marginRight: '10px' }}
      />
      <Text>
        { props.headerText }
      </Text>
    </View>
  )
}

export const CollectionList = props => {
  if(!isObj(props) || !isColl(props.items)) return null
  const build = either(props.buildRow, buildRow, inFunc)
  
  return (
      <List
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: '100%',
          borderTop: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        <ListSection 
          label={ buildHeader(props) }
          bottomDivider
          style={{
            width: '100%',
            minHeight: '50px',
            textAlign: 'center',
            paddingTop: "25px",
          }}
        ></ListSection>
        { mapColl(props.items, (key, value) => build(key, value, props) )}
      </List>
  )
}