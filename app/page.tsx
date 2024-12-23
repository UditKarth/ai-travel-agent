import { TravelAgentChat } from "@/components/travel-agent-chat"
import { GlobeIcon } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-2">
          <GlobeIcon className="h-6 w-6" />
          <h1 className="text-xl font-bold">AI Travel Agent</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Your Personal AI Travel Assistant</h2>
            <p className="text-gray-400">
              Tell me where you&apos;d like to go, your preferences, and budget. I&apos;ll help plan your perfect trip.
            </p>
          </div>
          <TravelAgentChat />
        </div>
      </main>
    </div>
  )
}

