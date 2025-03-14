import Link from "next/link"
import { Button } from "@/components/ui/button"
import Head from "next/head"

export default function Home() {
  return (
    <>
      <Head>
        <title>Asciidle - Indovina l'ASCII Art</title>
        <meta name="description" content="Un gioco dove devi indovinare cosa rappresenta l'ASCII art" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-slate-900 text-white">
        <div className="max-w-3xl w-full text-center">
          <h1 className="text-5xl font-bold mb-6 text-green-400 font-mono">ASCIIDLE</h1>
          <p className="text-xl mb-12">Indovina il disegno rappresentato dall'ASCII art!</p>

          <div className="grid gap-6 mb-12">
            <div className="p-6 border border-green-500 rounded-lg bg-slate-800">
              <h2 className="text-2xl font-mono mb-4 text-green-400">Come si gioca</h2>
              <p className="mb-4">Ti verrà mostrato un disegno in ASCII art e dovrai indovinare cosa rappresenta.</p>
              <p className="mb-4">Hai a disposizione massimo 5 tentativi per indovinare.</p>
              <p>Scegli la difficoltà e metti alla prova le tue abilità!</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 max-w-md mx-auto">
            <Link href="/game?difficulty=easy" passHref>
              <Button
                variant="outline"
                className="w-full text-lg py-6 border-green-500 text-green-400 hover:bg-green-900/20"
              >
                Modalità Facile
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
            <Link href="/game?difficulty=classic" passHref>
              <Button
                variant="outline"
                className="w-full text-lg py-6 border-green-500 text-green-400 hover:bg-green-900/20"
              >
                Classic
              </Button>
            </Link>
            <Link href="/game?difficulty=timed" passHref>
              <Button
                variant="outline"
                className="w-full text-lg py-6 border-green-500 text-green-400 hover:bg-green-900/20"
              >
                Modalità a Tempo
              </Button>
            </Link>
            <Link href="/game?difficulty=bogo" passHref>
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

