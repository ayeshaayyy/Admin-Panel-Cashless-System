import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { Link, NavLink,  Route } from 'react-router-dom';
import Divider from '@material-ui/core/Divider'
import { UncontrolledCollapse } from 'reactstrap';
import logo from '../aplogo.png';
import firebase from '../firebase';
import Login from '../Login'
import Loading from '../Loading'
import Routes from './Routes'
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
class SideNavigation extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        user: firebase.auth().currentUser,
        record: []
      };
      this.logout = this.logout.bind();
  }
    logout = () => {
      firebase.auth().signOut().then((user) => {
          this.setState({
            user: null
          });
          window.location.href='/'
        })
    
      
  }
  componentDidMount() {
     
    const ref1 = firebase.firestore().collection('record').doc(firebase.auth().currentUser.uid);
    
    ref1.get().then((doc) => {
      if (doc.exists) {
        const record = doc.data();
        this.setState({
          record: doc.data(),
          key1: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    })
}
   
  rendercheck() {
      if(this.state.user == null) {
          return window.location.reload();
      }
      if(this.state.record.student == false)
    return (
      <div className="sidebar-fixed hidden position-fixed" id="push-menu">
          <div class="card-up blue lighten-2">
      </div>
      <div class="avatar">
              <img src={logo} style={{position:"absolute",marginLeft:"25px" ,marginTop: '70px'}}/>
              
  <h1 style={{fontSize: 35, fontWeight: 900, paddingTop: '200px', fontFamily: 'Brush Script MT, Brush Script Std, cursive	', color: 'white', textAlign: 'center'}}>Cashless </h1>
          
</div>
          <MDBListGroup className="list-group-flush " style={{marginTop: '55px'}}>
        
                  <MDBListGroupItem  href="/DashboardPage" hover>
                      <i class="fas fa-home fa-sm pr-2" area-hidden="true"/>
                      Dashboard
                  </MDBListGroupItem>
            
                  <MDBListGroupItem id="toggler3" hover style={{marginTop: '20px'}}>
                      <MDBIcon icon="table" className="mr-3" />
                      Records
                  </MDBListGroupItem>
              <Divider />
      <UncontrolledCollapse toggler="#toggler3" active >
        <MDBListGroupItem href="/StudentRecord" style={{backgroundColor: '#fef8f9'}}>
                      Student Record
                  </MDBListGroupItem>
            
                  
        <MDBListGroupItem href="/VendorRec" style={{backgroundColor: '#fef8f9'}}>
              Vendor Record
                  </MDBListGroupItem>
          
      </UncontrolledCollapse>
      <MDBListGroupItem id="toggler1" hover style={{marginTop: '20px'}}>
      <i class="fas fa-money-bill-wave fa-sm pr-2" area-hidden="true"></i>
                      Transactions
                  </MDBListGroupItem>
              <Divider />
      <UncontrolledCollapse toggler="#toggler1">
        <MDBListGroupItem href="/Transaction" style={{backgroundColor: '#fef8f9'}}>
                      Student Transaction
                  </MDBListGroupItem>
                  
        
        <MDBListGroupItem href="/Vendor" style={{backgroundColor: '#fef8f9'}}>
                      Vendor Transaction
                  </MDBListGroupItem>

      </UncontrolledCollapse>
      <MDBListGroupItem id="toggler2" hover style={{marginTop: '20px'}}>
      <i class="fas fa-clipboard-list	 fa-sm pr-2" area-hidden="true"/>
                      Registration
                  </MDBListGroupItem>
              <Divider />
      <UncontrolledCollapse toggler="#toggler2">

        <MDBListGroupItem href="/create" style={{backgroundColor: '#fef8f9'}}>
                      Student Registration
                  </MDBListGroupItem>
              
            
        <MDBListGroupItem href="/VendorReg" style={{backgroundColor: '#fef8f9'}}>
                      Vendor Registration
                  </MDBListGroupItem>
        
      </UncontrolledCollapse> 
                  <MDBListGroupItem href='/' onClick={this.logout} hover style={{marginTop: '20px'}}>
                  <i className="fas fa-sign-out-alt fa-sm pr-2" area-hidden="true" />
                    Logout
                  </MDBListGroupItem>
                  
          </MDBListGroup>
      </div>
    
  );
    
}
rendercheck2() { 
  if(this.state.record.student == true)
    {
  return (
      
        <main id="content" className="p-5">
      <MDBListGroupItem href='/' onClick={this.logout} hover style={{marginTop: '20px'}}>
                  <i className="fas fa-sign-out-alt fa-sm pr-2" area-hidden="true" />
                    Logout
                  </MDBListGroupItem>
        </main>

  
  );
    }
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

export default SideNavigation;