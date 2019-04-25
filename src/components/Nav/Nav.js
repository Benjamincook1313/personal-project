import React, { Component } from 'react'

class Nav extends Component {
  render() {
    return(
      <div>
        <nav>
          <div className='nav-container'>
            {this.props.loggedIn &&
              <div>
                <Link to='/admin' style={{textDecoration: 'none'}}><div className='nav'>Admin</div></Link>
                <button className='login' onClick={this.logOut} >Log out</button>
              </div>
            }
          </div>
            {!this.props.loggedIn &&
              <Link to='/login' style={{textDecoration: 'none'}}><button className='login'>Login</button></Link>
            }
          <Link to='/' style={{textDecoration: 'none'}}><div className='nav'>Home</div></Link>
          <Link to='/contact' style={{textDecoration: 'none'}}><div className='nav'>Contact</div></Link>
          <Link to='/services' style={{textDecoration: 'none'}}><div className='nav'>Services</div></Link>
          <Link to='/information' style={{textDecoration: 'none'}}><div className='nav'>Information</div></Link>
          <div className='menu' >menu</div>
        </nav>
      </div>
    )
  }
}

function mapStateToProps(reduxState) {
  return reduxState
}

export default connect(mapStateToProps, { toggleLogin })(Nav)