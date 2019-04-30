import React, { Component } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTooth, faBars } from '@fortawesome/free-solid-svg-icons'
import { HashRouter, Switch, Route } from 'react-router-dom' 
import Home from './components/Home/home'
import About from './components/About/about'
import Services from './components/Services/services'
import Contact from './components/Contact/contact'
import Information from './components/Information/information'
import Login from './components/Login/login'
import Admin from './components/Admin/admin'
import { toggleLogin } from './Ducks/reducer'
import { connect } from 'react-redux'
import axios from 'axios'
import { MapContainer } from './components/Home/MapContainer';

library.add(faTooth, faBars)

class App extends Component {

  async componentDidMount(){
    let res = await axios.get('/checkForUser')
    if(res.data) this.props.toggleLogin()
    if(!res.data) return
  }

  render() {
    return (
      <HashRouter>
        
        <Switch>
          <Route path='/' exact component={ Home } />
          <Route path='/login' component={ Login } />
          <Route path='/about' component={ About } />
          <Route path='/services' component={ Services } />
          <Route path='/contact' component={ Contact } />
          <Route path='/information' component={ Information } />
          <Route path='/admin' component={ Admin } />
          <Route path='/map' component={MapContainer} />
        </Switch>
      </HashRouter>
    );
  }
}

function mapStateToProps(reduxState) {
  return reduxState
}

export default connect(mapStateToProps, { toggleLogin })(App);
