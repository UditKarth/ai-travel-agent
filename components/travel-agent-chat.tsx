'use client'

import { useState, FormEvent } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, X } from 'lucide-react'
import { PreferencesDialog } from "./preferences-dialog"
import { DestinationCard } from "./destination-card"
import { TripSummaryCard } from "./trip-summary"
import type { TravelPreferences, DateRange, Budget, TripSummary } from "@/types/travel"
import { cn } from "@/lib/utils"

const FEATURED_DESTINATIONS = [
  {
    name: "Paris, France",
    image: "/paris.jpg",
    description: "The City of Light beckons with its iconic architecture, world-class cuisine, and timeless romance.",
    tags: ["Culture", "Food", "Architecture"],
    prompt: "I'd like to visit Paris, France. Please suggest a trip that includes visits to the Eiffel Tower, Louvre Museum, Notre-Dame Cathedral, and some authentic French restaurants. Also check flights from JFK to CDG for next month. Include recommendations for romantic evening activities and the best time to visit."
  },
  {
    name: "Kyoto, Japan",
    image: "/kyoto.jpg",
    description: "Ancient temples, traditional gardens, and centuries of culture create an unforgettable experience.",
    tags: ["Culture", "History", "Nature"],
    prompt: "I want to explore Kyoto, Japan. Please suggest an itinerary that includes major temples like Kinkaku-ji and Fushimi Inari, traditional tea ceremonies, and the best seasons to see cherry blossoms or autumn colors. Include recommendations for ryokan stays and local cuisine experiences."
  },
  {
    name: "Machu Picchu, Peru",
    image: "/machu%20picchu%20.jpg",
    description: "Discover the mysteries of the Incan Empire in this spectacular mountain-top citadel.",
    tags: ["Adventure", "History", "Nature"],
    prompt: "I'm interested in visiting Machu Picchu. Please suggest an itinerary that includes the best hiking routes, acclimatization tips, and the ideal time to visit. Include information about Cusco, the Sacred Valley, and how to best experience the Incan heritage."
  }
]

export function TravelAgentChat() {
  const [preferences, setPreferences] = useState<{
    travel: TravelPreferences
    dates: DateRange
    budget: Budget
  } | null>(null)
  const [tripSummary, setTripSummary] = useState<TripSummary | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: "Hello! I'm your AI travel agent. To get started, you can either tell me about your dream destination or set your travel preferences using the button above. Where would you like to go?"
      }
    ],
    api: '/api/chat',
    onResponse: async (response) => {
      console.log('Response from API:', response);
    },
    onFinish: (message) => {
      console.log('Finished message:', message);
      if (message.content.includes("TRIP_SUMMARY:")) {
        try {
          const summaryJson = message.content.split("TRIP_SUMMARY:")[1]
          const summary = JSON.parse(summaryJson)
          setTripSummary(summary)
        } catch (error) {
          console.error("Failed to parse trip summary:", error)
        }
      }
    }
  })

  const handlePreferencesSubmit = (newPreferences: typeof preferences) => {
    setPreferences(newPreferences)
    const preferencesMessage = `
      I'd like to travel with the following preferences:
      - Dates: ${newPreferences?.dates.startDate?.toLocaleDateString()} to ${newPreferences?.dates.endDate?.toLocaleDateString()}
      - Budget: ${newPreferences?.budget.currency} ${newPreferences?.budget.min}-${newPreferences?.budget.max}
      - Accommodation: ${newPreferences?.travel.accommodationType}
      - Travel Style: ${newPreferences?.travel.travelStyle}
      - Transportation: ${newPreferences?.travel.transportationType}
    `
    handleSubmit({ preventDefault: () => {} } as FormEvent<HTMLFormElement>, { data: preferencesMessage })
  }

  const handleDestinationSelect = (destination: string) => {
    const selectedDestination = FEATURED_DESTINATIONS.find(dest => dest.name === destination);
    if (selectedDestination) {
      setIsExpanded(true);
      setTimeout(() => {
        handleSubmit({ preventDefault: () => {} } as FormEvent<HTMLFormElement>, {
          data: selectedDestination.prompt
        });
      }, 100);
    }
  }

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isExpanded) {
      setIsExpanded(true)
    }
    handleSubmit(e)
  }

  return (
    <div className="space-y-6">
      <div className={cn(
        "fixed inset-0 z-50 bg-black transition-transform duration-300 ease-in-out",
        isExpanded ? "translate-y-0" : "translate-y-full pointer-events-none"
      )}>
        <div className="h-full flex flex-col p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">AI Travel Agent</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(false)}
              className="text-white hover:bg-gray-800"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <Card className="flex-1 border-white/10 bg-gray-900">
            <div className="flex flex-col h-full">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`rounded-lg px-4 py-2 max-w-[80%] ${
                          message.role === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-800 text-white"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="rounded-lg px-4 py-2 bg-gray-800 text-white">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              <form
                onSubmit={handleMessageSubmit}
                className="border-t border-white/10 p-4 flex gap-4"
              >
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Tell me about your travel plans..."
                  className="bg-gray-800 border-white/10 text-white placeholder:text-gray-400"
                />
                <Button type="submit" disabled={isLoading}>
                  Send
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex justify-between">
        <PreferencesDialog onPreferencesSubmit={handlePreferencesSubmit} />
        {preferences && (
          <Button
            variant="outline"
            className="bg-gray-800 border-white/10 text-white hover:bg-gray-700"
            onClick={() => setPreferences(null)}
          >
            Clear Preferences
          </Button>
        )}
      </div>

      {!preferences && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Featured Destinations</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {FEATURED_DESTINATIONS.map((destination) => (
              <DestinationCard
                key={destination.name}
                {...destination}
                onClick={() => handleDestinationSelect(destination.name)}
              />
            ))}
          </div>
        </div>
      )}

      <Card className="border-white/10 bg-gray-900">
        <div className="flex flex-col h-[600px]">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800 text-white"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-lg px-4 py-2 bg-gray-800 text-white">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <form
            onSubmit={handleMessageSubmit}
            className="border-t border-white/10 p-4 flex gap-4"
          >
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Tell me about your travel plans..."
              className="bg-gray-800 border-white/10 text-white placeholder:text-gray-400"
            />
            <Button type="submit" disabled={isLoading}>
              Send
            </Button>
          </form>
        </div>
      </Card>

      {tripSummary && (
        <TripSummaryCard summary={tripSummary} />
      )}
    </div>
  )
}

