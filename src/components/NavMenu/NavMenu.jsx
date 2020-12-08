import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from './navStyle.module.css'

export default class NavMenu extends Component {
   render() {
      return (
         <div>
            <Navbar bg="light" expand="lg">
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                     <NavLink
                        to='/'
                        activeClassName={styles.activePage}
                        exact
                        className={styles.navLink}
                     >
                        HomePage
                     </NavLink>

                     <NavLink
                        to='/about'
                        activeStyle={{ color: 'green' }}
                        exact
                        className={styles.navLink}
                     >
                        About
                     </NavLink>

                     <NavLink
                        to='/456'
                        activeStyle={{ color: 'green' }}
                        exact
                        className={styles.navLink}
                     >
                        Contact
                     </NavLink>

                  </Nav>
               </Navbar.Collapse>
            </Navbar>
         </div>
      )
   }
}

