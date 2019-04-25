import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import InformationPost from './post'
import axios from 'axios'
import { toggleLogin, displayMenu } from '../../Ducks/reducer'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Info extends Component {
  constructor(){
    super()
    this.state = {
      posts: [],
      addPost: false,
      title: '',
      imageUrl: '',
      text: ''
    }
  }

  componentDidMount(){
    axios.get('/api/info/posts').then(res => {
      this.setState({
        posts: res.data
      })
    }).catch(err => console.log(err, 'Problem getting posts'))
  }

  logOut=()=>{
    axios.get('/logout').then(this.props.toggleLogin())
  }

  deletePost = async (id)=>{
    const newPosts = await axios.delete(`/api/info/deletePost/${id}`)
    this.setState({
      posts: newPosts.data
    })
  }

  handleChange=(e)=>{
    let {name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  saveEdit = async (id, info)=>{
    const res = await axios.put(`/api/about/edit/${id}`, info)
    this.setState({
      posts: res.data
    })
  }

  async addInfoPost(info){
    const posts = await axios.post('/api/addInfoPost', info)
    this.setState({
      posts: posts.data,
      addPost: false,
      title: '',
      imageUrl: '',
      text: ''
    })
  }

  render(){
    const { posts, addPost, title, imageUrl, text } = this.state
    let post = posts.map((post) => {
      
      return(
        <InformationPost 
          key={ post.info_id } 
          post={ post } 
          title={ title }
          imageUrl={ imageUrl }
          text={ text }
          delete={ this.deletePost } 
          handleChange={ this.handleChange }
          saveEdit={ this.saveEdit }
          addPost={addPost}
          />
      )
    })
    return(
      <div className='About'>
        <nav>
            <h1 className='title'>Information</h1>
            <div className='nav-container'>
              {this.props.loggedIn &&
                <div>
                  <Link to='/admin' style={{textDecoration: 'none'}}><div className='nav'>Admin</div></Link>
                  <button className='login' onClick={this.logOut} >Log out</button>
                  {addPost &&
                    <div className='add-post'>
                      <input 
                        className='post-title'
                        placeholder='title'
                        onChange={this.handleChange}
                        name='title'
                        value={title}
                        type='text'
                        />
                      <input 
                        className='post-image'
                        placeholder='image_url'
                        onChange={this.handleChange}
                        name='imageUrl'
                        value={imageUrl}
                        type='text'
                        />
                      <input 
                        className='post-info'
                        placeholder='info'
                        onChange={this.handleChange}
                        name='text'
                        value={text}
                        type='text'
                        />
                      <button className='addPost-x' onClick={() => this.setState({addPost: false})}>X</button>
                      <button onClick={() => this.addInfoPost({title, imageUrl, text})}>Save</button>
                    </div>
                  }
                </div>
              }
              {!this.props.loggedIn &&
                <Link to='/login' style={{textDecoration: 'none'}}><button className='login'>Login</button></Link>
              }
              <Link to='/' style={{textDecoration: 'none'}}><div className='nav'>Home</div></Link>
              <Link to='/about' style={{textDecoration: 'none'}}><div className='nav'>About</div></Link>
              <Link to='/contact' style={{textDecoration: 'none'}}><div className='nav'>Contact</div></Link>
              <Link to='/services' style={{textDecoration: 'none'}}><div className='nav'>Services</div></Link>
              <button className='menu' onClick={() => this.props.displayMenu()}><FontAwesomeIcon icon='bars' /></button>
            </div>
            {this.props.menu &&
              <div className='drop-menu'>
                <Link to='/' style={{textDecoration: 'none'}}><div className='drop-nav'>Home</div></Link>
                <Link to='/about' style={{textDecoration: 'none'}}><div className='drop-nav'>About</div></Link>
                <Link to='/contact' style={{textDecoration: 'none'}}><div className='drop-nav'>Contact</div></Link>
                <Link to='/services' style={{textDecoration: 'none'}}><div className='drop-nav'>Services</div></Link>
              </div>
            }
          </nav>
            <div className='hidden-nav' ></div>
            <div className='add-post-section' style={{backgroundColor: 'rgb(255, 169, 78)'}}>
              {this.props.loggedIn && 
                <button className='add-post-btn' onClick={() => this.setState({addPost: !this.state.addPost})}>Add Post</button>
              }
            </div>
            { post }
            {!posts[0] &&
            <div className='hidden' style={{height: 200}}></div>
            }
            <footer style={{backgroundColor: 'rgb(255, 169, 78)'}}></footer>
      </div>
    )
  }
}

function mapStateToProps(reduxState) {
  return reduxState
}

export default connect(mapStateToProps, { toggleLogin, displayMenu })(Info)
