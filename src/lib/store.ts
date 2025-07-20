import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppItem {
  id: string;
  isMinimized: boolean;
  zIndex: number;
  lastFocused: number;
  // Future fields can be added here (like position, size, etc.)
}

interface AppState {
  openApps: AppItem[];
  nextZIndex: number; // Track the next available z-index
}

const initialState: AppState = {
  openApps: [],
  nextZIndex: 50, // Starting z-index
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    openApp: (state, action: PayloadAction<string>) => {
      const appId = action.payload;
      const now = Date.now();

      // Check if app is already open
      const existingApp = state.openApps.find((app) => app.id === appId);

      if (!existingApp) {
        // Add new app with focus
        state.openApps.push({
          id: appId,
          isMinimized: false,
          zIndex: state.nextZIndex,
          lastFocused: now,
        });
        state.nextZIndex += 1;
      } else {
        // If app exists, restore and focus it
        existingApp.isMinimized = false;
        existingApp.zIndex = state.nextZIndex;
        existingApp.lastFocused = now;
        state.nextZIndex += 1;
      }
    },

    closeApp: (state, action: PayloadAction<string>) => {
      const appId = action.payload;
      state.openApps = state.openApps.filter((app) => app.id !== appId);
    },

    focusApp: (state, action: PayloadAction<string>) => {
      const appId = action.payload;
      const app = state.openApps.find((app) => app.id === appId);
      if (app) {
        // Bring to front and restore if minimized
        app.zIndex = state.nextZIndex;
        app.lastFocused = Date.now();
        app.isMinimized = false;
        state.nextZIndex += 1;
      }
    },

    toggleMinimizeApp: (state, action: PayloadAction<string>) => {
      const appId = action.payload;
      const app = state.openApps.find((app) => app.id === appId);
      if (app) {
        if (app.isMinimized) {
          // Restore and bring to front
          app.isMinimized = false;
          app.zIndex = state.nextZIndex;
          app.lastFocused = Date.now();
          state.nextZIndex += 1;
        } else {
          // Just minimize (keep z-index for when restored)
          app.isMinimized = true;
        }
      }
    },

    minimizeApp: (state, action: PayloadAction<string>) => {
      const appId = action.payload;
      const app = state.openApps.find((app) => app.id === appId);
      if (app) {
        app.isMinimized = true;
      }
    },

    restoreApp: (state, action: PayloadAction<string>) => {
      const appId = action.payload;
      const app = state.openApps.find((app) => app.id === appId);
      if (app) {
        app.isMinimized = false;
        app.zIndex = state.nextZIndex;
        app.lastFocused = Date.now();
        state.nextZIndex += 1;
      }
    },

    closeAllApps: (state) => {
      state.openApps = [];
      state.nextZIndex = 50; // Reset z-index counter
    },
  },
});

export const {
  openApp,
  closeApp,
  focusApp,
  toggleMinimizeApp,
  minimizeApp,
  restoreApp,
  closeAllApps,
} = appSlice.actions;

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type { AppItem };
