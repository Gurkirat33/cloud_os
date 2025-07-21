"use client";

import { Play, Pause, RotateCcw, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GameHeaderProps {
  score: number;
  highScore: number;
  snakeLength: number;
  isPlaying: boolean;
  gameOver: boolean;
  speed: number;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

const DIFFICULTY_OPTIONS = [
  { value: "200", label: "Easy", speed: 200 },
  { value: "150", label: "Normal", speed: 150 },
  { value: "100", label: "Hard", speed: 100 },
  { value: "80", label: "Expert", speed: 80 },
];

export default function GameHeader({
  score,
  highScore,
  snakeLength,
  isPlaying,
  gameOver,
  speed,
  onStart,
  onPause,
  onReset,
  onSpeedChange,
}: GameHeaderProps) {
  return (
    <div className="p-4 bg-card border-b border-border">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-primary">Snake Game</h2>
          <p className="text-sm text-muted-foreground">
            Use arrow keys or WASD to move
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={speed.toString()}
            onValueChange={(value: string) => onSpeedChange(parseInt(value))}
          >
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DIFFICULTY_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={onStart} variant="default" size="sm">
            <Play className="w-4 h-4" />
            Start
          </Button>
          <Button
            onClick={onPause}
            disabled={!isPlaying && !gameOver}
            variant="secondary"
            size="sm"
          >
            <Pause className="w-4 h-4" />
            {isPlaying ? "Pause" : "Resume"}
          </Button>
          <Button onClick={onReset} variant="destructive" size="sm">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-secondary p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-primary">{score}</div>
          <div className="text-xs text-muted-foreground">Score</div>
        </div>
        <div className="bg-secondary p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-primary flex items-center justify-center gap-1">
            {highScore}
            {score === highScore && score > 0 && (
              <Trophy className="w-4 h-4 text-yellow-500" />
            )}
          </div>
          <div className="text-xs text-muted-foreground">High Score</div>
        </div>
        <div className="bg-secondary p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-primary">{snakeLength}</div>
          <div className="text-xs text-muted-foreground">Length</div>
        </div>
      </div>
    </div>
  );
}
