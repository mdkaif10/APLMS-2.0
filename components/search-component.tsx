'use client'

import React, { useState } from 'react'
import SearchForm from './search-form'
import { LatLng, MapAddressType, MapParams } from '@/types'
import { findNearbyLocations } from '@/actions/actions'
import { ParkingLocation } from '@/schemas/parking-locations'
import Map from './map'
import SearchResult from './search-result'

export type SearchParams = {
  address: string,
  gpscoords: LatLng,
  arrivingon: Date,
  arrivingtime: Date,
  leavingtime: Date
}

function SearchComponent() {
  const [search, setSearch] = useState<MapParams[]>([])
  const [searchRadius, setSearchRadius] = useState(500)
  const [message, setMessage] = useState("Enter an address, date, time and click search")
  const [searchParams, setSearchParams] = useState<SearchParams | undefined>()

  const handleSearchDone = async (params: SearchParams) => {
    console.log(params)

    setMessage("Searching...")
    setSearch([])
    const searchResult = await findNearbyLocations(searchRadius, params as SearchParams)

    const mapParams: MapParams[] = searchResult.map((loc: ParkingLocation) => ({
      address: loc.address,
      gpscoords: loc.gpscoords,
      price: loc.price,
      numberofspots: loc.numberofspots,
      bookedspots: loc.bookedspots,
      status: loc.status,
      type: MapAddressType.PARKINGLOCATION,
      id: loc._id
    }))

    if (mapParams.length > 0) {
      mapParams.unshift({
        address: params.address as string,
        gpscoords: params.gpscoords as LatLng,
        type: MapAddressType.DESTINATION,
        radius: searchRadius,
        id: ""
      })

      setSearch([...mapParams])
      setSearchParams(params)
    } else {
      setMessage("No nearby parking locations found.")
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <SearchForm onSearch={handleSearchDone} />
      </div>
      {search.length > 0 ? (
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3 border-r border-gray-200 overflow-auto max-h-[600px]">
            <SearchResult locations={search} params={searchParams as SearchParams} />
          </div>
          <div className="lg:w-2/3 h-[600px]">
            <Map mapParams={JSON.stringify(search)} />
          </div>
        </div>
      ) : (
        <p className="text-center py-8 text-gray-500">{message}</p>
      )}
    </div>
  )
}

export default SearchComponent