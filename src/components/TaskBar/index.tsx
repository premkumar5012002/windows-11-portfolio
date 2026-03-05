"use client";

import { FC, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useOnClickOutside } from "usehooks-ts";
import { useWindowStore, Window } from "@/store/window";
import { StartMenu } from "@/components/StartMenu";
import { Icon } from "@iconify/react";

export const TaskBar: FC = () => {
  return (
    <div className="animate-taskbar-enter z-10 flex h-14 items-center justify-between border-t border-white/60 bg-white/55 px-3 backdrop-blur-2xl">
      <div className="flex items-center gap-3">
        <StartMenuButton />
        <div className="mr-1 w-px self-stretch bg-slate-300/80" />
        <RunningApps />
      </div>
      <div className="flex items-center justify-end">
        <div className="mr-3 w-px self-stretch bg-slate-300/80" />
        <SystemTray />
      </div>
    </div>
  );
};

const StartMenuButton: FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  useOnClickOutside(ref as React.RefObject<HTMLElement>, () =>
    setIsOpen(false),
  );

  return (
    <div ref={ref}>
      <button
        className={cn(
          "start-button",
          isOpen && "border-slate-200/70 bg-white/85 shadow-sm",
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Icon icon="logos:microsoft-windows-icon" className="size-6" />
      </button>
      {isOpen && <StartMenu />}
    </div>
  );
};

const RunningApps: FC = () => {
  const {
    openedWindows,
    openedWindowsOrder,
    refocusWindow,
    toggleMinimizeWindow,
  } = useWindowStore();

  const focusedWindow = openedWindows[openedWindows.length - 1];

  const onClick = (window: Window) => {
    if (focusedWindow.id === window.id) {
      toggleMinimizeWindow(window.id);
    } else {
      refocusWindow(window.id);
    }
  };

  return (
    <div
      className={cn(
        "grid max-w-[min(70vw,760px)] grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-1.5 md:flex md:gap-2",
      )}
      style={{
        gridTemplateColumns:
          openedWindows.length > 0
            ? `repeat(${openedWindows.length}, minmax(0, 1fr))`
            : undefined,
      }}
    >
      {openedWindowsOrder.map((windowId) => {
        const window = openedWindows.find((window) => window.id === windowId);
        if (window) {
          return (
            <button
              key={window.id}
              className={cn(
                "flex items-center justify-center rounded-lg border border-transparent p-1.5 text-xs font-medium text-slate-700 transition duration-200 hover:-translate-y-0.5 md:text-sm",
                window.isMinimized || focusedWindow.id !== window.id
                  ? "bg-white/35 hover:bg-white/80"
                  : "active-window",
              )}
              onClick={() => onClick(window)}
              title={window.title}
            >
              {window.icon && <Icon icon={window.icon} className="size-8" />}
            </button>
          );
        }
      })}
    </div>
  );
};

const SystemTray: FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const timeString = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const dateString = time.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex h-10 flex-col items-end justify-center text-sm text-slate-700">
      <p>{timeString}</p>
      <p>{dateString}</p>
    </div>
  );
};
