import React from 'react'
import { isStr } from 'jsutils'
import { Heading, BodyText, withTheme } from 'material-bread';

const ensureText = (children) => (
  isStr(children)
    ? children
    : Array.isArray(children) && children
      .reduce((text, child) => {
        isStr(child) && (text += child)

        return text
      }, '')
)

const buildProps = ({ type, text, color, align, gutterBottom, style, theme }) => ({
  type,
  text,
  theme,
  color,
  align,
  style,
  gutterBottom,
})

const BuildComp = (props, Comp, compType) => {
  Comp = Comp || BodyText
  const { theme, ...compProps } = props
  
  const themeStyle = theme && theme[compType]

  return compProps.type && isStr(compProps.text)
    ? (<Comp { ...compProps } style={ { ...themeStyle, ...props.style } } />)
    : null
}

export const H1 = withTheme((props) => (
  BuildComp(buildProps({
    type: 1,
    ...props,
    text: ensureText(props.children),
  }), Heading, 'headingOne')
))

export const H2 = withTheme((props) => (
  BuildComp(buildProps({
    type: 2,
    ...props,
    text: ensureText(props.children),
  }), Heading, 'headingTwo')
))
export const H3 = withTheme((props) => (
  BuildComp(buildProps({
    type: 3,
    ...props,
    text: ensureText(props.children),
  }), Heading, 'headingThree')
))

export const H4 = withTheme((props) => (
  BuildComp(buildProps({
    type: 4,
    ...props,
    text: ensureText(props.children),
  }), Heading, 'headingFour')
))

export const H5 = withTheme((props) => (
  BuildComp(buildProps({
    type: 5,
    ...props,
    text: ensureText(props.children),
  }), Heading, 'headingFive')
))

export const H6 = withTheme((props) => (
  BuildComp(buildProps({
    type: 6,
    ...props,
    text: ensureText(props.children),
  }), Heading, 'headingSix')
))

export const P = withTheme((props) => (
  BuildComp(buildProps({
    type: 1,
    ...props,
    text: ensureText(props.children),
  }), BodyText, 'bodyText')
))

export const Span = withTheme((props) => (
  BuildComp(buildProps({
    type: 2,
    ...props,
    text: ensureText(props.children),
  }), BodyText, 'bodyTextTwo')
))
