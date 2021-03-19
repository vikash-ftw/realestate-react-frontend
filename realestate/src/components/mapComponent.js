import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React, { Component } from "react";

const center = {
  lat: 21.1458,
  lng: 79.088158,
};

function DraggableMarker(props) {
  const [draggable, setDraggable] = useState(true);
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          console.log(marker.getLatLng());
          props.onSet(marker.getLatLng());
        }
      },
    }),
    []
  );

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "Click here to make marker draggable"}
        </span>
      </Popup>
    </Marker>
  );
}
// render(
//   <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
//     <TileLayer
//       attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//     />
//     <DraggableMarker />
//   </MapContainer>
// );

class MapComponent extends Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <>
        <MapContainer center={center} zoom={5} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <DraggableMarker onSet={ this.props.getCoord}/>
        </MapContainer>
        
      </>
    );
  }
}

export default MapComponent;
