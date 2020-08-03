import React, { Component } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import Map from "./Map";
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: "",
      search: "",
      candidates: [],
    };
  }
  handleChange = (e) => {
    this.setState({ search: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("buscando los places");
    axios
      .get("http://localhost:5000/api/address?search=" + this.state.search)
      .then((resp) => {
        console.log("respuesta: ", resp.data);
        this.setState({
          candidates: resp.data.candidates,
        });
        axios.get(`http://localhost:5000/api/places/search?miles=1000000&lat=40&lng=2`)
        .then(response => {
          console.log("Places near : ",response.data)
          this.setState(state => ({
            ...state,
            newName: this.state.search
          }))
        })
        .catch(err => console.log(err))
      });
  };
  selectPlace = (position) => {
    console.log("SearchLocation.selectPlace results: ", position);
    // call props function to send info for container component
    // and send position...
    this.props.callback(position);
  };
  render() {
    const candidates = this.state.candidates.map((local) => (
      <div key={local.place_id}>
        <h5>
          <span onClick={() => this.selectPlace(local.geometry.location)}>
            {local.name}
          </span>
        </h5>
      </div>
    ));
    let header = "";
    if (candidates.length > 0) {
      header = <h3>Results (select one)</h3>;
    }

    // const placeToLocate = {
    //     name: this.state.search,
    //     loc:{
    //       coordinates: [
    //         this.state.candidates[0].geometry.location.lat,
    //         this.state.candidates[0].geometry.location.lng
    //       ]
    //     }
    // }

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="search-place">
            <Form.Label>Search your fav places:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city name..."
              value={this.state.search}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Form>
        {candidates}
        { this.state.candidates.length>0 && 
          <Map 
            key={this.state.newName}
            place={{
              name: this.state.search,
              loc:{
                coordinates: [
                  this.state.candidates[0].geometry.location.lat,
                  this.state.candidates[0].geometry.location.lng
                ]
              }
          }}
            blockMap="true"
            detailsStyle={{height:"400px",width:"100%"}} 
          />
        }
      </div>
    );
  }
}
