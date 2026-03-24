import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/shared/providers/ToastProvider";
import StoreProvider from "@/shared/providers/StoreProvider";
import SessionProvider from "@/shared/providers/SessionProvider";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Job Tracker & Resume Analyzer",
  description: "Track your job applications and analyze resumes in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={nunito.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme');
                if (!theme) {
                  theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${nunito.variable} antialiased`}
      >
        <StoreProvider>
          <SessionProvider>
            {children}
          </SessionProvider>
        </StoreProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
