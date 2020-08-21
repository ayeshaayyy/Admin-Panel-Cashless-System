import React, { Component } from 'react';
import '../App.css';
import moment from 'moment';
import firebase from '../firebase';
import { Pagination, PaginationLink, PaginationItem, Table, Badge} from 'reactstrap';
import { MDBCard, MDBCardBody, MDBIcon, MDBBreadcrumb, MDBBreadcrumbItem, MDBFormInline, MDBBtn } from 'mdbreact';
import { bool } from 'yup';
import {Text} from 'react-native'
class SpecificTransaction extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('History');
    this.unsubscribe = null;
    this.state = {
        History: [],
        record: [],
        Prcheck: '',
        pageSize: 5, // <- 2 items will be shown on single page
      pageIndex: 0,
        
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
        Math.ceil(prevState.History.length / prevState.pageSize)
          ? prevState.pageIndex + 1
          : prevState.pageIndex
    }));
  }




  componentDidMount() {
    
    const ref = firebase.firestore().collection('History').where("uid", "==", this.props.match.params.id).orderBy("createdAt", "desc");
    ref.get().then((querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
      this.setState({ History : data});
    }));
    
    const ref1 = firebase.firestore().collection('record').doc(this.props.match.params.id);
    ref1.get().then((doc) => {
      if (doc.exists) {
        const record = doc.data();
        this.setState({
          key: doc.id,
          Prcheck: record.Prcheck,
          //name: record.name
        });  
      }
       else {
        console.log("No such document!");
      }
  
    })
  
  }


  render() {
    return (
      <main id="content" className="p-5">
      
      <div class="right">
      <MDBCard className="mb-5" style={{backgroundImage: "linear-gradient(to left, #963246, #d52f5b, #df3a62, #e9446a, #963246)"}}>
        <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
            <MDBBreadcrumb style={{textAlign: "center"}}>
                <MDBBreadcrumbItem style={{color: "#E9446A", fontWeight: "bold", fontSize: 15}}>STUDENT RECORD</MDBBreadcrumbItem>
                <MDBBreadcrumbItem active style={{ color: "#963246", fontWeight: "bold", fontSize: 15}}>STUDENT TRANSACTION</MDBBreadcrumbItem>
            </MDBBreadcrumb>
        </MDBCardBody>
    </MDBCard>
       {this.state.Prcheck ?
       <div>
            <Table striped hover>
            <table class="table">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Name</th>
                  <th>Products</th>
                  <th>Transaction</th>
                  <th>Vendor Name</th>
                  <th>CreatedAt</th>
                  
                </tr>
              </thead>
              <tbody>
                {this.state.History
                 .slice(
                  this.state.pageIndex * this.state.pageSize,
                  this.state.pageIndex * this.state.pageSize + this.state.pageSize
                )
                .map((History, i) =>
                  <tr>
                  <td>{i+=1}</td>
                  <td>{History.name}</td>
                 <td>{History.text}</td>
                  <td>{History.expense}<Text style={{color: "red", fontWeight: "800", fontSize: 10}}>Rs.</Text></td>
                 <td>{History.vendor}</td>
                  <td>{moment(History.createdAt.toDate()).format("lll")}</td>
                  
                
                  
                </tr>
              )}
            </tbody>
          </table>
          </Table>
        
        
        <button style={{padding: "5px 5px",
        backgroundColor:"#e14d5c",
color: "#FDE8E8",
fontSize: "14px",
cursor: "pointer",
transition: "all .5s ease-in-out",
textAlign: "center"}} onClick={event => this.handlePrevPageClick(event)}>
        Prev page
      </button>
      <button style={{padding: "5px 5px",
        backgroundColor:"#e14d5c",
color: "#FDE8E8",
fontSize: "14px",
cursor: "pointer",
transition: "all .5s ease-in-out",
textAlign: "center"}} onClick={event => this.handleNextPageClick(event)}>
        Next page
      </button>
      </div>
      : <div style={{fontSize: 25, color: 'red', }}>There are no Transactions</div> }
      </div>
</main>
  );
}

}

export default SpecificTransaction;