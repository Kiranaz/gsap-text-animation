'use client'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

interface AnimatedTextProps {
  text: string
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text }) => {
  const textRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const textElement = textRef.current
    const lineElement = lineRef.current
    if (!textElement || !lineElement) return

    const scrambleChars =
      '!@#$%^&*()_+[]{}|;:,<.>?/~`abcdefghijklmnopqrstuvwxyz'
    const timeline = gsap.timeline()

    const scrambleCharacter = (index: number) => {
      const randomChar = scrambleChars.charAt(
        Math.floor(Math.random() * scrambleChars.length)
      )
      timeline.to(textElement.children[index], {
        textContent: randomChar,
        ease: 'power3.out',
        duration: 0.1,
      })
    }

    // Scramble characters twice
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < text.length; j++) {
        scrambleCharacter(j)
      }
    }

    // Reveal actual text
    for (let i = 0; i < text.length; i++) {
      timeline.to(textElement.children[i], {
        textContent: text[i],
        ease: 'power3.out',
        duration: 0.1,
        delay: i * 0.1,
      })
    }

    // Line animation
    timeline.to(lineElement, {
      width: '20%',
      duration: 0.6,
      ease: 'power2.out',
      delay: 0.5,
    })

    return () => {
      timeline.kill()
    }
  }, [text])

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-black'>
      <div
        ref={textRef}
        className='flex space-x-1 text-6xl font-bold text-white font-mono'
      >
        {Array.from(text).map((char, i) => (
          <span key={i}>{char}</span>
        ))}
      </div>
      <div ref={lineRef} className='mt-2 h-1 bg-white w-0' />
    </div>
  )
}

export default AnimatedText
