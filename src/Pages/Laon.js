import React, { Component } from 'react';
import {  InputGroupAddon, InputGroupText, Container, Button, Input, } from 'reactstrap';
import firebase from '../firebase';
import {Table, Badge} from 'reactstrap';
import moment from 'moment';
import { Text} from 'react-native';
import {Link} from 'react-router-dom'
import { MDBCard, MDBCardBody, MDBIcon, MDBBreadcrumb, MDBBreadcrumbItem, MDBFormInline, MDBBtn } from 'mdbreact';
export default class Loan extends Component {

  constructor(props) {
    super(props);
    this.state = {
        Topup: []
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

    componentDidMount() {
      const ref = firebase.firestore().collection('Topups').where("uid", "==", this.props.match.params.id).where("status", "==", "Overdraft");
      ref.get().then((querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        this.setState({ Topup : data });
      }));
}
onSubmit =() => {
  const ref = firebase.firestore().collection('Topups');
      ref.update({ status: "Complete"}).where("uid", "==", this.props.match.params.id);
      this.props.history.push(`/Show/${this.state.key}`);
}
    
    render() {
      let Topup = this.state.Topup.map((Topup, index) => {
        const { topup } = Topup //destructuring
        return Topup.topup;
     })
      const total = Topup.reduce((prev,next) => parseInt(prev + next),0);
        return (
            <main id="content" className="p-5">
            <div class="right">You need to pay back your loan first
            <Table class="table"striped hover>
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Name</th>
                  <th>Topup Amount</th>
                  <th>Bill Status</th>
                  <th>CreatedAt</th>
                  
                </tr>
              </thead>
              <tbody>
              {this.state.Topup.map((Topup,i) =>
                  <tr>
                    <td>{i+=1}</td>
                  <td>{Topup.name}</td>
                  <td>{Topup.topup}</td>
                  <td>{Topup.status}</td>
                  <td>{moment(Topup.createdAt.toDate()).format("lll")}</td>
                </tr>
              )}
            </tbody>
          </Table>
              <div>Your total debt to pay is {total}</div>
              <div class="payment-actions"><button class="finish" onClick={this.onSubmit}  style={{padding: "5px 5px",
      backgroundImage: "linear-gradient(to left, #963246, #d52f5b, #df3a62, #e9446a, #f34e72)",
color: "#FDE8E8",
fontSize: "14px",
cursor: "pointer",
transition: "all .5s ease-in-out",
textAlign: "center"}}>Pay<img class="ml-2" /></button></div>
      
          </div>
          </main>
        );
    }
}       
