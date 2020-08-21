import React, { Component } from 'react';
import firebase from './firebase';
import './Login.css';
import Swal from 'sweetalert2';
import logo from './aplogo.png';
import {
  
  MDBIcon,
 
  MDBInput,
  } from 'mdbreact';
  import {withRouter} from 'react-router';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router-dom';
import { ActivityIndicator } from "react-native";
import { MDBContainer, MDBCardUp, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import {TextInput, Text} from 'react-native';
class Login extends Component {
  static navigationOptions = {
    header: null
};
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '', 
          Aemail: '',
        errorMessage: null,
        authenticating: false,
        modal14: false,
        };
        this.onSubmit = this.onSubmit.bind();
      }
      handleOpen = () => this.setState({ open: true })
    
      handleClose = () => this.setState({ open: false })
    
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
     }
     

    
    onSubmit = (e) => { 
        e.preventDefault();
        e.target.className += " was-validated";
        const signinForm = document.querySelector('#signinform');
        const email1 = signinForm['email'].value;
        const password1 = signinForm['password'].value;
//console.log(this.state.Aemail)
        firebase.auth().signInWithEmailAndPassword(email1, password1)
         .then ((user) => {
          this.setState({
            authenticating: true,
            user,
            error: ''})
            this.props.history.push('/DashboardPage');
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Login Successful!',
            showConfirmButton: false,
            timer: 1500
          })
        })
         .catch((error) => { this.setState({ 
          authenticating: false,
          errorMessage: error.message })
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
          
          })
        })

    }
    
    renderCurrentState() {
      if (this.state.authenticating) {
        return (
          <div>
            <ActivityIndicator size='large' />
          </div>
        )
      }}
      onResetPasswordPress = () => {
        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(() => {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Password reset email has been sent',
                showConfirmButton: false,
                timer: 1500
              }
              )
            }, (error) => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
              
              })
            });
    }
    toggle = nr => () => {
      let modalNumber = 'modal' + nr
      this.setState({
        [modalNumber]: !this.state[modalNumber]
      });
    }
    
    render() {
        const {email, password, error} = this.state;
        return (
 
          <div class="parent">
           <div class="left">

<ul>
  <img style={{position:"absolute", marginLeft: '-90px'}} src={logo}></img>
  <h1 style={{fontSize: 50, fontWeight: 900, paddingTop: '140px', fontFamily: 'Brush Script MT, Brush Script Std, cursive	'}}>Cashless </h1>
  
</ul>

</div>
 
  <div class="right">
    
    <div class="container">
    
    <ul class="first">
      
      <li><h3 style={{fontSize: 30, fontWeight: 700, color: "#E9446A"}}>ADMIN DASHBOARD</h3></li>
     

      <li><a href="#" class="social-button" id="facebook-connect"> <span>Connect with Facebook</span></a></li>
        <li><a href="#" class="social-button" id="google-connect"> <span>Connect with Google</span></a></li>
      <li style={{textAlign: "center", fontSize: 20, fontWeight: "bold", color: '#E9446A'}}>OR</li>
      
    </ul>
    <div>
               { this.state.authenticating === true ? 
                      this.renderCurrentState()
                    :
                    this.state.errorMessage && <Text style={{color: 'red', fontSize: 15}}>{this.state.errorMessage}</Text>
                  }
                </div>

    
                  <form id="signinform" onSubmit={this.onSubmit} noValidate >
                  <div class="field-set">
        <span class="input-item">
          <i class="fa fa-user-circle"></i>
        </span>
        <input class="form-input" id="txt-input" type="text" placeholder="Your Email" name="email" value={email} onChange={this.onChange} required/>
    
     <br></br>
  
     <span class="input-item">
       <i class="fa fa-key"></i>
      </span>
     <input class="form-input" type="password" placeholder="Password" id="pwd"  name="password" value={password} onChange={this.onChange}required/>
    
     <br></br>
     <button class="btn" style={{padding: "5px 5px",
      backgroundImage: "linear-gradient(to left, #963246, #d52f5b, #df3a62, #e9446a, #f34e72)",
color: "#FDE8E8",
fontSize: "14px",
cursor: "pointer",
transition: "all .5s ease-in-out",
textAlign: "center"}} onClick={this.onSubmit}> Log In </button>
  </div>
  <div class="d-flex justify-content-around">
        <div>
            <div class="custom-control custom-checkbox" style={{boxSizing: 4}}>
                <input type="checkbox" class="custom-control-input" id="defaultLoginFormRemember" required/>
                <label class="custom-control-label" for="defaultLoginFormRemember" style={{fontSize: 13}}>Remember me</label>
            </div>
        </div>
        <div class="field small">
          <label tabIndex="5" class="forgot-password" onClick={this.toggle(14)} style={{ fontSize: 20, color: 'black' }}>
            Forgot <Text style={{color: "#E9446A",fontSize: 20}}>Password?</Text></label>
        </div>
        </div>
      </form>
                        <MDBContainer>
        <MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} centered>
          <MDBModalHeader toggle={this.toggle(14)} style={{color: '#E9446A'}}>Forgot Password
          </MDBModalHeader>
          <MDBModalBody>
          <div class="md-form form-md">
                    <i class="fa fa-lock prefix"></i>
                    <TextInput style={{width: 200, height: 40, borderWidth: 1}}
                    value={this.state.email}
                    onChangeText={(text) => { this.setState({email: text}) }}
                    placeholder="Your Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                </div>

                <div class="text-center">


                    <button style={{backgroundImage: "linear-gradient(to left, #963246, #d52f5b, #df3a62, #e9446a, #f34e72)", color: "white"}}class="btn btn- mt-1" onClick={this.onResetPasswordPress}>Reset Password <i class="fa fa-send ml-1"></i></button>
                </div>
                    </MDBModalBody>
        </MDBModal>
      </MDBContainer>

     
</div>
        </div>
        </div>
        
        )
            
    }
}

export default Login;
