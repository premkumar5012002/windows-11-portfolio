"use client";

import { useEffect, useRef } from "react";

import { useWindowSize } from "usehooks-ts";
import { useWindowStore } from "@/store/window";

import { AppWindow } from "@/components/UI/Window";
import { Biography } from "./Biography";
import { getWindowPositionAndSize } from "@/lib/utils";
import { Icon } from "@iconify/react";

export const Apps = () => {
  const { width, height } = useWindowSize();
  const hasOpenedDefaultWindow = useRef(false);

  const { openedWindows, openWindow } = useWindowStore();

  useEffect(() => {
    if (hasOpenedDefaultWindow.current) {
      return;
    }

    hasOpenedDefaultWindow.current = true;
    openWindow({
      id: "biography",
      title: "Biography",
      icon: "fluent-color:content-view-32",
      isFullScreen: false,
      isMinimized: false,
      component: <Biography />,
      ...getWindowPositionAndSize(width, height - 56, []),
    });
  }, [height, openWindow, width]);

  return openedWindows.map((window) => {
    if (window.isMinimized === false) {
      return <AppWindow key={window.id} window={window} />;
    }
  });
};
