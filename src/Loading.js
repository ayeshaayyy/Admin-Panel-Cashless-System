import React from "react";
import { Text,  ActivityIndicator } from "react-native";
import firebase from './firebase';
import Login from './Login';
import App from './App';
import Routes from './Components/Routes'
import { Route } from 'react-router-dom';
import { Spinner } from 'react-spinners-css';

export default class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          user: null,
          animating: true
        };
      }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
           if(user) {this.setState({user})};
           this.closeActivityIndicator();
        });
    }
    closeActivityIndicator(){
        setTimeout(() => {
            this.setState({animating: false});
    }, 1500)
    }

    render() {   
        return (
            <div>
                {this.state.animating ?
                           <Spinner color="#E9446A" size={200} animating={this.state.animating} style={{marginTop: '370px', marginLeft: '810px'}}/>
                    : this.state.user ?
                    <Routes/>
                  :
                  <Login/>}
             
  </div>
      
        );
    }
}
const style ={
     
}