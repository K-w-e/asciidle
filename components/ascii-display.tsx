import { useEffect, useRef, useState } from "react"

interface AsciiDisplayProps {
  art: string
  difficulty: string
  attempts: number
  maxAttempts: number
}

export default function AsciiDisplay({ art, difficulty, attempts, maxAttempts }: AsciiDisplayProps) {
  const containerRef = useRef<HTMLPreElement>(null)
  const [revealedLines, setRevealedLines] = useState(0)
  const [revealedIndices, setRevealedIndices] = useState<number[]>(() => {
    return art.split('').map((char, index) => char === '\n' ? index : -1).filter(index => index !== -1)
  })

  useEffect(() => {
    setRevealedIndices(art.split('').map((char, index) => char === '\n' ? index : -1).filter(index => index !== -1))
  }, [art])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [revealedLines])

  useEffect(() => {
    if (difficulty === 'timed') {
      const lines = art.split('\n').length
      if (revealedLines < lines) {
        const timer = setTimeout(() => {
          setRevealedLines(prev => prev + 1)
        }, 2000 / Math.pow(revealedLines + 1, 0.5)) // Adjust the speed exponentially
        return () => clearTimeout(timer)
      }
    } else if (difficulty === 'bogo') {
      const totalChars = art.length
      if (revealedIndices.length < totalChars) {
        const timer = setTimeout(() => {
          const newRevealedIndices = [...revealedIndices]
          while (newRevealedIndices.length < Math.min(revealedIndices.length + 10, totalChars)) {
            const randomIndex = Math.floor(Math.random() * totalChars)
            if (!newRevealedIndices.includes(randomIndex)) {
              newRevealedIndices.push(randomIndex)
            }
          }
          setRevealedIndices(newRevealedIndices)
        }, 2000 / Math.pow(totalChars - revealedIndices.length, 0.5)) // Adjust the speed exponentially
        return () => clearTimeout(timer)
      }
    }
  }, [difficulty, revealedLines, revealedIndices, art])

  if (difficulty === "easy") {
    return <pre className="font-mono text-green-400 whitespace-pre overflow-x-auto">{art}</pre>
  }

  if (difficulty === "bogo") {
    const visibleChars = art.split('').map((char, index) => revealedIndices.includes(index) ? char : ' ').join('')
    const hiddenChars = art.length - revealedIndices.length

    return (
      <pre ref={containerRef} className="font-mono text-green-400 whitespace-pre overflow-x-auto max-h-[400px]">
        {visibleChars}
        {hiddenChars > 0 && (
          <span className="text-slate-600">
            {"\n"}
            {"..."}
          </span>
        )}
      </pre>
    )
  }

  if (difficulty === "classic") {
    const totalChars = art.length
    const revealedChars = Math.floor(totalChars * (attempts / maxAttempts))
    const visibleChars = art.split('').map((char, index) => (revealedIndices.includes(index) || char === '\n') ? char : ' ').join('')

    useEffect(() => {
      const newRevealedIndices = [...revealedIndices]
      while (newRevealedIndices.length < revealedChars) {
        const randomIndex = Math.floor(Math.random() * totalChars)
        if (!newRevealedIndices.includes(randomIndex)) {
          newRevealedIndices.push(randomIndex)
        }
      }
      setRevealedIndices(newRevealedIndices)
    }, [revealedChars, revealedIndices, totalChars])

    return (
      <pre className="font-mono text-green-400 whitespace-pre overflow-x-auto">
        {visibleChars}
      </pre>
    )
  }

  const lines = art.split("\n")
  const visibleLines = lines.slice(0, revealedLines)
  const hiddenLines = lines.slice(revealedLines)

  return (
    <pre ref={containerRef} className="font-mono text-green-400 whitespace-pre overflow-x-auto max-h-[400px]">
      {visibleLines.join("\n")}
      {hiddenLines.length > 0 && (
        <span className="text-slate-600">
          {"\n"}
          {"..."}
        </span>
      )}
    </pre>
  )
}

