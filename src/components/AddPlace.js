import React, { Component } from "react";
import axios from "axios";
// import { Redirect } from "react-router-dom";
export default class AddPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPlace: {
        name: "",
        description: "",
        imageUrl:
          "",
        loc: {
          type: 'Point',
          coordinates: [44.5330804, 2.3972939]
        }
      },
      archive: null  
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("imageUrl", this.state.archive);
    uploadData.append("name", this.state.newPlace.name);
    uploadData.append("description", this.state.newPlace.description);
    uploadData.append("type", this.state.newPlace.loc.type);
    uploadData.append("lat", this.state.newPlace.loc.coordinates[0]);
    uploadData.append("lng", this.state.newPlace.loc.coordinates[1]);
    axios.post("http://localhost:5000/api/places/upload", uploadData)
    .then((response) => {
      this.props.history.push("/list")
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState(state => ({
      ...state,
      newPlace: {
        ...state.newPlace,
        [name]: value
      }
    }));
  };

  handleFileUpload = (e) => {
    this.setState({ archive: e.target.files[0] });
  };

  render() {
    return (
      <div className="container-fluid card align-center" >
      <h1 className="text-center">Share your experience</h1>
        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
        <label>Title</label>
          <input className="form-control"
            type="text"
            name="name"
            value={this.state.newPlace.name}
            onChange={this.handleChange}
          />
        </div>
          <br />
          <div className="form-group">
          <label>Description</label>
          <input className="form-control"
            type="text"
            name="description"
            value={this.state.newPlace.description}
            onChange={this.handleChange}
          />
          </div>
          <div className="form-group">
          <label>Image</label>
          <input className="form-control"
            type="file"
            name="imageUrl"
            onChange={this.handleFileUpload}
          />
          </div>
          <input type="submit" className="btn btn-primary" value="Create Place" />
        </form>
      </div>
    );
  }
}