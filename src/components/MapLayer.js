import "./MapLayer.css";

import { MapContainer, GeoJSON, TileLayer } from "react-leaflet";
import statesData from "./USAStates.js";

const MapLayer = () => {

  const color = ["red", "green", "blue", "orange"]
  const stateStyle = {
    fillColor: "red",
    fillOpacity: 1,
    color: "black",
    weight: 2,
  };

  const featureHandler = (state, layer) => {
    const stateName = state.properties.name;
    
    layer.bindPopup(stateName + "\n Some Analytics");

    layer.options.fillColor = color[Math.ceil(Math.random() * 4)]

    layer.on({
      click: (event) =>{
        
      }
    })
  };

  return (
    <MapContainer center={[37.8, -96]} zoom={4} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        style={{ stateStyle }}
        data={statesData.features}
        onEachFeature={featureHandler}
      />
    </MapContainer>
  );
};

export default MapLayer;
