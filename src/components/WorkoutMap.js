import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: process.env.PUBLIC_URL + '/navx2.png',
  iconUrl: process.env.PUBLIC_URL + '/nav.png',
  shadowSize: [0, 0]
});

function UpdateView({ currentLocation }) {
    const map = useMap();
    
    useEffect(() => {
        if (currentLocation) {
            map.flyTo(currentLocation, 15);
        }
    }, [currentLocation, map]);

    return null;
}

function WorkoutMap({ workouts, currentLocation }) {

    return (
        <MapContainer classname="workoutmap" center={currentLocation || [35, 139]}   zoom={5}  style={{ width: '100%', height: '400px'}}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {currentLocation ? <Marker position={currentLocation}><Popup>You are here</Popup></Marker> : null}
            {workouts.map(workout => 
                workout.coordinates.map(coord => (
                    <Marker key={coord.timestamp} position={[coord.lat, coord.lng]}>
                        <Popup>{coord.timestamp}</Popup>
                    </Marker>
                ))
            )}
            <UpdateView currentLocation={currentLocation} />
        </MapContainer>
    );
}

export default WorkoutMap;
