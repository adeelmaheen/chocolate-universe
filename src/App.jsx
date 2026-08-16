import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import HeroScene from './components/HeroScene'
import SecondScene from './components/SecondScene'
import Footer from './components/Footer'
import SmoothScroll from './components/SmoothScroll'
import { buildFramePaths } from './lib/framePaths'

gsap.registerPlugin(ScrollTrigger)

const heroFrames = buildFramePaths('/video_frames', 101)
const secondFrames = buildFramePaths('/video_2_frames', 40)

export default function App() {
  const rootRef = useRef(null)
  const heroRef = useRef(null)
  const secondRef = useRef(null)
  const heroStageRef = useRef(null)
  const heroVisualRef = useRef(null)
  const transitionVisualRef = useRef(null)
  const secondVisualRef = useRef(null)

  const secondStartFrame = useMemo(
    () => Math.min(Math.max(Math.round(secondFrames.length * 0.18), 0), secondFrames.length - 1),
    [],
  )

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    window.scrollTo(0, 0)

    const onRefresh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
    }

    onRefresh()
    window.requestAnimationFrame(() => {
      window.scrollTo(0, 0)
      ScrollTrigger.refresh()
    })
    window.addEventListener('resize', onRefresh)

    return () => window.removeEventListener('resize', onRefresh)
  }, [])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const heroVisual = heroVisualRef.current
      const transitionVisual = transitionVisualRef.current
      const secondVisual = secondVisualRef.current

      if (!heroVisual || !transitionVisual || !secondVisual) {
        return
      }

      heroVisual.setFrameProgress(0)
      transitionVisual.setFrameProgress(0)
      transitionVisual.setBlend(0)
      secondVisual.setFrameIndex(secondStartFrame)

      gsap.from('[data-nav-reveal]', {
        opacity: 0,
        yPercent: -40,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.05,
        delay: 0.15,
      })

      gsap.from('[data-hero-copy] .reveal-line', {
        yPercent: 110,
        filter: 'blur(18px)',
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.35,
      })

      gsap.from('[data-hero-copy] .hero-copy__eyebrow, [data-hero-copy] .hero-copy__body, [data-hero-copy] .hero-actions', {
        y: 28,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.08,
        delay: 0.5,
      })

      gsap.from('.hero-detail, .hero-side-note, .hero-rail', {
        y: 34,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.75,
      })

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        onUpdate: ({ progress }) => {
          const heroPhase = 0.68
          const sceneProgress = Math.min(progress / heroPhase, 1)
          const transitionProgress =
            progress > heroPhase ? Math.min((progress - heroPhase) / (1 - heroPhase), 1) : 0

          heroVisual.setFrameProgress(sceneProgress)
          heroVisual.setOverlay(1 - transitionProgress * 0.18)

          transitionVisual.setFrameProgress(transitionProgress * (secondStartFrame / (secondFrames.length - 1)))
          transitionVisual.setBlend(transitionProgress)
          transitionVisual.setBlur((1 - transitionProgress) * 18)
          transitionVisual.setMask(transitionProgress)

          heroStageRef.current?.style.setProperty('--transition-progress', transitionProgress.toFixed(4))
        },
      })

      ScrollTrigger.create({
        trigger: secondRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.75,
        onUpdate: ({ progress }) => {
          const start = secondStartFrame / (secondFrames.length - 1)
          const end = 1
          secondVisual.setFrameProgress(start + (end - start) * progress)
        },
      })

      gsap.from('[data-second-copy] .reveal-line', {
        yPercent: 105,
        opacity: 0,
        filter: 'blur(20px)',
        ease: 'power3.out',
        duration: 1,
        stagger: 0.08,
        scrollTrigger: {
          trigger: secondRef.current,
          start: 'top 65%',
        },
      })

      gsap.from('[data-second-copy] .scene-copy__eyebrow, [data-second-copy] .scene-copy__body, [data-second-copy] .scene-copy__meta, [data-second-copy] .scene-copy__action', {
        y: 32,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 1.1,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: secondRef.current,
          start: 'top 60%',
        },
      })

      gsap.from('.scene-copy__panel > div', {
        y: 32,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: secondRef.current,
          start: 'top 58%',
        },
      })
    }, rootRef)

    return () => ctx.revert()
  }, [secondFrames.length, secondStartFrame])

  return (
    <SmoothScroll>
      <div className="app-shell" ref={rootRef}>
        <Navbar />
        <main>
          <HeroScene
            ref={heroRef}
            stageRef={heroStageRef}
            heroVisualRef={heroVisualRef}
            transitionVisualRef={transitionVisualRef}
            frames={heroFrames}
            transitionFrames={secondFrames}
          />
          <SecondScene
            ref={secondRef}
            visualRef={secondVisualRef}
            frames={secondFrames}
          />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  )
}
