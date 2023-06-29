import L from "leaflet";
import { useEffect } from "react";
import countiesData from "../data/us-counties.json";
import statesData from "../data/us-states.json";
import "./TileLayer.css";

const TileLayer = ({ map, layer }) => {
  useEffect(() => {
    if (map && layer) {
      const geoJsonData = layer === "states" ? statesData : countiesData;
      const geoJsonLayer = L.geoJson(geoJsonData, {
        style: getFeatureStyle,
        onEachFeature: (feature, layer) => {
          // Add any interactive behavior or popups if needed
        },
      });

      geoJsonLayer.addTo(map);

      return () => {
        map.removeLayer(geoJsonLayer);
      };
    }
  }, [map, layer]);

  return null;
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

export default TileLayer;
