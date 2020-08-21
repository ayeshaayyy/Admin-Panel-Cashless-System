import React, { Component } from 'react';
import moment from 'moment';
import firebase from '../firebase';
import { Pagination, PaginationLink, PaginationItem, Table, Badge} from 'reactstrap';
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { MDBCard, MDBCardBody, MDBIcon, MDBBreadcrumb, MDBBreadcrumbItem, MDBFormInline, MDBBtn } from 'mdbreact';
import { boolean } from 'yup';
import {Text } from 'react-native'
import Title from "./Title";

class Vendor extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('vendorPay');
    this.unsubscribe = null;
    this.state = {
        users: [],
        key: '',
        akey: firebase.auth().currentUser.uid,
        check: false
       // pay: false
        
    };
    
  }



  componentDidMount() {
    const users =[];
    const ref = firebase.firestore().collection('vendorPay').where("adminId", "==", firebase.auth().currentUser.uid);
    ref.get().then((querySnapshot => {
      querySnapshot.forEach((doc) => {
        const { vname, tno, status, Bill, day, adminId, timestamp } = doc.data();
        users.push({
          key: doc.id,
          doc, // DocumentSnapshot
          vname,
          tno,
          status,
          Bill,
          day,
          adminId,
          timestamp
        })})  
      this.setState({ users});
    }));
    const ref2 = firebase.firestore().collection('vendorPay').where("adminId", "==", firebase.auth().currentUser.uid);
      ref2.get().then((querySnapshot => {
        querySnapshot.forEach((doc) => {
        if (doc.exists) {
          this.setState({
            check: true
          })
        } else {
          this.setState({
            check: false
          })
        }
      });
    }))
    
    
  }



  rendercheck() {
    if(this.state.check == true)
    {
    
    return (
      <main id="content" className="p-5">
    
            <div class="right">
            <MDBCard className="mb-5" style={{backgroundImage: "linear-gradient(to left, #963246, #d52f5b, #df3a62, #e9446a, #963246)"}}>
        <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
            <MDBBreadcrumb style={{textAlign: "center"}}>
                <MDBBreadcrumbItem style={{color: "#E9446A", fontWeight: "bold", fontSize: 15}}>HOME</MDBBreadcrumbItem>
                <MDBBreadcrumbItem active style={{ color: "#963246", fontWeight: "bold", fontSize: 15}}>VENDOR TRANSACTION</MDBBreadcrumbItem>
            </MDBBreadcrumb>
        </MDBCardBody>
    </MDBCard>
            {this.state.pay}
            <Table striped hover>
            <table class="table" >
              <thead>
                <tr class="table">
                  <th>Index</th>
                  <th>Shop Name</th>
                  <th>Transaction Numbers</th>
                  <th>Bill</th>
                  <th>Date</th>
                  <th>Billing Status</th>
                  <th></th>

                
                </tr>
              </thead>
              <tbody>
                {this.state.users.map((users, i ) =>
                  <tr>
                  <td>{i+=1}</td>
                  <td>{users.vname}</td>
                  <td>{users.tno}</td>
                  <td>{users.Bill}<Text style={{color: "green", fontWeight: "800", fontSize: 10}}>Rs.</Text> </td>
                  <td>{users.day}</td>
                <td> {users.status == "Paid" ? <Badge color="success" pill>{users.status}</Badge> : <Badge color="warning" pill>{users.status}</Badge>}</td>
                <td><Link to={`/pay/${users.key}`}>  {users.status == "Pending"
    ?  <Button style={{backgroundColor: 'rgb(175, 72, 96)', fontWeight: 'bold', color: "white"}} > Pay Now!   </Button>
                : <Button style={{backgroundColor: 'rgb(175, 72, 96)' , fontWeight: 'bold', color: "white"}} > View Receipt!  </Button>}</Link></td>
                  
                </tr>
              )}
            </tbody>
          </table>
          </Table>
          
    </div>
    </main>
  );
}
  }

rendercheck2(){
  if(this.state.check == false)
   {
 
  return(
    <main id="content" className="p-5">
      <Table striped hover>
            <table class="table" >
              <thead>
                <tr class="table">
                  <th>Index</th>
                  <th>Shop Name</th>
                  <th>Transaction Numbers</th>
                  <th>Bill</th>
                  <th>Date</th>
                  <th>Billing Status</th>
                  <th></th>

                
                </tr>
              </thead>
          </table>
          </Table>
          
    
    <Title name="There is no" title="data to display" />
    </main>
  )
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

export default Vendor;