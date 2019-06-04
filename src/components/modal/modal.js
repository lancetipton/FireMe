import React, { Component } from 'react'
import RNModal from 'react-responsive-modal';


class Modal extends Component {

  constructor() {
    super();

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  state = { isOpen: false }

  openModal() {
    this.setState({ isOpen: true })
  }

  afterOpenModal() {
    
  }

  closeModal() {
    this.setState({ isOpen: false })
  }
  
  componentDidUpdate = () => {
    this.checkOpen()
  }

  componentDidMount = () => {
    this.checkOpen()
  }

  checkOpen = () => {
    const { isOpen } = this.props
    if(this.state.isOpen !== isOpen)
      this.setState({ isOpen })
  }
  
  render() {
    
    if(!this.props.getComponent) return null

    const { getComponent, afterOpen, closeModal, beforeClose, styles, theme } = this.props

    return (
      <RNModal
        open={ this.state.isOpen }
        onClose={ closeModal || this.closeModal}
        onEntered={ afterOpen }
        onClose={ beforeClose }
        styles={ { ...styles, ...(theme && theme.modal || {}) } }
        center
      >
        { getComponent(this.props, this.state) }
      </RNModal>
    )
  }
}

export { Modal }