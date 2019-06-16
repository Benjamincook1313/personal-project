import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { toggleLogin, displayMenu } from '../../Ducks/reducer'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Contact extends Component {

  logOut=()=>{
    axios.get('/logout')
    this.props.toggleLogin()
    this.props.history.push('/')
  }

  render(){
    return(
      <div className='Contact'>
        <nav>
            <h1 className='page-title'>Contact</h1>
            <a href='tel:801-834-8095'className='number'><FontAwesomeIcon icon='phone' className='phone' />(801) 590-8740</a>
            <a href='tel:801-834-8095'className='phone'><FontAwesomeIcon icon='phone' className='iphone' /></a>
            <div className='nav-container'>
              {this.props.loggedIn &&
              <div>
                <Link to='/admin' style={{textDecoration: 'none'}}><div className='nav'>Admin</div></Link>
              </div>
              }
              <Link to='/' style={{textDecoration: 'none'}}><div className='nav'>Home</div></Link>
              <Link to='/about' style={{textDecoration: 'none'}}><div className='nav'>About</div></Link>
              <Link to='/services' style={{textDecoration: 'none'}}><div className='nav'>Services</div></Link>
              <Link to='/information' style={{textDecoration: 'none'}}><div className='nav'>Information</div></Link>
              <button className='menu' onClick={() => this.props.displayMenu()}><FontAwesomeIcon icon='bars' /></button>
            </div>
          {this.props.menu &&
            <div className='drop-menu'>
              <Link to='/' style={{textDecoration: 'none'}}><div className='drop-nav'>Home</div></Link>
              <Link to='/about' style={{textDecoration: 'none'}}><div className='drop-nav'>About</div></Link>
              <Link to='/services' style={{textDecoration: 'none'}}><div className='drop-nav'>Services</div></Link>
              <Link to='/information' style={{textDecoration: 'none'}}><div className='drop-nav'>Information</div></Link>
            </div>
          }
          </nav>

          <div className='hidden-nav'></div>

          <section className='contact'>
            <div>
              <div className='contact-info'>
                <p style={{textDecoration: 'underline'}}>Phone</p> 
                <h2>(801) 590-8740</h2>
              </div>
              <div className='contact-info'>
                <p style={{textDecoration: 'underline'}}>Address</p>
                <h2>999 E. Murray Holladay Rd.</h2>
                <h2>Salt Lake City, Ut 84117</h2 > 
                <h2>#205</h2>
              </div>
            </div>
            <div className='contact-info'>
              <p style={{textDecoration: 'underline'}}>Hours</p>
              <h2>(Mon, Tues, Thurs):</h2>
              <h2>8:30am-5:00pm</h2>
              <h2>Fri:</h2>
              <h2>7:30am-2:00pm</h2>
              <h2>(Wed, Sat, Sun):</h2>
              <h1>closed</h1>
            </div>
          </section>

          <footer></footer>
      </div>
    )
  }
}

function mapStateToProps(reduxState) {
  return reduxState
}

export default connect(mapStateToProps, { toggleLogin, displayMenu })(Contact)