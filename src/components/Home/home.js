import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { bars } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'
import { toggleLogin, displayMenu } from '../../Ducks/reducer'
// import MapContainer from '../Home/MapContainer'

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      showReqAppt: false,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      timeToCall: '',
      img: [
        'https://images.unsplash.com/photo-1529680539753-739e7c203c55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2110&q=80',
        'https://images.unsplash.com/photo-1537118169787-d32386cdd0a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
      ]
    }
  }

  handleInfo=(e)=>{
    let {name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  logOut(){
    axios.get('/logout')
    this.props.toggleLogin()
    this.props.history.push('/')
  }

  submitReqInfo = async ()=>{
    const { firstName, lastName, email, phone, timeToCall } = this.state
    await axios.post('/api/reqAppointment', { firstName, lastName, email, phone, timeToCall })
    // { Texter }
    this.setState({
      showReqAppt: false,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      timeToCall: ''
    })
  }

  logOut=()=>{
    axios.get('/logOut').then(res => console.log('logged out'))
    this.props.toggleLogin()
  }

  carousel=()=>{
    const { img } = this.state
    let i = 0
    setInterval(function(){
      i++
      if(i === 3) {
        i = 0
      }
    }, 1000)
    return img[i]
  }


  render(){
    const { showReqAppt, firstName, lastName, email, phone, timeToCall } = this.state
    return(
      <div className='Home'>
        <nav>
          <h1 className='title'>Bruce A. Pyper <div className='dmd'>DMD</div></h1>
          <div className='nav-container'>
            <h1 className='number'>(801) 590-8740</h1>
            {this.props.loggedIn &&
            <div>
              <Link to='/admin' style={{textDecoration: 'none'}}><div className='nav'>Admin</div></Link>
              <button className='login' onClick={this.logOut} >Log out</button>
            </div>
            }
            <Link to='/about' style={{textDecoration: 'none'}}><div className='nav'>About</div></Link>
            <Link to='/contact' style={{textDecoration: 'none'}}><div className='nav'>Contact</div></Link>
            <Link to='/services' style={{textDecoration: 'none'}}><div className='nav'>Services</div></Link>
            <Link to='/information' style={{textDecoration: 'none'}}><div className='nav'>Information</div></Link>
            <button className='menu' onClick={() => this.props.displayMenu()}><FontAwesomeIcon icon='bars' /></button>
          </div>
          {this.props.menu &&
            <div className='drop-menu'>
              <Link to='/about' style={{textDecoration: 'none'}}><div className='drop-nav'>About</div></Link>
              <Link to='/contact' style={{textDecoration: 'none'}}><div className='drop-nav'>Contact</div></Link>
              <Link to='/services' style={{textDecoration: 'none'}}><div className='drop-nav'>Services</div></Link>
              <Link to='/information' style={{textDecoration: 'none'}}><div className='drop-nav'>Information</div></Link>
            </div>
          }
        </nav>
          <div className='bryce' >
            <img className='carousel-img'src={this.carousel()} alt=''/>
          </div>
          <section className='did-you-know'>
            <h3 className='did'>Did you know regular cleanings are crucial to having healthy teeth?</h3>
            <button className='req-apt' onClick={() => this.setState({showReqAppt: !showReqAppt})}>REQUEST AN APPOINTMENT</button>
          </section>
          <div><h2 className='locate'>Location</h2></div>
          <div className='location'>
            <img className='map' src='' alt=''/>
            {/* <MapContainer /> */}

            <div className='address-info'>
              <h1 className='address'>Address</h1>
              <h2 >999 E. Murray Holladay Rd.</h2>
              <h3 >Suite #205</h3>
              <h2 >Salt Lake City, Ut</h2>
              <h3 >84117</h3>
            </div>
          </div>
          <section className='home-display'>
          </section>
          <div className='bio'>
            <img className='bio-img'src='https://images.pexels.com/photos/1323867/pexels-photo-1323867.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt='img'/>
            <div className='bio-container'>
              <h1 className='name'>Bruce A Pyper</h1>
              <h2 className='family'>Family & Cosmetic dentistry</h2>
              <p className='bio-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </div>
        {showReqAppt &&
          <section className='reqApptInfo'>
            <h3>First</h3>
              <input 
                onChange={this.handleInfo} 
                placeholder='               name'
                name='firstName' 
                value={firstName} 
                type='text' />
              <h3>Last</h3>
              <input 
                onChange={this.handleInfo} 
                placeholder='               name'
                name='lastName' 
                value={lastName} 
                type='text' />
              <h3>Email</h3>
              <input 
                onChange={this.handleInfo} 
                placeholder='youremail@example.com'
                name='email' 
                value={email} 
                type='text' />
              <h3>Phone #</h3>
              <input 
                onChange={this.handleInfo} 
                placeholder='       (012)345-6789'
                name='phone' 
                value={phone} 
                type='text' />
              <h3>When to call</h3>
              <input 
                onChange={this.handleInfo}
                placeholder='       monday 3 - 5'
                name='timeToCall'
                value={timeToCall}
                type='text'
              />
            <button className='submit' onClick={() => this.submitReqInfo()}>Submit</button>
            <button className='x' onClick={()=> this.setState({showReqAppt: false})}>X</button>
          </section>
        }
        <div className='pic'></div>
        <footer style={{backgroundColor: 'rgb(255, 169, 78)'}} >COME SEE US!</footer>
      </div>
    )
  }
}

function mapStateToProps(reduxState) {
  return reduxState
}

export default connect(mapStateToProps, { toggleLogin, displayMenu })(Home)