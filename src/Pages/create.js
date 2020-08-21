import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import firebase from '../firebase';
import { Badge,InputGroup, InputGroupAddon, InputGroupText, Alert, FormFeedback, FormGroup, Form, Col, Label } from 'reactstrap';
import { TextField } from '@material-ui/core';
import { Progress } from 'reactstrap';
import Swal from 'sweetalert2';
import { MDBCard, MDBCardBody, MDBIcon, MDBBreadcrumb, MDBBreadcrumbItem, MDBFormInline, MDBBtn } from 'mdbreact';

const INITIAL_STATE = {
  name: '',
  userid: '',
  amount: 0,
  email: '',
  password: '',
  Prcheck: false,
  Tpcheck: false,
  Admin: true,
  check: true,
  status: "ACTIVE",
  error: null,
};
class create extends Component {

  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };

    this.ref = firebase.firestore().collection('record');
    this.onSubmit = this.onSubmit.bind();
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value});
  }

  onSubmit = (e) => {
    var config = {apiKey: "AIzaSyAwzngyYza1MuQK5NK4GaP4vLny2Ul8k8I",
    authDomain: "asad-894ac.firebaseapp.com"}
    var secondaryApp = firebase.initializeApp(config, "Secondary")
    const { name, userid, amount, Prcheck,Tpcheck,Admin,status} = this.state;
    const signupForm = document.querySelector('#signupform');
    const email = signupForm['email'].value;
    const password = signupForm['password'].value;
this.ref.where('userid', '==', this.state.userid).get()
  .then(snapshot => {
    if (snapshot.empty) {
          return secondaryApp.auth().createUserWithEmailAndPassword(email, password);
    } else {
          throw new Error('This Student card is already registered');
    } 
  })
  .then(cred => {
    this.ref.doc(cred.user.uid).set({
      name,
      userid: this.state.userid,
      amount,
      timestampu: new Date(),
      timestampt: new Date(),
      Prcheck: false,
      Tpcheck: false,
      check: true,
      Admin: true,
      student: true,
     overdraft: false,
      email: this.state.email,
      status: "ACTIVE",
      adminId: firebase.auth().currentUser.uid
    })
    secondaryApp.auth().signOut();
    Swal.fire(
     'New Student record has been created!',
   )
    this.props.history.push('/StudentRecord');
   })
   .catch((error) => { this.setState({ 
     error: error.message })
     Swal.fire({
       icon: 'error',
       title: 'Oops...',
       text: error,
     
     })
   })
       e.preventDefault(); 
       
    };

  render() {
    const { name, userid, amount, email, password } = this.state;

    return (
      <main id="content" className="p-5">
      
      <div class="right">
      <MDBCard className="mb-5" style={{backgroundImage: "linear-gradient(to left, #963246, #d52f5b, #df3a62, #e9446a, #963246)"}}>
        <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
            <MDBBreadcrumb style={{textAlign: "center"}}>
                <MDBBreadcrumbItem style={{color: "#E9446A", fontWeight: "bold", fontSize: 15}}>HOME</MDBBreadcrumbItem>
                <MDBBreadcrumbItem active style={{ color: "#963246", fontWeight: "bold", fontSize: 15}}>STUDENT REGISTRATION</MDBBreadcrumbItem>
            </MDBBreadcrumb>
        </MDBCardBody>
    </MDBCard>             
          
        <Form>
            
            <form id="signupform" onSubmit={this.onSubmit} style={{fontWeight: "bold"}} >
            <FormGroup row >      
      <Label for="First_Name"sm={2}>Student Name</Label>
        <Col sm={10}>
            <FormGroup>
                <TextField type="text" name="name" value={name} min={3} max={9} onChange={this.onChange} placeholder="Name" required/>
                <FormFeedback valid>Sweet! that name is available</FormFeedback>
            </FormGroup></Col></FormGroup>

            <FormGroup row >      
      <Label for="userid"sm={2} minLength={5}>Student Id</Label>
        <Col sm={10}>
              
                <input type="password" name="userid" value={userid} minlength="8" onChange={this.onChange} placeholder="Userid" required/>
              </Col></FormGroup>

              <FormGroup row >      
      <Label for="Amount"sm={2}>Recharge</Label>
        <Col sm={10}>
            
                <input type="number" name="amount" value={amount} min={1} max={2000} onChange={this.onChange} placeholder="Amount" required/>
              </Col></FormGroup>
              
              <FormGroup row >      
      <Label for="email"sm={2}>Email</Label>
        <Col sm={10}>
                
                <TextField type="email"  name="email" value={email} onChange={this.onChange} placeholder="Email id" required/>
             
               </Col></FormGroup>

               <FormGroup row >      
      <Label for="password"sm={2}>Password</Label>
        <Col sm={10}>
           
                <input type="password" name="password" value={password} minlength="8" onChange={this.onChange} placeholder="Password" required/>
              </Col></FormGroup>
             <button type="submit" class="btn btn"  style={{padding: "5px 5px",
      backgroundImage: "linear-gradient(to left, #963246, #d52f5b, #df3a62, #e9446a, #f34e72)",
color: "#FDE8E8",
fontSize: "14px",
cursor: "pointer",
transition: "all .5s ease-in-out",
textAlign: "center"}}>Submit  <i className="fas fa-angle-double-right fa-sm pr-2	" area-hidden="true"/></button>
             <Progress multi>
        <Progress bar for ="name"value={name}>Meh</Progress>
        <Progress bar for="userid" color="danger" value={userid}>25%</Progress>
        <Progress bar for="Amount"color="warning" value={amount}>Good!</Progress>
        <Progress bar for="email" color="info" value={email}>Wow!</Progress>
        <Progress bar for="password" color="success" value={password}>Ready to Go!!</Progress>
      </Progress>
             
         
            
  
            </form>
        </Form>
        </div></main>
      
    );
  }
}

export default create;