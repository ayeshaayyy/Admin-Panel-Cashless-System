import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBIcon } from 'mdbreact';
import {faFacebook,faTwitter} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import firebase from '../firebase';
import { Redirect } from 'react-router-dom';

class TopNavigation extends Component {
    state = {
        collapse: false,
        record: []
    }

    onClick = () => {
        this.setState({
            collapse: !this.state.collapse,
        });
    }  

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    componentDidMount() {
     
        const ref1 = firebase.firestore().collection('record').doc(firebase.auth().currentUser.uid);
        
        ref1.get().then((doc) => {
          if (doc.exists) {
            const record = doc.data();
            this.setState({
              record: doc.data(),
              key1: doc.id,
              isLoading: false
            });
          } else {
            console.log("No such document!");
          }
        })
    }

    rendercheck() {
        if(this.state.record.student == false)
        return (
            <MDBNavbar className="navbar fixed-top navbar-expand-lg navbar white scrolling-navbar" light expand="md" scrolling>
                                    <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
                        <span className="sr-only">Toggle navigation</span>
                    </a>
                <MDBNavbarToggler onClick = { this.onClick } />
                <MDBCollapse isOpen = { this.state.collapse } navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem>
                            <a rel="noopener noreferrer"  className="nav-link Ripple-parent" style={{color:"#E9446A", fontWeight: "bold", fontSize: "x-large", paddingLeft: 280}}>Cashless System-Welcome to Admin Panel</a>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                        <a
  href="https://www.facebook.com/learnbuildteach/"
  className="facebook social"
>
  <FontAwesomeIcon icon={faFacebook} size="2x" />
</a>
                        </MDBNavItem>
                        <MDBNavItem>
                        <a href="https://www.twitter.com/jamesqquick" className="twitter social">
  <FontAwesomeIcon icon={faTwitter} size="2x" />
</a>

                        </MDBNavItem>
                       
                    
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        );
    }
    rendercheck2() { 
        if(this.state.record.student == true)
          {
        return (
            
              <main id="content" className="p-5">
            
              </main>
      
        
        );
          }
        }
        render() {

            return (
             <div>
            {this.rendercheck()}
            {this.rendercheck2()}
            
                </div>
            )
          }
}

export default TopNavigation;