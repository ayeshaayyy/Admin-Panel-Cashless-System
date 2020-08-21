import React, {Component} from "react";
import firebase from '../firebase';
import {Table, Badge} from 'reactstrap';
import { MDBCard, MDBCardBody, MDBIcon, MDBBreadcrumb, MDBBreadcrumbItem, MDBFormInline, MDBBtn } from 'mdbreact';
import moment from 'moment';
import Title from "./Title";
class VendorRecord extends React.Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('vendor');
    this.unsubscribe = null;
    this.state = {
        vendor: [],
        pageSize: 5, // <- 2 items will be shown on single page
      pageIndex: 0,
      check: false
        
    };
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePrevPageClick = this.handlePrevPageClick.bind(this);
  }
  handlePrevPageClick(event) {
    this.setState(prevState => ({
      pageIndex: prevState.pageIndex > 0 ? prevState.pageIndex - 1 : 0
    }));
  }

  handleNextPageClick(event) {
    this.setState(prevState => ({
      pageIndex:
        prevState.pageIndex <
        Math.ceil(prevState.vendor.length / prevState.pageSize)
          ? prevState.pageIndex + 1
          : prevState.pageIndex
    }));
  }




  componentDidMount() {
    
    const ref = firebase.firestore().collection('vendor').where("adminId", '==', firebase.auth().currentUser.uid);
    ref.get().then((querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
      this.setState({ vendor : data});
    }));
    const ref2 = firebase.firestore().collection('vendor').where("adminId", "==", firebase.auth().currentUser.uid);
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
    return (
      <main id="content" className="p-5">
        <MDBCard className="mb-5" style={{backgroundImage: "linear-gradient(to left, #963246, #d52f5b, #df3a62, #e9446a, #963246)"}}>
        <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
            <MDBBreadcrumb style={{textAlign: "center"}}>
                <MDBBreadcrumbItem style={{color: "#E9446A", fontWeight: "bold", fontSize: 15}}>HOME</MDBBreadcrumbItem>
                <MDBBreadcrumbItem active style={{ color: "#963246", fontWeight: "bold", fontSize: 15}}>VENDOR RECORD</MDBBreadcrumbItem>
            </MDBBreadcrumb>
        </MDBCardBody>
    </MDBCard>
      <div  class="table" >
      <Table hover responsive>
      <thead>
            <tr class="table">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>University</th>
              <th>Shop</th>
              <th>Bank</th>
              <th>Registration</th>
              
            </tr>
          </thead>
          <tbody>
            {this.state.vendor
             .slice(
              this.state.pageIndex * this.state.pageSize,
              this.state.pageIndex * this.state.pageSize + this.state.pageSize
            )
            .map((vendor, i) =>
              <tr>
              <td>{i+=1}</td>
              <td>{vendor.First_Name}</td>
              <td>{vendor.email}</td>
              <td>{vendor.University}</td>
              <td>{vendor.Shop}</td>
              <td>{vendor.Bank}</td>
              <td>{moment(vendor.timestampu.toDate()).format("lll")}</td>
              
              
            </tr>
          )}
        </tbody>
  
    </Table>
    </div>
   
    <button  style={{padding: "5px 5px",
      backgroundImage: "linear-gradient(to left, #963246, #d52f5b, #df3a62, #e9446a, #f34e72)",
color: "#FDE8E8",
fontSize: "14px",
cursor: "pointer",
transition: "all .5s ease-in-out",
textAlign: "center"}} className="btn" onClick={event => this.handlePrevPageClick(event)}>
<i className="fas fa-angle-double-left fa-sm pr-2		" area-hidden="true"/>
    Prev page
  </button>
  <button  style={{padding: "5px 5px",
      backgroundImage: "linear-gradient(to left, #963246, #d52f5b, #df3a62, #e9446a, #f34e72)",
color: "#FDE8E8",
fontSize: "14px",
cursor: "pointer",
transition: "all .5s ease-in-out",
textAlign: "center"}} className="btn" onClick={event => this.handleNextPageClick(event)}>
    Next page
    <i className="fas fa-angle-double-right fa-sm pr-2	" area-hidden="true"/>
  </button>
 
  </main>


    );
  }
  rendercheck2() {
    if(this.state.check == false)
      return (
        <main id="content" className="p-5">
        <div  class="table" >
      <Table hover responsive>
      <thead>
            <tr class="table">
              <th>Index</th>
              <th>Name</th>
              <th>Email</th>
              <th>University</th>
              <th>Shop</th>
              <th>Bank</th>
              <th>Registration</th>
              
            </tr>
          </thead>
          </Table>
            
            <Title name="You don't have any vendor" title="registered right now" />
          
      
    
    </div>
   </main>
      )
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

export default VendorRecord;