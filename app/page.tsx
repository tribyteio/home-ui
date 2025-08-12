'use client'
import { animate, createSpring, onScroll } from 'animejs'
import Link from "next/link"
import React, { AllHTMLAttributes, ReactNode, Ref, useEffect, useRef, useState } from "react"
import { AiFillSafetyCertificate } from "react-icons/ai"
import { BiSitemap } from "react-icons/bi"
import { FaChartLine } from 'react-icons/fa6'
import { GrServices } from "react-icons/gr"
import { IoIosWarning, IoMdTrophy } from "react-icons/io"
import { IoMenu } from "react-icons/io5"
import { MdAddchart, MdEmail, MdMiscellaneousServices, MdOutlineCodeOff } from "react-icons/md"
import { PiBookOpenTextFill } from "react-icons/pi"
import { RiTwitterXFill } from "react-icons/ri"
import { TbHeartHandshake } from "react-icons/tb"
import { useClickAway } from "react-use"
import { cn } from "../utils/cn"
const twitterXLink = "https://x.com/TriByteLabs"
const emailLink = "mailto:tribytelabs@gmail.com"
const headerTabList: { href: string, tabName: string, icon?: ReactNode }[] = [
  { href: '#about_us', tabName: 'About Us', icon: <PiBookOpenTextFill /> },
  { href: '#core_services', tabName: 'Core Services', icon: <GrServices /> },
  { href: '#achievements', tabName: 'Achievements & Impact', icon: <MdAddchart /> },
  { href: "https://docs.google.com/forms/d/e/1FAIpQLScUOX5YODPL-xWz0AUG83BzKj_ZlEqkaOLTqtE2A_pgD9l_ug/viewform", tabName: 'Request a Quote' },
];

const maxWidthClassName = 'max-w-[1140px] px-4 w-full mx-auto'

function MBtn({ type = '1', className, onClick, content, contentClassName, ref }: { type?: '1' | '2' | "3", className?: string, onClick?: () => void, content?: React.ReactNode, contentClassName?: string, ref?: Ref<HTMLDivElement> }) {
  return <div className={cn('cursor-pointer text-sm select-none rounded-full w-fit transition-all', {
    'text-white hover:bg-primary/20': type == '1',
    'text-black bg-white border border-black hover:bg-white/80': type == '2',

  }, className)} onClick={onClick} ref={ref as any}>
    <div className={cn("select-none w-fit rounded-full transition-all flex items-center gap-2", {
      'px-4 py-1': type == '1',
      'px-9 py-3.5 transition-all': type == '2',
    }, contentClassName)}>
      {content}
    </div>
  </div>
}

function AnimItem({ className, children, as, anim = true, ...props }: AllHTMLAttributes<HTMLDivElement> & { as?: string, anim?: boolean }) {
  const Component = (as ?? "div") as any
  return <Component className={cn({ 'animitem': anim }, className)} {...props}>{children}</Component>
}

export default function Home() {
  useEffect(() => {
    const items = document.getElementsByClassName("animitem")
    for (const element of items) {
      animate(element, {
        y: { from: 100 },
        opacity: { from: 0 },
        scale: { from: 0.8 },
        ease: createSpring({ stiffness: 70 }),
        loop: false,
        duration: 1000,
        autoplay: onScroll({
          container: '.animroot',
          axis: 'y',
          enter: 'bottom top',
          leave: 'top bottom',
          repeat: true,
        })
      });
    }
  }, []);
  const goTo = (urlpath: string) => {
    window.open(urlpath, urlpath.startsWith("#") ? '_self' : '_blank')
  }
  const [showMenus, setShowMenus] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const trigerRef = useRef<HTMLDivElement>(null)
  useClickAway(ref, (e) => {
    if (e.target && trigerRef.current && !trigerRef.current.contains(e.target as any)) {
      setShowMenus(false)
    }
  })
  return <div className="h-screen overflow-y-auto animroot scroll-smooth">
    <div className="z-[2] lg:relative  w-full min-h-screen bg-black overflow-hidden">
      {/* Header */}
      <div className="w-full fixed top-0 z-50">
        <div className="bg-[#5F5F5F] flex w-full h-[75px] mo:h-[56px]">
          <div className={cn("flex items-center gap-5 mx-auto relative mo:px-0", maxWidthClassName)}>
            <div className="mo:px-4 flex w-full justify-between">
              <Link href={'/'} className=" flex items-center mr-4 gap-3 text-[#F3F3F3]">
                <img alt="Logo" src="/logo.svg" className="w-[69px] h-auto mo:w-[48px]" />
                Tribyte
              </Link>
              <div className="flex items-center justify-around gap-5 font-semibold text-white text-xl mo:hidden ">
                {
                  headerTabList.map((item, i) =>
                    <MBtn key={`head_${i}`}
                      type={i === headerTabList.length - 1 ? '2' : '1'}
                      contentClassName={i === headerTabList.length - 1 ? 'py-2.5' : 'flex items-center gap-2'}
                      onClick={() => goTo(item.href)}
                      content={<>{item.icon && <div className="text-[2rem]">{item.icon}</div>} {item.tabName}</>}
                      className={i === headerTabList.length - 1 ? '' : 'ml-auto'} />
                  )
                }
              </div>
              <MBtn ref={trigerRef} type="2" className="rounded-lg hidden mo:flex items-center" contentClassName="px-0.5 py-0 text-2xl hover:text-primary" content={<IoMenu />} onClick={() => setShowMenus(!showMenus)} />
            </div>
            <div ref={ref} className={cn("absolute top-full hidden w-full mo:flex bg-black transition-all p-5 flex-col gap-4  z-10", showMenus ? "translate-x-0" : "translate-x-full !hidden")}>
              {
                headerTabList.map((item, i) =>
                  <MBtn key={`head_${i}`} type="3" className="w-full" onClick={() => goTo(item.href)}
                    contentClassName="flex items-center gap-2"
                    content={<><div className="text-[2rem]">{item.icon}</div> {item.tabName}</>} />)
              }
            </div>
          </div>
        </div>
      </div>
      <div

        style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(51, 79, 144, 0.74) 9.13%, rgba(15, 23, 42, 0.74) 97.12%)' }}
        className="py-8 w-full min-h-screen flex flex-col justify-center gap-[8rem] mo:gap-20 mo:items-center">
        {/* First Frame */}
        <AnimItem
          className={cn(maxWidthClassName, "flex mo:flex-col gap-5 mo:items-center")}>
          <div className="flex flex-col leading-[1.2] mo:items-center">
            <div className="text-[60px] font-semibold font-poppins  text-[#F3F3F3] w-fit pr-28 flex flex-col mo:pr-0 mo:text-center mo:text-[44px]">
              Tribyte Labs
            </div>
            <div className="font-normal text-[60px] text-[#D9D9D9] mt-[60px] mo:mt-8 mo:text-xl">
              Every Byte Builds Immutable Trust
            </div>
            <div className="font-normal text-[20px] text-white mt-[60px] mo:mt-8 mo:text-xl">
              Leading Web3 technology development and security company, focusing on smart contract audit and security solutions
            </div>
          </div>
          <img alt="Logo" src="/logo.svg" className="shrink-0 w-[572px] h-auto mo:w-[200px]" />
        </AnimItem>
      </div>

      <div
        id="about_us"
        className="py-8 w-full bg-white min-h-screen flex flex-col justify-center gap-[8rem] mo:gap-20 mo:items-center">
        {/* Secend Frame */}
        <AnimItem
          className={cn(maxWidthClassName, "flex mo:flex-col gap-5 mo:items-center")}>
          <img alt="Logo" src="/logo.svg" className="shrink-0 w-[427px] h-auto mo:w-[200px]" />
          <div className="flex flex-col leading-[1.2] mo:items-center">
            <div className="text-[40px] font-semibold font-poppins  text-[#334F90] w-fit pr-28 flex flex-col mo:pr-0 mo:text-center mo:text-[44px]">
              About Us
            </div>
            <div className="font-normal font-dmmono text-[25px] text-[#0F172A] mt-[60px] mo:mt-8 mo:text-xl">
              We are a Hong Kong-based Web3 technology development and security firm, comprising a team of experts specializing in blockchain protocols and smart contract development.
              Our services cater to a broad spectrum of clients, including public blockchains, DeFi platforms, and various decentralized applications (DApps).
            </div>
          </div>
        </AnimItem>
      </div>
      <div
        id="core_services"
        className="py-8 w-full bg-[#E3E3E3] min-h-screen flex flex-col justify-center gap-[8rem] mo:gap-20 mo:items-center">
        {/* Third Frame */}
        <AnimItem
          className={cn(maxWidthClassName, "flex mo:flex-col gap-8 mo:items-center")}>
          <div className="flex flex-col leading-[1.2] mo:items-center">
            <div className="text-[40px] pl-8 font-semibold font-poppins  text-[#334F90] w-fit pr-28 flex flex-col mo:pr-0 mo:text-center mo:text-[44px]">
              Core Service
            </div>
            <div className="font-normal font-dmmono text-[25px] text-[#0F172A] flex flex-col gap-4 mt-5 mo:mt-8 mo:text-xl">
              <div className="flex gap-2"><AiFillSafetyCertificate className="text-3xl shrink-0 mo:text-2xl" />Smart Contract Audit & Formal Verification</div>
              <div className="flex gap-2"><BiSitemap className="text-3xl shrink-0 mo:text-2xl" />Blockchain Security Monitoring Systems</div>
              <div className="flex gap-2"><MdMiscellaneousServices className="text-3xl shrink-0 mo:text-2xl" />Smart Contract Technical Services & Consulting</div>
              <div className="flex gap-2"><IoIosWarning className="text-3xl shrink-0 mo:text-2xl" />Blockchain Risk Monitoring & Early Warning</div>
            </div>
          </div>
          <img alt="Core services" src="/coreservices.svg" className="shrink-0 w-[482px] h-auto mo:w-[240px]" />
        </AnimItem>
      </div>
      <div
        id="achievements"
        className="py-8 w-full bg-white min-h-screen flex flex-col justify-center gap-[8rem] mo:gap-20 mo:items-center">
        {/* Four Frame */}
        <AnimItem
          className={cn(maxWidthClassName, "flex mo:flex-col gap-20 mo:gap-5 mo:items-center")}>
          <img alt="achievements" src="/achievements.svg" className="shrink-0 w-[330px] h-auto mo:w-[220px]" />
          <div className="flex flex-col mo:items-center">
            <div className="text-[40px] font-semibold font-poppins  text-[#334F90] w-fit pr-28 flex flex-col mo:pr-0 mo:text-center mo:text-[44px]">
              Achievements & Impact
            </div>
            <div className="font-normal font-dmmono text-[25px] text-[#0F172A] flex flex-col gap-4 mt-5 mo:mt-8 mo:text-xl">
              <div className="flex gap-2"><IoMdTrophy className="text-3xl shrink-0 mo:text-2xl" /><div>Creators of Ethereum <Link className="text-[#0851FF]" href="https://eips.ethereum.org/EIPS/eip-7588" target="_blank">ERC_7588</Link> and <Link className="text-[#0851FF]" href="https://eips.ethereum.org/EIPS/eip-5625" target="_blank">ERC_5625</Link></div></div>
              <div className="flex gap-2"><FaChartLine className="text-3xl shrink-0 mo:text-2xl" />Developed DeFi protocols like LSDx, Wand Protocol, Zoo Finance with TVL reaching $200M</div>
              <div className="flex gap-2"><MdOutlineCodeOff className="text-3xl shrink-0 mo:text-2xl" />Over 100,000 lines of self-written smart contract code</div>
              <div className="flex gap-2"><TbHeartHandshake className="text-3xl shrink-0 mo:text-2xl" />Assisted 10+ notable projects in resolving security issues</div>
            </div>
          </div>
        </AnimItem>
      </div>
      <div
        style={{
          background: 'linear-gradient(180deg, #FFFFFF 0%, #334F90 95.19%)'
        }}
        className="py-8 w-full bg-white flex flex-col justify-center">
        {/* Four Frame */}
        <AnimItem
          className={cn(maxWidthClassName, "flex mo:flex-col gap-20 mo:gap-5 mo:items-center")}>
          <div className="flex-1">
            <div className="flex items-center text-black text-[25px] font-semibold">
              <img alt="Logo" src="/logo.svg" className="shrink-0 w-[110px] h-auto" />
              Tribyte
            </div>
            <div className="flex items-center py-5 gap-5 justify-around mo:flex-col mo:items-start border-t border-dashed border-black">
              {
                headerTabList.slice(0, headerTabList.length - 1).map((item, i) =>
                  <MBtn key={`head_${i}`}
                    type={i === headerTabList.length - 1 ? '2' : '1'}
                    contentClassName={i === headerTabList.length - 1 ? 'py-2.5' : 'flex items-center gap-2'}
                    onClick={() => goTo(item.href)}
                    className="text-black"
                    content={item.tabName}
                  />
                )
              }
            </div>
          </div>
          <div className="flex flex-col gap-5 shrink-0">
            <div className="text-xl font-semibold">Contact Us</div>
            <div className="flex gap-4 text-4xl">
              <Link href={twitterXLink} target="_blank">
                <RiTwitterXFill className="text-gray-200 hover:text-white" />
              </Link>
              <Link href={emailLink}>
                <MdEmail className="text-gray-200 hover:text-white" />
              </Link>
            </div>
          </div>
        </AnimItem>
      </div>

    </div>

  </div>
}
