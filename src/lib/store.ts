import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppItem {
  id: string;
  isMinimized: boolean;
  // Future fields can be added here (like position, size, etc.)
}

interface AppState {
  openApps: AppItem[];
}

const initialState: AppState = {
  openApps: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    openApp: (state, action: PayloadAction<string>) => {
      const appId = action.payload;
      // Check if app is already open
      const existingApp = state.openApps.find((app) => app.id === appId);

      if (!existingApp) {
        // Add new app
        state.openApps.push({
          id: appId,
          isMinimized: false,
        });
      } else {
        // If app exists and is minimized, restore it
        existingApp.isMinimized = false;
      }
    },

    closeApp: (state, action: PayloadAction<string>) => {
      const appId = action.payload;
      state.openApps = state.openApps.filter((app) => app.id !== appId);
    },

    toggleMinimizeApp: (state, action: PayloadAction<string>) => {
      const appId = action.payload;
      const app = state.openApps.find((app) => app.id === appId);
      if (app) {
        app.isMinimized = !app.isMinimized;
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
      }
    },

    closeAllApps: (state) => {
      state.openApps = [];
    },
  },
});

export const {
  openApp,
  closeApp,
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
