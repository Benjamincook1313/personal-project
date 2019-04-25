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
            <h1 className='title'>Contact</h1>
            <div className='nav-container'>
              {this.props.loggedIn &&
              <div>
                <Link to='/admin' style={{textDecoration: 'none'}}><div className='nav'>Admin</div></Link>
                <button className='login' onClick={this.LogOut} >Log out</button>
              </div>
              }
              {!this.props.loggedIn &&
                <Link to='/login' style={{textDecoration: 'none'}}><button className='login'>Login</button></Link>
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
          {/* <div className='left'></div> */}
          {/* <div className='right'></div> */}
          <section className='contact'>
            <div className='contact-info'>Phone: <h1>801-277-8233</h1></div>
            <div className='contact-info'>
              Address: <h2>999 E. Murray Holiday Rd. Salt Lake City, Ut 84117 
              <p>#205</p></h2>
            </div>
            <div className='contact-info'>
              Hours: <h1 className='hours'>Mon, Tues, Wed:<p>(8:30am-5:00pm)</p>
              Fri: <p>(7:30am-2:00pm)</p>
              Sat, Sun, Wed: <p>(closed)</p></h1>
            </div>
            {/* <div className='contact-info'>Email: <h1>bruceapyper<div>@email.com</div></h1></div> */}
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