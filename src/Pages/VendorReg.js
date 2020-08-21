import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import firebase from '../firebase';
import { Col,Badge,InputGroup, InputGroupAddon, InputGroupText,  Input, FormFeedback, FormGroup, Form, UncontrolledCollapse, Label, CardBody, Card} from 'reactstrap';
import { MDBCard, MDBCardBody, MDBIcon, MDBBreadcrumb, MDBBreadcrumbItem, MDBFormInline, MDBBtn } from 'mdbreact';
import Swal from 'sweetalert2';
//import { config } from '@fortawesome/fontawesome-svg-core';
const INITIAL_STATE = {
  First_Name: '',
  Last_Name: '',
  email: '',
  password: '',
  University: '',
  Shop: '',
  paymentopt: '',
  Wpayment: '',
  Bank: 'None',
  Accno: 'None',
  error: null,
  uid: ''
};

class VendorReg extends Component {

  constructor(props) {
    super(props);
    
    this.state = { ...INITIAL_STATE, showModal: false };
    this.ref = firebase.firestore().collection('vendor');
    this.ref1 = firebase.firestore().collection('record');
    this.onSubmit = this.onSubmit.bind();
    this.payChange = this.payChange.bind(this);
    this.uniChange = this.uniChange.bind(this);
    this.timeChange = this.timeChange.bind(this);
    this.shopChange = this.shopChange.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
  }
  payChange = (e) =>{
    this.setState({
        paymentopt: e.target.value
    
    });
}

handleOpenModal () {
this.setState({ showModal: true });
}


uniChange = (e) =>{
    this.setState({
        University: e.target.value
    });
}
shopChange = (e) =>{
  this.setState({
      Shop: e.target.value
  });
}
timeChange = (e) =>{
  this.setState({
      Wpayment: e.target.value
  });
}
bChange = (e) =>{
  this.setState({
      Bank: e.target.value
    
  });
}
aChange = (e) =>{
  this.setState({
      Accno: e.target.value
  });
}
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value});
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => { if(user) {
  
      this.setState({ uid: user.uid})
    //console.log(this.state.uid) 
   }})
    
 
    }

  onSubmit = (e) => {
    var config = {apiKey: "AIzaSyAwzngyYza1MuQK5NK4GaP4vLny2Ul8k8I",
    authDomain: "asad-894ac.firebaseapp.com"}
    var secondaryApp = firebase.initializeApp(config, "Secondary")
    const {   First_Name,Last_Name,University,Shop,paymentopt, Wpayment, Bank, Accno } = this.state;
    const signupForm = document.querySelector('#signupform');
    const email = signupForm['email'].value;
    const password = signupForm['password'].value;
    secondaryApp.auth().createUserWithEmailAndPassword(email, password )
        .then(cred => { 
           this.ref.doc(cred.user.uid).set({
             First_Name,
             Last_Name,
             University,
             Shop,
             paymentopt,
             Bank,
             Accno,
             email: email,
             Wpayment,
             timestampu: new Date(),
             adminId: this.state.uid
           })
           this.ref1.doc(cred.user.uid).set({
             student: false
           })
           secondaryApp.auth().signOut();
           Swal.fire(
            'Vendor has been registered!',
          )
           this.props.history.push('/VendorRec');

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
    console.log(firebase.auth().currentUser.uid)
    const {  First_Name,Last_Name,University,Shop,paymentopt, Wpayment , email, password, Bank, Accno } = this.state;
 
    
    return (
      <main id="content" className="p-5">
      <div class="right">
      <MDBCard className="mb-5" style={{backgroundImage: "linear-gradient(to left, #963246, #d52f5b, #df3a62, #e9446a, #963246)"}}>
        <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
            <MDBBreadcrumb style={{textAlign: "center"}}>
                <MDBBreadcrumbItem style={{color: "#E9446A", fontWeight: "bold", fontSize: 15}}>HOME</MDBBreadcrumbItem>
                <MDBBreadcrumbItem active style={{ color: "#963246", fontWeight: "bold", fontSize: 15}}>VENDOR REGISTRATION</MDBBreadcrumbItem>
            </MDBBreadcrumb>
        </MDBCardBody>
    </MDBCard>             
          
     
          
      <Form id="signupform" onSubmit={this.onSubmit} responsive style={{ fontWeight: "bold"}}>
      <FormGroup row >      
      <Label for="First_Name"sm={2}>First Name</Label>
        <Col sm={10}>
                <Input type="text" class="form-control" name="First_Name" value={First_Name} onChange={this.onChange} placeholder="Name" required={true} />
                <FormFeedback valid color="red">Sweet! that name is available</FormFeedback>
                </Col>
            </FormGroup>
            <FormGroup row >      
      <Label for="Last_Name"sm={2}>Last Name</Label>
        <Col sm={10}>
                <Input type="text" class="form-control" name="Last_Name" value={Last_Name} onChange={this.onChange} placeholder="last Name"  validate error="wrong" success="right" required/>
                <FormFeedback valid>Sweet! that name is available</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row >      
      <Label for="email"sm={2}>Email</Label>
        <Col sm={10}>
                <InputGroup>
                <Input type="email" class="form-control" name="email" value={email} onChange={this.onChange} placeholder="Email id"  required={true}
          minCharacters={6}
          errorMessage="Email is invalid"
          emptyMessage="Email is required"/>
                <InputGroupAddon addonType="append">
                    <InputGroupText>@example.com</InputGroupText>
                </InputGroupAddon>
                </InputGroup>
              </Col>
              </FormGroup>

              <FormGroup row >      
      <Label for="password"sm={2}>Password</Label>
        <Col sm={10}>
                <Input type="password" class="form-control" name="password" value={password} minlength="8" onChange={this.onChange} placeholder="Password" required />
              </Col></FormGroup>

              <FormGroup row >      
      <Label for="First_Name"sm={2}>What is your shop type?</Label>
        <Col sm={10}>
              <FormGroup check inline>
                    <Label check><input type="checkbox" name="Shop" value="Cafeteria" checked={Shop === "Cafeteria"} onChange={this.shopChange}/>
                        Cafeteria</Label></FormGroup>
                        <FormGroup check inline>
                    <Label check><input type="checkbox" name="Shop" value="Stationary" checked={Shop === "Stationary"} onChange={this.shopChange} />
                        Stationary</Label></FormGroup>
                        </Col></FormGroup>

                        <FormGroup row >      
      <Label for="First_Name"sm={2}>What is your Uni name?</Label>
        <Col sm={10}>
            
                    <FormGroup check inline>
                    <Label check>
                    <input type="checkbox" name="university" value="Ned" checked={University === "Ned"} onChange={this.uniChange}/>Ned
                        </Label>
                        </FormGroup>
                        <FormGroup check inline>
                        <Label check>
                        <input type="checkbox" name="university" value="Uit" checked={University === "Uit"} onChange={this.uniChange}/>
                        Uit
                        </Label>
                        </FormGroup>
                        </Col>
                        </FormGroup>

                        <FormGroup row >      
      <Label for="First_Name"sm={2}>When do you want it to be paid?</Label>
        <Col sm={10}>   
              
            
            <FormGroup check inline>
                    <Label check>
                        <input type="checkbox" name="Wpayment" value="At the end of Week" checked={Wpayment === "At the end of Week"} onChange={this.timeChange}/>
                        Week
                        </Label></FormGroup>
                        <FormGroup check inline>
                    <Label check>
                        <input type="checkbox" name="Wpayment" value="At the end of Month" checked={Wpayment === "At the end of Month"} onChange={this.timeChange}/>
                        Month</Label></FormGroup>
                        <FormGroup check inline>
                    <Label check>
                        <input type="checkbox" name="Wpayment" value="At the end of Day" checked={Wpayment === "At the end of Day"} onChange={this.timeChange}/>
                        Day</Label></FormGroup>
                        </Col></FormGroup>


                      <FormGroup row >      
      <Label for="First_Name"sm={2}>How do you want your bill to be paid?</Label>
        <Col sm={10}>      
            
            <FormGroup check inline>
                    <Label check>
                        <input type="checkbox" name="paymentopt" value="pay by cash" checked={paymentopt === "pay by cash"}  onChange={this.payChange} />
                        Pay by cash</Label></FormGroup>
                        <FormGroup check inline>
                    <Label check>
                        <input type="checkbox" name="paymentopt" value="pay by bank" checked={paymentopt === "pay by bank"} onChange={this.payChange} id="toggler" style={{ marginBottom: '1rem' }}/>
                        pay by bank</Label></FormGroup>
                        <UncontrolledCollapse toggler="#toggler" >
      <Card>
        <CardBody>
        <div class="title">Payment Details</div>
      <div class="description">Hello there, Please tell me your account.</div>
      <form>
        <input type="text" value={Bank}  onChange={this.bChange} placeholder="Bank Name" />
        <input type="text" value={Accno} onChange={this.aChange} placeholder="Account No"/>
       
      </form>
        </CardBody>
      </Card>
    </UncontrolledCollapse>
    </Col></FormGroup>
                        <div>
      </div>   
      <Col sm={{ size: 10, offset: 2 }}>    
            <button type="submit" class="btn btn"  style={{padding: "5px 5px",
      backgroundImage: "linear-gradient(to left, #963246, #d52f5b, #df3a62, #e9446a, #f34e72)",
color: "#FDE8E8",
fontSize: "14px",
cursor: "pointer",
transition: "all .5s ease-in-out",
textAlign: "center"}}>Submit</button>
            </Col>

        
        </Form>
        
        </div>
      </main>
    );
  }
}

export default VendorReg;