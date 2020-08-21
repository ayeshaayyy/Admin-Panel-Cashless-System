import React, { Component } from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';
//import { Card } from 'reactstrap';
import {MDBCol, MDBBtn, MDBIcon} from 'mdbreact';
import Swal from 'sweetalert2';
import {
  Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle
} from 'reactstrap';
import { Text} from 'react-native'
import Button from 'react-bootstrap/Button'
import tempAvatar from './tempAvatar.jpg';


class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      record: [],
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('record').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          record: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        Swal.fire(
          'No such document exist'
        )
      }
    });
  }

  delete(id){
    firebase.firestore().collection('record').doc(id).delete().then(() => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success',
            this.props.history.push("/StudentRecord")
          )
        }
      })
      }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }
  onSubmit(id) {
    firebase.firestore()
        .collection('record').doc(id)
        .update({ Admin: false, status: " 'BLOCKED' ", check: false });
        Swal.fire(
          'Blocked!',
          'The card has been Blocked and no further transactions can be performed by ' + this.state.record.name,
          'danger'
        )
        .then(() => {
          window.location.reload()
      })
}
unBlock(id) {
  firebase.firestore()
      .collection('record').doc(id)
      .update({ Admin: true, status: " 'ACTIVE' ", check: true });
      Swal.fire(
        'Un-Blocked!',
        'The card has been Un-Blocked and now further transactions can be performed by ' + this.state.record.name,
        'success'
      )
      .then(() => {
        window.location.reload()
    })
}

  render() {

    const block = this.state.record.check 
  ? <i class="fas fa-lock fa-sm pr-2	" style={{color: "red", width: '29px',height: '24px', float: 'left' , fontSize: 40 ,border: '3px solid var(#5fadbf)',  webkitTransition: 'all 0.1s ease-in-out',
  transition: 'all 0.1s ease-in-out'}} onClick={this.onSubmit.bind(this, this.state.key)} area-hidden="true"></i>
   : <i class="fas fa-lock-open fa-sm pr-2	" style={{color: 'green',  fontSize: 40, float: 'left' ,  bottom: '130%', left: '31%',marginLeft: '-11.5px' }} onClick={this.unBlock.bind(this, this.state.key)}></i>;
    return (
      <main id="content" className="p-5" style={{textAlign: "center"}}>
            <div class="right">
      <Card>
        <CardBody style={{ backgroundColor: '#FDE8E8', borderColor: '#FDE8E8' }}>
        {block}
       
<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/8585/poof.png" alt="" style={{opacity: 0, height: 0, width: 0}}/>

<button class="iconbutton large" onClick={this.delete.bind(this, this.state.key)} style={{float: 'right', marginRight: '-100px', marginTop: '-26px'}}><svg xmlns="http://www.w3.org/2000/svg" xmlns={"http://www.w3.org/1999/xlink"} version="1.1" id="Layer_1" x="0px" y="0px" viewBox="-2 -10 18 28" class="delete-animation">
<path d="M10.5,2.3V1.5c0,0,0-0.1,0-0.1C10.5,0.6,9.8,0,9,0H6c0,0-0.1,0-0.1,0C5.1,0,4.5,0.7,4.5,1.5v0.8H0v1.5h15V2.3H10.5z M9,2.2  H6V1.5h3V2.2z" class="lid"/>
<g class="can">
    <path d="M12.8,3.8v12c0,0,0,0,0,0.1c0,0.4-0.4,0.7-0.8,0.7H3c0,0,0,0-0.1,0c-0.4,0-0.7-0.4-0.7-0.8v-12H0.8v12   c0,0.6,0.2,1.2,0.7,1.6C1.8,17.8,2.4,18,3,18h9c0,0,0,0,0,0c1.2,0,2.2-1,2.2-2.2v-12H12.8z"/>
    <rect x="3.8" y="6" width="1.5" height="8.2"/>
    <rect x="6.8" y="6" width="1.5" height="8.2"/>
    <rect x="9.8" y="6" width="1.5" height="8.2"/>
</g>
</svg>
</button>
    <CardTitle style={{color: "black"}}>NAME-  <Text style={{fontWeight: "bold", color: "#b65f7f", fontSize: "larger"}}> {this.state.record.name}</Text></CardTitle>
    <CardTitle style={{color: "black"}}>BALANCE- <Text style={{fontWeight: "bold", color: "#b65f7f", fontSize: "larger"}}>{this.state.record.amount}</Text><Text style={{color: "green", fontWeight: "800"}}>Rs.</Text> </CardTitle>
        <MDBCol lg="3" md="4" className="mb-3 text-center">
        <div className="shadow-box-example">
            <img style={{  display: 'block', position: 'relative', left: '170%',marginLeft: 'auto', marginRight: 'auto'}} src={this.state.record.avatar
                                    ? this.state.record.avatar 
                                    : tempAvatar} className="img-fluid z-depth-1 rounded-circle" alt="" />
                                    </div>
                                    </MDBCol>
  
    <CardTitle>Card Status: <Text style={{color: this.state.record.check ? "green" : "red", fontSize: 'large', fontWeight: "bold" }}> {this.state.record.status}</Text></CardTitle>
    <div class="btn-group" role="group" aria-label="Basic example">
    <Link  to={`/Topup/${this.state.key}`}class="bt"><button type="button" class="btn btn btn-rounded" style={{backgroundColor: "white", color: "green", fontWeight: "bold", fontSize: 17}}><i class="fas fa-file-alt	 fa-sm pr-2" style={{color: "green"}} aria-hidden="true"></i>
    Top-Ups</button></Link>
    <Link  to={`/SpecificTransaction/${this.state.key}`}class="bt"> <button type="button" class="btn btn btn-rounded" style={{backgroundColor: "white", color: "#fa2", fontWeight: "bold", fontSize: 17}}><i class="fas fa-file-upload	 fa-sm pr-2" style={{color: "#fa2"}} aria-hidden="true"></i>Transaction</button></Link>
    <Link to={`/edit/${this.state.key}`} class="bt"> <button type="button" class="btn btn btn-rounded" style={{backgroundColor: "white", color: "blue", fontWeight: "bold" , fontSize: 17}}><i class="fas fa-edit fa-sm pr-2	" style={{color: "blue"}} aria-hidden="true"></i>
    Edit</button></Link>
    
</div>




        </CardBody>
      </Card>
    </div>

        </main>
    );
  }
}

export default Show;