// import React, { Component } from 'react'
// import axios from 'axios'
// import { Button, Form } from 'react-bootstrap';
// export default class Search extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             search: '',
//             candidates: []
//         }
//     }
//     handleChange = (e) => {
//         this.setState({ search: e.target.value })
//     }
//     handleSubmit = (e) => {
//         e.preventDefault()
//         console.log("buscando los places")
//         axios.get("http://localhost:5000/api/address?search=" + this.state.search)
//             .then(resp => {
//                 console.log("respuesta: ", resp.data)
//                 this.setState({
//                     candidates: resp.data.candidates
//                 })
//             })
//     }
//     selectPlace = (position) => {
//         console.log("SearchLocation.selectPlace results: ", position)
//         // call props function to send info for container component
//         // and send position...
//         this.props.callback(position)
//     }
//     render() {
//         const candidates = this.state.candidates.map(local => (
//             <div key={local.place_id}>
//                 <h5><span onClick={() => this.selectPlace(local.geometry.location)}>{local.name}</span></h5>
//             </div>
//         ))
//         let header = ""
//         if (candidates.length > 0) {
//             header = <h3>Results (select one)</h3>
//         }
//         return (
//             <div>
//                 <Form onSubmit={this.handleSubmit}>
//                     <Form.Group controlId="search-place">
//                         <Form.Label>Search your fav places:</Form.Label>
//                         <Form.Control type="text" placeholder="Enter city name..." value={this.state.search} onChange={this.handleChange} />
//                     </Form.Group>
//                     <Button variant="primary" type="submit">
//                         Search
//                     </Button>
//                 </Form>
//                 {candidates}
//             </div>
//         )
//     }
// }