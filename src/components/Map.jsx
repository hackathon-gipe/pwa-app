import React, { useRef, useState } from 'react'
import { GoogleMap, useJsApiLoader, StandaloneSearchBox, Marker } from '@react-google-maps/api';

const API_KEY_MAPS = process.env.REACT_APP_MAPS_API_KEY

const Map = ({ setLocation }) => {
  const [marker, setMarker] = useState();
  const [center, setCenter] = useState({ lat: 40.41336720701619, lng: -3.704482360138317 });
  const locationRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY_MAPS,
    libraries: ['places']
  });

  const geocodeFromGoogleApi = (latLng) => {
    const latLngToString = `${latLng.lat()},${latLng.lng()}`;
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLngToString}&key=${API_KEY_MAPS}`)
      .then((responseText) => {
          return responseText.json();
      })
      .then(jsonData => {
          const components = jsonData.results[0].address_components;
          const findComponentsTypes = (type) => {
            const result = components.find((component) => component.types.includes(type)); 
            return result ? result.long_name : '';
          };
          const address = {
            street: `${findComponentsTypes('street_number')}, ${findComponentsTypes('route')}`,
            city: findComponentsTypes('locality'),
            state: findComponentsTypes('administrative_area_level_1'),
            zip: findComponentsTypes('postal_code')
          };
          setLocation(
            { 
               ...address, 
               latitude: latLng.lat(),
               longitude: latLng.lng()
             }
           )
           return;
      })
      .catch(error => {
          console.log(error);
    })
  };

  const onMapClick = (e) => {
    setMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    });
    return geocodeFromGoogleApi(e.latLng);
  };

  const [searchBox, setSearchBox] = useState(null);

  const onPlacesChanged = () => {
    const place = searchBox.getPlaces()[0];
    const { geometry: { location } } = place;
    setCenter({ lat: location.lat(), lng: location.lng() })
  };

  const onSBLoad = ref => {
    setSearchBox(ref);
  };



  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <GoogleMap
      id="searchbox-example"
      mapContainerStyle={{
        width: '100%',
        height: '400px'
      }}
      center={center}
      onClick={onMapClick}
      zoom={14}
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
          placeholder="Indica el sitio de tu propuesta..."
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
          }} />
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