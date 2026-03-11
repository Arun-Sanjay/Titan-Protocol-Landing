import Image from "next/image"

import { cn } from "@/lib/utils"
import { TITAN_PREVIEW_IMAGE_PATH } from "@/lib/titan"

type SoftwarePreviewPanelProps = {
  className?: string
  label?: string
}

export function SoftwarePreviewPanel({ className, label = "Preview" }: SoftwarePreviewPanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-[1px] shadow-[0_36px_120px_rgba(0,0,0,0.42)]",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[calc(2.2rem-1px)] bg-[radial-gradient(circle_at_top,rgba(148,174,255,0.12),transparent_26%),linear-gradient(180deg,#0b0d10_0%,#060708_100%)]">
        <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.12),transparent_22%,transparent_70%,rgba(0,0,0,0.28))]" />
        <Image
          src={TITAN_PREVIEW_IMAGE_PATH}
          alt="Titan Protocol OS preview"
          fill
          className="object-cover object-center opacity-72"
          priority={false}
        />

        <div className="absolute inset-6 z-20 rounded-[1.8rem] border border-white/10 bg-black/10" />
        <div className="absolute left-6 top-6 z-30 rounded-full border border-white/10 bg-black/28 px-4 py-2 text-[0.7rem] font-medium tracking-[0.18em] text-white/62 uppercase backdrop-blur">
          {label}
        </div>
      </div>
    </div>
  )
}
