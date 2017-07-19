import React,{ Component } from 'react';
import axios from 'axios';

class Search extends Component {
  constructor(props){
    super(props);

    this.state= { searchTerm : "Doublelift" };
  }

  // componentDidMount(){
  //   axios.get(`http://localhost:4000/getplayer?playerid=${this.state.searchTerm}`)
  //   .then(function(res){
  //     console.log(res.data);
  //   });
  // }

  handleSubmit(event){
    //console.log(this.state.searchTerm);
    axios.get(`http://localhost:4000/getplayer?playerid=${this.state.searchTerm}`)
    .then(function(res){
      console.log(res.data);
    });
    event.preventDefault();
  }

  render(){
    return(
      <div>
        <form onSubmit={event => this.handleSubmit(event)}>
          <input
            value={this.state.searchTerm}
            onChange={event => this.setState ({searchTerm: event.target.value})} />
          <button type="submit" label="Search">Search</button>
        </form>
      </div>
    )
  }
}



export default Search
