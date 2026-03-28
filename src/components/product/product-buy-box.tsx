"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, ShoppingCart, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  TITAN_PRODUCT_NAME,
  TITAN_TAGLINE,
  TITAN_PRICE,
  TITAN_REGULAR_PRICE,
  TITAN_LAUNCH_NOTE,
  TITAN_TRUST_LINE,
  TITAN_KEY_FEATURES,
  TITAN_DISCOUNT_PERCENT,
} from "@/lib/titan"

export function ProductBuyBox() {
  const [addedToCart, setAddedToCart] = useState(false)

  function handleAddToCart() {
    setAddedToCart(true)
  }

  return (
    <div className="flex flex-col">
      {/* Title */}
      <h1 className="text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl lg:text-[2.8rem]">
        {TITAN_PRODUCT_NAME}
      </h1>
      <p className="mt-3 text-base leading-7 text-white/58">{TITAN_TAGLINE}</p>

      {/* Price block */}
      <div className="mt-6 rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl">
            {TITAN_PRICE}
          </span>
          <span className="text-lg text-white/34 line-through">{TITAN_REGULAR_PRICE}</span>
          <span className="rounded-full bg-white/[0.08] px-3 py-1 text-xs font-medium text-white/72">
            {TITAN_DISCOUNT_PERCENT} off
          </span>
        </div>
        <p className="mt-2 text-sm text-white/52">{TITAN_LAUNCH_NOTE}</p>
      </div>

      {/* Platform badge */}
      <div className="mt-5 flex items-center gap-2">
        <Monitor className="size-4 text-white/52" />
        <span className="text-sm text-white/52">Windows + macOS + Android</span>
      </div>

      {/* Key features */}
      <div className="mt-6 space-y-3">
        {TITAN_KEY_FEATURES.map((feature) => (
          <div key={feature} className="flex items-start gap-3">
            <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
              <Check className="size-3.5 text-white/80" />
            </div>
            <span className="text-sm leading-6 text-white/62">{feature}</span>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="mt-8 flex flex-col gap-3">
        <Button
          asChild
          size="lg"
          className="h-13 w-full rounded-full border border-white/12 bg-white px-6 text-black shadow-[0_18px_44px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.85)] hover:bg-white/92"
        >
          <Link href="/checkout">
            <span>Buy Now</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>

        {!addedToCart ? (
          <Button
            size="lg"
            variant="outline"
            onClick={handleAddToCart}
            className="h-13 w-full rounded-full border-white/10 bg-white/[0.03] px-6 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:bg-white/[0.06]"
          >
            <ShoppingCart className="size-4" />
            <span>Add to Cart</span>
          </Button>
        ) : (
          <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.08]">
                <Check className="size-4 text-white/90" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white/80">Added to Cart</p>
                <p className="text-xs text-white/46">Titan Protocol OS</p>
              </div>
            </div>
            <Button
              asChild
              size="lg"
              className="mt-3 h-11 w-full rounded-full border border-white/12 bg-white px-6 text-black shadow-[0_12px_36px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.85)] hover:bg-white/92"
            >
              <Link href="/checkout">
                <span>Proceed to Checkout</span>
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>

      {/* Trust line */}
      <p className="mt-5 text-center text-xs tracking-[0.08em] text-white/38">
        {TITAN_TRUST_LINE}
      </p>
    </div>
  )
}
