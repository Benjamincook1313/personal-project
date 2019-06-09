import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import ApptReqs from './apptRequests'
import { connect } from 'react-redux'
import { toggleLogin } from '../../Ducks/reducer'

class Admin extends Component {
  constructor(props){
    super(props)
    this.state={
      apptReqs: []
    }
  }

  async componentDidMount(){
    const res = await axios.get('/api/apptReqs')
    this.setState({
      apptReqs: res.data
    })
  }

  logOut=()=>{
    axios.get('/logout')
    this.props.toggleLogin()
    this.props.history.push('/')
  }

  deleteApptReq = async (id)=>{
    const res = await axios.delete(`/api/apptReq/${id}`)
    this.setState({
      apptReqs: res.data
    })
  }

  render() {
    const { apptReqs } = this.state
    return(
      <div >
        <nav>
          <h1 className='page-title'>Admin</h1>
          <div className='nav-container'>
            <div className='hidden-nav'></div>
            <button className='login' onClick={this.logOut} >Log out</button>
            <Link to='/' style={{textDecoration: 'none'}}><div className='nav'>Home</div></Link>
            <Link to='/about' style={{textDecoration: 'none'}}><div className='nav'>About</div></Link>
            <Link to='/contact' style={{textDecoration: 'none'}}><div className='nav'>Contact</div></Link>
            <Link to='/services' style={{textDecoration: 'none'}}><div className='nav'>Services</div></Link>
            <Link to='/information' style={{textDecoration: 'none'}} ><div className='nav'>Information</div></Link>
          </div>
        </nav>
        <div className='hidden-nav'></div>
        <div className='admin'>
          <ApptReqs apptReqs={ apptReqs } delete={this.deleteApptReq}/>
        </div>
        <footer></footer>
      </div>
    )
  }
}

function mapStateToProps(reduxState){
  return {
    reduxState
  }
}

export default connect(mapStateToProps,{ toggleLogin })(Admin)