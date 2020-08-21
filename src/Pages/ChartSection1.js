import React, { Component } from 'react';
import { MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBRow, MDBListGroup, MDBListGroupItem, MDBBadge, MDBIcon } from 'mdbreact';
import { Bar, Pie } from 'react-chartjs-2';
import moment from "moment";
import firebase from "../firebase";

class ChartSection1 extends Component {
    constructor(props) {
    
        super(props);
    
        this.ref = firebase.firestore().collection('record');
        this.state = {
            total: 0,
            History: [],
            record: [],
            Topup: [],
            vendor: [],
            refreshing: false,
    
        };
    
        
    
      }
componentDidMount() {
    const record = [];
    const Topup = [];
    const History = [];
    const vendor = []
    var total = [];
   // const size=0;
    
  /*  firebase.firestore().collection('record')
    .get().then(snap => {

      this.setState(
        {
          size: snap.size ,
         
       
    }); 
    })*/
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
    
render(){
    
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

        
      //   const{size}=this.state
      //  console.log(this.state.size)

     const dataBar = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
        {
        
            label: 'Students Registration',
            data: record,
            backgroundColor: 'rgba(245, 74, 85, 0.5)',
            borderWidth: 1
        }, {
            label: 'Students Topup',
            data: Topup,
            backgroundColor: 'rgba(90, 173, 246, 0.5)',
            borderWidth: 1
        }, {
            label: 'Students Transaction',
            data: History,
            backgroundColor: 'rgba(245, 192, 50, 0.5)',
            borderWidth: 1
        }, {
            label: 'Vendor Registred',
            data: vendor,
            backgroundColor: 'rgb(60,179,113)',
            borderWidth: 1
        }
        ]
    };

    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
        xAxes: [{
            barPercentage: 1,
            gridLines: {
            display: true,
            color: 'rgba(0, 0, 0, 0.1)'
            }
        }],
        yAxes: [{
            gridLines: {
            display: true,
            color: 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
            beginAtZero: true
            }
        }]
        }
    }

    const dataPie = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
        {
            data: Topup,
            backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#ac64ad'],
            hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '#da92db']
        }
        ]
    }
    return (
        
        <MDBRow className="mb-4">
            <MDBCol md="8"className="mb-4">
                <MDBCard className="mb-4">
                    <MDBCardBody>
                        <Bar data={dataBar}  height={500} options={barChartOptions} />
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
            <MDBCol md="4" className="mb-4">
                <MDBCard className="mb-4">
                    <MDBCardHeader>Students Topup Monthly</MDBCardHeader>
                    <MDBCardBody>
                        <Pie data={dataPie} height={300} options={{responsive: true}} />
                    </MDBCardBody>
                </MDBCard>
                <MDBCard className="mb-4">
                    <MDBCardBody>
                        <MDBListGroup className="list-group-flush">
                            <MDBListGroupItem>
                                Students Registration
                                <MDBBadge color="success-color" pill className="float-right">
                                    6%
                                    <MDBIcon icon="arrow-up" className="ml-1"/>
                                </MDBBadge>
                            </MDBListGroupItem>
                            <MDBListGroupItem>
                                Vendor Registration
                                <MDBBadge color="danger-color" pill className="float-right">
                                    5%
                                    <MDBIcon icon="arrow-down" className="ml-1"/>
                                </MDBBadge>
                            </MDBListGroupItem>
                            <MDBListGroupItem>
                                Students Topup
                                <MDBBadge color="primary-color" pill className="float-right">
                                    14
                                </MDBBadge>
                            </MDBListGroupItem>
                            <MDBListGroupItem>
                                Students Transactions
                                <MDBBadge color="primary-color" pill className="float-right">
                                    123
                                </MDBBadge>
                            </MDBListGroupItem>
                            <MDBListGroupItem>
                                Online Traffic
                                <MDBBadge color="primary-color" pill className="float-right">
                                    8
                                </MDBBadge>
                            </MDBListGroupItem>
                        </MDBListGroup>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </MDBRow>
    )
}
}

export default ChartSection1;