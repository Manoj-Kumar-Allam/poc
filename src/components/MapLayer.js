import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapLayer.css";
import statesData from "./USAStates.json";
import countiesData from "./USACounties.json";

const MapLayer = () => {
  const [selectedLayer, setSelectedLayer] = useState("counties");
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Clean-up function
    return () => {
      // Perform any necessary clean-up here
    };
  }, [selectedLayer]);

  const handleLayerChange = (event) => {
    setSelectedLayer(event.target.value);
    setKey((prevKey) => prevKey + 1); // Update the key to force re-render of GeoJSON component
  };

  const getColorStyle = () => {
    const colors = ["red", "green", "blue", "orange"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getFeatureStyle = () => {
    return {
      fillColor: getColorStyle(),
      fillOpacity: 1,
      color: "black",
      weight: 2,
    };
  };

  return (
    <div className="map-container">
      <div className="sidebar-overlay">
        <div className="sidebar">
          <div className="dropdown">
            <label htmlFor="layerSelect">Select Layer:</label>
            <select id="layerSelect" value={selectedLayer} onChange={handleLayerChange}>
              <option value="counties">US Counties</option>
              <option value="states">US States</option>
            </select>
          </div>
        </div>
      </div>
      <div className="map-wrapper">
        <MapContainer center={[37.8, -96]} zoom={4} className="map">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="OpenStreetMap" />
          <GeoJSON
            key={key} // Update key to force re-render of GeoJSON component
            style={getFeatureStyle}
            data={selectedLayer === "counties" ? countiesData.features : statesData.features}
            onEachFeature={(feature, layer) => {
              const stateName = feature.properties.NAME;
              layer.bindPopup(stateName + "\n Some Analytics");
            }}
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapLayer;
