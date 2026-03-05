import { CSSProperties, FC } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

export const Biography: FC = () => {
  return (
    <div className="animate-app-panel bg-linear-to-b overflow-auto from-white/90 to-white/75 text-slate-700">
      <div className="border-b border-slate-200/80 bg-white/70">
        <div className="mx-auto w-full max-w-3xl px-5 py-4">
          <h2 className="text-xl font-semibold text-slate-800">Prem Kumar</h2>
          <p className="mt-1 text-sm text-slate-500">Infrastructure Engineer</p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl space-y-4 p-5">
        <section
          className="animate-section-enter rounded-xl border border-slate-200 bg-white/85 p-4 shadow-sm"
          style={{ "--stagger-delay": "60ms" } as CSSProperties}
        >
          <div className="mb-2 flex items-center gap-2">
            <Icon
              icon="fluent-color:slide-text-sparkle-48"
              className="size-6"
            />
            <h3 className="text-lg font-semibold text-slate-800">About Me</h3>
          </div>
          <p className="text-sm leading-relaxed text-slate-700">
            Infrastructure Engineer with experience in system administration,
            networking, and cloud technologies. Skilled in Linux administration,
            Windows Server management, and Active Directory administration.
            Experienced in configuring and managing network devices including
            switches, routers, and firewall appliances. Familiar with AWS
            services, Docker, Terraform, and Ansible for infrastructure
            deployment and automation. Demonstrates strong understanding of
            maintaining secure, reliable, and scalable IT environments.
          </p>
        </section>

        <section
          className="animate-section-enter rounded-xl border border-slate-200 bg-white/85 p-4 shadow-sm"
          style={{ "--stagger-delay": "120ms" } as CSSProperties}
        >
          <div className="mb-3 flex items-center gap-2">
            <Icon icon="fluent-color:building-48" className="size-6" />
            <h3 className="text-lg font-semibold text-slate-800">
              Work Experience
            </h3>
          </div>

          <div className="rounded-lg bg-white px-2">
            <h4 className="text-base font-semibold text-slate-800">
              Futurenet Technologies India Pvt. Ltd.
            </h4>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
              <span className="rounded bg-slate-100 px-2 py-0.5 font-medium text-slate-700">
                Hybrid Infrastructure Associate Trainee
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600">November 2025 - Present</span>
            </div>

            <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-slate-700">
              <li>
                Worked with Active Directory Domain Services (AD DS) for user
                account creation and group policy management.
              </li>
              <li>
                Configured network switches with VLAN segmentation and routers
                using dynamic routing protocols.
              </li>
              <li>
                Worked with firewall devices to monitor network traffic and
                enforce security policies to block unauthorized or suspicious
                activity.
              </li>
              <li>
                Configured Linux storage servers using Logical Volume Manager
                (LVM) to manage disk volumes, enable flexible storage
                allocation, and support efficient storage management.
              </li>
            </ul>
          </div>
        </section>

        <section
          className="animate-section-enter rounded-xl border border-slate-200 bg-white/85 p-4 shadow-sm"
          style={{ "--stagger-delay": "180ms" } as CSSProperties}
        >
          <div className="mb-2 flex items-center gap-2">
            <Icon icon="fluent-color:document-text-48" className="size-6" />
            <h3 className="text-lg font-semibold text-slate-800">Résumé</h3>
          </div>
          <p className="text-sm text-slate-600">
            View the latest résumé with experience and project details.
          </p>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="/documents/prem_kumar_resume.pdf"
            className="mt-3 inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-[#2b7fff] shadow-sm transition hover:bg-slate-50"
          >
            Open Résumé
            <Icon icon="solar:arrow-right-up-linear" className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </div>
  );
};
