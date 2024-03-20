import React, { useState } from 'react'
import { Autocomplete, useLoadScript } from '@react-google-maps/api'

const CityAutocomplete: React.FC = () => {
  const [city, setCity] = useState<string | null>(null)
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null)

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
    libraries: ['places']
  })

  const handleCitySelect = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace()
      if (place && place.formatted_address) {
        console.log('Selected city:', place.formatted_address)
        setCity(place.formatted_address)
      }
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value)
  }

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <div className="relative">
      <label
        htmlFor="city-input"
        className="block text-sm font-medium text-gray-700"
      >
        Enter city:
      </label>
      <div className="mt-1">
        <Autocomplete
          onLoad={(instance) => setAutocomplete(instance)}
          onPlaceChanged={handleCitySelect}
          options={{
            types: ['(cities)']
          }}
        >
          <input
            type="text"
            id="city-input"
            className="block w-full px-4 py-2 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter a city"
            value={city || ''}
            onChange={handleInputChange}
          />
        </Autocomplete>
      </div>
    </div>
  )
}

export default CityAutocomplete
