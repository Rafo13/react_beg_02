import React, { Component } from 'react';
import styles from './spinner.module.css'

export default class Spinner extends Component {
   render() {
      return (
         <div className={styles.wrapper}>
            <div className={styles.loader}>Loading...</div>
         </div>
      )
   }
}
