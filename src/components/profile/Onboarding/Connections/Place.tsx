import React, { useState } from 'react'
import { Autocomplete, useLoadScript } from '@react-google-maps/api'
import config from '../../../common/config'

const libraries = ['places']

const CityAutocomplete: React.FC = () => {
  const [city, setCity] = useState('')
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null)
  const [coordinates, setCoordinates] = useState({})
  const apiKey = config.googlemap.key

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          city
        )}&key=YOUR_API_KEY&libraries=${libraries.join(',')}`
      )
      const data = await response.json()
      console.log(data)
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location
        setCoordinates({ lat, lng })
      } else {
        console.error('No results found for the given city')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: config.googlemap.key,
    libraries: ['places']
  })

  const handleCitySelect = async () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace()
      if (place && place.formatted_address) {
        console.log('Selected city:', place.formatted_address)
        setCity(place.formatted_address)

        try {
          console.log('city', city)
          console.log(apiKey)
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              place.formatted_address
            )}&key=${apiKey}&libraries=${libraries.join(',')}`
          )
          const data = await response.json()
          console.log(data)
          if (data.results.length > 0) {
            console.log('data results', data.results)
            const { lat, lng } = data.results[0].geometry.location
            setCoordinates({ lat, lng })
          } else {
            console.error('No results found for the given city')
          }
        } catch (error) {
          console.error('Error fetching data:', error)
        }
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
