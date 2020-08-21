import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    withRouter
  } from "react-router-dom";  
import Edit from '../Pages/Edit';
import VendorReg from '../Pages/VendorReg';
import Transaction from '../Pages/Transaction';
import SpecificTransaction from '../Pages/SpecificTransaction';
import create from '../Pages/create';
import Show from '../Pages/Show';
import Topup from '../Pages/Topup';
import Vendor from '../Pages/Vendor';
import Payment from '../Pages/Payment';
import pay from '../Pages/pay';
//import { Provider } from 'react-redux'
import StudentRecord from '../Pages/StudentRecord';
import DashboardPage from '../Pages/DashboardPage';
import VendorRecord from '../Pages/VendorRec';
import TopNavigation from './topNavigation'
import SideNavigation from './sideNavigation'
import Loan from '../Pages/Laon'
class Routes extends React.Component {
  /* constructor(props) {
     super(props);
     this.state = {
     //  user: null,
       //animating: true
     };
   }
 /*componentDidMount() {
     firebase.auth().onAuthStateChanged(user => {
        if(user) {this.setState({user})};
        this.closeActivityIndicator();
     });
 }
 closeActivityIndicator(){
     setTimeout(() => {
         this.setState({animating: false});
     }, 1500)
 }{this.state.animating ?
                     <ActivityIndicator size='large' animating={this.state.animating} />
                     : this.state.user ?
 */
   
   render() {
     return (
       <Router>
        < div className="flexible-content">
           <TopNavigation />
           <SideNavigation />
           <div id="content" className="p-5">
           <Switch>
              <Route exact path='/DashboardPage' component={DashboardPage} />
              <Route path='/StudentRecord' component={StudentRecord}/>
              <Route path='/VendorReg' component={VendorReg}/>
              <Route path='/VendorRec' component={VendorRecord}/>
              <Route path='/Edit/:id' component={Edit} />
             <Route path='/SpecificTransaction/:id' component={SpecificTransaction}/>
             <Route path='/create' component={create} />
             <Route path='/Show/:id' component={Show} />
             <Route path='/Transaction' component={Transaction} />
             <Route path='/Laon/:id' component={Loan} />
             <Route path='/Topup/:id' component={Topup} />
             <Route path='/Vendor' component={Vendor} />
             <Route path='/Payment' component={Payment} />
             <Route path='/pay/:id' component={pay} />
            </Switch>
          </div>
          </ div>
       </Router>
     );
   }
 }
 export default Routes;