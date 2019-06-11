import React from 'react'
import { List, ListItem } from 'material-bread'
import { withTheme } from 're-theme'
import { isStr, isObj, isColl, mapColl, checkCall, eitherFunc, get } from 'jsutils'
import { Icon } from ".."
import { ListHeader } from './list_header'

const onPress = (item, props, e) => {
  (item || props) && checkCall(eitherFunc(item.onPress, props.onPress), item, props)
}

const buildRow = (id, item, props) => {
  if(!item || !isObj(item)) return null
  const { theme } = props
  
  item = checkCall(props.beforeBuildRow, id, item, props) || item

  const itemProps = { onPress: onPress.bind(item, item, props) }
  itemProps.text = item.title || item.name || item.text || item.content || item.description
  itemProps.style = { ...theme.listItem, ...props.itemStyle, ...item.style }
  itemProps.key = item.key || item.id || id

  if(isStr(item.icon))
    itemProps.icon = (
      <Icon
        name={ item.icon }
        size={ item.iconSize || theme.listIconSize }
        style={{
          ...theme.icon,
          ...theme.listIcon
        }}
      />
    )

  return (<ListItem { ...itemProps } />)
}

const ListWrapper = props => {
  if(!isObj(props) || !isColl(props.items)) return null
  const build = eitherFunc(props.buildRow, buildRow)
  const { list } = props

  const listProps = {
    ...list,
    style: {
      ...props.theme.list,
      ...get(list, 'style'),
    }
  }

  return (
    <List { ...listProps } >
      <ListHeader { ...props } />
      { mapColl(props.items, (key, value) => build(key, value, props) )}
    </List>
  )
}

const ThemeList = withTheme(ListWrapper)
export {
  ThemeList as List
}