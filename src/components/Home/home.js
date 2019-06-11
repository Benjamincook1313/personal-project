import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { bars } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'
import { toggleLogin, displayMenu } from '../../Ducks/reducer'
// import MapContainer from '../Home/MapContainer'

import Bryce from '../Images/Carousel/Bryce.jpeg';
import Hawaii from '../Images/Carousel/Hawaii.jpeg';
import Yellowstone from '../Images/Carousel/Yellowstone.jpg';
import Beach from '../Images/Carousel/Beach.jpeg'
import Bruce from '../Images/Bruce.jpg'
import swal from 'sweetalert'

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
    this.setState({
      showReqAppt: false,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      timeToCall: ''
    })
    swal('Your Request has been sent')
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

        {/* Navigation */}
          <nav>
            <h1 className='title'> Bruce A. Pyper 
              <div className='dmd'>DMD</div>
              <div className='sub-title'>Family & Cosmetic Dentistry</div>
            </h1>
            <a href='tel:801-834-8095'className='number'><FontAwesomeIcon icon='phone' className='phone' />(801) 590-8740</a>
            <a href='tel:801-834-8095'className='phone'><FontAwesomeIcon icon='phone' className='iphone' /></a>
            <div className='nav-container'>
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
          {/* <div className='hidden-nav' style={{height: 70}}></div> */}
        {/* Navigation End */}

          {/* Hero Image */}         
          <div id="carouselExampleSlidesOnly" className="bryce" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img className="d-block w-100" src={Bryce} alt="First slide" data-interval='10000'></img>
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src={Beach} alt="Second slide"></img>
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src={Yellowstone} alt="Third slide"></img>
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src={Hawaii} alt="Fourth slide"></img>
              </div>
            </div>
          </div>
          <section className='did-you-know'>
              <button className='req-apt' onClick={() => this.setState({showReqAppt: !showReqAppt})}>
                <h2 className='reqAppt-text'>Request an appointment</h2>
              </button>
            <h1 className='did'>Did you know regular cleanings are crucial to having healthy teeth?</h1>
          </section>
          {/* Hero Image End */}

          {/* LOCATION */}
          <div className='location'>
            {/* <h1 className='locate'>Location</h1> */}
              <div className="maps">
                <iframe
                  src="https://maps.google.com/maps?q=Dr.%20Bruce%20A%20Pyper&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="500"
                  height="420"
                  frameBorder="0"
                  allowFullScreen
                  title="map"
                />
              </div>
              <div className='address-info'>
                <h2 >999 E Murray Holladay Rd.</h2>
                <h2 className='address-text'>Suite #205</h2>
                <h2 >Salt Lake City, Utah</h2>
                <h2 className='address-text'>84117 </h2>
              </div>
              {/* <img className='map' src={Bigmap} alt=''/> */}
              {/* <img className='map' src={Map} alt=''/> */}
              
          </div>
          {/* LOCATION END */}

          {/* BIO */}
          <div className='bio'>
            <img className='bio-img'src={Bruce} alt='img'/>
            <div className='bio-container'>
              <h1 className='name'>Bruce A. Pyper</h1>
              <p className='bio-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </div>
          {/* BIO END */}

        {showReqAppt &&
          <section className='reqApptInfo'>
            <h2>First</h2>
              <input 
                className='reqApptInput'
                onChange={this.handleInfo} 
                placeholder='name'
                name='firstName' 
                value={firstName} 
                type='text' />
              <h2>Last</h2>
              <input 
                className='reqApptInput'
                onChange={this.handleInfo} 
                placeholder='name'
                name='lastName' 
                value={lastName} 
                type='text' />
              <h2>Email</h2>
              <input 
                className='reqApptInput'
                onChange={this.handleInfo} 
                placeholder='youremail@example.com'
                name='email' 
                value={email} 
                type='text' />
              <h2>Phone #</h2>
              <input 
                className='reqApptInput'
                onChange={this.handleInfo} 
                placeholder='(012) 345-6789'
                name='phone' 
                value={phone} 
                type='text' />
              <h2>Message</h2>
              <input 
                className='reqApptInput'
                onChange={this.handleInfo}
                placeholder=''
                name='timeToCall'
                value={timeToCall}
                type='text'
              />
            <button className='submit' onClick={() => this.submitReqInfo()}>Submit</button>
            <button className='x' onClick={()=> this.setState({showReqAppt: false})}>X</button>
          </section>
        }
        <div className='pic'></div>
        <footer style={{backgroundColor: 'rgb(31, 31, 31)'}}>COME SEE US!</footer>
      </div>
    )
  }
}

function mapStateToProps(reduxState) {
  return reduxState
}

export default connect(mapStateToProps, { toggleLogin, displayMenu })(Home)