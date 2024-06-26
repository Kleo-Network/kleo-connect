import React, { useState, useEffect } from 'react'
import { Autocomplete, useLoadScript } from '@react-google-maps/api'
import config from '../../../common/config'
import useFetch from '../../../common/hooks/useFetch'

import {
  MapCard,
  StaticCard as StaticCardType
} from '../../../common/interface'

interface PlaceProps {
  cards?: StaticCardType[]
  city: string
  setCity: (value: string) => void
  cordinates: { lat: number; lng: number } | undefined
  setCordinates: (value: { lat: number; lng: number } | undefined) => void
}

const libraries = ['places']

const CityAutocomplete: React.FC<PlaceProps> = ({
  cards,
  city,
  setCity,
  cordinates,
  setCordinates
}) => {
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null)
  const apiKey = config.googlemap.key
  const { fetchData: CreatePlaceCard } = useFetch<any>()
  const CREATE_PLACE_CARD = 'cards/static/{slug}'
  const slug = localStorage.getItem('slug') || ''

  useEffect(() => {
    const getCardinCards = (cardType: string) => {
      if (cards?.find((card) => card.cardType == cardType)) {
        const card = cards?.find((card) => card.cardType == cardType)
        if (card) setCity((card.metadata as MapCard).location)
        return true
      }
      return false
    }
    getCardinCards('XCard')
  }, [])

  function makeUrl(): string {
    return CREATE_PLACE_CARD.replace('{slug}', slug)
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: config.googlemap.key,
    libraries: ['places']
  })

  const handleCitySelect = async () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace()
      console.log('fa', place)
      if (place && place.formatted_address) {
        console.log('Selected city:', place.formatted_address)
        setCity(place.formatted_address)

        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              place.formatted_address
            )}&key=${apiKey}&libraries=${libraries.join(',')}`
          )
          const data = await response.json()
          console.log(data)
          if (data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location
            setCordinates({ lat: lat, lng: lng })
          } else {
            setCordinates(undefined)
            console.error('No results found for the given city')
          }
        } catch (error) {
          setCordinates(undefined)
          console.error('Error fetching data:', error)
        }
      }
    }
  }

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex">
      <div className="w-1/2 pt-2 pl-1 pr-3">
        <div className="flex flex-col items-start justify-center">
          <div className="flex mb-20 flex-col items-start justify-center">
            <span className="text-gray-900 text-base font-sm">
              Location Card
            </span>
            <span className="text-gray-400 text-sm font-regular">
              Love a city, want to share where you are from, or{' '}
              <u className="text-gray-800 bold">a location you call home </u>
              this is your place to flaunt! just talk to us!
            </span>
          </div>
        </div>
      </div>
      <div className="w-1/2 pt-2 pl-1 pr-3">
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
              onChange={(e) => setCity(e.target.value)}
            />
          </Autocomplete>
        </div>
      </div>
    </div>
  )
}

export default CityAutocomplete
