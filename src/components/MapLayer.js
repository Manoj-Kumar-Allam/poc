import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import "./MapLayer.css";
import TileLayer from "./TileLayer";
import Sidebar from "./Sidebar";

const MapLayer = () => {
  const [map, setMap] = useState(null);

  const [selectedLayer, setSelectedLayer] = useState(null);

  const handleLayerChange = (event) => {
    console.log(event.target.value);
    setSelectedLayer(event.target.value);
  };

  useEffect(() => {
    const baseMap = L.map("map", {
      zoomControl: false,
    })
      .setView([37.8, -96], 4)
      .setMinZoom(2);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 13,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(baseMap);

    L.control.zoom({ position: "topright" }).addTo(baseMap);

    setMap(baseMap);

    return () => {
      baseMap.remove();
    };
  }, []);

  return (
    <>
      <div id="map"></div>
      <Sidebar handleLayerChange={handleLayerChange} />
      {selectedLayer && <TileLayer map={map} layer={selectedLayer} />}
    </>
  );
};

export default MapLayer;
