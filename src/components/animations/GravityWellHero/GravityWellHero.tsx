// @ts-nocheck
'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function GravityWellHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 1000)
    camera.position.set(0, 0.8, 5.5)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const sceneGroup = new THREE.Group()
    sceneGroup.rotation.x = -0.25
    sceneGroup.rotation.z = 0.1
    scene.add(sceneGroup)

    // === EVENT HORIZON ===
    const horizonGeo = new THREE.SphereGeometry(0.85, 64, 64)
    const horizonMat = new THREE.MeshBasicMaterial({ color: 0x050200 })
    const horizon = new THREE.Mesh(horizonGeo, horizonMat)
    sceneGroup.add(horizon)

    // === PHOTON RING ===
    const photonRings = []
    for (let j = 0; j < 3; j++) {
      const r = 0.88 + j * 0.02
      const thickness = 0.008 - j * 0.002
      const ringGeo = new THREE.TorusGeometry(r, thickness, 8, 200)
      const brightness = 1.0 - j * 0.25
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(brightness, brightness * 0.85, brightness * 0.5),
        transparent: true,
        opacity: 0.9 - j * 0.2,
      })
      const ring = new THREE.Mesh(ringGeo, ringMat)
      ring.rotation.x = Math.PI / 2
      sceneGroup.add(ring)
      photonRings.push({ mesh: ring, mat: ringMat })
    }

    // === ACCRETION DISK ===
    const diskRings = []
    const diskRingCount = 40

    for (let i = 0; i < diskRingCount; i++) {
      const t = i / diskRingCount
      const r = 1.1 + t * 2.8
      const tubeR = 0.01 + t * 0.03 + Math.random() * 0.01
      const ringGeo = new THREE.TorusGeometry(r, tubeR, 6, 256)

      let cr, cg, cb, opacity
      if (t < 0.15) {
        cr = 1.0; cg = 0.92; cb = 0.7; opacity = 0.7
      } else if (t < 0.4) {
        const tt = (t - 0.15) / 0.25
        cr = 1.0; cg = 0.8 - tt * 0.25; cb = 0.4 - tt * 0.3; opacity = 0.6 - tt * 0.1
      } else if (t < 0.7) {
        const tt = (t - 0.4) / 0.3
        cr = 1.0 - tt * 0.15; cg = 0.5 - tt * 0.15; cb = 0.1; opacity = 0.45 - tt * 0.1
      } else {
        const tt = (t - 0.7) / 0.3
        cr = 0.7 - tt * 0.35; cg = 0.3 - tt * 0.15; cb = 0.08; opacity = 0.3 - tt * 0.15
      }

      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(cr, cg, cb),
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      })

      const ring = new THREE.Mesh(ringGeo, ringMat)
      ring.rotation.x = Math.PI / 2
      sceneGroup.add(ring)
      diskRings.push({ mesh: ring, mat: ringMat, baseR: r, speed: 0.15 / Math.pow(r, 1.5), phase: Math.random() * Math.PI * 2 })
    }

    // === GRAVITATIONAL LENSING ARCS ===
    const lensArcs = []

    for (let side = -1; side <= 1; side += 2) {
      for (let a = 0; a < 6; a++) {
        const points = []
        const arcHeight = (0.55 + a * 0.12) * side
        const arcR = 0.9 + a * 0.07
        const steps = 80

        for (let s = 0; s <= steps; s++) {
          const st = s / steps
          // Symmetrical semicircle from -90° to +90°
          const angle = -Math.PI * 0.5 + st * Math.PI
          const x = arcR * Math.cos(angle)
          const z = arcR * Math.sin(angle) * 0.3
          const y = arcHeight * Math.sin(st * Math.PI)
          points.push(new THREE.Vector3(x, y, z))
        }

        const curve = new THREE.CatmullRomCurve3(points)
        const tubeGeo = new THREE.TubeGeometry(curve, 60, 0.012 + a * 0.004, 6, false)

        const brightness = 0.9 - a * 0.1
        const tubeMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(brightness, brightness * 0.7, brightness * 0.35),
          transparent: true,
          opacity: 0.35 - a * 0.04,
          blending: THREE.AdditiveBlending,
          side: THREE.DoubleSide,
        })

        const tube = new THREE.Mesh(tubeGeo, tubeMat)
        sceneGroup.add(tube)
        lensArcs.push({ mesh: tube, mat: tubeMat, geo: tubeGeo })
      }
    }

    // === GLOW ===
    const glowGeo = new THREE.RingGeometry(0.86, 1.6, 64)
    const glowMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(1.0, 0.65, 0.2),
      transparent: true,
      opacity: 0.06,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    })
    const glow = new THREE.Mesh(glowGeo, glowMat)
    glow.rotation.x = Math.PI / 2
    sceneGroup.add(glow)

    const outerGlowGeo = new THREE.RingGeometry(1.0, 3.5, 64)
    const outerGlowMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0.8, 0.4, 0.1),
      transparent: true,
      opacity: 0.03,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    })
    const outerGlow = new THREE.Mesh(outerGlowGeo, outerGlowMat)
    outerGlow.rotation.x = Math.PI / 2
    sceneGroup.add(outerGlow)

    // === BACKGROUND STARS ===
    const starCount = 1500
    const starGeo = new THREE.BufferGeometry()
    const starPos = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 30
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 20
      starPos[i * 3 + 2] = -5 - Math.random() * 15
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3))
    const starMat = new THREE.PointsMaterial({ size: 0.02, color: 0xffffff, transparent: true, opacity: 0.6 })
    const stars = new THREE.Points(starGeo, starMat)
    scene.add(stars)

    // === EVENTS ===
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)

    let clickPulse = 0
    const handleClick = () => { clickPulse = 1.0 }
    window.addEventListener('click', handleClick)

    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    let animationId: number
    const timer = new THREE.Timer()

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      timer.update()
      const elapsed = timer.getElapsed()

      clickPulse *= 0.95

      // Slow continuous rotation of the entire black hole
      sceneGroup.rotation.y = elapsed * 0.03

      // Rotate disk rings at Keplerian speeds
      diskRings.forEach((ring) => {
        ring.mesh.rotation.z += (ring.speed + clickPulse * ring.speed * 3) * 0.016
        ring.mat.opacity = ring.mat.opacity + Math.sin(elapsed * 2 + ring.phase) * 0.001
      })

      // Photon ring shimmer
      photonRings.forEach((pr, i) => {
        pr.mat.opacity = 0.7 + Math.sin(elapsed * 4 + i) * 0.15 + clickPulse * 0.2
      })

      // Glow pulse
      glowMat.opacity = 0.05 + Math.sin(elapsed * 1.5) * 0.02 + clickPulse * 0.08
      outerGlowMat.opacity = 0.025 + Math.sin(elapsed) * 0.01 + clickPulse * 0.04

      // Lensing arcs breathing
      lensArcs.forEach((arc, i) => {
        arc.mat.opacity = (0.3 - (i % 6) * 0.04) + Math.sin(elapsed * 1.2 + i * 0.5) * 0.03
      })

      // Camera: subtle mouse-based shift (no orbit, just gentle parallax)
      camera.position.x += (mouseRef.current.x * 0.6 - camera.position.x) * 0.015
      camera.position.y += (0.8 + mouseRef.current.y * 0.4 - camera.position.y) * 0.015
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
      horizonGeo.dispose(); horizonMat.dispose()
      photonRings.forEach(pr => { pr.mesh.geometry.dispose(); pr.mat.dispose() })
      diskRings.forEach(dr => { dr.mesh.geometry.dispose(); dr.mat.dispose() })
      lensArcs.forEach(la => { la.geo.dispose(); la.mat.dispose() })
      glowGeo.dispose(); glowMat.dispose()
      outerGlowGeo.dispose(); outerGlowMat.dispose()
      starGeo.dispose(); starMat.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

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
