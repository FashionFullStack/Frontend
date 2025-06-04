import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const CarouselContext = React.createContext<{
  orientation?: "horizontal" | "vertical"
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} | null>(null)

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    orientation?: "horizontal" | "vertical"
  }
>(({ orientation = "horizontal", className, children, ...props }, ref) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const scrollPrev = React.useCallback(() => {
    if (containerRef.current) {
      const container = containerRef.current
      const scrollAmount = orientation === "horizontal" 
        ? container.clientWidth 
        : container.clientHeight
      if (orientation === "horizontal") {
        container.scrollLeft -= scrollAmount
      } else {
        container.scrollTop -= scrollAmount
      }
    }
  }, [orientation])

  const scrollNext = React.useCallback(() => {
    if (containerRef.current) {
      const container = containerRef.current
      const scrollAmount = orientation === "horizontal" 
        ? container.clientWidth 
        : container.clientHeight
      if (orientation === "horizontal") {
        container.scrollLeft += scrollAmount
      } else {
        container.scrollTop += scrollAmount
      }
    }
  }, [orientation])

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateScrollButtons = () => {
      if (orientation === "horizontal") {
        setCanScrollPrev(container.scrollLeft > 0)
        setCanScrollNext(
          container.scrollLeft < container.scrollWidth - container.clientWidth
        )
      } else {
        setCanScrollPrev(container.scrollTop > 0)
        setCanScrollNext(
          container.scrollTop < container.scrollHeight - container.clientHeight
        )
      }
    }

    updateScrollButtons()
    container.addEventListener("scroll", updateScrollButtons)
    window.addEventListener("resize", updateScrollButtons)

    return () => {
      container.removeEventListener("scroll", updateScrollButtons)
      window.removeEventListener("resize", updateScrollButtons)
    }
  }, [orientation])

  return (
    <CarouselContext.Provider
      value={{
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        ref={ref}
        className={cn("relative", className)}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
})
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = React.useContext(CarouselContext) || {}

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden",
        orientation === "horizontal" ? "-mx-4" : "-my-4",
        className
      )}
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" 
            ? "h-full flex-row" 
            : "flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = React.useContext(CarouselContext) || {}

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } =
    React.useContext(CarouselContext) || {}

  return (
    <button
      ref={ref}
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      className={cn(
        "absolute rounded-full border bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2 h-8 w-8"
          : "-top-12 left-1/2 -translate-x-1/2 h-8 w-8 rotate-90",
        className
      )}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } =
    React.useContext(CarouselContext) || {}

  return (
    <button
      ref={ref}
      onClick={scrollNext}
      disabled={!canScrollNext}
      className={cn(
        "absolute rounded-full border bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2 h-8 w-8"
          : "-bottom-12 left-1/2 -translate-x-1/2 h-8 w-8 rotate-90",
        className
      )}
      {...props}
    >
      <ChevronRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} 