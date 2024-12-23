'use client'

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Slider } from "@/components/ui/slider"
import { Check, Plane, Train, Car, Hotel, Utensils, Mountain, Book, TreesIcon as Tree } from 'lucide-react'
import type { TravelPreferences, DateRange, Budget } from "@/types/travel"


interface PreferencesDialogProps {
  onPreferencesSubmit: (preferences: {
    travel: TravelPreferences
    dates: DateRange
    budget: Budget
  }) => void
}

export function PreferencesDialog({ onPreferencesSubmit }: PreferencesDialogProps) {
  const [dates, setDates] = useState<DateRange>({ startDate: null, endDate: null })
  const [budget, setBudget] = useState<Budget>({ min: 500, max: 5000, currency: 'USD' })
  const [preferences, setPreferences] = useState<TravelPreferences>({
    accommodationType: 'mid-range',
    travelStyle: 'culture',
    transportationType: 'flight'
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-gray-800 border-white/10 text-white hover:bg-gray-700">
          Set Travel Preferences
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 text-white border-white/10 max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
        <DialogHeader>
          <DialogTitle>Travel Preferences</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-4">
            <Label>Travel Dates</Label>
            <Calendar
              mode="range"
              selected={{
                from: dates.startDate || undefined,
                to: dates.endDate || undefined
              }}
              onSelect={(range) => {
                setDates({
                  startDate: range?.from || null,
                  endDate: range?.to || null
                })
              }}
              className="bg-gray-800 border-white/10 rounded-md text-white [&_table_td]:p-0 [&_table_td_div]:hover:bg-gray-700 [&_table_td_div]:hover:text-white [&_.rdp-day_today]:bg-gray-950 [&_.rdp-day_today]:text-white [&_.rdp-day_selected]:bg-gray-700 [&_.rdp-day_selected]:text-white [&_table_th]:text-gray-400"
            />
          </div>

          <div className="space-y-4">
            <Label>Budget Range (USD)</Label>
            <div className="relative py-4">
              <Slider
                min={500}
                max={20000}
                step={500}
                value={[budget.max]}
                onValueChange={([max]) => setBudget({ ...budget, min: 500, max })}
                className="[&_.slider-thumb]:bg-white [&_.slider-track]:bg-gray-700 [&_.slider-range]:bg-blue-600"
              />
              <div className="absolute left-0 right-0 -bottom-2 flex justify-between text-sm text-gray-400">
                <span>${budget.min}</span>
                <span>${budget.max}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Accommodation Type</Label>
            <RadioGroup
              value={preferences.accommodationType}
              onValueChange={(value: TravelPreferences['accommodationType']) =>
                setPreferences({ ...preferences, accommodationType: value })
              }
              className="grid grid-cols-3 gap-4"
            >
              {[
                { value: 'luxury', label: 'Luxury', icon: Hotel },
                { value: 'mid-range', label: 'Mid-Range', icon: Hotel },
                { value: 'budget', label: 'Budget', icon: Hotel },
              ].map(({ value, label, icon: Icon }) => (
                <div key={value}>
                  <RadioGroupItem
                    value={value}
                    id={`accommodation-${value}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`accommodation-${value}`}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-white/10 bg-gray-800 p-4 hover:bg-gray-700 peer-data-[state=checked]:border-white [&:has([data-state=checked])]:border-white"
                  >
                    <Icon className="mb-2 h-6 w-6" />
                    {label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label>Travel Style</Label>
            <RadioGroup
              value={preferences.travelStyle}
              onValueChange={(value: TravelPreferences['travelStyle']) =>
                setPreferences({ ...preferences, travelStyle: value })
              }
              className="grid grid-cols-3 gap-4"
            >
              {[
                { value: 'adventure', label: 'Adventure', icon: Mountain },
                { value: 'culture', label: 'Culture', icon: Book },
                { value: 'nature', label: 'Nature', icon: Tree },
                { value: 'food', label: 'Food', icon: Utensils },
                { value: 'relaxation', label: 'Relaxation', icon: Hotel },
              ].map(({ value, label, icon: Icon }) => (
                <div key={value}>
                  <RadioGroupItem
                    value={value}
                    id={`style-${value}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`style-${value}`}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-white/10 bg-gray-800 p-4 hover:bg-gray-700 peer-data-[state=checked]:border-white [&:has([data-state=checked])]:border-white"
                  >
                    <Icon className="mb-2 h-6 w-6" />
                    {label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label>Transportation Preference</Label>
            <RadioGroup
              value={preferences.transportationType}
              onValueChange={(value: TravelPreferences['transportationType']) =>
                setPreferences({ ...preferences, transportationType: value })
              }
              className="grid grid-cols-4 gap-4"
            >
              {[
                { value: 'flight', label: 'Flight', icon: Plane },
                { value: 'train', label: 'Train', icon: Train },
                { value: 'car', label: 'Car', icon: Car },
                { value: 'mixed', label: 'Mixed', icon: Check },
              ].map(({ value, label, icon: Icon }) => (
                <div key={value}>
                  <RadioGroupItem
                    value={value}
                    id={`transport-${value}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`transport-${value}`}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-white/10 bg-gray-800 p-4 hover:bg-gray-700 peer-data-[state=checked]:border-white [&:has([data-state=checked])]:border-white"
                  >
                    <Icon className="mb-2 h-6 w-6" />
                    {label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Button
            onClick={() => onPreferencesSubmit({ travel: preferences, dates, budget })}
            className="w-full"
          >
            Apply Preferences
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

