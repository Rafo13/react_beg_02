import React, { Component } from 'react'

export default class Description extends Component {
   render() {
      let desc = this.props.description
      return (
         <div>
            <h1>{desc}</h1>
         </div>
      )
   }
}
