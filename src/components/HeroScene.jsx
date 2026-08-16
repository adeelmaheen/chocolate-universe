import { forwardRef } from 'react'
import FrameSequenceCanvas from './FrameSequenceCanvas'

const HeroScene = forwardRef(function HeroScene(
  { stageRef, heroVisualRef, transitionVisualRef, frames, transitionFrames },
  ref,
) {
  return (
    <section className="scene scene--hero" ref={ref} id="story">
      <div className="scene__sticky scene__sticky--hero" ref={stageRef}>
        <div className="scene__visual-stack">
          <FrameSequenceCanvas
            ref={heroVisualRef}
            frames={frames}
            className="scene__canvas scene__canvas--hero"
            priorityCount={20}
            dimmed
          />
          <FrameSequenceCanvas
            ref={transitionVisualRef}
            frames={transitionFrames}
            className="scene__canvas scene__canvas--transition"
            priorityCount={14}
          />
          <div className="scene__ambient scene__ambient--hero" />
          <div className="scene__halo scene__halo--left" />
          <div className="scene__halo scene__halo--center" />
          <div className="scene__vignette" />
          <div className="scene__veil" />
        </div>

        <div className="hero-copy" data-hero-copy>
          <div className="hero-copy__topline">
            <p className="hero-copy__eyebrow">Scroll-controlled atelier collection</p>
            <span className="hero-copy__edition">Edition / launch capsule</span>
          </div>
          <div className="hero-copy__headline">
            <span className="reveal-line">Chocolate,</span>
            <span className="reveal-line">directed like</span>
            <span className="reveal-line">cinema.</span>
          </div>
          <p className="hero-copy__body">
            A restrained luxury landing page where scroll reveals the product with the pace
            of a film trailer, not the density of a marketing template.
          </p>
          <div className="hero-copy__details">
            <div className="hero-detail">
              <span>Direction</span>
              <strong>Editorial typography, controlled motion, no visual filler.</strong>
            </div>
            <div className="hero-detail">
              <span>Composition</span>
              <strong>Negative space preserved so the frames stay luxurious and legible.</strong>
            </div>
          </div>
          <div className="hero-actions">
            <a href="#reserve" className="button button--solid">
              Reserve the launch box
            </a>
            <a href="#craft" className="button button--ghost">
              Explore the craft
            </a>
          </div>
        </div>

        <div className="hero-side-note">
          <span>Scene notes</span>
          <p>Warm highlights, softened contrast, and frame-led storytelling designed to feel premium without becoming noisy.</p>
        </div>

        <div className="hero-rail" aria-hidden="true">
          <span>Scroll</span>
          <i />
          <small>01 / 02</small>
        </div>
      </div>
    </section>
  )
})

export default HeroScene
