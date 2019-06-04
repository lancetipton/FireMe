import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../Theme/ThemeContext';

export default class BreadProvider extends Component {
  static propTypes = {
    children: PropTypes.node,
  };
  render() {
    const { children, value } = this.props;
    return <ThemeContext.Provider value={ value || {} }>{children}</ThemeContext.Provider>;
  }
}
