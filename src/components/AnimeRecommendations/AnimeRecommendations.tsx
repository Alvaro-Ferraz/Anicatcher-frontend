"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Recommendation {
  entry: {
    mal_id: number
    title: string
    images?: {
      webp?: {
        large_image_url?: string
      }
    }
    url: string
  }
  votes: number
}

interface Props {
  recommendations: Recommendation[]
}

export default function AnimeRecommendations({ recommendations }: Props) {
  const [showAll, setShowAll] = useState(false)

  const displayedRecommendations = showAll ? recommendations : recommendations.slice(0, 7)

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[13px] font-bold text-[#ADC0D2]">Recommendations</h2>
        {recommendations.length > 7 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-[13px] text-[#ADC0D2] transition-colors hover:underline"
          >
            {showAll ? "View Less" : "View All Recommendations"}
          </button>
        )}
      </div>

      <motion.div
        key={showAll ? "grid" : "carousel"}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`overflow-hidden`}
      >
        <div
          className={`${
            showAll
              ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4"
              : "flex gap-4 overflow-x-auto pb-2"
          }`}
        >
          <AnimatePresence mode="popLayout">
            {displayedRecommendations.map((rec) => (
              <motion.a
                key={rec.entry.mal_id}
                href={`/anime/${rec.entry.mal_id}`}
                className="flex-shrink-0 w-28 group"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative overflow-hidden rounded transition-transform duration-300 hover:scale-105">
                  <img
                    src={rec.entry.images?.webp?.large_image_url || "/placeholder.svg?height=128&width=96"}
                    alt={rec.entry.title}
                    className="w-full h-36 object-cover rounded"
                  />
                </div>
                <p className="mt-1 text-[#ADC0D2] text-xs font-medium line-clamp-2 leading-tight">
                  {rec.entry.title}
                </p>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
