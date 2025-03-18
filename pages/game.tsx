"use client"

import type React from "react"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AsciiDisplay from '@/components/ascii-display'
import GameOver from '@/components/game-over'
import Head from 'next/head'
import Link from "next/link"
import { AsciiArt } from "@/types/AsciiArt"

export default function GamePage() {
  const router = useRouter()

  const [asciiArtData, setAsciiArtData] = useState<AsciiArt>({ id: '', art: '', answer: [] })
  const [guess, setGuess] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [maxAttempts] = useState(5)
  const [gameOver, setGameOver] = useState(false)
  const [win, setWin] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [difficulty, setDifficulty] = useState<string | undefined>(undefined)
  const [includeText, setIncludeText] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    if (!router.isReady) return

    setDifficulty(router.query.difficulty as string)
    setIncludeText(router.query.includeText as unknown as boolean)

    fetchArt()
  }, [router.isReady, router.query.difficulty])

  const fetchArt = () => {
    let url: string = "/api/ascii-art";

    if (includeText) {
      const urls = ['/api/ascii-art', '/api/generate-ascii'];
      url = urls[Math.floor(Math.random() * urls.length)];
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setAsciiArtData(data)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error fetching ASCII art:', error)
        setIsLoading(false)
      })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (guess.trim() === '') return

    const isCorrect = asciiArtData.answer.includes(guess.toLowerCase())

    if (isCorrect) {
      setWin(true)
      setGameOver(true)
      setMessage('Congratulation! You won!')
    } else {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      setGuess('')

      if (newAttempts >= maxAttempts) {
        setGameOver(true)
        setMessage(`You lost! Correct answers: ${asciiArtData.answer}`)
      } else {
        setMessage(`Wrong attempt! You have ${maxAttempts - newAttempts} attempts left.`)
      }
    }
  }

  const playAgain = () => {
    setGuess('')
    setAttempts(0)
    setGameOver(false)
    setWin(false)
    setMessage('')
    fetchArt()
  }

  const goHome = () => {
    router.push('/')
  }

  if (isLoading || !difficulty) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white">
        <p className="text-xl">Loading...</p>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Asciidle - Gioca</title>
        <meta name="description" content="Indovina cosa rappresenta l'ASCII art" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-slate-900 text-white">
        <div className="max-w-3xl w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-green-400 font-mono">
              <Link href="/">ASCIIDLE</Link>
            </h1>
            <div className="text-right">
              <p className="text-sm">Mode: {difficulty == 'easy' ? 'Easy' : difficulty == 'timed' ? 'Timed' : 'Bogo'}</p>
              <p className="text-sm">Attempts: {attempts}/{maxAttempts}</p>
            </div>
          </div>

          {gameOver ? (
            <GameOver
              win={win}
              message={message}
              ascii={asciiArtData}
              onPlayAgain={playAgain}
              onGoHome={goHome}
            />
          ) : (
            <>
              <div className="bg-slate-800 p-4 rounded-lg mb-6 overflow-x-auto">
                <AsciiDisplay
                  art={asciiArtData.art}
                  difficulty={difficulty}
                  attempts={attempts}
                  maxAttempts={maxAttempts}
                />
              </div>

              {message && (
                <div className={`p-3 mb-4 rounded-md ${message.includes('Congratulation') ? 'bg-green-900/50' : 'bg-red-900/50'}`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  type="text"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  placeholder="What does this drawing represent?"
                  className="flex-1 bg-slate-800 border-green-500 text-white"
                />
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Guess
                </Button>
              </form>
            </>
          )}
        </div>
      </main>
    </>
  )
}
