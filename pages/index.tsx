import Link from "next/link"
import { Button } from "@/components/ui/button"
import Head from "next/head"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { FormControl } from "@/components/ui/form"

export default function Home() {
  const [includeText, setIncludeText] = useState(false)

  return (
    <>
      <Head>
        <title>Asciidle - Guess the ASCII Art</title>
        <meta name="description" content="A game where you have to guess what the ASCII art represents" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-slate-900 text-white">
        <div className="max-w-3xl w-full text-center">
          <h1 className="text-5xl font-bold mb-6 text-green-400 font-mono">ASCIIDLE</h1>
          <p className="text-xl mb-12">Guess the drawing represented by the ASCII art!</p>

          <div className="grid gap-6 mb-12">
            <div className="p-6 border border-green-500 rounded-lg bg-slate-800">
              <h2 className="text-2xl font-mono mb-4 text-green-400">How to Play</h2>
              <p className="mb-4">You will be shown an ASCII art drawing and you have to guess what it represents.</p>
              <p className="mb-4">You have a maximum of 5 attempts to guess.</p>
              <p>Choose the difficulty and test your skills!</p>
            </div>
          </div>

          <div className="grid gap-6 mb-12">
            <div className="p-6 border border-green-500 rounded-lg bg-slate-800">
              <h2 className="text-2xl font-mono mb-4 text-green-400">Include Text</h2>
              <div className="flex items-center justify-center">
                <Switch
                  checked={includeText}
                  onCheckedChange={(checked) => setIncludeText(checked)}
                  className="mr-2 border border-red-500"
                />
                <span>{includeText ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 max-w-md mx-auto">
            <Link href={`/game?difficulty=easy${includeText ? "&text=true" : ""}`} passHref>
              <Button
                variant="outline"
                className="w-full text-lg py-6 border-green-500 text-green-400 hover:bg-green-900/20"
              >
                Easy Mode
              </Button>
            </Link>
            {/*<Link href="/game?difficulty=challenge" passHref>
              <Button
                variant="outline"
                className="w-full text-lg py-6 border-green-500 text-green-400 hover:bg-green-900/20"
              >
                Challenge
              </Button>
            </Link>*/}
            <Link href={`/game?difficulty=classic${includeText ? "&text=true" : ""}`} passHref>
              <Button
                variant="outline"
                className="w-full text-lg py-6 border-green-500 text-green-400 hover:bg-green-900/20"
              >
                Classic
              </Button>
            </Link>
            <Link href={`/game?difficulty=timed${includeText ? "&text=true" : ""}`} passHref>
              <Button
                variant="outline"
                className="w-full text-lg py-6 border-green-500 text-green-400 hover:bg-green-900/20"
              >
                Timed Mode
              </Button>
            </Link>
            <Link href={`/game?difficulty=bogo${includeText ? "&text=true" : ""}`} passHref>
              <Button
                variant="outline"
                className="w-full text-lg py-6 border-green-500 text-green-400 hover:bg-green-900/20"
              >
                Bogo
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

