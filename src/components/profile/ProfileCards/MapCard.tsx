import React, { useEffect, useRef } from 'react'
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { MapCard as MapCardType } from '../../common/interface'
import { ReactComponent as Pin } from '../../../assets/images/locationPin.svg'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import config from '../../common/config'

const containerStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  zIndex: 10,
  borderRadius: '14px'
}

const mapStyles = [
  {
    featureType: 'all',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'all',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'all',
    elementType: 'labels.text.fill',
    stylers: [
      {
        visibility: 'simplified'
      }
    ]
  },
  {
    featureType: 'all',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        visibility: 'on'
      },
      {
        color: '#333333'
      }
    ]
  },
  {
    featureType: 'all',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'simplified'
      }
    ]
  },
  {
    featureType: 'poi.attraction',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.attraction',
    elementType: 'labels.text.fill',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.attraction',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.business',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.business',
    elementType: 'labels.text.fill',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.business',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.government',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.government',
    elementType: 'labels.text.fill',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.government',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.medical',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.medical',
    elementType: 'labels.text.fill',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.medical',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.place_of_worship',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.place_of_worship',
    elementType: 'labels.text.fill',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.place_of_worship',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.school',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.sports_complex',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'labels.text.fill',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'road.local',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  }
  // Add the rest of the Snazzy Maps style JSON here
]

const blueCircleIcon = {
  path: 'M 0, 0 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0',
  fillColor: 'blue',
  fillOpacity: 1,
  strokeWeight: 0,
  scale: 1
}

const MapCard: React.FC<MapCardProps> = ({ map }) => {
  return (
    <>
      <div className="flex-1 h-full bg-gray-100 rounded-[14px] shadow-md">
        <div className="relative h-full">
          <LoadScript googleMapsApiKey={config.googlemap.key}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={{
                lat: map.cordinates.lat,
                lng: map.cordinates.lng
              }}
              zoom={11}
              options={{
                styles: mapStyles,
                mapTypeControl: false, // Disable map type control
                streetViewControl: false, // Disable street view control
                fullscreenControl: false,
                zoomControl: false
              }}
            >
              <Marker
                position={{
                  lat: map.cordinates.lat,
                  lng: map.cordinates.lng
                }}
                icon={blueCircleIcon}
                zIndex={40}
              />
            </GoogleMap>
          </LoadScript>
          <div className="absolute flex rounded-full w-auto max-w-[70%] mb-2 ml-2 pr-2 left-0 bottom-0 bg-white h-7 z-30">
            <div className="flex flex-row items-center h-full w-full">
              <Pin className="flex ml-1 w-4 h-4" />
              <div
                className="flex ml-1 w-full text-xs font-semibold text-black text-wrap overflow-hidden overflow-ellipsis line-clamp-1"
                title={map.location}
              >
                {map.location}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

interface MapCardProps {
  map: MapCardType
}

export default MapCard
