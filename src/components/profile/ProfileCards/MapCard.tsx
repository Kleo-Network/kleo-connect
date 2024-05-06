import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { MapCard as MapCardType } from '../../common/interface'
import markerIconUrl from '../../../assets/images/marker-icon.png'
import { icon } from 'leaflet'

// Define the custom marker icon
const customIcon = icon({
  iconUrl: markerIconUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28]
})

interface MapCardProps {
  map: MapCardType
}
const MapCard: React.FC<MapCardProps> = ({ map }) => {
  return (
    <div className="flex-1 bg-gray-100 p-1 rounded-lg shadow-md relative">
      <MapContainer
        style={{ zIndex: 1 }}
        className="h-60"
        center={[map.cordinates.lat, map.cordinates.lng]}
        zoom={9}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={[map.cordinates.lat, map.cordinates.lng]}
          icon={customIcon}
        >
          <Popup>{map.location}</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default MapCard
