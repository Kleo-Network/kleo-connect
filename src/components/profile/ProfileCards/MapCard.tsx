import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { MapCard as MapCardType } from '../../common/interface'
import markerIconUrl from '../../../assets/images/marker-icon.png'
import { ReactComponent as Pin } from '../../../assets/images/locationPin.svg'
import { icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

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
  const mapLocation =
    map.location.length > 20 ? map.location.slice(0, 20) + '...' : map.location

  return (
    <div className="flex-1 h-full bg-gray-100 rounded-[5px] shadow-md">
      <div className="relative h-full w-full">
        <MapContainer
          className="absolute z-10 h-full w-full rounded-[5px]"
          center={[map.cordinates.lat, map.cordinates.lng]}
          zoom={9}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker
            position={[map.cordinates.lat, map.cordinates.lng]}
            icon={customIcon}
          >
            <Popup>{map.location}</Popup>
          </Marker>
        </MapContainer>
        <div className="absolute flex rounded-full w-auto max-w-[70%] mb-2 ml-2 pr-2 left-0 bottom-0 bg-white h-7 z-30">
          <div className="flex flex-row items-center h-full w-full">
            <Pin className="flex ml-1 w-4 h-4" />
            <div
              className="flex ml-1 w-full text-xs font-semibold text-black text-wrap overflow-hidden overflow-ellipsis line-clamp-1"
              title={map.location}
            >
              {mapLocation}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapCard
