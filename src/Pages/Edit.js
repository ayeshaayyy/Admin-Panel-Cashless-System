import React, { Component } from 'react';
import firebase from '../firebase';
//npimport 'react-notifications-component/dist/theme.css';
import Swal from 'sweetalert2';
import { MDBCard, MDBCardBody, MDBIcon, MDBBreadcrumb, MDBBreadcrumbItem, MDBFormInline, MDBBtn } from 'mdbreact';
class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      name: '',
      userid: '',
      amount: '',
      error: null

    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('record').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const record = doc.data();
        this.setState({
          key: doc.id,
          name: record.name,
          userid: record.userid,
          amount: record.amount
        });
      } else {
        Swal.fire("No such document!");
      }
    });
}

onChange = (e) => {
  const state = this.state
  state[e.target.name] = e.target.value;
  this.setState({record:state});
}

onSubmit = (e) => {
  e.preventDefault();
  firebase.firestore()
  .collection('record').doc(this.state.key)
  .update({ name: this.state.name , userid: this.state.userid });
  const collection = firebase.firestore().collection('Topups')    
          const newDocumentBody = {
              name: this.state.name, userid: this.state.userid
          }
          collection.where('uid', '==',  this.props.match.params.id).get().then(response => {
              let batch = firebase.firestore().batch()
              response.docs.forEach((doc) => {
                  const docRef = firebase.firestore().collection('Topups').doc(doc.id)
                  batch.update(docRef, newDocumentBody)
              })
              batch.commit().then(() => {
                  console.log(`updated all documents inside ${'Topups'}`)
              })
          })
    Swal.fire(
      'The changes have been made successfully!',
      'success'
    )
    this.props.history.push("/show/"+this.props.match.params.id)
  .catch((error) => {
    Swal.fire("Error adding document: ", error);
  });
}

render() {
  return (
    <main id="content" className="p-5">
    <div class="right">
    <MDBCard className="mb-5" style={{backgroundImage: "linear-gradient(to left, #963246, #d52f5b, #df3a62, #e9446a, #963246)"}}>
        <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
            <MDBBreadcrumb style={{textAlign: "center"}}>
                <MDBBreadcrumbItem style={{color: "#E9446A", fontWeight: "bold", fontSize: 15}}>STUDENT RECORD</MDBBreadcrumbItem>
                <MDBBreadcrumbItem active style={{ color: "#963246", fontWeight: "bold", fontSize: 15}}>EDIT RECORD</MDBBreadcrumbItem>
            </MDBBreadcrumb>
        </MDBCardBody>
    </MDBCard>
          <form onSubmit={this.onSubmit} class="ui loading form">

            <div class="form-group">
              <label for="name">Name:</label>
              <input type="text" class="form-control" name="name" value={this.state.name} onChange={this.onChange} placeholder="Name" />
              </div>
              <div class="form-group">
                <label for="userid">Userid:</label>
                <input type="password" class="form-control" name="userid" value={this.state.userid} onChange={this.onChange} placeholder="Userid" />
              </div>
              <button icon="submit" type="submit" class="btn btn"  style={{padding: "5px 5px",
      backgroundImage: "linear-gradient(to left, #963246, #d52f5b, #df3a62, #e9446a, #f34e72)",
color: "#FDE8E8",
fontSize: "14px",
cursor: "pointer",
transition: "all .5s ease-in-out",
textAlign: "center"}}>Submit</button>
            </form>
          </div>
        </main>
      

    );
  }
}

export default Edit;