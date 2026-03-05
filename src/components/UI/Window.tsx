import { FC } from "react";

import { cn } from "@/lib/utils";

import { useWindowSize } from "usehooks-ts";
import { useWindowStore, Window } from "@/store/window";
import { useMoveWindow } from "@/hooks/useMoveWindow";
import { Icon } from "@iconify/react";

export const AppWindow: FC<{
  window: Window;
}> = ({ window }) => {
  const { width, height } = useWindowSize();

  const { openedWindows, refocusWindow } = useWindowStore();

  const { onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
    useMoveWindow(window);

  const { closeWindow, toggleMinimizeWindow, toggleMaximizeWindow } =
    useWindowStore();

  const {
    id,
    title,
    icon,
    isFullScreen,
    x,
    y,
    component,
    width: windowWidth,
    height: windowHeight,
  } = window;

  return (
    <div
      id={window.id}
      style={{
        top: isFullScreen ? 0 : y,
        left: isFullScreen ? 0 : x,
        width: isFullScreen ? width : windowWidth,
        height: isFullScreen ? height - 56 : windowHeight,
      }}
      className={cn(
        "animate-window-enter absolute z-5 flex flex-col overflow-hidden border border-white/70 bg-white/85 backdrop-blur-xl transition-[top,left,width,height,border-radius,box-shadow] duration-200 ease-out",
        isFullScreen
          ? "rounded-none shadow-none"
          : "rounded-xl shadow-[0_16px_40px_rgba(8,24,64,0.22)]",
      )}
      onClick={() => refocusWindow(id)}
    >
      {icon && (
        <div
          className={cn(
            "flex items-center justify-between border-b border-slate-200/80 px-3 py-1.5 select-none hover:cursor-move",
            openedWindows[openedWindows.length - 1].id === window.id
              ? "bg-[#e9f1ff]"
              : "bg-white/70",
          )}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
        >
          <div className="flex items-center gap-1.5">
            <Icon icon={icon} className="size-5" />
            <h2 className="text-sm font-medium text-slate-700">{title}</h2>
          </div>

          <div className="flex items-center gap-1">
            <button
              className="window-control"
              onClick={() => toggleMinimizeWindow(id)}
            >
              <Icon icon="mdi:minimize" className="size-5" />
            </button>

            <button
              className="window-control"
              onClick={() => toggleMaximizeWindow(id)}
            >
              <Icon icon="mdi:maximize" className="size-4" />
            </button>

            <button className="window-control" onClick={() => closeWindow(id)}>
              <Icon icon="mdi:close" className="size-5" />
            </button>
          </div>
        </div>
      )}
      {component}
    </div>
  );
};
