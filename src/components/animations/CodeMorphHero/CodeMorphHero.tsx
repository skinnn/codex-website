// @ts-nocheck
'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface CodeMorphHeroProps {
  /** The text that particles morph into */
  text?: string
  /** Delay in seconds before morphing starts (default: 4) */
  morphDelay?: number
  /** Duration in seconds for the morph animation (default: 3) */
  morphDuration?: number
  /** Scale multiplier for text size (default: 1) */
  scale?: number
  /** Particle color at start [r, g, b] 0-1 (default: [0.25, 0.6, 0.9]) */
  startColor?: [number, number, number]
  /** Particle color when morphed [r, g, b] 0-1 (default: same as startColor) */
  endColor?: [number, number, number]
}

export default function CodeMorphHero({
  text = 'Crossing Every "X" in Your Digital Journey',
  morphDelay = 4,
  morphDuration = 3,
  scale = 1,
  startColor = [0.11, 0.83, 0.69],
  endColor,
}: CodeMorphHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  // If no endColor, keep same as start (no transition)
  const finalEndColor = endColor || startColor

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000)
    camera.position.z = 6

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Generate text points
    const textPoints: THREE.Vector3[] = []
    const canvasEl = document.createElement('canvas')
    const ctx = canvasEl.getContext('2d')!
    const canvasW = 1024
    const canvasH = 256
    canvasEl.width = canvasW
    canvasEl.height = canvasH

    let fontSize = 80
    ctx.font = `bold ${fontSize}px Inter, sans-serif`
    let textWidth = ctx.measureText(text).width
    while (textWidth > canvasW * 0.9 && fontSize > 16) {
      fontSize -= 2
      ctx.font = `bold ${fontSize}px Inter, sans-serif`
      textWidth = ctx.measureText(text).width
    }

    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, canvasW / 2, canvasH / 2)

    const imageData = ctx.getImageData(0, 0, canvasW, canvasH)
    const sampleStep = 2
    const worldWidth = 8 * scale
    const worldHeight = 3 * scale
    const scaleX = worldWidth / canvasW
    const scaleY = worldHeight / canvasH

    for (let y = 0; y < canvasH; y += sampleStep) {
      for (let x = 0; x < canvasW; x += sampleStep) {
        const alpha = imageData.data[(y * canvasW + x) * 4 + 3]
        if (alpha > 128) {
          textPoints.push(new THREE.Vector3(
            (x - canvasW / 2) * scaleX,
            (canvasH / 2 - y) * scaleY,
            (Math.random() - 0.5) * 0.1
          ))
        }
      }
    }

    const particleCount = Math.max(textPoints.length, 2500)
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const targetPositions = new Float32Array(particleCount * 3)
    const phases = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3

      const angle = Math.random() * Math.PI * 2
      const r = 2 + Math.random() * 5
      positions[i3] = r * Math.cos(angle) + (Math.random() - 0.5) * 2
      positions[i3 + 1] = (Math.random() - 0.5) * 5
      positions[i3 + 2] = (Math.random() - 0.5) * 3

      const targetIdx = i % textPoints.length
      const target = textPoints[targetIdx]
      targetPositions[i3] = target.x + (Math.random() - 0.5) * 0.03
      targetPositions[i3 + 1] = target.y + (Math.random() - 0.5) * 0.03
      targetPositions[i3 + 2] = target.z

      phases[i] = Math.random() * Math.PI * 2

      // Start with startColor + slight variation
      const variation = (Math.random() - 0.5) * 0.15
      colors[i3] = startColor[0] + variation
      colors[i3 + 1] = startColor[1] + variation
      colors[i3 + 2] = startColor[2] + variation
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.03 * scale,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)

    let clickScatter = 0
    const handleClick = () => { clickScatter = 1.0 }
    window.addEventListener('click', handleClick)

    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    let animationId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      clickScatter *= 0.97

      let morphProgress = 0
      if (elapsed > morphDelay) {
        morphProgress = Math.min(1, (elapsed - morphDelay) / morphDuration)
        morphProgress = morphProgress * morphProgress * (3 - 2 * morphProgress)
      }

      const effectiveMorph = morphProgress * (1 - clickScatter * 0.6)

      const posArr = geometry.attributes.position.array
      const colArr = geometry.attributes.color.array

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3

        const floatX = Math.sin(elapsed * 0.2 + phases[i]) * 0.002 * (1 - effectiveMorph)
        const floatY = Math.cos(elapsed * 0.15 + phases[i] * 1.3) * 0.002 * (1 - effectiveMorph)

        const scatterX = Math.sin(phases[i] * 7) * clickScatter * 0.3
        const scatterY = Math.cos(phases[i] * 5) * clickScatter * 0.3

        const tx = targetPositions[i3] + Math.sin(elapsed * 0.5 + phases[i]) * 0.01 * (1 - effectiveMorph)
        const ty = targetPositions[i3 + 1] + Math.cos(elapsed * 0.4 + phases[i]) * 0.01 * (1 - effectiveMorph)
        const tz = targetPositions[i3 + 2]

        const goalX = posArr[i3] + floatX + scatterX + (tx - posArr[i3]) * effectiveMorph * 0.12
        const goalY = posArr[i3 + 1] + floatY + scatterY + (ty - posArr[i3 + 1]) * effectiveMorph * 0.12
        const goalZ = posArr[i3 + 2] + (tz - posArr[i3 + 2]) * effectiveMorph * 0.08

        posArr[i3] += (goalX - posArr[i3]) * 0.08
        posArr[i3 + 1] += (goalY - posArr[i3 + 1]) * 0.08
        posArr[i3 + 2] += (goalZ - posArr[i3 + 2]) * 0.06

        // Color: lerp from startColor to endColor based on morph
        const variation = (Math.random() - 0.5) * 0.02
        colArr[i3] = startColor[0] + (finalEndColor[0] - startColor[0]) * effectiveMorph + variation
        colArr[i3 + 1] = startColor[1] + (finalEndColor[1] - startColor[1]) * effectiveMorph + variation
        colArr[i3 + 2] = startColor[2] + (finalEndColor[2] - startColor[2]) * effectiveMorph + variation
      }

      geometry.attributes.position.needsUpdate = true
      geometry.attributes.color.needsUpdate = true

      camera.position.x += (mouseRef.current.x * 0.4 - camera.position.x) * 0.02
      camera.position.y += (mouseRef.current.y * 0.25 - camera.position.y) * 0.02
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [text, morphDelay, morphDuration, scale, startColor, finalEndColor])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  )
}
