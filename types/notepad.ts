export interface AppProps {
  onClose: () => void;
  onMinimize?: () => void;
  onFocus?: () => void;
  isMinimized?: boolean;
  zIndex?: number;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  lastModified: Date;
  fontSize: number;
  fontFamily: string;
}
