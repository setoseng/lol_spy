import React, { Component } from 'react';
import axios from 'axios';

class NameofClass extends Component {
  constructor(props){
    super(props);

    this.state = {
     test:"",
   };
  }
  componentDidMount(){

    console.log("test");
    axios.get('http://localhost:4000/getsomething/?'+)
    .then(function(res){
      console.log(res.data);
    });
  }

  render(){

    return(
      <h1>tsesaasdf</h1>
    );
  }
}
export default NameofClass;
