import React, { Component } from 'react'

export default class Price extends Component {
   render() {
      return (
         <div>
            <h1>{this.props.price}</h1>            
         </div>
      )
   }
}
