import { MapAddressType, MapParams } from '@/types'
import React from 'react'
import { SearchParams } from './search-component'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { cn, formatAmountForDisplay, getStreetFromAddress } from '@/lib/utils'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

function SearchResult({
    locations,
    params
}: {
    locations: MapParams[],
    params: SearchParams
}) {
    return (
        <div className="divide-y divide-gray-200">
            {locations
                .filter(loc => loc.type === MapAddressType.PARKINGLOCATION)
                .map((loc, index) => (
                    <div key={loc.address} className="p-4 hover:bg-gray-50">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-sm">
                                {index + 1}
                            </div>
                            <h3 className="font-semibold">
                                {getStreetFromAddress(loc.address)}
                            </h3>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span>Hourly price:</span>
                                <span className="font-medium">{formatAmountForDisplay(loc.price?.hourly!, 'INR')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Spots available:</span>
                                <span className="font-medium">{loc.numberofspots! - loc.bookedspots!}</span>
                            </div>
                        </div>
                        {params && (loc.numberofspots! - loc.bookedspots!) > 0 && (
                            <Link
                                className={cn(
                                    buttonVariants({ variant: 'default' }),
                                    'w-full mt-4 bg-black text-white hover:bg-gray-800'
                                )}
                                href={`guest/book/${loc.id}?date=${params.arrivingon}&starttime=${params.arrivingtime}&endtime=${params.leavingtime}`}
                            >
                                Book Now
                            </Link>
                        )}
                    </div>
                ))}
        </div>
    )
}

export default SearchResult