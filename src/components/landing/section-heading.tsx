import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <p className="text-[0.72rem] font-medium tracking-[0.24em] text-white/38 uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-5 text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      <p className="mt-6 max-w-2xl text-base leading-7 text-white/58 sm:text-lg sm:leading-8">
        {description}
      </p>
    </div>
  )
}
