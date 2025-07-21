"use client";

import { forwardRef } from "react";

interface Position {
  x: number;
  y: number;
}

interface GameBoardProps {
  snake: Position[];
  food: Position;
  gameWidth: number;
  gameHeight: number;
  gridSize: number;
}

const GameBoard = forwardRef<HTMLDivElement, GameBoardProps>(
  ({ snake, food, gameWidth, gameHeight, gridSize }, ref) => {
    return (
      <div
        ref={ref}
        className="relative border-2 border-border bg-background"
        style={{
          width: gameWidth,
          height: gameHeight,
        }}
      >
        {/* Snake */}
        {snake.map((segment, index) => (
          <div
            key={index}
            className={`absolute ${
              index === 0
                ? "bg-primary border-primary/80"
                : "bg-primary/80 border-primary/60"
            } border`}
            style={{
              left: segment.x * gridSize,
              top: segment.y * gridSize,
              width: gridSize,
              height: gridSize,
            }}
          />
        ))}

        {/* Food */}
        <div
          className="absolute bg-destructive border border-destructive/80 rounded-full"
          style={{
            left: food.x * gridSize + 2,
            top: food.y * gridSize + 2,
            width: gridSize - 4,
            height: gridSize - 4,
          }}
        />
      </div>
    );
  }
);

GameBoard.displayName = "GameBoard";

export default GameBoard;
