"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Terminal, X, Minimize2, Maximize2 } from "lucide-react";
import WindowContainer from "../ui/WindowContainer";

interface AppProps {
  onClose: () => void;
  onMinimize?: () => void;
  onFocus?: () => void;
  isMinimized?: boolean;
  zIndex?: number;
}

interface TerminalLine {
  id: string;
  type: "command" | "output" | "error";
  content: string;
  timestamp: Date;
}

interface FileSystemItem {
  name: string;
  type: "file" | "directory";
  content?: string;
  children?: FileSystemItem[];
}

// Mock file system
const mockFileSystem: FileSystemItem = {
  name: "/",
  type: "directory",
  children: [
    {
      name: "home",
      type: "directory",
      children: [
        {
          name: "user",
          type: "directory",
          children: [
            {
              name: "documents",
              type: "directory",
              children: [
                {
                  name: "readme.txt",
                  type: "file",
                  content:
                    "Welcome to the terminal!\nThis is a mock file system.",
                },
                {
                  name: "todo.txt",
                  type: "file",
                  content:
                    "1. Learn terminal commands\n2. Practice navigation\n3. Have fun!",
                },
              ],
            },
            { name: "downloads", type: "directory", children: [] },
            {
              name: "desktop",
              type: "directory",
              children: [
                { name: "app.exe", type: "file", content: "Binary file" },
              ],
            },
            {
              name: ".bashrc",
              type: "file",
              content:
                "# Bash configuration file\nexport PATH=$PATH:/usr/local/bin",
            },
          ],
        },
      ],
    },
    {
      name: "etc",
      type: "directory",
      children: [
        {
          name: "hosts",
          type: "file",
          content: "127.0.0.1 localhost\n::1 localhost",
        },
      ],
    },
    {
      name: "var",
      type: "directory",
      children: [
        {
          name: "log",
          type: "directory",
          children: [
            {
              name: "system.log",
              type: "file",
              content: "[INFO] System started\n[INFO] All services running",
            },
          ],
        },
      ],
    },
  ],
};

export default function TerminalApp({
  onClose,
  onMinimize,
  onFocus,
  isMinimized = false,
  zIndex = 50,
}: AppProps) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [currentPath, setCurrentPath] = useState("/home/user");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [mounted, setMounted] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    // Welcome message
    addLine({
      type: "output",
      content:
        'Welcome to Terminal v1.0.0\nType "help" for available commands.\n',
    });
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const addLine = useCallback(
    (line: Omit<TerminalLine, "id" | "timestamp">) => {
      setLines((prev) => [
        ...prev,
        {
          ...line,
          id: Date.now().toString(),
          timestamp: new Date(),
        },
      ]);
    },
    []
  );

  const getCurrentDirectory = useCallback(
    (path: string): FileSystemItem | null => {
      const parts = path.split("/").filter((p) => p);
      let current = mockFileSystem;

      for (const part of parts) {
        if (current.children) {
          const found = current.children.find((child) => child.name === part);
          if (found && found.type === "directory") {
            current = found;
          } else {
            return null;
          }
        } else {
          return null;
        }
      }
      return current;
    },
    []
  );

  const resolvePath = useCallback(
    (path: string): string => {
      if (path.startsWith("/")) {
        return path;
      }

      if (path === "..") {
        const parts = currentPath.split("/").filter((p) => p);
        parts.pop();
        return "/" + parts.join("/");
      }

      if (path === ".") {
        return currentPath;
      }

      return currentPath === "/" ? `/${path}` : `${currentPath}/${path}`;
    },
    [currentPath]
  );

  const executeCommand = useCallback(
    (command: string) => {
      const trimmedCommand = command.trim();
      if (!trimmedCommand) return;

      // Add command to history
      setCommandHistory((prev) => [...prev, trimmedCommand]);
      setHistoryIndex(-1);

      // Add command line
      addLine({
        type: "command",
        content: `${currentPath}$ ${trimmedCommand}`,
      });

      const [cmd, ...args] = trimmedCommand.split(" ");

      switch (cmd) {
        case "help":
          addLine({
            type: "output",
            content: `Available commands:
  help              - Show this help message
  ls [path]         - List directory contents
  cd <path>         - Change directory
  pwd               - Print working directory
  cat <file>        - Display file contents
  mkdir <name>      - Create directory (simulated)
  touch <name>      - Create file (simulated)
  echo <text>       - Display text
  date              - Show current date/time
  whoami            - Show current user
  clear             - Clear terminal
  tree              - Show directory tree
  history           - Show command history`,
          });
          break;

        case "ls":
          const lsPath = args[0] ? resolvePath(args[0]) : currentPath;
          const lsDir = getCurrentDirectory(lsPath);
          if (lsDir && lsDir.children) {
            const items = lsDir.children
              .map((item) =>
                item.type === "directory" ? `${item.name}/` : item.name
              )
              .join("  ");
            addLine({
              type: "output",
              content: items || "Directory is empty",
            });
          } else {
            addLine({
              type: "error",
              content: `ls: ${lsPath}: No such file or directory`,
            });
          }
          break;

        case "cd":
          if (args.length === 0) {
            setCurrentPath("/home/user");
            addLine({
              type: "output",
              content: "",
            });
          } else {
            const newPath = resolvePath(args[0]);
            const dir = getCurrentDirectory(newPath);
            if (dir && dir.type === "directory") {
              setCurrentPath(newPath);
              addLine({
                type: "output",
                content: "",
              });
            } else {
              addLine({
                type: "error",
                content: `cd: ${args[0]}: No such file or directory`,
              });
            }
          }
          break;

        case "pwd":
          addLine({
            type: "output",
            content: currentPath,
          });
          break;

        case "cat":
          if (args.length === 0) {
            addLine({
              type: "error",
              content: "cat: missing file operand",
            });
          } else {
            const filePath = resolvePath(args[0]);
            const dir = getCurrentDirectory(currentPath);
            const fileName = args[0].split("/").pop();
            const file = dir?.children?.find(
              (item) => item.name === fileName && item.type === "file"
            );

            if (file && file.content) {
              addLine({
                type: "output",
                content: file.content,
              });
            } else {
              addLine({
                type: "error",
                content: `cat: ${args[0]}: No such file or directory`,
              });
            }
          }
          break;

        case "echo":
          addLine({
            type: "output",
            content: args.join(" "),
          });
          break;

        case "date":
          addLine({
            type: "output",
            content: new Date().toString(),
          });
          break;

        case "whoami":
          addLine({
            type: "output",
            content: "user",
          });
          break;

        case "clear":
          setLines([]);
          break;

        case "mkdir":
          if (args.length === 0) {
            addLine({
              type: "error",
              content: "mkdir: missing operand",
            });
          } else {
            addLine({
              type: "output",
              content: `Directory '${args[0]}' created (simulated)`,
            });
          }
          break;

        case "touch":
          if (args.length === 0) {
            addLine({
              type: "error",
              content: "touch: missing file operand",
            });
          } else {
            addLine({
              type: "output",
              content: `File '${args[0]}' created (simulated)`,
            });
          }
          break;

        case "tree":
          const showTree = (item: FileSystemItem, prefix = ""): string => {
            let result =
              prefix +
              item.name +
              (item.type === "directory" ? "/" : "") +
              "\n";
            if (item.children) {
              item.children.forEach((child, index) => {
                const isLast = index === item.children!.length - 1;
                const newPrefix = prefix + (isLast ? "  " : "│ ");
                result +=
                  prefix +
                  (isLast ? "└─" : "├─") +
                  child.name +
                  (child.type === "directory" ? "/" : "") +
                  "\n";
                if (child.children && child.children.length > 0) {
                  result += showTree(child, newPrefix)
                    .split("\n")
                    .slice(1)
                    .join("\n");
                }
              });
            }
            return result;
          };
          addLine({
            type: "output",
            content: showTree(mockFileSystem),
          });
          break;

        case "history":
          addLine({
            type: "output",
            content: commandHistory
              .map((cmd, index) => `${index + 1}  ${cmd}`)
              .join("\n"),
          });
          break;

        default:
          addLine({
            type: "error",
            content: `${cmd}: command not found`,
          });
          break;
      }
    },
    [currentPath, addLine, getCurrentDirectory, resolvePath, commandHistory]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        executeCommand(currentCommand);
        setCurrentCommand("");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (commandHistory.length > 0) {
          const newIndex =
            historyIndex === -1
              ? commandHistory.length - 1
              : Math.max(0, historyIndex - 1);
          setHistoryIndex(newIndex);
          setCurrentCommand(commandHistory[newIndex]);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex !== -1) {
          const newIndex = historyIndex + 1;
          if (newIndex >= commandHistory.length) {
            setHistoryIndex(-1);
            setCurrentCommand("");
          } else {
            setHistoryIndex(newIndex);
            setCurrentCommand(commandHistory[newIndex]);
          }
        }
      }
    },
    [currentCommand, executeCommand, commandHistory, historyIndex]
  );

  const getLineColor = (type: string) => {
    switch (type) {
      case "command":
        return "text-green-400";
      case "error":
        return "text-red-400";
      case "output":
        return "text-gray-100";
      default:
        return "text-gray-100";
    }
  };

  if (!mounted) return null;

  return (
    <WindowContainer
      title="Terminal"
      icon={<Terminal className="w-4 h-4 text-green-500" />}
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      isMinimized={isMinimized}
      zIndex={zIndex}
      defaultWidth={800}
      defaultHeight={500}
      minWidth={600}
      minHeight={400}
    >
      <div className="h-full bg-black text-white font-mono text-sm flex flex-col">
        {/* Terminal Content */}
        <div
          ref={terminalRef}
          className="flex-1 overflow-auto p-4 space-y-1"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line) => (
            <div
              key={line.id}
              className={`whitespace-pre-wrap ${getLineColor(line.type)}`}
            >
              {line.content}
            </div>
          ))}

          {/* Current Input Line */}
          <div className="flex items-center text-green-400">
            <span className="mr-2">{currentPath}$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-white"
              autoFocus
              autoComplete="off"
              spellCheck={false}
            />
            <span className="animate-pulse">█</span>
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-gray-800 px-4 py-1 text-xs text-gray-400 border-t border-gray-700 flex items-center justify-between">
          <span>Terminal - user@localhost</span>
          <span>{currentPath}</span>
        </div>
      </div>
    </WindowContainer>
  );
}
