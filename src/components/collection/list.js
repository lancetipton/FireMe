import React from 'react'
import { View, Text } from 'react-native'
import { List, ListItem, ListSection, withTheme } from 'material-bread'
import { isStr, isObj, isColl, mapColl, checkCall, eitherFunc, get } from 'jsutils'
import { Icon } from "../"

const defItemStyle = {
  width: '100%',
  minHeight: '50px',
  textAlign: 'center',
}

const onPress = (item, props, e) => {
  (item || props) && checkCall(eitherFunc(item.onPress, props.onPress), item, props)
}

const buildRow = (id, item, props) => {
  if(!item || !isObj(item)) return null
  
  item = checkCall(props.beforeBuildRow, id, item, props) || item

  const itemProps = { onPress: onPress.bind(item, item, props) }
  itemProps.text = item.text || item.name || item.title || item.content || item.description
  itemProps.style = { ...defItemStyle, ...props.itemStyle, ...item.style }
  itemProps.key = item.key || item.id || id

  if(isStr(item.icon))
    itemProps.icon = <Icon name={ item.icon } size={ item.iconSize || 20 } />

  return (<ListItem { ...itemProps } />)
}

const buildHeader = (headerProps) => {
  if(!headerProps) return null
  
  const header = {
    ...headerProps,
    style: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '100%',
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 25,
      ...get(headerProps, 'style'),
    },
    icon: {
      name: 'star',
      size: 16,
      ...get(headerProps, 'icon'),
      style: {
        marginRight: 10,
        ...get(headerProps, 'icon.style'),
      }
    }
  }
  
  return (
    <ListSection 
      label={
        <View style={ header.style } >
          <Icon { ...header.icon } />
          <Text>
            { header.content }
          </Text>
        </View>
      }
      bottomDivider
      style={{
        ...defItemStyle,
        ...headerProps.wrapperStyle,
      }}
    />
  )
}

const CollList = props => {
  if(!isObj(props) || !isColl(props.items)) return null
  const build = eitherFunc(props.buildRow, buildRow)
  const { list } = props

  const listProps = {
    ...list,
    style: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '100%',
      ...get(list, 'style'),
    }
  }
  
  return (
    <List { ...listProps } >
      { buildHeader(props.header || {}) }
      { mapColl(props.items, (key, value) => build(key, value, props) )}
    </List>
  )
}

export const CollectionList = withTheme(CollList)