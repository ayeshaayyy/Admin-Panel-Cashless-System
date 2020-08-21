import React, { Component } from 'react';
import {  InputGroupAddon, InputGroupText, Container,  Input, } from 'reactstrap';
import Button from '@material-ui/core/Button'
import firebase from '../firebase';
import {Table, Badge} from 'reactstrap';
import moment from 'moment';
import { Text} from 'react-native';
import {Link} from 'react-router-dom'
import { MDBCard, MDBCardBody, MDBIcon, MDBBreadcrumb, MDBBreadcrumbItem, MDBFormInline, MDBBtn } from 'mdbreact';
class Topup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      name: '',
      userid: '',
      amount: 0,
      balance: '',
      timestampu: new Date(),
      Topup: [],
      push_token: '',
      checked1: false,
      checked2: false,
      isEnable: true,
      pageSize: 5, // <- 2 items will be shown on single page
      pageIndex: 0,
      bal: 0,
      users: [],
      blc: false,
      tax1: 0
    };
    this.overdraft = this.overdraft.bind(this);
    this.topup = this.topup.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
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
        Math.ceil(prevState.Topup.length / prevState.pageSize)
          ? prevState.pageIndex + 1
          : prevState.pageIndex
    }));
  }

  
  //sendPushNotification = () => {};
  componentDidMount() {
    const ref = firebase.firestore().collection('record').doc(this.props.match.params.id);
    
    ref.get().then((doc) => {
      if (doc.exists) {
        const record = doc.data();
        this.setState({
          key: doc.id,
          name: record.name,
          userid: record.userid,
          amount: record.amount,
          push_token: record.push_token,
          am: record.amount,
          Tpcheck: record.Tpcheck,
          ordraft: record.overdraft
        });
      } else {
        console.log("No such document!");
      }
      const ref = firebase.firestore().collection('Topups').where("uid", "==", this.props.match.params.id).orderBy("createdAt", "desc");
      ref.get().then((querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());



        this.setState({ Topup : data});
      }));
    });


    const users =[];
    const ref2 = firebase.firestore().collection('Topups').where("adminId", "==", firebase.auth().currentUser.uid);
    ref2.get().then((querySnapshot => {
      querySnapshot.forEach((doc) => {
        const { vname, tno, status, Bill, day } = doc.data();
        users.push({
          tkey: doc.id,
          doc, // DocumentSnapshot
          vname,
          tno,
          status,
          Bill,
          day
        })})  
      this.setState({ users});
    }));
    





}

onChange = (e) => {
  const state = this.state
  state[e.target.name] = e.target.value;
  this.setState({record:state});
}

onClick = (e) => {
  this.setState({balance: parseInt(this.state.amount) + parseInt(this.state.topup)});

  this.setState({submit: this.state.amount =  this.state.balance});
  this.setState({bal: this.state.balance});
  this.setState({balance:0,amount: this.state.am});
  let message = {
    to: this.state.push_token,
      
    sound: 'default' ,
    title: 'Topup Added',
    body: "Rs." +this.state.topup+" Added to your card.Your new Balnce is Rs." +this.state.balance,

    data: { data: 'goes here' },
    _displayInForeground: true,
    
}
  let response = fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
  

    'mode': 'no-cors',
          'method': 'POST',
          'headers': {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },

        
    body: JSON.stringify(message)
    
  });


}

onSubmit = (e) => {
  e.preventDefault();
  alert("You are submitting " + this.state.topup);
  const { name, userid, amount, Tpcheck, tax1 } = this.state;
  firebase.firestore()
  .collection('record').doc(this.state.key)
  .update({ Tpcheck: true ,amount: this.state.bal, timestampu: new Date(), overdraft: this.state.overdraft });
    this.props.history.push("/show/"+this.props.match.params.id);
  firebase.firestore().collection("Topups").doc().set({
    name: this.state.name,
    Desk: 'UIT',
    topup: this.state.topup,
    createdAt: this.state.timestampu,
    uid: this.state.key,
    status: this.state.status,
    adminId: firebase.auth().currentUser.uid,
    tax: this.state.tax1
  });
}
maxLengthCheck = (object) => {
  if (object.target.value.length > object.target.maxLength) {
   object.target.value = object.target.value.slice(0, object.target.maxLength)
    }
    
  }
  handleChange(e) {
    this.setState({
      checked1: !this.state.checked1,
      status: "Overdraft",
      overdraft: true
    })
  }
  handleChange2(e) {
    this.setState({
      checked2: !this.state.checked2,
      status: "Complete",
      overdraft: false
    })
  }
  overdraft() {
    firebase.firestore().collection('record').doc(this.state.key).update({overdraft: false});
          const collection = firebase.firestore().collection('Topups')
      
          const newDocumentBody = {
              status: 'Complete'
          }
      
          collection.where('uid', '==',  this.props.match.params.id).get().then(response => {
              let batch = firebase.firestore().batch()
              response.docs.forEach((doc) => {
                  const docRef = firebase.firestore().collection('Topups').doc(doc.id)
                  batch.update(docRef, newDocumentBody)
              })
              batch.commit().then(() => {
                  console.log(`updated all documents inside ${'Topups'}`)
                  window.location.reload()
              })
          })
        
}
topup() {
  const tempTax= parseInt(this.state.topup) * 0.1
  const tax= parseInt(tempTax.toFixed(2))
  this.setState({
    balance: parseInt(this.state.amount) + (parseInt(this.state.topup) - tax),
    tax1 :tax,
     blc: true
    })
}
render() {
  


  const content = this.state.checked1 
  ? <div style={{color:"red", textAlign: 'center'}}> <input style={{textAlign: 'center', fontSize: 'larger'}} type="number" maxLength = "3" min={1} disabled = {this.state.amount > 50}
  max={500} strict onInput={this.maxLengthCheck} id="expense" placeholder="Overdraft Amount" value={this.state.topup}  onChange={(e)=>{this.setState({topup: e.target.value}); }} /> Your Overdraft limit is 500! </div>
   : null;
   const payontime = this.state.checked2 
   ? <div style={{color:"red", textAlign: 'center'}}> <input style={{textAlign: 'center', fontSize: 'larger'}} type ="number" maxLength = "4" min={1}
   max={2000} strict onInput={this.maxLengthCheck} id="expense" placeholder="Top-up" value={this.state.topup} onChange={(e)=>{this.setState({topup: e.target.value}); }} /> You can topup an amount upto 2000 max! </div>
    : null;
  
  return (
    
    <main id="content" className="p-5">
    <div class="right">
    <MDBCard className="mb-5" style={{backgroundImage: "linear-gradient(to left, #963246, #d52f5b, #df3a62, #e9446a, #963246)"}}>
        <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
            <MDBBreadcrumb style={{textAlign: "center"}}>
              <Link to={`/Show/${this.state.key}`}>  <MDBBreadcrumbItem style={{color: "#E9446A", fontWeight: "bold", fontSize: 15}} >STUDENT RECORD</MDBBreadcrumbItem></Link>
                <MDBBreadcrumbItem active style={{ color: "#963246", fontWeight: "bold", fontSize: 15}}>  /  STUDENT TOPUP</MDBBreadcrumbItem>
            </MDBBreadcrumb>
        </MDBCardBody>
    </MDBCard>
  
          <form onSubmit={this.onSubmit}>
          <Text style={{fontWeight: "bold", color: "#b65f7f", fontSize: 30, marginLeft: '480px'}}>{this.state.name}</Text>
              <div class="form-group">
            { this.state.ordraft ?  
            <div>
      <div >
      <Text style={{fontSize: 20, color: '#b65f7f', fontWeight: 'bold', backgroundColor: '#FDE8E8' , borderColor: '#FDE8E8' }}
        checked1={ this.state.status }>Overdraft</Text>
        { content }
      </div>
    <div>
    <Text style={{fontSize: 20, backgroundColor: '#FDE8E8', color: '#b65f7f', fontWeight: 'bold', borderColor: '#FDE8E8' }} checked2={ this.state.status }>On-time payment</Text>
        { payontime }
      </div>

    
               
      <Text style={{fontSize: 20, backgroundColor: '#FDE8E8', color: '#b65f7f', fontWeight: 'bold', borderColor: '#FDE8E8' }} name="balance" value={this.state.balance}>View Balance</Text>
                <Text style={{fontWeight: "bold", color: "#b65f7f", fontSize: "larger", marginLeft: '500px'}}>{this.state.balance}</Text>
            
  <div>
                
              <button type="submit"   style={{
      backgroundColor: "grey",
color: "#FDE8E8",
fontSize: "14px",
cursor: "pointer",
transition: "all .5s ease-in-out",
textAlign: "center"}}
              disabled = { this.state.blc == false}>
                
              Topup
              </button>
              <div style={{fontWeight: "bold", fontSize: 20, color: "red", textAlign: "center"}}>
               YOU NEED TO PAY YOUR LOAN FIRST!
               </div>
             </div>
             </div> : 
             <div>
              <Text style={{fontWeight: "800", color: "#b65f7f", fontSize: 22, marginLeft: '540px'}}>{this.state.am}<Text style={{color: "green", fontWeight: "800", fontSize: 15}}>Rs.</Text> </Text>
              <div >
                <Text style={{fontSize: 20,  color: '#b65f7f', fontWeight: 'bold'}}
                checked1={ this.state.status } 
                  onClick={ this.handleChange}>Overdraft</Text>
                  { content }
              </div>
            <div>
                <Text style={{fontSize: 20, color: '#b65f7f', fontWeight: 'bold' }} checked2={ this.state.status } 
                  onClick={ this.handleChange2 } >On-time payment</Text>
                       { payontime }
              </div>
                       
                        <Text style={{fontSize: 20,  color: '#b65f7f', fontWeight: 'bold' }} name="balance" value={this.state.balance} onChange={this.onChange} onClick={this.topup}>View Balance</Text>
                        <Text style={{fontWeight: "bold", color: "#b65f7f", fontSize: "larger", marginLeft: '500px'}}>{this.state.balance}</Text>
                    
          <div>
                        
                      <button type="submit"   style={{padding: "5px 5px",
              backgroundImage: "linear-gradient(to left, #963246, #d52f5b, #df3a62, #e9446a, #f34e72)",
        color: "#FDE8E8",
        fontSize: "14px",
        cursor: "pointer",
        transition: "all .5s ease-in-out",
        textAlign: "center"}}onClick={(e)=>{this.onClick()}}
                      disabled = { this.state.blc == false}>
                        
                      Topup
                      </button>
            </div></div> }
              </div>
            </form>
            {this.state.Tpcheck ?
            <Table striped hover>
            <table class="table">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Name</th>
                  <th>Topup Amount</th>
                  <th>Comission</th>
                  <th>Bill Status</th>
                  <th>CreatedAt</th>
                  <th></th>
                  
                </tr>
              </thead>
              <tbody>
              {this.state.Topup
                .slice(
                this.state.pageIndex * this.state.pageSize,
                this.state.pageIndex * this.state.pageSize + this.state.pageSize
              )
                .map((Topup,i) =>
                  <tr>
                    <td>{i+=1}</td>
                  <td>{Topup.name}</td>
                  <td>{Topup.topup} <Text style={{color: "green", fontWeight: "800", fontSize: 15}}>Rs.</Text> </td>
                  <td>{Topup.tax} <Text style={{color: "green", fontWeight: "800", fontSize: 15}}>Rs.</Text> </td>
                  <td>{Topup.status}</td>
                  <td>{moment(Topup.createdAt.toDate()).format("lll")}</td>
                  <td>{Topup.status == "Complete"
    ?  <Button style={{backgroundColor: 'grey', fontWeight: 'bold', color: "white"}} disabled> Paid  </Button>
                : <Button style={{backgroundColor: 'rgb(175, 72, 96)' , fontWeight: 'bold', color: "white"}} onClick={this.overdraft}> Pay  </Button>}</td>
                </tr>
              )}
            </tbody>
          </table>
          </Table> : 'No Topups Avialable' }
        </div>
          </main>
        
     
    );
  }
}

export default Topup;