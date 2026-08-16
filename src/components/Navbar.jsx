export default function Navbar() {
  return (
    <header className="site-nav">
      <div className="site-nav__inner">
        <div className="site-nav__brand" data-nav-reveal>
          <span className="site-nav__brand-mark" />
          <div>
            <p>Veloura Atelier</p>
            <span>Chocolate Cinema House</span>
          </div>
        </div>
        <nav className="site-nav__links" aria-label="Primary navigation">
          <a href="#story" data-nav-reveal>
            Story
          </a>
          <a href="#craft" data-nav-reveal>
            Craft
          </a>
          <a href="#reserve" data-nav-reveal>
            Reserve
          </a>
        </nav>
        <a href="#reserve" className="site-nav__cta" data-nav-reveal>
          Private Tasting
        </a>
      </div>
    </header>
  )
}
