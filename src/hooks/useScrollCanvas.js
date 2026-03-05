import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * Custom hook for scroll-driven image sequence animation on a canvas.
 * Preloads all frames and draws the current frame based on scroll position.
 *
 * @param {object} options
 * @param {string} options.folder - Path to the folder containing frames
 * @param {number} options.frameCount - Total number of frames
 * @param {number} [options.startIndex=0] - The starting index for frame numbering (e.g., 24 for "ezgif-frame-024.jpg")
 * @param {string} options.prefix - File name prefix (e.g. "ezgif-frame-")
 * @param {string} options.extension - File extension (e.g. ".jpg")
 * @param {number} options.padLength - Zero-padding length for frame numbers
 * @returns {{ canvasRef, progress, currentFrame, isLoaded }}
 */
export default function useScrollCanvas({
    folder,
    frameCount,
    startIndex = 0,
    prefix = 'ezgif-frame-',
    extension = '.jpg',
    padLength = 3,
    disabled = false,
}) {
    const canvasRef = useRef(null)
    const containerRef = useRef(null)
    const imagesRef = useRef([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [progress, setProgress] = useState(0)
    const [currentFrame, setCurrentFrame] = useState(0)
    const rafRef = useRef(null)

    // Build frame path — offset by startIndex so frame 0 maps to startIndex+1
    const getFramePath = useCallback(
        (index) => {
            const num = String(startIndex + index + 1).padStart(padLength, '0')
            return `${folder}/${prefix}${num}${extension}`
        },
        [folder, prefix, extension, padLength, startIndex]
    )

    // Preload all images
    useEffect(() => {
        if (disabled) return
        let cancelled = false
        const images = []

        const loadImage = (src) =>
            new Promise((resolve) => {
                const img = new Image()
                img.onload = () => resolve(img)
                img.onerror = () => resolve(null)
                img.src = src
            })

        async function preload() {
            // Load first frame immediately for instant display
            const firstImg = await loadImage(getFramePath(0))
            if (firstImg && !cancelled) {
                images[0] = firstImg
                // Draw first frame immediately
                const canvas = canvasRef.current
                if (canvas) {
                    const ctx = canvas.getContext('2d')
                    canvas.width = firstImg.naturalWidth
                    canvas.height = firstImg.naturalHeight
                    ctx.drawImage(firstImg, 0, 0)
                }
            }

            // Load rest in parallel batches
            const batchSize = 10
            for (let i = 1; i < frameCount; i += batchSize) {
                if (cancelled) return
                const batch = []
                for (let j = i; j < Math.min(i + batchSize, frameCount); j++) {
                    batch.push(
                        loadImage(getFramePath(j)).then((img) => {
                            if (img) images[j] = img
                        })
                    )
                }
                await Promise.all(batch)
            }

            if (!cancelled) {
                imagesRef.current = images
                setIsLoaded(true)
            }
        }

        preload()

        return () => {
            cancelled = true
        }
    }, [frameCount, getFramePath, disabled])

    // Draw frame on canvas
    const drawFrame = useCallback(
        (frameIndex) => {
            const canvas = canvasRef.current
            const img = imagesRef.current[frameIndex]
            if (!canvas || !img) return

            const ctx = canvas.getContext('2d')

            // Fit canvas to container
            const container = canvas.parentElement
            if (container) {
                const dpr = window.devicePixelRatio || 1
                const rect = container.getBoundingClientRect()
                canvas.width = rect.width * dpr
                canvas.height = rect.height * dpr
                ctx.scale(dpr, dpr)
                canvas.style.width = rect.width + 'px'
                canvas.style.height = rect.height + 'px'
            }

            // Draw image cover-fit
            const cw = canvas.width / (window.devicePixelRatio || 1)
            const ch = canvas.height / (window.devicePixelRatio || 1)
            const iw = img.naturalWidth
            const ih = img.naturalHeight

            const scale = Math.max(cw / iw, ch / ih)
            const sw = iw * scale
            const sh = ih * scale
            const sx = (cw - sw) / 2
            const sy = (ch - sh) / 2

            ctx.clearRect(0, 0, cw, ch)
            ctx.drawImage(img, sx, sy, sw, sh)
        },
        []
    )

    // Scroll handler
    useEffect(() => {
        if (!isLoaded) return

        const handleScroll = () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)

            rafRef.current = requestAnimationFrame(() => {
                const container = canvasRef.current?.closest('[data-scroll-container]')
                if (!container) return

                const rect = container.getBoundingClientRect()
                const containerHeight = container.scrollHeight || container.offsetHeight
                const viewportHeight = window.innerHeight

                // Calculate scroll progress within this section (0 to 1)
                const scrollTop = -rect.top
                const scrollRange = containerHeight - viewportHeight
                const rawProgress = Math.max(0, Math.min(1, scrollTop / scrollRange))

                setProgress(rawProgress)

                const frameIndex = Math.min(
                    frameCount - 1,
                    Math.max(0, Math.floor(rawProgress * (frameCount - 1)))
                )
                setCurrentFrame(frameIndex)
                drawFrame(frameIndex)
            })
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('resize', handleScroll, { passive: true })
        handleScroll()

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleScroll)
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [isLoaded, frameCount, drawFrame])

    return { canvasRef, progress, currentFrame, isLoaded }
}
