"use client"

import { useEffect, useRef } from "react"
import useOnScreen from "@/hooks/useOnScreen"
import useScrollActive from "@/hooks/useScrollActive"
import { useSectionStore } from "@/store/section"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { ArrowRight } from "iconsax-react"
import Link from "next/link"
import { RoughNotation } from "react-rough-notation"
import BlogCard from "../BlogCard"

export default function BlogSection() {
  gsap.registerPlugin(ScrollTrigger)
  const sectionRef = useRef(null)

  const elementRef = useRef<HTMLDivElement>(null)
  const isOnScreen = useOnScreen(elementRef)

  useEffect(() => {
    const q = gsap.utils.selector(sectionRef)

    gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        scrub: true,
        onEnter: () => {
          gsap.fromTo(
            q(".qoutes-animation"),
            {
              y: "-200%",
            },
            {
              y: 0,
            }
          )
        },
      },
    })
  }, [])

  // Set Active Session
  const aboutSectionOnView = useScrollActive(sectionRef)
  const { setSection } = useSectionStore()

  useEffect(() => {
    aboutSectionOnView && setSection("#blog")
  }, [aboutSectionOnView, setSection])

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="h-full bg-baseBackground py-14 px-10 lg:px-[5%]"
    >
      <div className="w-full max-w-[1100px] h-full m-auto flex flex-col items-center gap-14">
        <div className="w-[80%] md:w-full flex flex-col gap-8 items-center">
          <RoughNotation
            type="underline"
            strokeWidth={2}
            color="hsl(157, 87%, 41%)"
            order={1}
            show={isOnScreen}
          >
            <div className="text-xl md:text-4xl tracking-tight font-medium w-fit dark:text-accentColor">
              Blog
            </div>
          </RoughNotation>
          <div ref={elementRef} className="overflow-hidden flex flex-col gap-1">
            <div className="qoutes-animation mx-auto text-center text-sm dark:text-white flex flex-col items-center font-normal">
              At <span className="text-accentColor">Chopper Blog</span> I write
              notes on kernels, networking, containers, and Kubernetes—how
              things work under the hood, in plain language.
            </div>
            <div className="qoutes-animation mx-auto text-center text-sm dark:text-white flex flex-col items-center font-normal">
              <div>Here are a few recent posts.</div>
            </div>
          </div>
        </div>

        <div className="md:w-full pt-4 pb-10 flex flex-col items-start gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} item={blog} />
          ))}
        </div>

        <Link
          href="https://blog.shinthant.dev/blog"
          target="_blank"
          aria-label="Read more posts on Chopper Blog at blog.shinthant.dev"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <div className="text-accentColor navlink text-sm italic">
            Read the full archive on blog.shinthant.dev
          </div>
          <ArrowRight color="white" size={15} />
        </Link>
      </div>
    </section>
  )
}

export interface Blog {
  id: number
  title: string
  description: string
  image: string
  publishAt: string
  link: string
}

const blogs: Blog[] = [
  {
    id: 1,
    title: "DNS (Domain Name System)",
    description:
      "Hierarchical DNS, name resolution flow, recursive resolver, root and TLD servers, authoritative DNS, caching, and TTL.",
    image: "/assets/blog/dns.svg",
    publishAt: "Apr 19, 2026",
    link: "https://blog.shinthant.dev/blog/dns/",
  },
  {
    id: 2,
    title: "Kernel terminal devices",
    description:
      "/dev/tty and /dev/pts, getty, virtual consoles, display servers, terminal emulators, and master/slave pseudo terminals.",
    image: "/assets/blog/kernel-terminal.svg",
    publishAt: "Apr 19, 2026",
    link: "https://blog.shinthant.dev/blog/kernel-terminal-devices/",
  },
  {
    id: 3,
    title: "IPVS",
    description:
      "Kernel layer 4 load balancing: virtual servers, packet flow, algorithms, and forwarding modes (DR, NAT, TUN).",
    image: "/assets/blog/ipvs.svg",
    publishAt: "Apr 19, 2026",
    link: "https://blog.shinthant.dev/blog/ipvs/",
  },
]
