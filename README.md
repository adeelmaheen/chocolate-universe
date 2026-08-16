# Chocolate Universe

A cinematic React + Vite landing page for a premium chocolate brand concept.

The project uses scroll-driven frame sequences, layered motion, and editorial copy to present the product like a short film instead of a standard ecommerce hero section.

## Highlights

- Scroll-synced frame-by-frame storytelling
- Two visual chapters with a transition between hero and craft scenes
- GSAP `ScrollTrigger` animations
- Smooth scrolling with Lenis
- React 19 + Vite setup

## Tech Stack

- React
- Vite
- GSAP
- Lenis

## Project Structure

```text
src/
  components/
    FrameSequenceCanvas.jsx
    HeroScene.jsx
    Navbar.jsx
    SecondScene.jsx
    SmoothScroll.jsx
  lib/
    framePaths.js
  styles/
    global.css
  App.jsx
  main.jsx
public/
  video_frames/
  video_2_frames/
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## How It Works

- The main hero sequence plays through a set of image frames as the user scrolls.
- A transition layer blends from the first frame sequence into the second one.
- The second section continues the story with a calmer composition focused on craft and atmosphere.
- Text elements animate in with GSAP to match the pacing of the visual sequence.

## Notes

- Frame assets are stored in `public/video_frames` and `public/video_2_frames`.
- The repository currently includes generated output in `dist/` and installed packages in `node_modules/`.

## License

This project is currently unlicensed.
