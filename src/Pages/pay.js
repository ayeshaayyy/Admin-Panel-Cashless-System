import React, { Component } from 'react';
import ReactToPrint from "react-to-print";
import firebase from '../firebase';
import moment from 'moment';
import {UncontrolledCollapse} from 'reactstrap';
import logo from '../jazz.png';
import logo1 from '../aplogo.png'; 
import { Link } from 'react-router-dom';
import { MDBCard, MDBCardBody, MDBIcon, MDBBreadcrumb, MDBBreadcrumbItem, MDBFormInline, MDBBtn } from 'mdbreact';

class pay extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('users');
    this.state = {
      users: [],
      i: 0
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    const ref = firebase.firestore().collection('vendorPay').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          users: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }
  onSubmit() {
    firebase.firestore()
        .collection('vendorPay').doc(this.state.key)
        .update({ status: "Paid" ,check :false });
        this.props.history.push("/vendor")
}
rendercheck(){
    if (this.state.users.status== 'Pending') {
   
    return(
        <main id="content" className="p-5">
    
        <div class="right">
        <MDBCard className="mb-5" style={{backgroundImage: "linear-gradient(to left, #963246, #d52f5b, #df3a62, #e9446a, #963246)"}}>
        <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
            <MDBBreadcrumb style={{textAlign: "center"}}>
                <MDBBreadcrumbItem style={{color: "#E9446A", fontWeight: "bold", fontSize: 15}}>VENDOR</MDBBreadcrumbItem>
                <MDBBreadcrumbItem active style={{ color: "#963246", fontWeight: "bold", fontSize: 15}}>PAYMENT OPTIONS</MDBBreadcrumbItem>
            </MDBBreadcrumb>
        </MDBCardBody>
    </MDBCard>
           <div class="payment" style={{float: 'inherit', textAlign: 'center'}}>
      <div class="payment-method">
        <h2>Choose your payment method</h2>
        <div class="pm-item">
          <input id="mpp" type="radio" name="payment-method"/>
          <label class="pm-label" for="mpp" id="toggler">
            <div class="pm-text">
              <h5>Pay by Cash</h5><img src="https://cdn4.iconfinder.com/data/icons/banking-and-finance-64/50/12-512.png?fbclid=IwAR1bmmfU0q5rgDELtdcRwFoFu_k16VT52PWFPz0asF3t6tJq7PZrO8lMA" width="60"/>
            </div>
          </label>
        </div>
        <div class="pm-item">
        <Link to={`/Payment`}> <input id="mcc" type="radio" name="payment-method"/></Link>
          <label class="pm-label" for="mcc">
            <div class="pm-text">
        <h5> Pay by Jazz Cash </h5>
        <img src={logo} width="100"/>
            </div>
          </label>
        </div>
        <div class="payment-actions"><button class="finish" onClick={this.onSubmit}  style={{padding: "5px 5px",
      backgroundImage: "linear-gradient(to left, #963246, #d52f5b, #df3a62, #e9446a, #f34e72)",
color: "#FDE8E8",
fontSize: "14px",
cursor: "pointer",
transition: "all .5s ease-in-out",
textAlign: "center"}}>Complete Process<img class="ml-2" /></button></div>
      </div>
</div>
</div></main>
        );
  
  }
}
rendercheck2()
{ 
  
  if (this.state.users.status == 'Paid') {
 
  return(
    <main id="content" className="p-5">
    
    <div class="right">
    <MDBCard className="mb-5" style={{backgroundImage: "linear-gradient(to left, #963246, #d52f5b, #df3a62, #e9446a, #963246)"}}>
        <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
            <MDBBreadcrumb style={{textAlign: "center"}}>
            <Link to={`/Vendor`}> <MDBBreadcrumbItem style={{color: "#E9446A", fontWeight: "bold", fontSize: 15}}>VENDOR PAYMENT</MDBBreadcrumbItem></Link>
                <MDBBreadcrumbItem active style={{ color: "#963246", fontWeight: "bold", fontSize: 15}}>   /RECIEPT</MDBBreadcrumbItem>
            </MDBBreadcrumb>
        </MDBCardBody>
    </MDBCard>
      <div ref={el => (this.componentRef = el)  }>
     <aside  style={{float: 'center', width: '30%'}}>
     <div class="invoice-box" >
             <table cellpadding="0" cellspacing="0">
         <tr class="top">
             <td colspan="2">
                 <table>
                     <tr>
                   
                             <img src={logo1} />
                         
                         
                         <td>
                             Invoice #: {this.state.i+=1} <br></br>
                            Created: {moment(Date()).format("lll")}<br></br>
                         </td>
                     </tr>
                 </table>
             </td>
         </tr>
         <br></br>
         <tr class="information">
             <td colspan="2">
                 <table>
                     <tr>
                         <td>
                         ST-13 Abul Hasan Isphahani Rd,<br></br>
                         Block 7 Gulshan-e-Iqbal,<br></br>
                         Karachi City, Sindh 75300
                         </td>
                         <br></br>
                         <br></br>
                         <td>
                             Usman Institite of Technology<br></br>
                             Director: Dr. Zahir Ali Syed<br></br>
                             www.uit.edu
                         </td>
                     </tr>
                 </table>
             </td>
         </tr>
         
         
         <tr class="details">
             <td>
                 Vendor Name
             </td>
             
             <td>
                 {this.state.users.vname}
             </td>
             
         </tr>
         
         <tr class="item">
             <td>
               Total Transactions
             </td>
             
             <td>
             {this.state.users.tno}
             </td>
         </tr>
         
         <tr class="item">
             <td>
                 Expense
             </td>
             
             <td>
             {this.state.users.Bill}
             </td>
         </tr>
         <tr class="item">
             <td>
                 Day
             </td>
             
             <td>
             {this.state.users.day}
             </td>
         </tr>
        
         
         <tr class="total">
             <td></td>
             
             <td>
                Total: {this.state.users.Bill}
             </td>
         </tr>
         </table>    
           </div>
           </aside>
           </div>
   <ReactToPrint
       trigger={() => <a href="#"><button  style={{padding: "5px 5px",
       backgroundImage: "linear-gradient(to left, #963246, #d52f5b, #df3a62, #e9446a, #f34e72)",
 color: "#FDE8E8",
 fontSize: "14px",
 cursor: "pointer",
 transition: "all .5s ease-in-out",
 textAlign: "center"}}>Print Reciept</button></a>}
       content={() => this.componentRef}
     />
 
     
    
   
   </div>
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
}   } 
 
export default pay;
