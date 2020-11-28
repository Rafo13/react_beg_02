import React, { Component } from 'react'

export default class Name extends Component {
   render() {
      return (
         <div>
            <h1>{this.props.name}</h1>         
         </div>
      )
   }
}
