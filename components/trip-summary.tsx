import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Calendar, DollarSign } from 'lucide-react'
import type { TripSummary } from "@/types/travel"

interface TripSummaryCardProps {
  summary: TripSummary
}

export function TripSummaryCard({ summary }: TripSummaryCardProps) {
  const handleExport = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(summary, null, 2)
    )}`
    const link = document.createElement("a")
    link.href = jsonString
    link.download = "trip-itinerary.json"
    link.click()
  }

  return (
    <Card className="border-white/10 bg-gray-900">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Trip Summary - {summary.destination}</span>
          <Button variant="outline" size="icon" onClick={handleExport}>
            <Download className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>
              {summary.dates.startDate?.toLocaleDateString()} -{" "}
              {summary.dates.endDate?.toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span>
              Budget: {summary.budget.currency} {summary.budget.min} -{" "}
              {summary.budget.max}
            </span>
          </div>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">Highlights</h4>
          <ul className="list-inside list-disc space-y-1 text-gray-400">
            {summary.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">Daily Itinerary</h4>
          <div className="space-y-4">
            {summary.itinerary.map((day) => (
              <div key={day.day} className="rounded-lg bg-gray-800 p-4">
                <h5 className="mb-2 font-medium">Day {day.day}</h5>
                <ul className="list-inside list-disc space-y-1 text-gray-400">
                  {day.activities.map((activity, index) => (
                    <li key={index}>{activity}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <h4 className="mb-2 font-semibold">Accommodation</h4>
            <ul className="list-inside list-disc space-y-1 text-gray-400">
              {summary.recommendations.accommodation.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">Restaurants</h4>
            <ul className="list-inside list-disc space-y-1 text-gray-400">
              {summary.recommendations.restaurants.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">Activities</h4>
            <ul className="list-inside list-disc space-y-1 text-gray-400">
              {summary.recommendations.activities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

