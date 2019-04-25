import React, { Component } from 'react'
import { connect } from 'react-redux'
// import axios from 'axios'

class ServicesPost extends Component {
  constructor(props){
    super(props)
    this.state = {
      edit: false,
      post: this.props.posts,
      title: this.props.title,
      imageUrl: this.props.imageUrl,
      text: this.props.text
    }
  }

  editTrue(){
      this.setState({
        edit: true,
      })
  }

  editFalse(i){
    this.setState({
      edit: false,
    })
  }
  
  render(){
    const { post } = this.props
    const { edit } = this.state
    return (
      !edit ?
      <div className='s-post'>
        <div className='service-post'>
            {(this.props.loggedIn && !this.props.addPost) &&
              <div className='post-btns'>
                <button className='edit-btn' onClick={ () => this.editTrue() }>edit</button>
                <button className='delete-btn'
                  onClick={() => this.props.delete(post.service_id)}
                >delete</button>
              </div>
            }
          <div className='service-post-title'>
            <h1>{ post.title }</h1>
          </div>
          <div className='service-post-info'>
            <img className='post-image' src={ post.image_url } alt=''/>
            <p className='services-post-text' >{ post.info }</p>
          </div>
        </div>
      </div>:
      <div className='edit-services-post'>
        <input 
          className='edit-title'
          placeholder={ post.title }
          name='title'
          value={ this.state.title }
          onChange={(e) => this.setState({title: e.target.value})}
        />
        <input 
          className='edit-image'
          placeholder={ post.image_url }
          name='imageUrl'
          value={ this.state.imageUrl }
          onChange={(e) => this.setState({imageUrl: e.target.value})}
        />
        <input 
          className='edit-info'
          placeholder={ post.info }
          name='text'
          value={ this.state.text }
          onChange={ (e) => this.setState({ text: e.target.value })}
        />
        <button className='edit-x' onClick={ () => this.editFalse() }>X</button>
        <button onClick={ () => this.props.saveEdit(post.service_id, { title: this.state.title, imageUrl: this.state.imageUrl, text: this.state.text })
          .then(this.setState({ edit: false }))}>Save
        </button>
      </div>
    )
  }
}

function mapStateToProps(reduxState) {
  return reduxState
}

export default connect(mapStateToProps) (ServicesPost)