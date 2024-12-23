import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface DestinationCardProps {
  name: string
  image: string
  description: string
  tags: string[]
  onClick: () => void
}

export function DestinationCard({ name, image, description, tags, onClick }: DestinationCardProps) {
  return (
    <Card 
      className="group cursor-pointer overflow-hidden border-white/10 bg-gray-900 transition-all hover:border-white/20"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="mb-2 text-lg text-gray-300 font-bold">{name}</h3>
        <p className="mb-4 text-sm text-gray-400">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-gray-100">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

