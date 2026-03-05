"use client";

import React, { FC, useMemo } from "react";
import { useWindowStore } from "@/store/window";
import { useWindowSize } from "usehooks-ts";
import { getWindowPositionAndSize } from "@/lib/utils";
import { Biography } from "../Apps/Biography";
import { Resume } from "../Apps/Resume";
import { Icon } from "@iconify/react";

export const DesktopView = () => {
  const { openedWindows, openWindow } = useWindowStore();

  const { width, height } = useWindowSize();

  const ICONS = useMemo(() => {
    return [
      {
        label: "About Me",
        icon: <Icon icon="fluent-color:content-view-32" className="size-12" />,
        onOpen: () => {
          openWindow({
            id: "biography",
            title: "About Me",
            icon: "fluent-color:content-view-32",
            isFullScreen: false,
            isMinimized: false,
            component: <Biography />,
            ...getWindowPositionAndSize(width, height - 56, openedWindows),
          });
        },
      },
      {
        label: "Résumé",
        icon: <Icon icon="fluent-color:document-text-32" className="size-12" />,
        onOpen: () => {
          openWindow({
            id: "resume",
            title: "Résumé",
            icon: "fluent-color:document-text-32",
            isFullScreen: false,
            isMinimized: false,
            component: <Resume />,
            ...getWindowPositionAndSize(width, height - 56, openedWindows),
          });
        },
      },
      // {
      //   label: "Projects",
      //   icon: <Icon icon="fluent-color:toolbox-32" className="size-12" />,
      //   onOpen: () => {
      //     openWindow({
      //       id: "projects",
      //       title: "Projects",
      //       icon: "fluent-color:toolbox-32",
      //       isFullScreen: false,
      //       isMinimized: false,
      //       component: <Projects />,
      //       ...getWindowPositionAndSize(width, height - 56, openedWindows),
      //     });
      //   },
      // },
      // {
      //   label: "Mail",
      //   icon: <Icon icon="fluent-color:mail-32" className="size-12" />,
      //   onOpen: () => {
      //     openWindow({
      //       id: "mail",
      //       title: "Mail",
      //       icon: "fluent-color:mail-32",
      //       isFullScreen: false,
      //       isMinimized: false,
      //       component: <Mail />,
      //       ...getWindowPositionAndSize(width, height - 56, openedWindows),
      //     });
      //   },
      // },
    ];
  }, [openedWindows, width, height, openWindow]);

  return (
    <div className="relative flex h-full flex-1 flex-col gap-6 overflow-hidden p-6 select-none">
      <div className="animate-wallpaper pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,rgba(191,219,254,0.28),transparent_32%),radial-gradient(circle_at_88%_24%,rgba(147,197,253,0.42),transparent_45%),radial-gradient(circle_at_70%_78%,rgba(186,230,253,0.5),transparent_38%),linear-gradient(145deg,#eef5ff_0%,#d8e9ff_35%,#bfdcff_65%,#d6eeff_100%)]" />
      {ICONS.map((desktopIcon, index) => (
        <DesktopItem key={desktopIcon.label} index={index} {...desktopIcon} />
      ))}
    </div>
  );
};

const DesktopItem: FC<{
  index: number;
  label: string;
  icon: React.ReactNode;
  onOpen?: () => void;
}> = ({ index, label, icon, onOpen }) => {
  return (
    <button
      className="animate-desktop-item group relative z-1 flex w-20 flex-col items-center gap-1 rounded-xl p-2 text-center text-sm text-slate-900 transition hover:-translate-y-0.5 hover:bg-white focus:bg-white/25"
      style={
        {
          "--stagger-delay": `${index * 70}ms`,
        } as React.CSSProperties
      }
      onTouchStart={onOpen}
      onDoubleClick={onOpen}
    >
      <div>{icon}</div>
      <span className="font-medium">{label}</span>
    </button>
  );
};
