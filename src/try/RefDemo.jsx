import React, { Component, createRef } from 'react';

export default class RefDemo extends Component{
   constructor(props){
      super(props);
      this.inpRef = createRef(null);
      this.state = {
         val1: ''
      }
   }  

   handleChange = (e) =>{
      this.setState({
         val1: e.target.value,
      })
   }

   handleClick = () =>{
      console.log('input 1', this.state.val1);
      console.log('input 2', this.inpRef.current.value); //stanum enq inputValue-n aranc state-i
      this.inpRef.current.value = ''; //aranc state-i 0-cnum enq
   }

   render(){
      // console.log(this.buttonRef)
      return(
         <div>
            <button
            ref = {this.buttonRef}
            onClick={this.handleClick}
            >
            push
            </button>

            <input
            placeholder='input 1'
            onChange={this.handleChange}
            value={this.state.val1}
            type='text'
            />

            <input
            type='text'
            placeholder='input 2'
            ref={this.inpRef}
            />
         </div>
      )
   }
}
