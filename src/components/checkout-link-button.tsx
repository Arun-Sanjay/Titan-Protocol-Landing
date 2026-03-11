import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CheckoutLinkButtonProps = {
  className?: string
  label?: string
}

export function CheckoutLinkButton({
  className,
  label = "Get Titan Protocol",
}: CheckoutLinkButtonProps) {
  return (
    <Button
      asChild
      size="lg"
      className={cn(
        "h-12 rounded-full border border-white/12 bg-white px-6 text-black shadow-[0_18px_44px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.85)] hover:bg-white/92",
        className
      )}
    >
      <Link href="/checkout">
        <span>{label}</span>
        <ArrowRight className="size-4" />
      </Link>
    </Button>
  )
}
