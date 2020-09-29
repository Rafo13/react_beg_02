import React, { Component } from 'react'
import '../App.css';


export default class Price extends Component {
   constructor(props) {
      super(props)
      this.state = {
         price: this.props.price,
         btnText: 'Change the dollar',
      }
   }
   handleClick = () => {
      let p = this.state.price;
      let b = this.state.btnText
      if (p === this.props.price) {
         p = parseInt(p) * 487 + 'Դ'
         b = 'Change the dram'
      }
      else {
         p = parseInt(p) / 487 + '$'
         b = 'Change the dollar'
      }
      this.setState({
         price: p, 
         btnText: b
      })
   }
   render() {
      return (
         <div>
            <h1>{this.state.price}</h1>
            <button className="btn" onClick={this.handleClick}>{this.state.btnText}</button>
         </div>
      )
   }
}
