import Image from "next/image";
import { CSSProperties, FC } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

type Project = {
  title: string;
  image: string;
  summary: string;
  imageAlt: string;
  href: string;
  description: string[];
};

const PROJECTS: Project[] = [
  {
    title: "Nextcloud Enterprise Deployment on AWS",
    summary:
      "A scalable and secure Nextcloud deployment on AWS, utilizing EC2, S3, and auto-scaling.",
    image: "/projects/nextcloud-architecture.jpeg",
    imageAlt: "Nextcloud Enterprise Deployment on AWS Screenshot",
    href: "https://github.com/premkumar5012002/nextcloud-aws",
    description: [
      "Provisioned cloud infrastructure on Amazon Web Services using Terraform, including VPC with public and private subnets for secure network architecture.",
      "Deployed a scalable application environment using an Application Load Balancer with target groups and Auto Scaling Group for EC2 instances.",
      "Configured a managed database with automated backups to ensure data durability and disaster recovery capability.",
    ],
  },
  {
    title: "Monitoring and Ticketing with Nagios Core and osTicket",
    summary:
      "A comprehensive monitoring and ticketing solution using Nagios Core and osTicket.",
    image: "/projects/nagios-osticket-integration.jpeg",
    imageAlt:
      "Monitoring and Ticketing with Nagios Core and osTicket Screenshot",
    href: "https://github.com/premkumar5012002/nagios-osticket-integration",
    description: [
      "Designed and implemented an monitoring system using Nagios Core to track critical servers availability and service health.",
      "Integrated the monitoring system with a ticketing platform (osTicket) to automatically generate support tickets when system and services failures.",
      "Deployed and managed the solution across Linux and Windows Server environments to simulate enterprise IT monitoring workflows.",
    ],
  },
];

export const Projects: FC = () => {
  return (
    <div className="animate-app-panel bg-linear-to-b overflow-auto from-white/90 to-white/75 text-slate-700">
      <div className="border-b border-slate-200/80 bg-white/70">
        <div className="mx-auto w-full max-w-3xl px-5 py-4">
          <h2 className="text-xl font-semibold text-slate-800">Projects</h2>
          <p className="mt-1 text-sm text-slate-500">
            Selected work focused on infrastructure and cloud architecture.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-3xl gap-6 p-5">
        {PROJECTS.map((project, i) => (
          <article
            key={project.title}
            className="animate-section-enter"
            style={{ "--stagger-delay": `${i * 80}ms` } as CSSProperties}
          >
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold text-slate-800">
                  {i + 1}. {project.title}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{project.summary}</p>
              </div>
            </div>

            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={project.href}
              className="block overflow-hidden border"
            >
              <Image
                priority
                width={1920}
                height={1280}
                src={project.image}
                className="h-auto w-full"
                alt={project.imageAlt}
              />
            </Link>

            <ul className="mt-5 list-inside list-disc space-y-2 text-slate-700">
              {project.description.map((desc, idx) => (
                <li key={idx}>{desc}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
};
