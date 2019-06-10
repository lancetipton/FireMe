import React from 'react'
import { List, ListExpand, ListItem } from "material-bread"
import { Icon } from "../icon"
import { isFunc } from 'jsutils'

const NAV_ITEMS = [
  {
    text: 'Github',
    icon: 'github',
    oldFA: true,
    iconSize: 20,
    children: [
      {
        text: 'Account',
        icon: 'user',
      },
      {
        text: 'Repos',
        icon: 'file',
      }
    ]
  },
  {
    text: 'About',
    icon: 'info',
  },
  {
    text: 'Donate',
    icon: 'donate',
  },
  {
    text: 'Logout',
    icon: 'sign-out-alt',
  }
]

const buildKey = (text, parentKey) => {
  return (parentKey || '') + (
    '-' + text
    .toLowerCase()
    .replace(/ /g, '-')
  )
}

const onPress = (path, cb) => (isFunc(cb) && ((event) => {
  cb(path)
}))

const buildNavItem = (items, parentKey, props={}) => {
  const nav = props.nav || {}
  return items && items.map(item => {
    const key = buildKey(item.text, parentKey)

    return item.children
      ? (
        <ListExpand
          title={ item.text }
          icon={ <Icon 
            name={item.icon}
            type={item.iconType}
            old={ item.oldFA }
            size={nav.iconSize || item.iconSize || 16 } 
          />}
          key={ key }
        >
          { buildNavItem(item.children, key) }
        </ListExpand>
        )
      : (
        <ListItem 
          text={ item.text }
          icon={ <Icon 
            name={item.icon} 
            type={item.iconType}
            old={ item.oldFA }
            size={nav.iconSize || item.iconSize || 16 }
          />}
          key={ key }
          onPress={ onPress(key, nav.onNavigate) }
        />
      )
  })
}


export const Navigation = (props) => { 
  
  return buildNavItem(NAV_ITEMS, 'root', props)
  
}