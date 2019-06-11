import React from 'react'
import { View, Text } from 'react-native'
import { ListSection } from 'material-bread'
import { get } from 'jsutils'
import { Icon } from ".."

const getHeaderProps = ({ header, theme }) => {
  return {
    ...header,
    wrapper: {
      style: {
        ...theme.listItem,
        ...(header.wrapper && header.wrapper.style || {})
      }
    },
    style: {
      ...theme.listHeader,
      ...get(header, 'style'),
    },
    icon: {
      name: 'stream',
      size: theme.listIconSize,
      ...get(header, 'icon'),
      style: {
        ...theme.icon,
        marginRight: 10,
        ...get(header, 'icon.style'),
      }
    },
    content: {
      ...header.content,
      style: {
        ...theme.listHeaderText,
        ...get(header, 'content.style'),
      }
    },
    bottomDivider: header.bottomDivider !== false
  }
}

export const ListHeader = props => {
  if(!props || !props.header) return null
  
  const header = getHeaderProps(props)
  return (
    <ListSection
      label={
        <View style={ header.style } >
          { header.icon && (<Icon { ...header.icon } />) }
          { header.content.text && (
            <Text
              style={ header.content.style }
            >
              { header.content.text }
            </Text>
          )}
        </View>
      }
      bottomDivider={ header.bottomDivider }
      style={{
        ...props.theme.listItem,
        ...header.wrapper.style,
      }}
    />
  )
}