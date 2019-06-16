import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ServicesPost from './post'
import axios from 'axios'
import { toggleLogin, displayMenu } from '../../Ducks/reducer'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



class Services extends Component {
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
    axios.get('/api/services/posts').then(res => {
      this.setState({
        posts: res.data
      })
    }).catch(err => console.log(err, 'Problem getting posts'))
  }

  logOut=()=>{
    axios.get('/logout').then(this.props.toggleLogin())
  }

  deletePost = async (id)=>{
    const newPosts = await axios.delete(`/api/services/deletePost/${id}`)
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
    const res = await axios.put(`/api/services/edit/${id}`, info)
    this.setState({
      posts: res.data
    })
  }

  async addServicesPost(info){
    const posts = await axios.post('/api/addServicesPost', info)
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
        <ServicesPost 
          key={ post.service_id } 
          post={ post } 
          title={ title }
          imageUrl={ imageUrl }
          text={ text }
          delete={ this.deletePost } 
          handleChange={ this.handleChange }
          saveEdit={ this.saveEdit }
          addPost={ addPost }
          />
      )
    })
    return(
      <div className='Services'>
        <nav>
          <h1 className='page-title'>Services</h1>
          <a href='tel:801-834-8095'className='number'><FontAwesomeIcon icon='phone' className='phone' />(801) 590-8740</a>
          <a href='tel:801-834-8095'className='phone'><FontAwesomeIcon icon='phone' className='iphone' /></a>
          <div className='nav-container'>
            {this.props.loggedIn &&
              <div>
                  <Link to='/admin' style={{textDecoration: 'none'}}><div className='nav'>Admin</div></Link>
                  <button className='login' onClick={this.logOut} >Log out</button>
                  {addPost &&
                    <div className='add-post'>
                      <input 
                        className='edit-title'
                        placeholder='Title'
                        onChange={this.handleChange}
                        name='title'
                        value={title}
                        type='text'
                        />
                      <input 
                        className='edit-image'
                        placeholder='image_url'
                        onChange={this.handleChange}
                        name='imageUrl'
                        value={imageUrl}
                        type='text'
                        />
                      <input 
                        className='edit-info'
                        placeholder='info'
                        onChange={this.handleChange}
                        name='text'
                        value={text}
                        type='text'
                        />
                      <button className='addPost-x' onClick={() => this.setState({addPost: false})}>X</button>
                      <button className='save-btn' onClick={() => this.addServicesPost({title, imageUrl, text})}>Add</button>
                    </div>
                  }
                </div>
            }
            <Link to='/' style={{textDecoration: 'none'}}><div className='nav'>Home</div></Link>
            <Link to='/about' style={{textDecoration: 'none'}}><div className='nav'>About</div></Link>
            <Link to='/contact' style={{textDecoration: 'none'}}><div className='nav'>Contact</div></Link>
            <Link to='/information' style={{textDecoration: 'none'}}><div className='nav'>Information</div></Link>
            <button className='menu' onClick={() => this.props.displayMenu()}><FontAwesomeIcon icon='bars' /></button>
          </div>
          {this.props.menu &&
            <div className='drop-menu'>
              <Link to='/' style={{textDecoration: 'none'}}><div className='drop-nav'>Home</div></Link>
              <Link to='/about' style={{textDecoration: 'none'}}><div className='drop-nav'>About</div></Link>
              <Link to='/contact' style={{textDecoration: 'none'}}><div className='drop-nav'>Contact</div></Link>
              <Link to='/information' style={{textDecoration: 'none'}}><div className='drop-nav'>Information</div></Link>
              </div>
          }
        </nav>

          <div className='hidden-nav' style={{height: 102}}></div>
          <div className='add-post-section' >
            {this.props.loggedIn && 
              <button className='add-post-btn' onClick={() => this.setState({addPost: !this.state.addPost})}>Add Post</button>
            }
          </div>
          { post }
          {!posts[0] &&
            <div className='hidden' style={{fontSize: 100, width: '100vw', textAlign: 'center', marginTop: 200}}>
              <h1 className='default text'>Page Under Construction</h1>
            </div>
          }
          <footer></footer>
      </div>
    )
  }
}

function mapStateToProps(reduxState) {
  return reduxState
}

export default connect(mapStateToProps, { toggleLogin, displayMenu })(Services)