import "@/app/globals.css";

import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  author: "Prem Kumar",
  title: "Prem Kumar - Infrastructure Engineer",
  description:
    "Infrastructure Engineer with experience in system administration, networking, and cloud technologies. Skilled in Linux administration, Windows Server management, and Active Directory administration. Experienced in configuring and managing network devices including switches, routers, and firewall appliances. Familiar with AWS services, Docker, Terraform, and Ansible for infrastructure deployment and automation. Demonstrates strong understanding of maintaining secure, reliable, and scalable IT environments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="overflow-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
