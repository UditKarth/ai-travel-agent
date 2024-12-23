export interface TravelPreferences {
  accommodationType: 'luxury' | 'mid-range' | 'budget'
  travelStyle: 'adventure' | 'relaxation' | 'culture' | 'food' | 'nature'
  transportationType: 'flight' | 'train' | 'car' | 'mixed'
}

export interface DateRange {
  startDate: Date | null
  endDate: Date | null
}

export interface Budget {
  min: number
  max: number
  currency: string
}

export interface TripSummary {
  destination: string
  dates: DateRange
  budget: Budget
  highlights: string[]
  itinerary: {
    day: number
    activities: string[]
  }[]
  recommendations: {
    accommodation: string[]
    restaurants: string[]
    activities: string[]
  }
}

