import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { connect } from 'react-redux'
import { toggleLogin } from '../../Ducks/reducer'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      password: ''
    }
  }

  handleChange=(e)=>{
    let {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  async login(){
    const { userName, password } = this.state
    const res = await axios.post('/auth/login', { userName, password })
    .catch(err => console.log(err))
    if(res.data.loggedIn) { 
      this.props.toggleLogin()
      return this.props.history.push('/admin')
    } 
  }

  async logOut(){
    const res = await axios.get('/logout')
    .catch(err => console.log(err))
    if(res.data.loggedIn) { 
      this.props.toggleLogin()
      return this.props.history.push('/')
    }
  }

  async registerUser(){
    const { userName, password } = this.state
    const res = await axios.post('/auth/register', { userName, password })
    if(!res.data) {
    return alert('Login failed')
   }
    this.setState({
      userName: '',
      password: ''
    })
  }

  render() {
    const { userName, password } = this.state
    return(
      <div className='login-page'>
        <nav className='Login'>
          <h1 className='title'>Dr. Dentist DMD</h1>
          <div className='nav-container'>
            <Link to='/' style={{textDecoration: 'none'}}><div className='nav'>Home</div></Link>
            <Link to='/about' style={{textDecoration: 'none'}}><div className='nav'>About</div></Link>
            <Link to='/contact' style={{textDecoration: 'none'}}><div className='nav'>Contact</div></Link>
            <Link to='/services' style={{textDecoration: 'none'}}><div className='nav'>Services</div></Link>
            <Link to='/information' style={{textDecoration: 'none'}}><div className='nav'>Information</div></Link>
          </div>
        </nav>
        <div className='login-container'>
          <h1 className='login-title'>Login</h1>
          <p style={{color: 'blue', position: 'absolute', top: -25,}}>(admins only)</p>
          <div className='login-inputs'>
            <input placeholder='user name' onChange={this.handleChange} name='userName' value={userName}/>
            <input placeholder='password' onChange={this.handleChange} name='password' value={password}/>
          </div>
            <button className='login-btn' onClick={() => this.login(userName, password)}>login</button>
            {/* <button onClick={() => this.registerUser(userName, password)}>Register</button> */}
        </div>
      </div>
    )
  }
}

function mapStateToProps(reduxState){
  return {
    reduxState
  }
}

export default connect(mapStateToProps, { toggleLogin, })(Login)