import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

interface MapCardProps {
  location: string
  lat: number
  lng: number
}

const MapCard: React.FC<MapCardProps> = ({ location, lat, lng }) => {
  return (
    <div className="flex-1 bg-gray-100 p-1 rounded-lg shadow-md relative">
      <MapContainer
        className="h-60"
        center={[lat, lng]}
        zoom={9}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[lat, lng]}>
          <Popup>{location}</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default MapCard
