import React from 'react';
import ReactDOM from 'react-dom';


// const mapStyles = {
//  map: {
//    position: 'unset',
//    width: '50%',
//    height: '40%'
//  }
// };

export class CurrentLocation extends React.Component {
   constructor(props) {
       super(props);

       const { lat, lng } = this.props.initialCenter;
       this.state = {
         currentLocation: {
           lat: lat,
           lng: lng
         }
       };
     }

}
export default CurrentLocation;

CurrentLocation.defaultProps = {
 zoom: 13,
 initialCenter: {
   lat: 40.6660611650049,
   lng: -111.86274923550752
 },
 centerAroundCurrentLocation: true,
 visible: true
};