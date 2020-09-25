import React, { Component } from 'react'
import Description from './Description'
import Name from './Name'
import Price from './Price'


export class Produt extends Component {
   render() {
      return (
         <>            
            <Name name={this.props.name}/>
            <Price price={this.props.price}/>
            <Description description={this.props.description}/>
         </>
      )
   }
}

