import { Button } from "@/components/ui/button"
import { AsciiArt } from "@/types/AsciiArt"

interface GameOverProps {
  win: boolean
  message: string
  ascii: AsciiArt
  onPlayAgain: () => void
  onGoHome: () => void
}

export default function GameOver({ win, message, ascii, onPlayAgain, onGoHome }: GameOverProps) {
  return (
    <div className="p-6 bg-slate-800 rounded-lg">
      <div className="text-center ">
        <h2 className={`text-2xl font-bold mb-4 ${win ? "text-green-400" : "text-red-400"}`}>
          {win ? "🎉 Vittoria! 🎉" : "Game Over"}
        </h2>
        <p className="mb-4">{message}</p>

        <div className="flex gap-4 justify-center mt-6">
          <Button onClick={onPlayAgain} className="bg-green-600 hover:bg-green-700">
            Gioca ancora
          </Button>
          <Button variant="outline" onClick={onGoHome} className="border-green-500 text-green-400 hover:bg-green-900/20">
            Torna alla Home
          </Button>
        </div>
      </div>
      <pre className="font-mono text-green-400 whitespace-pre overflow-x-auto">
        {ascii.art}
      </pre>
    </div>
  )
}

