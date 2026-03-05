import { FC } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

export const Resume: FC = () => {
  return (
    <div className="animate-app-panel bg-linear-to-b flex h-full flex-col from-white/90 to-white/75 text-slate-700">
      <div className="border-b border-slate-200/80 bg-white/70">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-5 py-3">
          <div>
            <h3 className="text-xl font-semibold text-slate-800">Resume</h3>
            <p className="mt-1 text-sm text-slate-500">
              Preview and download the latest PDF
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/documents/prem_kumar_resume.pdf"
              download
              className="os-button gap-1.5 text-xs"
            >
              <Icon icon="solar:download-linear" className="h-4 w-4" />
              Download
            </Link>
            <Link
              href="/documents/prem_kumar_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="os-button gap-1.5 text-xs"
            >
              <Icon icon="solar:arrow-right-up-linear" className="h-4 w-4" />
              Open
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto h-full w-full max-w-3xl px-4">
        <div className="animate-section-enter h-full overflow-hidden border border-slate-200 bg-white shadow-sm">
          <iframe
            src="/documents/prem_kumar_resume.pdf"
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};
