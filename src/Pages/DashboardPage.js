import React, { Component } from 'react';
import TopNavigation from '../Components/topNavigation';
import SideNavigation from '../Components/sideNavigation';
import BreadscrumSection from './BreadcrumSection';
import ChartSection1 from './ChartSection1';
import AdminCardSection2 from './AdminCardSection2';
import firebase from '../firebase';
import { Redirect } from 'react-router-dom';
import '../App.css';
import Title from "./Title";
class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
        check: false,
        record: []
    };
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
    const ref2 = firebase.firestore().collection('record').where("adminId", "==", firebase.auth().currentUser.uid);
      ref2.get().then((querySnapshot => {
        querySnapshot.forEach((doc) => {
        if (doc.exists) {
          this.setState({
            check: true
          })
        } else {
          this.setState({
            check: false
          })
        }
      });
    }))
  }
  rendercheck() { 
    
    if(this.state.record.student == false)
    { if(this.state.check == true)
    return (
        <div className="flexible-content">
          <TopNavigation />
          <SideNavigation />
          <main id="content" className="p-5">
            <BreadscrumSection />
            <AdminCardSection2 />
            <ChartSection1 />
          </main>

    
        </div>
    );
    }
}
rendercheck1() { 
    
  if(this.state.record.student == false)
  { if(this.state.check == false)
  return (
      <div className="flexible-content">
        <TopNavigation />
        <SideNavigation />
        <main id="content" className="p-5">
        <Title name="You don't have any data" title="availible right now" />
        </main>

  
      </div>
  );
  }
}
rendercheck2() { 
  if(this.state.record.student == true)
    {
  return (
      
        
          <Title name="You don't have permission" title="to access" />
        

  
  );
    }
}
render() {
console.log(firebase.auth().currentUser.uid)
  return (
   <div>
  {this.rendercheck()}
  {this.rendercheck1()}
  {this.rendercheck2()}
  
      </div>
  )
}   
}
export default DashboardPage;