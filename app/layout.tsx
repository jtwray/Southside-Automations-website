import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Southside Automation | Practical Software for Local Businesses",
  description: "Stop losing time between calls, field crews, spreadsheets and accounting. Southside Automation builds practical workflow software for trades and small manufacturers in Southside Virginia.",
  openGraph: { title: "Southside Automation", description: "Connect what you have. Automate what you repeat. Build what's missing.", type: "website" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
