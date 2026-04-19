import { useEffect, useRef } from "react"
import Code from "@/public/assets/hero/code.png"
import HeroSpinner from "@/public/assets/hero/hero-spinner.webp"
import Source from "@/public/assets/hero/source.png"
import heroLottieData from "@/public/assets/lottie/hero-lottie.json"
import { gsap } from "gsap"
import dynamic from "next/dynamic"
import Image from "next/image"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

export default function HeroTool() {
  const firstSpinnerRef = useRef(null)
  const secondSpinnerRef = useRef(null)

  useEffect(() => {
    if (firstSpinnerRef.current && secondSpinnerRef.current) {
      gsap.to([firstSpinnerRef.current], {
        rotation: 70,
        duration: 30,
        repeat: -1,
      })

      gsap.to([secondSpinnerRef.current], {
        rotation: 70,
        duration: 30,
        repeat: -1,
      })
    }
  }, [])

  return (
    <div className="max-w-[75rem] min-h-[5rem] m-auto w-full absolute top-[55%] md:gap-40 xl:gap-0 md:top-[50%] md:-translate-y-1/2 left-0 right-0 flex items-center justify-between">
      {/* Circle */}
      <div className="relative overflow-hidden xl:overflow-visible w-full h-[16rem] md:w-[27rem] md:h-[27rem] flex justify-center items-center">
        <div className="absolute hidden xl:block select-none pointer-events-none left-[-10rem] bottom-[3rem] rotate-270">
          <Lottie animationData={heroLottieData} loop={true} />
        </div>
        <Image
          ref={firstSpinnerRef}
          className="w-full h-full object-cover select-none pointer-events-none"
          src={HeroSpinner}
          alt="hero-background"
        />
        <div className="w-14 h-14 md:w-20 md:h-20 select-none pointer-events-none absolute z-[1] bg-gradient-to-tl from-[#132726] to-[#13191B] shadow-md rounded-full flex justify-center items-center">
          <Image className="w-4 md:w-6" src={Source} alt="hero-background" />
        </div>
      </div>
      {/* Circle */}

      {/* Circle */}
      <div className="relative overflow-hidden xl:overflow-visible w-full h-[16rem] md:w-[27rem] md:h-[27rem] flex justify-center items-center">
        <Image
          ref={secondSpinnerRef}
          className="w-full h-full rotate-180 object-cover select-none pointer-events-none"
          src={HeroSpinner}
          alt="hero-background"
        />
        <div className="w-14 h-14 md:w-20 md:h-20 select-none pointer-events-none absolute z-[1] bg-gradient-to-tl from-[#132726] to-[#13191B] shadow-md rounded-full flex justify-center items-center">
          <Image className="w-4 md:w-6" src={Code} alt="hero-background" />
        </div>
      </div>
      {/* Circle */}
    </div>
  )
}
