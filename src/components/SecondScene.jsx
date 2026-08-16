import { forwardRef } from 'react'
import FrameSequenceCanvas from './FrameSequenceCanvas'

const SecondScene = forwardRef(function SecondScene({ visualRef, frames }, ref) {
  return (
    <section className="scene scene--second" id="craft">
      <div className="scene__track scene__track--second" ref={ref}>
        <div className="scene__sticky scene__sticky--second">
        <div className="scene__visual-stack scene__visual-stack--second">
          <FrameSequenceCanvas
            ref={visualRef}
            frames={frames}
            className="scene__canvas scene__canvas--second"
            priorityCount={18}
          />
          <div className="scene__ambient scene__ambient--second" />
          <div className="scene__halo scene__halo--right" />
          <div className="scene__vignette scene__vignette--warm" />
          <div className="scene__veil scene__veil--warm" />
        </div>

        <div className="scene-copy" data-second-copy>
          <div className="scene-copy__topline">
            <p className="scene-copy__eyebrow">Cinematic craft chapter</p>
            <span className="scene-copy__label">Studio notes / tempering room</span>
          </div>
          <div className="scene-copy__headline">
            <span className="reveal-line">Then the</span>
            <span className="reveal-line">spectacle quiets</span>
            <span className="reveal-line">into craft.</span>
          </div>
          <p className="scene-copy__body">
            The second movement trades impact for control. Materials, process, and finish
            take over, while the layout gives the imagery enough room to breathe.
          </p>
          <div className="scene-copy__meta">
            <span>Small-batch finish</span>
            <span>Textural layering</span>
            <span>Cold-stone polish</span>
          </div>
          <div className="scene-copy__panel">
            <div>
              <span>Atmosphere</span>
              <strong>Dense gloss, soft smoke, low-gold reflections.</strong>
            </div>
            <div>
              <span>Direction</span>
              <strong>A quieter second act with more negative space.</strong>
            </div>
          </div>
          <a href="#reserve" className="button button--solid scene-copy__action">
            Request a private pour
          </a>
        </div>
      </div>
      </div>

      <section className="reserve-panel" id="reserve">
        <div className="reserve-panel__inner">
          <p>Veloura Atelier</p>
          <h2>Designed as an interactive launch world for a premium chocolate house.</h2>
          <a href="mailto:atelier@veloura.example">atelier@veloura.example</a>
        </div>
      </section>
    </section>
  )
})

export default SecondScene
