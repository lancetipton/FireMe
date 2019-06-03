import React, { Component } from 'react'
import RNModal from 'react-modal'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Modal extends Component {

  constructor() {
    super();

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  state = { status: false }

  openModal() {
    this.setState({ status: true})
  }

  afterOpenModal() {
    
  }

  closeModal() {
    this.setState({ status: false, forced: true })
  }
  
  componentDidUpdate = () => {
    this.checkStatus()
  }

  componentDidMount = () => {
    this.checkStatus()
  }

  checkStatus = () => {
    const { status, afterOpen } = this.props
    if(this.state.status !== status && !this.state.forced)
      this.setState({ status })
  }
  
  render() {
    
    if(!this.props.getComponent) return null

    const { getComponent, afterOpen, closeModal, beforeClose, styles, label } = this.props
    
    return (
      <RNModal
        isOpen={ this.state.status }
        onAfterOpen={ afterOpen }
        onRequestClose={ beforeClose || this.closeModal }
        style={ styles }
        contentLabel={ label }
      >
        { getComponent() }
        <button onClick={closeModal || this.closeModal}>close</button> 
      </RNModal>
    )
  }
}

export { Modal }