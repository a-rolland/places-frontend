import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

export class Map extends Component {
    constructor(props) {
        super(props)
        this.state={
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
                { this.state.showMap ?
                    <div className="mapa" style={{height:"200px",width:"300px"}}>
                        <GoogleMapReact 
                            key={this.state.place.name}
                            bootstrapURLKeys={ { key: 'AIzaSyC5R2OYlhvGRMmpofdkJ0jL60Tsa7dtZUY'} }
                            defaultCenter={center}
                            defaultZoom={zoom}
                            options={getMapOptions}
                            yesIWantToUseGoogleMapApiInternals
                            onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
                        />
                    </div> :
                    <img alt="place" style={{width:"300px"}} src={this.state.place.imageUrl} />
                }
                <div className="btn btn-primary" onClick={this.toggleMap}>
                    { this.state.showMap ? "Back" :
                    "Check on map"
                    }
                </div>   
            </div>    
        )
    }
}

export default Map