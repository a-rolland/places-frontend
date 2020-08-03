import React, { Component } from 'react'
import axios from 'axios'
import Map from './Map'

class PlacesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            places: [],
        }
    }

    componentDidMount() {
        this.getPlaces()
    }

    getPlaces = () => {
        axios.get("http://localhost:5000/api/places")
        .then(response => {
            console.log(response)
            this.setState(state => ({
                ...state,
                places: response.data
            }))
        })
        .catch(err => console.log("Error: ", err))
    }
    
    render() {

        const listPlaces = this.state.places.map(place => {
            return (
                <li className="list-group-item" key={place.name}>
                    <div className="row">
                        <div className="m-3">
                            <Map place={place} /> 
                        </div>
                        <div className="m-3">
                            <h2>{place.name}</h2>
                            <p>{place.description}</p>
                        </div>
                    </div>                    
                </li>
            )
        })

        return (
            <div className="list-group">
                {listPlaces}
            </div>
        )
    }
}

export default PlacesList
