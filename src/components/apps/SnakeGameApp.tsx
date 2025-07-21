"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Gamepad2 } from "lucide-react";
import WindowContainer from "../ui/WindowContainer";
import GameHeader from "./snake/GameHeader";
import GameBoard from "./snake/GameBoard";
import GameOverlay from "./snake/GameOverlay";
import GameFooter from "./snake/GameFooter";

interface AppProps {
  onClose: () => void;
  onMinimize?: () => void;
  onFocus?: () => void;
  isMinimized?: boolean;
  zIndex?: number;
}

interface Position {
  x: number;
  y: number;
}

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const GRID_SIZE = 20;
const GAME_WIDTH = 400;
const GAME_HEIGHT = 400;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };
const INITIAL_DIRECTION: Direction = "RIGHT";

export default function SnakeGameApp({
  onClose,
  onMinimize,
  onFocus,
  isMinimized = false,
  zIndex = 50,
}: AppProps) {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [speed, setSpeed] = useState(150);
  const [mounted, setMounted] = useState(false);

  const gameRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    // Load high score from localStorage
    const savedHighScore = localStorage.getItem("snake_high_score");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  // Save high score to localStorage
  useEffect(() => {
    if (mounted && score > highScore) {
      setHighScore(score);
      localStorage.setItem("snake_high_score", score.toString());
    }
  }, [score, highScore, mounted]);

  const generateFood = useCallback((): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * (GAME_WIDTH / GRID_SIZE)),
        y: Math.floor(Math.random() * (GAME_HEIGHT / GRID_SIZE)),
      };
    } while (
      snake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      )
    );
    return newFood;
  }, [snake]);

  const checkCollision = useCallback(
    (head: Position): boolean => {
      // Wall collision
      if (
        head.x < 0 ||
        head.x >= GAME_WIDTH / GRID_SIZE ||
        head.y < 0 ||
        head.y >= GAME_HEIGHT / GRID_SIZE
      ) {
        return true;
      }

      // Self collision
      return snake.some(
        (segment) => segment.x === head.x && segment.y === head.y
      );
    },
    [snake]
  );

  const moveSnake = useCallback(() => {
    if (gameOver || !isPlaying) return;

    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };

      // Move head based on direction
      switch (direction) {
        case "UP":
          head.y -= 1;
          break;
        case "DOWN":
          head.y += 1;
          break;
        case "LEFT":
          head.x -= 1;
          break;
        case "RIGHT":
          head.x += 1;
          break;
      }

      // Check collision
      if (checkCollision(head)) {
        setGameOver(true);
        setIsPlaying(false);
        return prevSnake;
      }

      newSnake.unshift(head);

      // Check if food is eaten
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => prev + 10);
        setFood(generateFood());
        // Increase speed slightly
        setSpeed((prev) => Math.max(80, prev - 2));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPlaying, checkCollision, generateFood]);

  // Game loop
  useEffect(() => {
    if (isPlaying && !gameOver) {
      intervalRef.current = setInterval(moveSnake, speed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, gameOver, moveSnake, speed]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying || gameOver) return;

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          e.preventDefault();
          if (direction !== "DOWN") setDirection("UP");
          break;
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault();
          if (direction !== "UP") setDirection("DOWN");
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault();
          if (direction !== "RIGHT") setDirection("LEFT");
          break;
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault();
          if (direction !== "LEFT") setDirection("RIGHT");
          break;
        case " ":
          e.preventDefault();
          setIsPlaying(!isPlaying);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, isPlaying, gameOver]);

  const startGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  }, []);

  const pauseGame = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameOver(false);
    setIsPlaying(false);
  }, []);

  const handleSpeedChange = useCallback((newSpeed: number) => {
    setSpeed(newSpeed);
  }, []);

  if (!mounted) return null;

  return (
    <WindowContainer
      title="Snake Game"
      icon={<Gamepad2 className="w-4 h-4 text-primary" />}
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      isMinimized={isMinimized}
      zIndex={zIndex}
      defaultWidth={600}
      defaultHeight={650}
      minWidth={500}
      minHeight={600}
    >
      <div className="h-full bg-background text-foreground flex flex-col">
        {/* Header */}
        <GameHeader
          score={score}
          highScore={highScore}
          snakeLength={snake.length}
          isPlaying={isPlaying}
          gameOver={gameOver}
          speed={speed}
          onStart={startGame}
          onPause={pauseGame}
          onReset={resetGame}
          onSpeedChange={handleSpeedChange}
        />

        {/* Game Area */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="relative">
            <GameBoard
              ref={gameRef}
              snake={snake}
              food={food}
              gameWidth={GAME_WIDTH}
              gameHeight={GAME_HEIGHT}
              gridSize={GRID_SIZE}
            />

            <GameOverlay
              gameOver={gameOver}
              isPlaying={isPlaying}
              score={score}
              highScore={highScore}
              snakeLength={snake.length}
              onStart={startGame}
            />
          </div>
        </div>

        {/* Footer */}
        <GameFooter />
      </div>
    </WindowContainer>
  );
}
