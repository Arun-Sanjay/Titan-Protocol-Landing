const heroMetrics = [
  { label: "Body", value: "87", note: "Consistency" },
  { label: "Mind", value: "73", note: "Focus index" },
  { label: "Money", value: "91", note: "Capital" },
]

// Scaled for the hero chart container (h-28/h-32 = 112–128px)
const heroBars = [
  { label: "Mon", value: "h-6" },
  { label: "Tue", value: "h-10" },
  { label: "Wed", value: "h-12" },
  { label: "Thu", value: "h-7" },
  { label: "Fri", value: "h-16" },
  { label: "Sat", value: "h-9" },
  { label: "Sun", value: "h-[2.75rem]" },
]

// Used in DashboardShowcaseMockup (h-56/h-64 container)
const dashboardBars = [
  { label: "Mon", value: "h-10" },
  { label: "Tue", value: "h-16" },
  { label: "Wed", value: "h-20" },
  { label: "Thu", value: "h-12" },
  { label: "Fri", value: "h-24" },
  { label: "Sat", value: "h-14" },
  { label: "Sun", value: "h-[4.5rem]" },
]

export function HeroProductMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[720px] font-sans">
      <div className="absolute left-10 top-12 h-40 w-40 rounded-full bg-[rgba(148,174,255,0.07)] blur-[110px]" />
      <div className="absolute bottom-10 right-6 h-56 w-56 rounded-full bg-[rgba(148,174,255,0.07)] blur-[140px]" />

      <div className="relative overflow-hidden rounded-[2.6rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.16),rgba(255,255,255,0.06)_40%,rgba(255,255,255,0.03))] p-[1px] shadow-[0_48px_140px_rgba(0,0,0,0.62)]">
        <div className="rounded-[2.55rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_28%),linear-gradient(180deg,#060708_0%,#050607_100%)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] md:p-4">
          <div className="relative flex items-center justify-center rounded-[1.8rem] border border-white/8 bg-white/[0.03] px-5 py-3 text-sm text-white/42">
            <div className="absolute left-5 flex items-center gap-2">
              <span className="size-2 rounded-full bg-white/28" />
              <span className="size-2 rounded-full bg-white/14" />
              <span className="size-2 rounded-full bg-white/14" />
            </div>
            <span className="text-center tracking-[0.2em] uppercase">Titan Protocol OS</span>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1.1fr)_240px]">
            <div className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] md:p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.7rem] tracking-[0.2em] text-white/34 uppercase">
                    Weekly Compound
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-white tabular-nums md:text-4xl">
                    +18.4%
                  </p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-center text-[0.72rem] tracking-[0.16em] text-white/54 uppercase">
                  Cycle 04
                </div>
              </div>

              <div className="mt-5 flex h-24 items-end gap-2 md:h-28">
                {heroBars.map((bar, index) => (
                  <div key={bar.label} className="flex flex-1 flex-col items-center gap-3">
                    <div
                      className={`w-full rounded-t-[1rem] bg-gradient-to-t from-white/72 via-white/26 to-transparent ${bar.value} ${
                        index === 4 ? "opacity-100" : "opacity-70"
                      }`}
                    />
                    <span className="text-[10px] tracking-[0.18em] text-white/24 uppercase">
                      {bar.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {heroMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="flex flex-col rounded-[1rem] border border-white/8 bg-black/20 px-3 py-3"
                  >
                    <p className="text-[0.6rem] tracking-[0.16em] text-white/34 uppercase">
                      {metric.label}
                    </p>
                    <p className="mt-1.5 text-2xl font-semibold tracking-[-0.05em] text-white tabular-nums">
                      {metric.value}
                    </p>
                    <p className="mt-1 text-[0.65rem] leading-4 text-white/40">
                      {metric.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[1.6rem] border border-white/8 bg-white/[0.03] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <p className="text-[0.65rem] tracking-[0.2em] text-white/34 uppercase">Modes</p>
                <div className="mt-3 space-y-1.5">
                  {["Focus", "Review", "Recovery", "Capital"].map((item, index) => (
                    <div
                      key={item}
                      className={`flex items-center rounded-xl px-3 py-1.5 text-sm ${
                        index === 0
                          ? "border border-white/10 bg-white/[0.08] text-white"
                          : "border border-white/6 bg-black/20 text-white/48"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.6rem] border border-white/8 bg-white/[0.03] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <p className="text-[0.65rem] tracking-[0.2em] text-white/34 uppercase">
                  Protocol
                </p>
                <div className="mt-3 space-y-3">
                  {[
                    { label: "Deep work", value: "14h" },
                    { label: "Training", value: "5x" },
                    { label: "Savings rate", value: "34%" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between border-b border-white/8 pb-2 text-xs text-white/56 last:border-b-0 last:pb-0"
                    >
                      <span>{item.label}</span>
                      <span className="text-right font-medium text-white tabular-nums">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function DashboardShowcaseMockup() {
  return (
    <div className="relative overflow-hidden rounded-[2.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.02))] p-[1px] font-sans shadow-[0_48px_140px_rgba(0,0,0,0.48)]">
      <div className="rounded-[2.75rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_26%),linear-gradient(180deg,#0a0c0f_0%,#07090c_100%)] p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.9rem] border border-white/8 bg-white/[0.03] px-5 py-4">
          <div>
            <p className="text-[0.72rem] tracking-[0.2em] text-white/34 uppercase">Titan Dashboard</p>
            <h3 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-[2rem]">
              Controlled momentum
            </h3>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[0.72rem] tracking-[0.16em] text-white/46 uppercase">
            <span className="size-2 rounded-full bg-white/70" />
            Cycle active
          </div>
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[0.72rem] tracking-[0.18em] text-white/34 uppercase">
                  Consistency Graph
                </p>
                <p className="mt-2 text-xl font-semibold tracking-[-0.04em] text-white">
                  93-day retention
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-semibold tracking-[-0.05em] text-white tabular-nums">
                  84%
                </p>
                <p className="text-xs text-white/40">up 12% this cycle</p>
              </div>
            </div>

            <div className="mt-8 flex h-56 items-end gap-3 sm:h-64">
              {dashboardBars.map((bar, index) => (
                <div key={bar.label} className="flex flex-1 flex-col items-center gap-3">
                  <div
                    className={`w-full rounded-t-[1.1rem] bg-gradient-to-t from-white/72 via-white/26 to-transparent ${bar.value} ${
                      index === 2 || index === 4 ? "opacity-100" : "opacity-70"
                    }`}
                  />
                  <span className="text-[11px] tracking-[0.14em] text-white/28 uppercase">
                    {bar.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-5 sm:p-6">
              <p className="text-[0.72rem] tracking-[0.18em] text-white/34 uppercase">Signal Feed</p>
              <div className="mt-4 space-y-3">
                {[
                  "Body trend held inside recovery threshold.",
                  "Mind sessions cleared target block duration.",
                  "Money review completed before spending rollover.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/6 bg-black/20 px-4 py-3 text-sm leading-6 text-white/54"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-5 sm:p-6">
              <p className="text-[0.72rem] tracking-[0.18em] text-white/34 uppercase">Scorecards</p>
              <div className="mt-5 space-y-4">
                {[
                  { label: "Body", value: "82 / 100" },
                  { label: "Mind", value: "76 / 100" },
                  { label: "Money", value: "91 / 100" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between text-sm text-white/58">
                      <span>{item.label}</span>
                      <span className="font-medium text-white tabular-nums">{item.value}</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-white/8">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-white/80 to-white/30"
                        style={{
                          width:
                            item.label === "Body"
                              ? "82%"
                              : item.label === "Mind"
                                ? "76%"
                                : "91%",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
