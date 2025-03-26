'use client';

import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from "@/components/properties-table";
import { FeatureCollection, Polygon } from 'geojson';

interface MapComponentProps {
  properties: Property[];
  selected: Property | null;
}

// GeoJSON data for three sample regions
const geojsonData: FeatureCollection<Polygon>[] = [
  {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "Region 1" },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [74.033203125, 24.8465653482197],
              [75.033203125, 24.8465653482197],
              [75.033203125, 25.8465653482197],
              [74.033203125, 25.8465653482197],
              [74.033203125, 24.8465653482197]
            ]
          ]
        }
      }
    ]
  },
  {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "Region 2" },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [76.033203125, 22.8465653482197],
              [77.033203125, 22.8465653482197],
              [77.033203125, 23.8465653482197],
              [76.033203125, 23.8465653482197],
              [76.033203125, 22.8465653482197]
            ]
          ]
        }
      }
    ]
  },
  {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "Region 3" },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [78.033203125, 20.8465653482197],
              [79.033203125, 20.8465653482197],
              [79.033203125, 21.8465653482197],
              [78.033203125, 21.8465653482197],
              [78.033203125, 20.8465653482197]
            ]
          ]
        }
      }
    ]
  }
];

export function MapComponent1({ properties, selected }: MapComponentProps) {
  const position: [number, number] = [23.4733, 77.947998]; // Central position
  const zoomLevel = 6;

  // Style for the highlighted regions
  const geojsonStyle = {
    color: "#3388ff",
    weight: 2,
    opacity: 0.7,
    fillColor: "#3388ff",
    fillOpacity: 0.1
  };

  return (
    <MapContainer
      center={position}
      zoom={zoomLevel}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* Add GeoJSON overlays for multiple regions */}
      {geojsonData.map((geojson, index) => (
        <GeoJSON
          key={index}
          data={geojson}
          style={geojsonStyle}
          onEachFeature={(feature, layer) => {
            layer.bindPopup(feature.properties?.name || "Unnamed Region");
          }}
        />
      ))}
      
      {/* Add Property Markers */}
      {properties.map((property) => {
        const coordinates = propertyToCoordinates(property);

        if (!coordinates) return null;

        return (
          <Marker key={property.id} position={coordinates as [number, number]}>
            <Popup>{property.name}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

// Helper function for property coordinates
function propertyToCoordinates(property: Property): [number, number] | null {
  if (property.latitude && property.longitude) {
    return [property.latitude, property.longitude];
  }
  return null;
}