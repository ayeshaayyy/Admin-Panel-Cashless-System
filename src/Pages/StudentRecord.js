import React from "react";
//import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import moment from "moment";
import firebase from "../firebase"
import BreadscrumSection from './BreadcrumSection';
import { Link } from 'react-router-dom';
import {BootstrapTable, TableHeaderColumn, ExportCSVButton} from 'react-bootstrap-table';
import { MDBCard, MDBCardBody, MDBIcon, MDBBreadcrumb, MDBBreadcrumbItem, MDBFormInline, MDBBtn } from 'mdbreact';
import { NavLink } from 'react-router-dom';

//import { LinkContainer } from 'react-router-bootstrap';
var ReactBsTable  = require('react-bootstrap-table');

export default class StudentRecord extends React.Component {
  constructor(props) {
  
      super(props);
  
      this.ref = firebase.firestore().collection('record');
  
      this.unsubscribe = null;
  
      this.state = {
  
          record: [],
          columns: [
              { title: 'Name', field: 'name' },
              { title: 'Amount', field: 'amount', type: 'numeric' },
              { title: 'Status', field: 'status' },
              { title: 'Transaction', field: 'timestampu' },
              { title: 'Topup', field: 'timestampt' },
            ],
          refreshing: true,
          user: {},
              email: "",
      };
  
    }
  ExportCSVButton = (onClick) => {
      return (
        <button style={ { color: 'green' } }></button>
      );
    }
    /*updateSearch(event) {
      this.setState({search: event.target.value.substr(0,20)});
    }*/
  
    componentDidMount() {
      firebase.firestore().collection('record').where("student", "==", true).where("adminId", '==', firebase.auth().currentUser.uid)
      .get().then(querySnapshot => {
          const record = [];
          querySnapshot.forEach(function(doc) {
              record.push({
                  key: doc.id,
                  name: doc.data().name,
                  userid: doc.data().userid,
                  amount: doc.data().amount,
                  status: doc.data().status,
                  email: doc.data().email,
                  timestampt: moment(doc.data().timestampt.toDate()).format("lll"),
                  timestampu: moment(doc.data().timestampu.toDate()).format("lll")
              });
          });
          this.setState({ record : record});
      })
      //this.LoadTopup();
  //console.log(firebase.auth().currentUser.uid)
    }
  
   /* LoadTopup = () => {
  
      var user = firebase.auth().currentUser;
      const ref = firebase.firestore().collection('record');
      ref.get().then((querySnapshot => {
  
        const data = querySnapshot.docs.map(doc => doc.data());
  
        this.setState({ 
            record : data,
            refreshing: false
      });
  
        
  
      }));
     
      
    };*/
    enumFormatter(cell, row, enumObject) {
      return enumObject[cell];
    }
    dateFormatter(cell, row) {
      return `${('0' + cell.getDate()).slice(-2)}/${('0' + (cell.getMonth() + 1)).slice(-2)}/${cell.getFullYear()}`;
    }
  
   
  
    renderPost() {
    /*  return this.state.record.map((record, index) => {
          const { id, name, amount, userid } = record //destructuring
          return (
             <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{amount}</td>
                <td>{userid}</td>
             </tr>
          )
       })*/
    }
    renderShowsTotal(start, to, total) {
      return (
        <p style={ { color: 'black' } }>
          From { start } to { to }, totals is { total }&nbsp;&nbsp;
        </p>
      );
    }
  /*enumFormatter(cell, row, Object) {
      return Object[cell];
    }*/
  
    
    CellFormatter(cell, row) {
      return (<div><a href={"/Show/"+row.key}>{cell}</a></div>);
    }
    
  render() {
      const options = {
          page: 1,  // which page you want to show as default
          sizePerPageList: [ {
            text: '5', value: 5
          }, {
            text: '10', value: 10
          }, {
            text: 'All', value: this.state.record.length
          } ], // you can change the dropdown list for size per page
          sizePerPage: 5,  // which size per page you want to locate as default
          pageStartIndex: 0, // where to start counting the pages
          paginationSize: 3,  // the pagination bar size.
          prePage: 'Prev', // Previous page button text
          nextPage: 'Next', // Next page button text
          firstPage: 'First', // First page button text
          lastPage: 'Last', // Last page button text
          paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
          paginationPosition: 'bottom',  // default is bottom, top and both is all available
          // hideSizePerPage: true > You can hide the dropdown for sizePerPage
          // alwaysShowAllBtns: true // Always show next and previous button
          // withFirstAndLast: false > Hide the going to First and Last page button
        };
        const cellEditProps = {
          mode: 'click'
        };
        const qualityType = {
          0: 'ACTIVE',
          1: 'BLOCKED',
        };
        
        let order = 'desc';
        const rowEvents = {
          onClick: (e, row, rowIndex) => {
            console.log(`clicked on row with index: ${rowIndex}`);
          },
          onMouseEnter(key) {
            console.log(`enter on row with index: ${key}`);
          }
        };
        
    
      return (
        <main id="content" className="p-5">
            <div class="right">
            <MDBCard className="mb-5" style={{backgroundImage: "linear-gradient(to left, #963246, #d52f5b, #df3a62, #e9446a, #963246)"}}>
          <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
              <MDBBreadcrumb>
                  <MDBBreadcrumbItem style={{color: "#E9446A", fontWeight: "bold", fontSize: 15}}>HOME</MDBBreadcrumbItem>
                  <MDBBreadcrumbItem active style={{color: "#963246", fontWeight: "bold", fontSize: 15}}>STUDENT RECORD LIST</MDBBreadcrumbItem>
              </MDBBreadcrumb>
          </MDBCardBody>
      </MDBCard>             
   
  
                
              </div>
              <div class="panel-body" style={{backgroundColor: "#FDE8E8", textColor: "black"}}>
        
          <link rel="stylesheet" href="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table-all.min.css"/>
          <BootstrapTable data={this.state.record} bordered={ true } pagination={ true } options={ options } striped hover condensed exportCSV data={ this.state.record }
             search 
          >
  <TableHeaderColumn dataField='name' isKey={ true } dataSort={ true } dataFormat={this.CellFormatter} filter={ { type: 'TextFilter', delay: 1000 } }>Student Name</TableHeaderColumn>
          <TableHeaderColumn dataField='amount' dataSort={ true }filter={ { type: 'TextFilter', delay: 1000 } }> Balance</TableHeaderColumn>
          <TableHeaderColumn hidden  dataField='userid' filter={ { type: 'TextFilter', delay: 1000 } }>Student id</TableHeaderColumn>
          <TableHeaderColumn dataField='status' filter={ { type: 'TextFilter'}}formatExtraData={ qualityType }> Card Status</TableHeaderColumn>
          <TableHeaderColumn dataField='email' filter={ { type: 'TextFilter', delay: 1000 } }>Email ID</TableHeaderColumn>
          <TableHeaderColumn dataField='timestampt' filter={ { type: 'DateFilter' } }>Last Transaction</TableHeaderColumn>
          <TableHeaderColumn dataField='timestampu'  filter={ { type: 'DateFilter' } }>Last Topup</TableHeaderColumn>
           
      </BootstrapTable>
      
          </div>
  </main>
  
       /*   <div style={{backgroundColor: "black"}}>
             <MaterialTable 
          title="Editable Example"
          data={this.state.record}
          renderItem={({ item }) => this.renderPost(item)}
          keyExtractor={item => item.id}
                      showsVerticalScrollIndicator={false}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  this.setState((prevState) => {
                    const record = [...prevState.record];
                    record.push(newData);
                    return { ...prevState, record };
                  });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    this.setState((prevState) => {
                      const record = [...prevState.record];
                      record[record.indexOf(oldData)] = newData;
                      return { ...prevState, record };
                    });
                  }
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  this.setState((prevState) => {
                    const record = [...prevState.record];
                    record.splice(record.indexOf(oldData), 1);
                    return { ...prevState, record };
                  });
                }, 600);
              }),
          }}
        />
            
  
      </div>*/
      
      );
    }
  }
  