"use client";

import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GameOverlayProps {
  gameOver: boolean;
  isPlaying: boolean;
  score: number;
  highScore: number;
  snakeLength: number;
  onStart: () => void;
}

export default function GameOverlay({
  gameOver,
  isPlaying,
  score,
  highScore,
  snakeLength,
  onStart,
}: GameOverlayProps) {
  if (gameOver) {
    return (
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
        <div className="text-center p-6 bg-card border border-border rounded-lg shadow-lg">
          <h3 className="text-3xl font-bold text-destructive mb-2">
            Game Over!
          </h3>
          <p className="text-lg text-foreground mb-4">Score: {score}</p>
          {score === highScore && score > 0 && (
            <p className="text-yellow-500 mb-4 flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5" />
              New High Score!
            </p>
          )}
          <Button onClick={onStart} variant="default">
            Play Again
          </Button>
        </div>
      </div>
    );
  }

  if (!isPlaying && snakeLength > 1) {
    return (
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
        <div className="text-center p-6 bg-card border border-border rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-primary mb-2">Paused</h3>
          <p className="text-muted-foreground">
            Press Space or click Resume to continue
          </p>
        </div>
      </div>
    );
  }

  return null;
}
