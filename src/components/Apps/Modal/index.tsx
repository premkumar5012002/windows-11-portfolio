import { FC, ReactNode } from "react";
import Image from "next/image";

import { useWindowStore } from "@/store/window";
import { Icon } from "@iconify/react";

export const Modal: FC<{
  isError: boolean;
  message?: string | ReactNode;
}> = ({ isError, message }) => {
  const { closeWindow } = useWindowStore();

  return (
    <div className="animate-app-panel bg-linear-to-b flex h-full items-center justify-center from-white/90 to-white/75">
      <div className="animate-section-enter w-full bg-white p-5">
        <div className="flex items-center gap-3">
          <Icon
            icon={
              isError
                ? "fluent-color:dismiss-circle-48"
                : "fluent-color:checkmark-circle-48"
            }
            className="size-8"
          />
          <div>
            <p className="text-base font-semibold text-slate-800">
              {isError ? "Something went wrong" : "Message sent"}
            </p>
            <p className="text-xs text-slate-500">
              {isError
                ? "Please review the details below."
                : "Thanks for reaching out."}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50/70 p-3 text-sm text-slate-700">
          {message}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            className="os-button"
            onClick={() => closeWindow(isError ? "error" : "success")}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
