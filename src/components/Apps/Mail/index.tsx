import Image from "next/image";
import { CSSProperties, FC, useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useWindowStore } from "@/store/window";
import { useWindowSize } from "usehooks-ts";
import { FormState, submitMail } from "@/server/actions";
import { Modal } from "../Modal";
import { Icon } from "@iconify/react";

const initialState: FormState = {};

export const Mail: FC = () => {
  const { openWindow } = useWindowStore();

  const { width, height } = useWindowSize();

  const [state, formAction] = useActionState(submitMail, initialState);

  useEffect(() => {
    if (state.error || state.message) {
      openWindow({
        id: state.error ? "error" : "success",
        title: state.error ? "Error" : "Success",
        isFullScreen: false,
        isMinimized: false,
        x: (width - 400) / 2,
        y: (height - 400) / 2,
        width: 350,
        height: 200,
        component: (
          <Modal
            message={
              state.error ? (
                state.error.code === "internal_error" ? (
                  <span className="break-all">
                    Unable to send your mail, please contact by mail{" "}
                    <span className="text-[#2b7fff]">
                      premkumar5012002@gmail.com
                    </span>
                  </span>
                ) : (
                  <span className="text-center">{state.error.message}</span>
                )
              ) : (
                state.message
              )
            }
            isError={state.error ? true : false}
          />
        ),
      });
    }
  }, [state, width, height, openWindow]);

  return (
    <form
      action={formAction}
      className="animate-app-panel bg-linear-to-b flex h-full flex-col from-white/90 to-white/75"
    >
      <div className="border-b border-slate-200/80 bg-white/70">
        <div className="mx-auto w-full max-w-3xl p-4">
          <h3 className="text-xl font-semibold text-slate-800">New message</h3>
          <p className="mt-1 text-sm text-slate-500">
            Send a direct message to Prem Kumar
          </p>
        </div>
      </div>

      <div
        className="animate-section-enter mx-auto w-full max-w-3xl p-4"
        style={{ "--stagger-delay": "80ms" } as CSSProperties}
      >
        <div className="space-y-4">
          <MailFieldRow label="To">
            <input
              required
              type="email"
              name="to"
              readOnly
              value="premkumar5012002@gmail.com"
              className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none ring-1 ring-transparent transition placeholder:text-slate-400 focus:border-[#2b7fff]/60 focus:ring-[#2b7fff]/50"
            />
          </MailFieldRow>

          <MailFieldRow label="From">
            <input
              required
              autoFocus
              name="from"
              type="email"
              placeholder="you@example.com"
              className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none ring-1 ring-transparent transition placeholder:text-slate-400 focus:border-[#2b7fff]/60 focus:ring-[#2b7fff]/50"
            />
          </MailFieldRow>

          <MailFieldRow label="Subject">
            <input
              required
              type="text"
              name="subject"
              placeholder="Project discussion"
              className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none ring-1 ring-transparent transition placeholder:text-slate-400 focus:border-[#2b7fff]/60 focus:ring-[#2b7fff]/50"
            />
          </MailFieldRow>
        </div>

        <div className="my-4 h-px w-full bg-slate-200" />

        <MailFieldRow label="Message">
          <textarea
            required
            id="mail-message"
            name="message"
            placeholder="Hi Prem, I would like to discuss..."
            className="min-h-45 h-full w-full resize-none rounded-md border border-slate-200 bg-white p-3 text-sm text-slate-700 outline-none ring-1 ring-transparent transition placeholder:text-slate-400 focus:border-[#2b7fff]/60 focus:ring-[#2b7fff]/50"
          />
        </MailFieldRow>

        <div className="my-4 h-px w-full bg-slate-200" />

        <div className="flex items-center justify-between bg-white/60">
          <p className="text-xs text-slate-500">
            Messages are sent securely from this form.
          </p>
          <SendButton />
        </div>
      </div>
    </form>
  );
};

const MailFieldRow: FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => {
  return (
    <div className="grid grid-cols-[72px_minmax(0,1fr)] items-start gap-2">
      <span className="text-sm font-medium text-slate-500">{label}</span>
      {children}
    </div>
  );
};

const SendButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className="os-button w-fit gap-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-70"
    >
      <Icon icon="fluent-color:send-48" className="size-4" />
      {pending ? "Sending..." : "Send"}
    </button>
  );
};
