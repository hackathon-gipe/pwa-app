import React, { useRef, useState } from 'react'
import { GoogleMap, useJsApiLoader, StandaloneSearchBox, Marker } from '@react-google-maps/api';

// const API_KEY_MAPS = process.env.REACT_APP_MAPS_API_KEY


const Map = () => { 
    const [marker, setMarker] = useState();
    const [center, setCenter] = useState({lat: -3.745, lng: -38.523});
    const locationRef = useRef(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyCNPcQA1Fmmi_JZpUP3ACLyFO4o7TdPYBM",
        libraries: ['places']
    });

    const onMapClick = (e) => {
        setMarker({
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
          }
        );
    };

    const [searchBox, setSearchBox] = useState(null);

  const onPlacesChanged = () => {
    const place = searchBox.getPlaces()[0];
    const { geometry: { location } } = place;
    setCenter({lat:location.lat(),lng:location.lng()})
    } ;

  const onSBLoad = ref => {
    setSearchBox(ref);
  };

  

    if(!isLoaded) { 
        return <div>Loading...</div> 
    }
  
  return (
      <GoogleMap
        id="searchbox-example"
        mapContainerStyle={{
            width: '400px',
            height: '400px'
        }}
        center={center}
        onClick={onMapClick}
        zoom={10}
        options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false
        }}
        >
         <StandaloneSearchBox
            onPlacesChanged={onPlacesChanged}
            onLoad={onSBLoad}
         >
            <input
                type="text"
                ref={locationRef}
                placeholder="Customized your placeholder"
                style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                    position: "absolute",
                    left: "50%",
                    marginLeft: "-120px"
                }}/>
        </StandaloneSearchBox>
        {marker && <Marker 
          position={{ 
            lat: marker.lat,
            lng: marker.lng 
          }} />}
      </GoogleMap>
  )
}

export default React.memo(Map)