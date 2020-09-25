import React, { Component } from 'react'

export default class Description extends Component {
   render() {
      return (
         <div>
            <h1>{this.props.description}</h1>
         </div>
      )
   }
}
