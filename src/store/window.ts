import { JSX } from "react";
import { create } from "zustand";

export interface Window {
  id: string;
  title: string;
  icon?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isFullScreen: boolean;
  component: JSX.Element;
}

interface WindowState {
  openedWindows: Window[];
  openedWindowsOrder: string[];
}

interface WindowAction {
  openWindow: (window: Window) => void;
  refocusWindow: (id: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  resizeWindow: (
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
  ) => void;
  toggleMinimizeWindow: (id: string) => void;
  toggleMaximizeWindow: (id: string) => void;
  closeWindow: (id: string) => void;
}

export const useWindowStore = create<WindowState & WindowAction>(
  (set, state) => ({
    openedWindows: [],

    openedWindowsOrder: [],

    openWindow: (window) => {
      set((state) => {
        const existingWindow = state.openedWindows.find(
          (openedWindow) => openedWindow.id === window.id,
        );

        const nextWindow = existingWindow
          ? {
              ...existingWindow,
              isMinimized: false,
            }
          : window;

        const openedWindows = state.openedWindows
          .filter((openedWindow) => openedWindow.id !== window.id)
          .concat(nextWindow);

        const openedWindowsOrder = state.openedWindowsOrder.includes(window.id)
          ? state.openedWindowsOrder
          : state.openedWindowsOrder.concat(window.id);

        return { openedWindows, openedWindowsOrder };
      });
    },

    refocusWindow: (id) => {
      const openedWindowIndex = state().openedWindows.findIndex(
        (window) => window.id === id,
      );

      if (openedWindowIndex !== -1) {
        const window = state().openedWindows[openedWindowIndex];

        set((state) => ({
          openedWindows: state.openedWindows
            .filter((window) => window.id !== id)
            .concat(window),
        }));
      }
    },

    moveWindow: (id, x, y) => {
      const openedWindowIndex = state().openedWindows.findIndex(
        (window) => window.id === id,
      );

      if (openedWindowIndex !== -1) {
        const movedWindow: Window = {
          ...state().openedWindows[openedWindowIndex],
          x,
          y,
        };

        set((state) => ({
          openedWindows: state.openedWindows
            .filter((window) => window.id !== id)
            .concat(movedWindow),
        }));
      }
    },

    resizeWindow: (id, x, y, width, height) => {
      const openedWindowIndex = state().openedWindows.findIndex(
        (window) => window.id === id,
      );

      if (openedWindowIndex !== -1) {
        const resizedWindow: Window = {
          ...state().openedWindows[openedWindowIndex],
          x,
          y,
          width,
          height,
        };

        set((state) => ({
          openedWindows: state.openedWindows
            .filter((window) => window.id !== id)
            .concat(resizedWindow),
        }));
      }
    },

    toggleMinimizeWindow: (id) => {
      const openedWindowIndex = state().openedWindows.findIndex(
        (window) => window.id === id,
      );

      if (openedWindowIndex !== -1) {
        const openedWindows = state().openedWindows;

        openedWindows[openedWindowIndex].isMinimized =
          !openedWindows[openedWindowIndex].isMinimized;

        return set(() => ({ openedWindows }));
      }
    },

    toggleMaximizeWindow: (id) => {
      const openedWindowIndex = state().openedWindows.findIndex(
        (window) => window.id === id,
      );

      if (openedWindowIndex !== -1) {
        const updatedWindow: Window = {
          ...state().openedWindows[openedWindowIndex],
          isFullScreen: !state().openedWindows[openedWindowIndex].isFullScreen,
        };

        set((state) => ({
          openedWindows: state.openedWindows
            .filter((window) => window.id !== id)
            .concat(updatedWindow),
        }));
      }
    },

    closeWindow: (id) => {
      set((state) => ({
        openedWindows: state.openedWindows.filter(
          (openedWindow) => openedWindow.id !== id,
        ),
        openedWindowsOrder: state.openedWindowsOrder.filter(
          (openedWindowId) => openedWindowId !== id,
        ),
      }));
    },
  }),
);
