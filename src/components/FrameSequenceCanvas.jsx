import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

const FrameSequenceCanvas = forwardRef(function FrameSequenceCanvas(
  { frames, className = '', priorityCount = 12, dimmed = false },
  ref,
) {
  const canvasRef = useRef(null)
  const stateRef = useRef({
    frameIndex: 0,
    blend: dimmed ? 0.72 : 1,
    blur: 0,
    mask: 1,
    loaded: new Map(),
    renderQueued: false,
  })

  const draw = () => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const image = stateRef.current.loaded.get(stateRef.current.frameIndex)
    if (!image) {
      return
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const rect = canvas.getBoundingClientRect()
    const width = Math.round(rect.width * dpr)
    const height = Math.round(rect.height * dpr)

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
    }

    const ctx = canvas.getContext('2d')
    const scale = Math.max(width / image.width, height / image.height)
    const drawWidth = image.width * scale
    const drawHeight = image.height * scale
    const x = (width - drawWidth) * 0.5
    const y = (height - drawHeight) * 0.5

    ctx.clearRect(0, 0, width, height)
    ctx.save()
    ctx.filter = `blur(${stateRef.current.blur}px)`

    if (stateRef.current.mask < 1) {
      const gradient = ctx.createRadialGradient(
        width * 0.52,
        height * 0.48,
        width * 0.03,
        width * 0.52,
        height * 0.48,
        width * (0.08 + stateRef.current.mask * 0.78),
      )

      gradient.addColorStop(0, 'rgba(255,255,255,1)')
      gradient.addColorStop(Math.max(stateRef.current.mask * 0.86, 0.45), 'rgba(255,255,255,0.96)')
      gradient.addColorStop(1, 'rgba(255,255,255,0)')

      ctx.globalCompositeOperation = 'source-over'
      ctx.save()
      ctx.beginPath()
      ctx.rect(0, 0, width, height)
      ctx.fillStyle = gradient
      ctx.fill()
      ctx.globalCompositeOperation = 'source-in'
      ctx.globalAlpha = stateRef.current.blend
      ctx.drawImage(image, x, y, drawWidth, drawHeight)
      ctx.restore()
    } else {
      ctx.globalAlpha = stateRef.current.blend
      ctx.drawImage(image, x, y, drawWidth, drawHeight)
    }

    ctx.restore()
  }

  const queueDraw = () => {
    if (stateRef.current.renderQueued) {
      return
    }

    stateRef.current.renderQueued = true
    window.requestAnimationFrame(() => {
      stateRef.current.renderQueued = false
      draw()
    })
  }

  const loadFrame = (index) => {
    if (stateRef.current.loaded.has(index) || !frames[index]) {
      return
    }

    const image = new Image()
    image.src = frames[index]
    image.decoding = 'async'
    image.loading = 'eager'
    image.onload = () => {
      stateRef.current.loaded.set(index, image)
      if (index === stateRef.current.frameIndex) {
        queueDraw()
      }
    }
  }

  const primeNearbyFrames = (index) => {
    for (let offset = -4; offset <= 8; offset += 1) {
      const target = clamp(index + offset, 0, frames.length - 1)
      loadFrame(target)
    }
  }

  useEffect(() => {
    frames.slice(0, priorityCount).forEach((_, index) => loadFrame(index))
    primeNearbyFrames(0)
  }, [frames, priorityCount])

  useEffect(() => {
    const onResize = () => queueDraw()
    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [])

  useImperativeHandle(ref, () => ({
    setFrameProgress(progress) {
      const index = Math.round(clamp(progress, 0, 1) * (frames.length - 1))
      stateRef.current.frameIndex = index
      primeNearbyFrames(index)
      queueDraw()
    },
    setFrameIndex(index) {
      stateRef.current.frameIndex = clamp(index, 0, frames.length - 1)
      primeNearbyFrames(stateRef.current.frameIndex)
      queueDraw()
    },
    setBlend(value) {
      stateRef.current.blend = clamp(value, 0, 1)
      queueDraw()
    },
    setOverlay(value) {
      stateRef.current.blend = clamp(value, 0.55, 1)
      queueDraw()
    },
    setBlur(value) {
      stateRef.current.blur = Math.max(value, 0)
      queueDraw()
    },
    setMask(value) {
      stateRef.current.mask = clamp(value, 0, 1)
      queueDraw()
    },
  }))

  return <canvas ref={canvasRef} className={className} />
})

export default FrameSequenceCanvas
