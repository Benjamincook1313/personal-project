import React, { Component } from 'react'
import { connect } from 'react-redux'
// import axios from 'axios'

class InfoPost extends Component {
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
      <div className='info-post' style={{position: 'relative'}}>
        <div className='post-info' style={{border: '2px solid black'}}>
          <div className='post-info'>
            <img className='info-post-image' src={ post.image_url } alt=''/>
          </div>
          <div className='info-post-text-title'>
            <h1 className='info-title'>{ post.title }</h1>
            <p className='post-text' >{ post.info }</p>
            {(this.props.loggedIn && !this.props.addPost) &&
              <div className='info-btns'>
                <button className='edit-btn' onClick={() => this.editTrue()}>edit</button>
                <button className='delete-btn' onClick={() => this.props.delete(post.info_id)}>delete</button>
              </div>
            }
          </div>
        </div>
      </div>:
      <div className='edit-post'>
        <input 
          className='edit-title'
          placeholder={post.title}
          name='title'
          value={this.state.title}
          onChange={(e) => this.setState({title: e.target.value})}
        />
        <input 
          className='edit-image'
          placeholder={post.imageUrl}
          name='imageUrl'
          value={this.state.imageUrl}
          onChange={(e) => this.setState({imageUrl: e.target.value})}
        />
        <input 
          className='edit-info'
          placeholder={post.info}
          name='text'
          value={this.state.text}
          onChange={(e) => this.setState({text: e.target.value})}
        />
        <button className='edit-x' onClick={() => this.editFalse()}>X</button>
        <button onClick={() => this.props.saveEdit(post.info_id, { title: this.state.title, imageUrl: this.state.imageUrl, text: this.state.text })
        .then(this.setState({edit: false}))}>Save</button>
      </div>
    )
  }
}

function mapStateToProps(reduxState) {
  return reduxState
}

export default connect(mapStateToProps) (InfoPost)