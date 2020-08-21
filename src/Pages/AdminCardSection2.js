import React, {Component} from 'react';
import { MDBCard, MDBCardBody, MDBIcon, MDBRow, MDBCol } from 'mdbreact';
import { Progress } from 'reactstrap';
import firebase from "../firebase";

class AdminCardSection2 extends Component {
    constructor(props) {
    
        super(props);
    
        this.ref = firebase.firestore().collection('record');
        this.state = {
            total: 0,
            record: [],
            refreshing: false,
            History: [],
            Topup: [],
            vendor: [],
        };
    
        
    
      }
componentDidMount() {
  const Topup = [];
  const History = [];
  const vendor = [];
const record = [];
    var total = [];
firebase.firestore().collection('record').where("adminId", '==', firebase.auth().currentUser.uid)
    .get().then(querySnapshot => {
        const record = [];
        querySnapshot.forEach(function(doc) {
            record.push({
                amount: doc.data().amount,
                //size: querySnapshot.size
            });
        });
            var i = 0;
        for (i = 0; i < record.length; i++)
  {
    parseInt(record[i].amount)
    total[i] = ''
    total[i] += record[i].amount
  }
  this.setState({ record : record});
  return record;
    });
    firebase.firestore().collection('Topups').where("adminId", '==', firebase.auth().currentUser.uid)
    .get().then(querySnapshot => {
        querySnapshot.forEach(function(doc) {
            Topup.push({
                topup: doc.data().topup,
                  //  size: querySnapshot.size
            });
        });
        var i = 0;
        for (i = 0; i < Topup.length; i++)
  {
    parseInt(Topup[i].topup)
    total[i] = ''
    total[i] += Topup[i].topup
  }

        this.setState({Topup : Topup});
        return Topup;
        
    })
    firebase.firestore().collection('History').where("adminId", "==", firebase.auth().currentUser.uid)
    .get().then(querySnapshot => {
        querySnapshot.forEach(function(doc) {
            History.push({
               expense: doc.data().expense,
              //size: querySnapshot.size
            });
        });
        var i = 0;
        for (i = 0; i < History.length; i++)
  {
    parseInt(History[i].expense)
    total[i] = ''
    total[i] += History[i].expense
  }

        this.setState({History : History});
        return History;
        
    })
    firebase.firestore().collection('vendor').where("adminId", '==', firebase.auth().currentUser.uid)
    .get().then(querySnapshot => {
        querySnapshot.forEach(function(doc) {
            vendor.push({
              //  expense: doc.data().expense,
              size: querySnapshot.size
            });
        });
        var i = 0;
        for (i = 0; i < vendor.length; i++)
  {
    parseInt(vendor[i].size)
    total[i] = ''
    total[i] += vendor[i].size
  }

        this.setState({vendor : vendor});
        return vendor;
        
    })
  }

  render() {
  let record = this.state.record.map((record, index) => {
    const { amount }= record //destructuringnpm
    return record.amount;
 })
 let Topup = this.state.Topup.map((Topup, index) => {
  const { topup} = Topup //destructuring
  return Topup.topup;
})
let History = this.state.History.map((History, index) => {
  const { expense} = History //destructuring
  return History.expense;
})
let vendor = this.state.vendor.map((vendor, index) => {
  const { expense, size } = vendor //destructuring
  return vendor.size;
})
  return (
    <MDBRow className="mb-4">
        <MDBCol xl="3" md="6" className="mb-3">
          <MDBCard color="primary-color" className="classic-admin-card">
            <MDBCardBody>
              <div className="float-right">
              <MDBIcon far icon="money-bill-alt"/>
              </div>
              <p style={{color: 'black', fontWeight: 900}}>VENDOR SALES</p>
              <h4><strong>1800</strong></h4>
            </MDBCardBody>
  
              <Progress striped color="success" value={record[this.state.total]}/>
            
            <MDBCardBody>
              <p>Better than last week (29%)</p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-3">
          <MDBCard color="warning-color" className="classic-admin-card">
            <MDBCardBody>
              <div className="float-right">
              <MDBIcon icon="chart-line"/>
              </div>
              <p style={{color: 'black', fontWeight: 900}}>STUDENTS REGISTRATION</p>
              <h4><strong>300</strong></h4>
            </MDBCardBody>
            <Progress striped color="success" value={Topup[this.state.total]}/>
            <MDBCardBody>
              <p>Worse than last week (31%)</p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-3">
          <MDBCard color="primary-color" className="classic-admin-card">
            <MDBCardBody>
              <div className="float-right">
              <MDBIcon icon="chart-pie"/>
              </div>
              <p style={{color: 'black', fontWeight: 900}}>STUDENT APP DOWNLOADED</p>
              <h4><strong>800</strong></h4>
            </MDBCardBody>
            <Progress striped color="success" value={History[this.state.total]}/>
            <MDBCardBody>
              <p>Better than last week (75%)</p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-3">
          <MDBCard color="red accent-2" className="classic-admin-card">
            <MDBCardBody>
              <div className="float-right">
              <MDBIcon icon="chart-bar"/>
              </div>
              <p style={{color: 'black', fontWeight: 900}}>STUDENT AND VENDOR TRAFFIC</p>
              <h4><strong>10</strong></h4>
            </MDBCardBody>
            <Progress striped color="success" value={vendor[this.state.total]}/>
            <MDBCardBody>
              <p>Worse than last week (81%)</p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
  )
}
}

export default AdminCardSection2;