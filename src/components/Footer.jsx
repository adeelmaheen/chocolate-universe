export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__column site-footer__column--brand">
            <p className="site-footer__eyebrow">Veloura Atelier</p>
            <h3>Luxury chocolate storytelling shaped like a launch world, not a template.</h3>
            <p className="site-footer__body">
              Built for immersive reveals, tactile typography, and a quieter kind of premium.
            </p>
          </div>
          <div className="site-footer__column">
            <span className="site-footer__label">Explore</span>
            <nav className="site-footer__links" aria-label="Footer navigation">
              <a href="#story">Story</a>
              <a href="#craft">Craft</a>
              <a href="#reserve">Reserve</a>
            </nav>
          </div>
          <div className="site-footer__column site-footer__column--contact">
            <span className="site-footer__label">Contact</span>
            <a className="site-footer__mail" href="mailto:atelier@veloura.example">
              atelier@veloura.example
            </a>
            <p className="site-footer__note">Private tastings, capsule launches, and brand collaborations.</p>
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>2026 Veloura Atelier</span>
          <span>Cinematic chocolate house</span>
        </div>
      </div>
    </footer>
  )
}
