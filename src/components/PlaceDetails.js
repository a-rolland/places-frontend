import React, { Component } from 'react'
import Map from './Map'

export class PlaceDetails extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const place = this.props.location.state
        console.log(place)
        return (
            <div className="text-center">
                <h2>{place.name}</h2>
                <img className="m-3" style={{height:"300px",width:"auto"}} src={place.imageUrl} alt={place.name}/>
                <p>{place.description}</p>
                <Map place={place} blockMap="true" detailsStyle={{height:"400px",width:"100%"}} /> 
            </div>
        )
    }
}

export default PlaceDetails
