export function buildFramePaths(basePath, count) {
  return Array.from({ length: count }, (_, index) => {
    const frame = String(index + 1).padStart(3, '0')
    return `${basePath}/frame_${frame}.jpg`
  })
}
