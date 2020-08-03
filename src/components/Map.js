import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

export class Map extends Component {
    constructor(props) {
        super(props)
        this.state={
            name: this.props.place.name,
            lat: this.props.place.loc.coordinates[0],
            lng: this.props.place.loc.coordinates[1],
            place: this.props.place,
            showMap: false
        }
    }

    toggleMap = () => {
        this.setState(state => ({
            ...state,
            showMap: !this.state.showMap
        }))
    }

    render() {

        console.log("Render")

        const center = {
            lat: this.state.lat,
            lng: this.state.lng
        }

        const zoom = 14

        const getMapOptions = (maps) => {
            return {
                disableDefaultUI: false,
                mapTypeControl: true,
                streetViewControl: true,
                styles: [{ featureType: 'poi', 
                    elementType: 'labels', 
                    stylers: [{ visibility: 'on' }] }],
                }
        }

        const renderMarkers = (map, maps) => {

            const position = {
                lat: this.state.lat,
                lng: this.state.lng
            }

            let marker = new maps.Marker({
                position: position,
                map,
                title: this.state.place.name})
        }

        return (
            <div>
                { this.state.showMap || this.props.blockMap ?
                    <div className="mapa mx-auto" style={this.props.detailsStyle || {height:"200px",width:"300px"}}>
                        <GoogleMapReact 
                            key={this.state.name}
                            bootstrapURLKeys={ { key: 'AIzaSyC5R2OYlhvGRMmpofdkJ0jL60Tsa7dtZUY'} }
                            defaultCenter={center}
                            defaultZoom={zoom}
                            options={getMapOptions}
                            yesIWantToUseGoogleMapApiInternals
                            onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
                        />
                    </div> :
                    <div>
                        <img alt="place" style={{width:"300px"}} src={this.state.place.imageUrl} />
                    </div>
                }{ !this.props.blockMap && 
                    <div className="btn btn-primary mt-3 mb-3" onClick={this.toggleMap}>
                        { this.state.showMap ? "Back" :
                        "Check on map"
                        }
                    </div>   
                    }
            </div>    
        )
    }
}

export default Map