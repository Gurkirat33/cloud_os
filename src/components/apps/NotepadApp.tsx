"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { FileText } from "lucide-react";
import WindowContainer from "../ui/WindowContainer";
import { AppProps, Note } from "../../../types/notepad";
import NotepadToolbar from "./notepad/NotepadToolbar";
import NotepadSearchBar from "./notepad/NotepadSearchBar";
import NotepadSidebar from "./notepad/NotepadSidebar";
import NotepadEditor from "./notepad/NotepadEditor";
import NotepadStatusBar from "./notepad/NotepadStatusBar";

export default function NotepadApp({
  onClose,
  onMinimize,
  onFocus,
  isMinimized = false,
  zIndex = 50,
}: AppProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("Untitled");
  const [isModified, setIsModified] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [fontFamily, setFontFamily] = useState("monospace");
  const [showSidebar, setShowSidebar] = useState(true);
  const [mounted, setMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load notes from localStorage
  useEffect(() => {
    setMounted(true);
    const savedNotes = localStorage.getItem("notepad_notes");
    if (savedNotes) {
      const parsed = JSON.parse(savedNotes);
      setNotes(
        parsed.map((note: any) => ({
          ...note,
          lastModified: new Date(note.lastModified),
        }))
      );
    }
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    if (mounted && notes.length > 0) {
      localStorage.setItem("notepad_notes", JSON.stringify(notes));
    }
  }, [notes, mounted]);

  // Track content changes
  useEffect(() => {
    if (currentNote && content !== currentNote.content) {
      setIsModified(true);
    } else {
      setIsModified(false);
    }
  }, [content, currentNote]);

  const createNewNote = useCallback(() => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "Untitled",
      content: "",
      lastModified: new Date(),
      fontSize: 14,
      fontFamily: "monospace",
    };
    setNotes((prev) => [newNote, ...prev]);
    setCurrentNote(newNote);
    setContent("");
    setTitle("Untitled");
    setIsModified(false);
  }, []);

  const saveCurrentNote = useCallback(() => {
    if (!currentNote) return;

    setNotes((prev) =>
      prev.map((note) =>
        note.id === currentNote.id
          ? {
              ...note,
              title,
              content,
              lastModified: new Date(),
              fontSize,
              fontFamily,
            }
          : note
      )
    );
    setCurrentNote((prev) =>
      prev ? { ...prev, title, content, fontSize, fontFamily } : null
    );
    setIsModified(false);
  }, [currentNote, title, content, fontSize, fontFamily]);

  const selectNote = useCallback((note: Note) => {
    setCurrentNote(note);
    setContent(note.content);
    setTitle(note.title);
    setFontSize(note.fontSize);
    setFontFamily(note.fontFamily);
    setIsModified(false);
  }, []);

  const deleteNote = useCallback(
    (noteId: string) => {
      setNotes((prev) => prev.filter((note) => note.id !== noteId));
      if (currentNote?.id === noteId) {
        setCurrentNote(null);
        setContent("");
        setTitle("Untitled");
      }
    },
    [currentNote]
  );

  const exportNote = useCallback(() => {
    if (!currentNote) return;

    const dataStr = `data:text/plain;charset=utf-8,${encodeURIComponent(
      content
    )}`;
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${title}.txt`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }, [currentNote, content, title]);

  const importFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const newNote: Note = {
          id: Date.now().toString(),
          title: file.name.replace(/\.[^/.]+$/, ""),
          content: text,
          lastModified: new Date(),
          fontSize: 14,
          fontFamily: "monospace",
        };
        setNotes((prev) => [newNote, ...prev]);
        setCurrentNote(newNote);
        setContent(text);
        setTitle(newNote.title);
      };
      reader.readAsText(file);
    },
    []
  );

  // Search functionality
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Auto-save functionality
  useEffect(() => {
    if (currentNote && isModified) {
      const timer = setTimeout(() => {
        saveCurrentNote();
      }, 2000); // Auto-save after 2 seconds of inactivity

      return () => clearTimeout(timer);
    }
  }, [currentNote, isModified, saveCurrentNote]);

  const stats = {
    characters: content.length,
    words: content.trim() ? content.trim().split(/\s+/).length : 0,
    lines: content.split("\n").length,
  };

  if (!mounted) return null;

  return (
    <WindowContainer
      title={`Notepad - ${title}${isModified ? " *" : ""}`}
      icon={<FileText className="w-4 h-4 text-primary" />}
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      isMinimized={isMinimized}
      zIndex={zIndex}
      defaultWidth={900}
      defaultHeight={600}
      minWidth={700}
      minHeight={500}
    >
      <div className="h-full flex flex-col bg-background">
        {/* Toolbar */}
        <NotepadToolbar
          onNewNote={createNewNote}
          onSave={saveCurrentNote}
          onImport={() => fileInputRef.current?.click()}
          onExport={exportNote}
          onToggleSearch={() => setShowSearch(!showSearch)}
          onToggleSidebar={() => setShowSidebar(!showSidebar)}
          isModified={isModified}
          canExport={!!currentNote}
          showSearch={showSearch}
          showSidebar={showSidebar}
        />

        {/* Search Bar */}
        {showSearch && (
          <NotepadSearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onClose={() => setShowSearch(false)}
          />
        )}

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          {showSidebar && (
            <NotepadSidebar
              notes={filteredNotes}
              currentNote={currentNote}
              onSelectNote={selectNote}
              onDeleteNote={deleteNote}
            />
          )}

          {/* Editor */}
          <NotepadEditor
            title={title}
            content={content}
            fontSize={fontSize}
            fontFamily={fontFamily}
            onTitleChange={setTitle}
            onContentChange={setContent}
          />
        </div>

        {/* Status Bar */}
        <NotepadStatusBar
          stats={stats}
          fontSize={fontSize}
          fontFamily={fontFamily}
          isModified={isModified}
          onFontSizeChange={setFontSize}
          onFontFamilyChange={setFontFamily}
        />

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.md"
          onChange={importFile}
          className="hidden"
        />
      </div>
    </WindowContainer>
  );
}
