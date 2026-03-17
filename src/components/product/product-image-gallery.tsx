"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { TITAN_PRODUCT_IMAGES } from "@/lib/titan"

const IMAGE_LABELS = [
  "Overview",
  "Main Dashboard",
  "Analytics",
  "Body Tracking",
  "Mind",
  "Money",
]

export function ProductImageGallery() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({})

  const handleError = (index: number) => {
    setFailedImages((prev) => ({ ...prev, [index]: true }))
  }

  const goToPrev = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? TITAN_PRODUCT_IMAGES.length - 1 : prev - 1
    )
  }

  const goToNext = () => {
    setSelectedIndex((prev) =>
      prev === TITAN_PRODUCT_IMAGES.length - 1 ? 0 : prev + 1
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main image with arrows */}
      <div className="group relative aspect-[147/92] w-full overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] shadow-[0_28px_90px_rgba(0,0,0,0.35)]">
        {failedImages[selectedIndex] ? (
          <div className="flex h-full w-full items-center justify-center">
            <div className="text-center">
              <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                <span className="text-2xl font-semibold text-white/30">T</span>
              </div>
              <p className="mt-4 text-sm text-white/30">{IMAGE_LABELS[selectedIndex]}</p>
              <p className="mt-1 text-xs text-white/20">Add image to display</p>
            </div>
          </div>
        ) : (
          <Image
            key={`main-${selectedIndex}`}
            src={TITAN_PRODUCT_IMAGES[selectedIndex].src}
            alt={TITAN_PRODUCT_IMAGES[selectedIndex].alt}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className={cn("object-contain", selectedIndex === 0 && "scale-[1.15]")}
            priority={selectedIndex === 0}
            onError={() => handleError(selectedIndex)}
          />
        )}

        {/* Left arrow */}
        <button
          onClick={goToPrev}
          className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/70 opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/80 hover:text-white group-hover:opacity-100"
        >
          <ChevronLeft className="size-5" />
        </button>

        {/* Right arrow */}
        <button
          onClick={goToNext}
          className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/70 opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/80 hover:text-white group-hover:opacity-100"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {TITAN_PRODUCT_IMAGES.map((image, index) => (
          <button
            key={image.src}
            onClick={() => setSelectedIndex(index)}
            className={cn(
              "relative aspect-[147/92] w-20 shrink-0 overflow-hidden rounded-xl border transition-all sm:w-24",
              index === selectedIndex
                ? "border-white/40 shadow-[0_0_12px_rgba(255,255,255,0.1)]"
                : "border-white/10 opacity-60 hover:opacity-90"
            )}
          >
            {failedImages[index] ? (
              <div className="flex h-full w-full items-center justify-center bg-[#0a0c10]">
                <span className="text-[0.6rem] text-white/30">{index + 1}</span>
              </div>
            ) : (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="96px"
                className="object-contain"
                onError={() => handleError(index)}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
