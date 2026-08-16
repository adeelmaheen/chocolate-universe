export default function Navbar() {
  return (
    <header className="site-nav">
      <div className="site-nav__inner">
        <div className="site-nav__brand" data-nav-reveal>
          <span className="site-nav__brand-mark" aria-hidden="true">
            <svg viewBox="0 0 64 64" className="site-nav__brand-icon">
              <defs>
                <linearGradient id="brandIslandGlow" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fff5df" />
                  <stop offset="52%" stopColor="#f6d2a0" />
                  <stop offset="100%" stopColor="#bb6d35" />
                </linearGradient>
              </defs>
              <circle cx="32" cy="15" r="6" fill="url(#brandIslandGlow)" opacity="0.95" />
              <path
                d="M16 30c3-6 9-9 16-9s13 3 16 9c5 0 8 3 8 7 0 6-6 9-24 9S8 43 8 37c0-4 3-7 8-7Z"
                fill="url(#brandIslandGlow)"
              />
              <path
                d="M23 44c-1 5-3 9-7 12M32 45c0 6-2 10-6 13M41 44c1 5 3 9 7 12"
                fill="none"
                stroke="url(#brandIslandGlow)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M25 21c2-4 5-6 7-6 3 0 6 2 8 6"
                fill="none"
                stroke="url(#brandIslandGlow)"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.9"
              />
              <path
                d="M20 27c2-3 5-5 12-5 8 0 11 2 13 5"
                fill="none"
                stroke="#87431f"
                strokeOpacity="0.4"
                strokeWidth="1.5"
              />
            </svg>
          </span>
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
