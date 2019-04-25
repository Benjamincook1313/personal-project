import React, { Component } from 'react'

class Schedule extends Component {

  render(){
    const appt = this.props.apptReqs.map((appt, i) => {
      return (
        <div key={appt.id} className='appt-req'>
          <div className='appt-info'>
            Name: <h1>{ appt.first_name }{ appt.last_name }</h1>
            Email: <h1>{ appt.email }</h1>
            Phone: <h1>{ appt.phone }</h1>
            Time To Call: <h1>{ appt.time_to_call }</h1>
          </div>
          <button className='admin-delete' onClick={() => this.props.delete(appt.id)}>delete</button>
        </div>
      )
    })
    return(
      <div>
        { appt }
      </div>
    )
  }
}

export default Schedule